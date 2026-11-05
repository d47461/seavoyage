import http.server
import socketserver
import os
import sys
import urllib.request
import ssl
import json
import xml.etree.ElementTree as ET
import time
import threading
from datetime import datetime

PORT = 5173
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MMS_BACKUP_PATH = os.path.join(BASE_DIR, 'src', 'data', 'mms-alerts.json')

# In-memory cached alerts initialized with backup snapshot if available
_mms_cache = {
    'timestamp': 0,
    'data': []
}

def load_initial_mms_cache():
    global _mms_cache
    try:
        if os.path.exists(MMS_BACKUP_PATH):
            with open(MMS_BACKUP_PATH, 'r', encoding='utf-8') as f:
                data = json.load(f)
                _mms_cache['data'] = data.get('alerts', [])
                _mms_cache['timestamp'] = time.time()
                print(f"[MMS Cache] Initialized from local snapshot: {len(_mms_cache['data'])} alerts.")
    except Exception as e:
        print(f"[MMS Cache] Snapshot init notice: {e}")

load_initial_mms_cache()

def get_ssl_context():
    """Create a secure SSL context with graceful fallback for local/governmental CA chains."""
    try:
        ctx = ssl.create_default_context()
        return ctx, True
    except Exception:
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        return ctx, False

def parse_mms_alerts():
    ctx, is_strict = get_ssl_context()

    def fetch_with_fallback(req, timeout=5):
        nonlocal ctx, is_strict
        try:
            return urllib.request.urlopen(req, context=ctx, timeout=timeout)
        except ssl.SSLCertVerificationError:
            # Fallback if intermediate CA certificate is missing on local OS
            fallback_ctx = ssl.create_default_context()
            fallback_ctx.check_hostname = False
            fallback_ctx.verify_mode = ssl.CERT_NONE
            return urllib.request.urlopen(req, context=fallback_ctx, timeout=timeout)

    alerts = []
    try:
        req = urllib.request.Request(
            'https://cap.meteorology.gov.mv/rss/alerts/',
            headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) SeaVoyage/2.0 MarineSafety',
                'Accept': 'application/rss+xml, application/xml, text/xml'
            }
        )
        with fetch_with_fallback(req, timeout=6) as res:
            rss_root = ET.fromstring(res.read())
            channel = rss_root.find('channel')
            items = channel.findall('item') if channel is not None else []

        for it in items[:6]:
            link = it.findtext('link')
            pub_date = it.findtext('pubDate')
            title = it.findtext('title')
            guid = it.findtext('guid')
            desc = it.findtext('description')

            title_lower = (title or '').lower()
            color = 'white'
            if 'red' in title_lower:
                color = 'red'
            elif 'yellow' in title_lower:
                color = 'yellow'
            elif 'white' in title_lower:
                color = 'white'
            else:
                color = 'green'

            alert_item = {
                'id': guid or link or ('mms_' + str(time.time())),
                'title': title or 'MMS Weather Advisory',
                'headline': title or 'MMS Weather Advisory',
                'link': link or 'https://meteorology.gov.mv',
                'pubDate': pub_date or '',
                'description': desc or '',
                'color': color,
                'event': 'Thunderstorms, Strong Winds, Rough Seas',
                'effective': pub_date or '',
                'expires': '',
                'areaDesc': 'From Haa Alif Atoll to Addu City (Maldives Waters)',
                'severity': 'Severe' if color == 'red' else ('Moderate' if color == 'yellow' else 'Minor'),
                'certainty': 'Likely'
            }

            if link and link.startswith('http'):
                try:
                    alert_req = urllib.request.Request(
                        link, 
                        headers={'User-Agent': 'Mozilla/5.0 SeaVoyage/2.0'}
                    )
                    with fetch_with_fallback(alert_req, timeout=2.5) as a_res:
                        a_xml = ET.fromstring(a_res.read())
                        ns = {'cap': 'urn:oasis:names:tc:emergency:cap:1.2'}
                        info = a_xml.find('cap:info', ns)
                        if info is not None:
                            alert_item['event'] = info.findtext('cap:event', default='', namespaces=ns) or alert_item['event']
                            alert_item['headline'] = info.findtext('cap:headline', default=title, namespaces=ns)
                            alert_item['effective'] = info.findtext('cap:effective', default='', namespaces=ns) or alert_item['effective']
                            alert_item['expires'] = info.findtext('cap:expires', default='', namespaces=ns)
                            alert_item['description'] = info.findtext('cap:description', default=desc, namespaces=ns) or alert_item['description']
                            alert_item['severity'] = info.findtext('cap:severity', default=alert_item['severity'], namespaces=ns)
                            area = info.find('cap:area', ns)
                            if area is not None:
                                alert_item['areaDesc'] = area.findtext('cap:areaDesc', default=alert_item['areaDesc'], namespaces=ns)
                except Exception:
                    pass

            # Strict Expiry Verification: Only include genuinely active MMS alerts
            is_active = True
            if alert_item.get('expires'):
                try:
                    exp_dt = datetime.fromisoformat(alert_item['expires'])
                    now_dt = datetime.now(exp_dt.tzinfo) if exp_dt.tzinfo else datetime.now()
                    if exp_dt <= now_dt:
                        is_active = False
                except Exception:
                    pass
            elif alert_item.get('pubDate'):
                try:
                    from email.utils import parsedate_to_datetime
                    pub_dt = parsedate_to_datetime(alert_item['pubDate'])
                    now_dt = datetime.now(pub_dt.tzinfo) if pub_dt.tzinfo else datetime.now()
                    if (now_dt - pub_dt).total_seconds() > 12 * 3600:
                        is_active = False
                except Exception:
                    pass

            if is_active:
                alerts.append(alert_item)

        # Cross-verify with official MMS Active Alerts portal (https://www.meteorology.gov.mv/active_alerts)
        try:
            portal_req = urllib.request.Request(
                'https://www.meteorology.gov.mv/active_alerts',
                headers={'User-Agent': 'Mozilla/5.0 SeaVoyage/2.0'}
            )
            with fetch_with_fallback(portal_req, timeout=5) as p_res:
                p_html = p_res.read().decode('utf-8', errors='ignore')
                if 'No alerts available at the moment' in p_html or 'var alerts = [];' in p_html:
                    alerts = []
        except Exception:
            pass

        _mms_cache['timestamp'] = time.time()
        _mms_cache['data'] = alerts
        print(f"[{datetime.now().strftime('%H:%M:%S')}] MMS live feed synchronized: {len(alerts)} alerts active.")

        # Persist to local snapshot file for seamless fallback
        try:
            snapshot = {
                'source': 'Maldives Meteorological Service (meteorology.gov.mv)',
                'fetchedAt': datetime.now().isoformat(),
                'activeAlertsCount': len(alerts),
                'alerts': alerts
            }
            with open(MMS_BACKUP_PATH, 'w', encoding='utf-8') as f:
                json.dump(snapshot, f, indent=2, ensure_ascii=False)
        except Exception:
            pass

    except Exception as e:
        print(f"[{datetime.now().strftime('%H:%M:%S')}] MMS feed check notice: {e}")

def mms_background_poller():
    # Initial background fetch after server starts
    time.sleep(1)
    parse_mms_alerts()
    while True:
        time.sleep(120)
        try:
            parse_mms_alerts()
        except Exception as e:
            print("Background poller notice:", e)

class DevHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def end_headers(self):
        # Security & Modern Web Headers
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-Frame-Options', 'SAMEORIGIN')
        self.send_header('Referrer-Policy', 'strict-origin-when-cross-origin')
        self.send_header('Permissions-Policy', 'geolocation=(self)')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        # Prevent dev caching so live edits appear immediately on normal refresh
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header('Content-Length', '0')
        self.end_headers()

    def do_GET(self):
        # Normalize and clean path
        clean_path = self.path.split('?')[0].split('#')[0]

        if clean_path == '/api/mms-alerts':
            alerts = _mms_cache.get('data', [])
            payload = json.dumps({
                'source': 'Maldives Meteorological Service (meteorology.gov.mv)',
                'fetchedAt': datetime.now().isoformat(),
                'activeAlertsCount': len(alerts),
                'alerts': alerts
            }, ensure_ascii=False).encode('utf-8')

            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Cache-Control', 'no-cache, must-revalidate')
            self.send_header('Content-Length', str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)
            return

        # Security check against path traversal
        norm = os.path.normpath(os.path.join(BASE_DIR, clean_path.lstrip('/')))
        if not norm.startswith(BASE_DIR):
            self.send_error(403, "Forbidden")
            return

        # Static files handling with proper caching
        return super().do_GET()

    def guess_type(self, path):
        mtype = super().guess_type(path)
        if path.endswith('.js') or path.endswith('.mjs'):
            return 'application/javascript; charset=utf-8'
        if path.endswith('.css'):
            return 'text/css; charset=utf-8'
        if path.endswith('.json') or path.endswith('.webmanifest'):
            return 'application/json; charset=utf-8'
        if path.endswith('.svg'):
            return 'image/svg+xml'
        return mtype

class ThreadingDevServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
    allow_reuse_address = True

def run():
    os.chdir(BASE_DIR)

    # Start non-blocking poller thread
    poller = threading.Thread(target=mms_background_poller, daemon=True)
    poller.start()

    with ThreadingDevServer(("", PORT), DevHTTPRequestHandler) as httpd:
        print(f"Marine Voyage Advisory server running at http://localhost:{PORT}/")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")

if __name__ == '__main__':
    run()
