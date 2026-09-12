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

# In-memory cached alerts
_mms_cache = {
    'timestamp': 0,
    'data': []
}

def parse_mms_alerts():
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

    alerts = []
    try:
        req = urllib.request.Request(
            'https://cap.meteorology.gov.mv/rss/alerts/',
            headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) SeaVoyage/1.0'}
        )
        with urllib.request.urlopen(req, context=ctx, timeout=8) as res:
            rss_root = ET.fromstring(res.read())
            items = rss_root.find('channel').findall('item')

        for it in items[:5]:
            link = it.findtext('link')
            pub_date = it.findtext('pubDate')
            title = it.findtext('title')
            guid = it.findtext('guid')
            desc = it.findtext('description')

            title_lower = (title or '').lower()
            color = 'white'
            if 'yellow' in title_lower:
                color = 'yellow'
            elif 'red' in title_lower:
                color = 'red'
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
                'areaDesc': 'Maldives Waters',
                'severity': 'Moderate' if color == 'yellow' else ('Severe' if color == 'red' else 'Minor'),
                'certainty': 'Likely'
            }

            if link:
                try:
                    alert_req = urllib.request.Request(
                        link, 
                        headers={'User-Agent': 'Mozilla/5.0 SeaVoyage/1.0'}
                    )
                    with urllib.request.urlopen(alert_req, context=ctx, timeout=3) as a_res:
                        a_xml = ET.fromstring(a_res.read())
                        ns = {'cap': 'urn:oasis:names:tc:emergency:cap:1.2'}
                        info = a_xml.find('cap:info', ns)
                        if info is not None:
                            alert_item['event'] = info.findtext('cap:event', default='', namespaces=ns) or alert_item['event']
                            alert_item['headline'] = info.findtext('cap:headline', default=title, namespaces=ns)
                            alert_item['effective'] = info.findtext('cap:effective', default='', namespaces=ns) or alert_item['effective']
                            alert_item['expires'] = info.findtext('cap:expires', default='', namespaces=ns)
                            alert_item['description'] = info.findtext('cap:description', default=desc, namespaces=ns) or alert_item['description']
                            alert_item['severity'] = info.findtext('cap:severity', default='Minor', namespaces=ns)
                            area = info.find('cap:area', ns)
                            if area is not None:
                                alert_item['areaDesc'] = area.findtext('cap:areaDesc', default='Maldives Waters', namespaces=ns)
                except Exception:
                    pass

            alerts.append(alert_item)

        _mms_cache['timestamp'] = time.time()
        _mms_cache['data'] = alerts
        print(f"[{datetime.now().strftime('%H:%M:%S')}] Maldives Meteorological Service cache updated: {len(alerts)} alerts.")
    except Exception as e:
        print(f"Error updating MMS alerts: {e}")

def mms_background_poller():
    # Initial fetch
    parse_mms_alerts()
    while True:
        time.sleep(120)
        try:
            parse_mms_alerts()
        except Exception as e:
            print("Background poller exception:", e)

class DevHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.startswith('/api/mms-alerts'):
            alerts = _mms_cache.get('data', [])
            payload = json.dumps({
                'source': 'Maldives Meteorological Service (meteorology.gov.mv)',
                'fetchedAt': datetime.now().isoformat(),
                'activeAlertsCount': len(alerts),
                'alerts': alerts
            }).encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Cache-Control', 'no-cache, must-revalidate')
            self.send_header('Content-Length', str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)
            self.wfile.flush()
            return

        # Static files handling
        return super().do_GET()

    def guess_type(self, path):
        mtype = super().guess_type(path)
        if path.endswith('.js') or path.endswith('.mjs'):
            return 'application/javascript; charset=utf-8'
        if path.endswith('.css'):
            return 'text/css; charset=utf-8'
        if path.endswith('.json'):
            return 'application/json; charset=utf-8'
        return mtype

def run():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    # Start poller thread
    poller = threading.Thread(target=mms_background_poller, daemon=True)
    poller.start()

    with socketserver.TCPServer(("", PORT), DevHTTPRequestHandler) as httpd:
        print(f"Marine Voyage Advisory server running at http://localhost:{PORT}/")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")

if __name__ == '__main__':
    run()
