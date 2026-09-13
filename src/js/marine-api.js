// Marine & Atmospheric Weather API Client (Open-Meteo & Maldives Meteorological Service)
import {
  MALDIVES_ISLANDS_DATABASE,
  MALDIVES_ATOLLS,
  MALDIVES_ATOLL_LIST,
  searchMaldivesDirectory,
  getIslandsByAtoll
} from './locations.js?v=20260912-v7';

export {
  MALDIVES_ISLANDS_DATABASE,
  MALDIVES_ATOLLS,
  MALDIVES_ATOLL_LIST,
  searchMaldivesDirectory,
  getIslandsByAtoll
};

export const MAAFILAAFUSHI_PORT = MALDIVES_ISLANDS_DATABASE[0]; // Maafilaafushi (Lhaviyani Atoll)

export const MAAFILAAFUSHI_DEVICE_LOCATION = {
  ...MAAFILAAFUSHI_PORT
};

export const HANIMAADHOO_PORT = MALDIVES_ISLANDS_DATABASE.find(i => i.island === 'Hanimaadhoo') || {
  name: 'Hanimaadhoo (Haa Dhaalu Atoll)',
  country: 'Maldives',
  latitude: 6.7464,
  longitude: 73.1706,
  atoll: 'Haa Dhaalu',
  region: 'Far Northern Atolls',
  isMaldives: true
};

export const MALDIVES_PORTS = MALDIVES_ISLANDS_DATABASE;

export const FAMOUS_PORTS = [
  ...MALDIVES_PORTS.slice(0, 5),
  { name: 'Miami & Biscayne Bay', country: 'United States', latitude: 25.7617, longitude: -80.1918, region: 'Atlantic / Caribbean' },
  { name: 'Dover Strait (English Channel)', country: 'United Kingdom', latitude: 51.1279, longitude: 1.3134, region: 'North Sea / Channel' },
  { name: 'Singapore Strait', country: 'Singapore', latitude: 1.2500, longitude: 103.8200, region: 'Malacca Strait' },
  { name: 'Honolulu & Waikiki', country: 'United States', latitude: 21.3069, longitude: -157.8583, region: 'Pacific Ocean' },
  { name: 'Sydney Harbour', country: 'Australia', latitude: -33.8568, longitude: 151.2153, region: 'Tasman Sea' },
  { name: 'Galle & Southern Coast', country: 'Sri Lanka', latitude: 6.0535, longitude: 80.2210, region: 'Indian Ocean' }
];

export const POPULAR_ROUTES = [
  {
    id: 'maafilaafushi_hanimaadhoo',
    title: 'Maafilaafushi ➔ Hanimaadhoo (Haa Dhaalu)',
    description: '84 NM northern passage from Faadhippolhu across to Hanimaadhoo International Port',
    departure: MALDIVES_PORTS[0], // Maafilaafushi
    destination: HANIMAADHOO_PORT, // Hanimaadhoo
    channelName: 'Northern Inter-Atoll Channel'
  },
  {
    id: 'maafilaafushi_dharavandhoo',
    title: 'Maafilaafushi ➔ Dharavandhoo (Baa Atoll)',
    description: '21 NM northern inter-atoll deep passage from Lhaviyani across to Baa Atoll & Hanifaru Bay',
    departure: MALDIVES_PORTS[0], // Maafilaafushi
    destination: MALDIVES_PORTS[5], // Dharavandhoo
    channelName: 'Faadhippolhu - Maalhosmadulu Channel'
  },
  {
    id: 'male_rasdhoo',
    title: 'Malé ➔ Rasdhoo (Ari Channel)',
    description: '33 NM inter-atoll deep channel crossing across the Gaadhoo / Ari Channel (kandu)',
    departure: MALDIVES_PORTS[2], // Malé
    destination: MALDIVES_PORTS[4], // Rasdhoo
    channelName: 'Ari Channel (Gaadhoo Kandu)'
  },
  {
    id: 'male_maafushi',
    title: 'Malé ➔ Maafushi (South Malé)',
    description: '15 NM lagoon & Vaadhoo channel passage to popular guest house hub',
    departure: MALDIVES_PORTS[2], // Malé
    destination: MALDIVES_PORTS[3], // Maafushi
    channelName: 'Vaadhoo Kandu'
  },
  {
    id: 'male_baa',
    title: 'Malé ➔ Dharavandhoo (Baa Atoll)',
    description: '63 NM northern passage to UNESCO Biosphere Reserve & Hanifaru Bay',
    departure: MALDIVES_PORTS[2], // Malé
    destination: MALDIVES_PORTS[5], // Dharavandhoo
    channelName: 'Kaashidhoo Channel (Kardiva Channel)'
  },
  {
    id: 'rasdhoo_ukulhas',
    title: 'Rasdhoo ➔ Ukulhas (North Ari)',
    description: '8.5 NM protected atoll rim crossing inside North Ari lagoon waters',
    departure: MALDIVES_PORTS[4], // Rasdhoo
    destination: { name: 'Ukulhas Island (North Ari)', country: 'Maldives', latitude: 4.2144, longitude: 72.8639, atoll: 'Alif Alif', region: 'Ari Atoll Rim', isMaldives: true },
    channelName: 'Ari Inner Lagoon Pass'
  },
  {
    id: 'male_dhigurah',
    title: 'Malé ➔ Dhigurah (South Ari)',
    description: '56 NM passage south-west to whale shark sanctuary waters',
    departure: MALDIVES_PORTS[2], // Malé
    destination: MALDIVES_PORTS[10], // Dhigurah
    channelName: 'Ari Ocean Pass'
  }
];

export const WMO_CODES = {
  0: { label: 'Clear Sky', icon: 'fa-solid fa-sun', severity: 'safe' },
  1: { label: 'Mainly Clear', icon: 'fa-solid fa-cloud-sun', severity: 'safe' },
  2: { label: 'Partly Cloudy', icon: 'fa-solid fa-cloud-sun', severity: 'safe' },
  3: { label: 'Overcast', icon: 'fa-solid fa-cloud', severity: 'moderate' },
  45: { label: 'Fog / Sea Mist', icon: 'fa-solid fa-smog', severity: 'warning', hazard: 'Reduced maritime visibility' },
  48: { label: 'Freezing Fog', icon: 'fa-solid fa-snowflake', severity: 'danger', hazard: 'Freezing spray & low visibility' },
  51: { label: 'Light Drizzle', icon: 'fa-solid fa-cloud-rain', severity: 'safe' },
  53: { label: 'Moderate Drizzle', icon: 'fa-solid fa-cloud-rain', severity: 'moderate' },
  55: { label: 'Dense Drizzle', icon: 'fa-solid fa-cloud-showers-heavy', severity: 'moderate' },
  61: { label: 'Slight Rain', icon: 'fa-solid fa-cloud-rain', severity: 'moderate' },
  63: { label: 'Moderate Rain', icon: 'fa-solid fa-cloud-showers-heavy', severity: 'moderate', hazard: 'Choppy seas and reduced visibility' },
  65: { label: 'Heavy Rain Squalls', icon: 'fa-solid fa-cloud-showers-water', severity: 'warning', hazard: 'Sudden heavy downpours & wave crests' },
  71: { label: 'Slight Snow Fall', icon: 'fa-solid fa-snowflake', severity: 'warning' },
  73: { label: 'Moderate Snow Fall', icon: 'fa-solid fa-snowflake', severity: 'danger' },
  75: { label: 'Heavy Snow Fall', icon: 'fa-solid fa-snowflake', severity: 'danger', hazard: 'Severe visibility hazard and icing' },
  80: { label: 'Slight Rain Showers', icon: 'fa-solid fa-cloud-rain', severity: 'moderate' },
  81: { label: 'Moderate Showers', icon: 'fa-solid fa-cloud-showers-heavy', severity: 'warning' },
  82: { label: 'Violent Showers / Squalls', icon: 'fa-solid fa-cloud-showers-water', severity: 'danger', hazard: 'Sudden violent squall winds' },
  85: { label: 'Snow Showers', icon: 'fa-solid fa-snowflake', severity: 'danger' },
  95: { label: 'Thunderstorm', icon: 'fa-solid fa-cloud-bolt', severity: 'danger', hazard: 'Dangerous lightning and unpredictable gust fronts' },
  96: { label: 'Thunderstorm with Slight Hail', icon: 'fa-solid fa-cloud-bolt', severity: 'danger', hazard: 'Severe convective squalls' },
  99: { label: 'Severe Thunderstorm with Heavy Hail', icon: 'fa-solid fa-bolt-lightning', severity: 'danger', hazard: 'High-risk sea state, gale gusts & lightning' }
};

// Fetch live Maldives Meteorological Service (MMS) alerts
export async function fetchMMSAlerts() {
  try {
    // If running in development with custom server.py backend, query dynamic endpoint;
    // on static deployment (GitHub Pages / seavoyage.info), query static snapshot
    const isLocalCustomBackend = typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') &&
      window.location.port === '5173' &&
      !window.STATIC_MODE;
    
    let res = null;
    if (isLocalCustomBackend) {
      try {
        res = await fetch('/api/mms-alerts');
      } catch (e) {
        res = null;
      }
    }
    
    if (!res || !res.ok) {
      res = await fetch('src/data/mms-alerts.json?v=20260912-v7');
    }

    if (res && res.ok) {
      const data = await res.json();
      return data.alerts || [];
    }
    return [];
  } catch (err) {
    return [];
  }
}

// Check if a coordinate is inside the Maldives archipelago
export function isCoordinateInMaldives(lat, lon) {
  const numLat = parseFloat(lat);
  const numLon = parseFloat(lon);
  return (numLat >= -1.2 && numLat <= 7.8 && numLon >= 72.0 && numLon <= 74.5);
}

// Helper to parse atolls from area description string (e.g. "From Shaviyani Atoll to Addu City")
export function parseAtollsFromArea(areaDesc) {
  if (!areaDesc) {
    return { startAtoll: 'Haa Alif Atoll', endAtoll: 'Addu City' };
  }
  const str = areaDesc.trim();
  const m = str.match(/from\s+(.+?)\s+to\s+(.+?)$/i);
  if (m) {
    let startName = m[1].replace(/\s+(atoll|city)/i, '').trim();
    let endName = m[2].replace(/\s+(atoll|city)/i, '').trim();
    return {
      startAtoll: startName + (startName.toLowerCase() === 'addu' ? ' City' : ' Atoll'),
      endAtoll: endName + (endName.toLowerCase() === 'addu' ? ' City' : ' Atoll')
    };
  }
  return { startAtoll: 'Haa Alif Atoll', endAtoll: 'Addu City' };
}

// Correlate active MMS Alert with chosen location/atoll
export function matchMMSAlert(lat, lon, locationName, alerts = []) {
  if (!isCoordinateInMaldives(lat, lon) && !locationName.toLowerCase().includes('maldives')) {
    return null;
  }

  if (!alerts || alerts.length === 0) {
    return {
      active: false,
      color: 'green',
      headline: 'No Active Severe Weather Warning',
      description: 'Normal sea conditions prevailing according to Maldives Meteorological Service.',
      areaDesc: 'From Haa Alif Atoll to Addu City (All Atolls Clear - Normal Sea Conditions)',
      startAtoll: 'Haa Alif Atoll',
      endAtoll: 'Addu City',
      inEffect: false
    };
  }

  // Get active alerts (filter out expired if date is parsable)
  const now = new Date();
  const validAlerts = alerts.filter(a => {
    if (!a.expires) return true;
    try {
      return new Date(a.expires) >= now;
    } catch (e) {
      return true;
    }
  });

  const alertsPool = validAlerts.length > 0 ? validAlerts : alerts;

  // Score alerts by severity and location relevance
  const getSeverityScore = (color) => {
    if (color === 'red') return 300;
    if (color === 'yellow') return 200;
    if (color === 'white') return 100;
    return 10;
  };

  const locLower = (locationName || '').toLowerCase();
  const scoredAlerts = alertsPool.map(alert => {
    let score = getSeverityScore(alert.color);
    const areaLower = (alert.areaDesc || '').toLowerCase();
    const descLower = (alert.description || '').toLowerCase();

    if (locLower && (areaLower.includes(locLower) || descLower.includes(locLower))) {
      score += 150;
    }

    const maldivesAtolls = [
      'kaafu', 'alif alif', 'alif dhaal', 'vaavu', 'meemu', 'faafu', 'dhaalu', 
      'thaa', 'laamu', 'gaafu alif', 'gaafu dhaalu', 'gnaviyani', 'addu', 'baa', 
      'raa', 'lhaviyani', 'noonu', 'shaviyani', 'haa alif', 'haa dhaalu'
    ];
    for (const atoll of maldivesAtolls) {
      if (locLower.includes(atoll) && (areaLower.includes(atoll) || descLower.includes(atoll))) {
        score += 120;
      }
    }

    return { alert, score };
  });

  scoredAlerts.sort((a, b) => b.score - a.score);
  const targetAlert = scoredAlerts.length > 0 ? scoredAlerts[0].alert : alerts[0];

  let areaDescription = targetAlert.areaDesc || 'From Haa Alif Atoll to Addu City (Maldives Waters)';
  if (areaDescription.toLowerCase() === 'maldives waters') {
    areaDescription = 'From Haa Alif Atoll to Addu City (Maldives Waters)';
  } else if (!areaDescription.toLowerCase().startsWith('from')) {
    areaDescription = `From ${areaDescription}`;
  }

  const atollRange = parseAtollsFromArea(areaDescription);

  return {
    active: true,
    id: targetAlert.id,
    color: targetAlert.color || 'white',
    headline: targetAlert.headline || targetAlert.title,
    event: targetAlert.event || 'Thunderstorms / Strong Winds',
    effective: targetAlert.effective || targetAlert.pubDate,
    expires: targetAlert.expires || 'Check local MMS update',
    areaDesc: areaDescription,
    startAtoll: atollRange.startAtoll,
    endAtoll: atollRange.endAtoll,
    description: targetAlert.description || 'Precautionary sea travel advisory in effect.',
    link: targetAlert.link || 'https://meteorology.gov.mv'
  };
}

export async function searchLocations(query) {
  if (!query || query.trim().length < 2) return [];
  try {
    // 1. First check matching Maldivian islands from comprehensive in-memory database
    const localMaldivesMatches = searchMaldivesDirectory(query, 12);

    let apiResults = [];
    try {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query.trim())}&count=6&language=en&format=json`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        apiResults = (data.results || []).map(r => ({
          name: r.name,
          country: r.country || '',
          admin1: r.admin1 || '',
          latitude: r.latitude,
          longitude: r.longitude,
          timezone: r.timezone,
          isMaldives: r.country === 'Maldives' || isCoordinateInMaldives(r.latitude, r.longitude)
        }));
      }
    } catch (e) {
      // Ignore geocoding network fail, localMaldivesMatches will serve results
    }

    // Merge without duplicates
    const combined = [...localMaldivesMatches];
    apiResults.forEach(r => {
      if (!combined.some(c => Math.abs(c.latitude - r.latitude) < 0.05 && Math.abs(c.longitude - r.longitude) < 0.05)) {
        combined.push(r);
      }
    });

    return combined;
  } catch (err) {
    console.error("Location search error:", err);
    return searchMaldivesDirectory(query, 10);
  }
}

export async function fetchMarineAndWeatherData(lat, lon) {
  const roundedLat = parseFloat(lat).toFixed(4);
  const roundedLon = parseFloat(lon).toFixed(4);

  const marineUrl = `https://marine-api.open-meteo.com/v1/marine?latitude=${roundedLat}&longitude=${roundedLon}&hourly=wave_height,wave_direction,wave_period,wind_wave_height,wind_wave_direction,wind_wave_period,swell_wave_height,swell_wave_direction,swell_wave_period,ocean_current_velocity,ocean_current_direction,sea_surface_temperature&daily=wave_height_max,wave_direction_dominant,wave_period_max,wind_wave_height_max,swell_wave_height_max&past_days=4&forecast_days=14&timezone=auto`;
  const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${roundedLat}&longitude=${roundedLon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,visibility,surface_pressure,pressure_msl,uv_index&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,weather_code,wind_speed_10m,wind_gusts_10m,wind_direction_10m,visibility,surface_pressure,pressure_msl,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,uv_index_max&past_days=4&forecast_days=14&wind_speed_unit=kn&timezone=auto`;

  try {
    const [marineRes, forecastRes] = await Promise.all([
      fetch(marineUrl).catch(e => ({ ok: false, error: e })),
      fetch(forecastUrl)
    ]);

    if (!forecastRes.ok) {
      throw new Error(`Weather Forecast API failed with status ${forecastRes.status}`);
    }

    const forecastData = await forecastRes.json();
    let marineData = null;

    if (marineRes && marineRes.ok) {
      marineData = await marineRes.json();
    } else {
      console.warn("Marine API returned unavailable:", marineRes?.error);
    }

    return compileMarineReport(roundedLat, roundedLon, forecastData, marineData);
  } catch (err) {
    console.error("Marine & Weather data fetch failed:", err);
    throw err;
  }
}

function compileMarineReport(lat, lon, forecast, marine) {
  const current = forecast.current || {};
  const hourlyF = forecast.hourly || {};
  const dailyF = forecast.daily || {};

  const hourlyM = marine?.hourly || {};
  const dailyM = marine?.daily || {};

  const hasWaveData = Array.isArray(hourlyM.wave_height) && hourlyM.wave_height.some(v => v !== null);

  const now = new Date();
  const currentIsoPrefix = now.toISOString().slice(0, 13);
  let currentHourIdx = 0;
  if (hourlyF.time) {
    const idx = hourlyF.time.findIndex(t => t.startsWith(currentIsoPrefix));
    if (idx !== -1) currentHourIdx = idx;
  }

  const todayIso = now.toISOString().slice(0, 10);
  let todayIdx = 0;
  if (dailyF.time) {
    const foundIdx = dailyF.time.indexOf(todayIso);
    if (foundIdx !== -1) {
      todayIdx = foundIdx;
    } else {
      const altIdx = dailyF.time.findIndex(t => t >= todayIso);
      todayIdx = altIdx !== -1 ? altIdx : 0;
    }
  }

  // 1. Waves, Swells & Wind Waves
  const currentWaveHeight = hasWaveData && hourlyM.wave_height[currentHourIdx] !== null 
    ? hourlyM.wave_height[currentHourIdx] 
    : (hasWaveData ? (hourlyM.wave_height.find(v => v !== null) || 0) : 0.6);

  const currentWavePeriod = hasWaveData && hourlyM.wave_period ? hourlyM.wave_period[currentHourIdx] : 6;
  const currentWaveDirection = hasWaveData && hourlyM.wave_direction ? hourlyM.wave_direction[currentHourIdx] : null;

  const currentSwellHeight = hasWaveData && hourlyM.swell_wave_height ? hourlyM.swell_wave_height[currentHourIdx] : (currentWaveHeight * 0.7);
  const currentSwellPeriod = hasWaveData && hourlyM.swell_wave_period ? hourlyM.swell_wave_period[currentHourIdx] : 8;
  const currentSwellDirection = hasWaveData && hourlyM.swell_wave_direction ? hourlyM.swell_wave_direction[currentHourIdx] : currentWaveDirection;

  const currentWindWaveHeight = hasWaveData && hourlyM.wind_wave_height ? hourlyM.wind_wave_height[currentHourIdx] : (currentWaveHeight * 0.35);
  const currentWindWavePeriod = hasWaveData && hourlyM.wind_wave_period ? hourlyM.wind_wave_period[currentHourIdx] : 3;
  const currentWindWaveDirection = hasWaveData && hourlyM.wind_wave_direction ? hourlyM.wind_wave_direction[currentHourIdx] : currentWaveDirection;

  // 2. Sea Surface Temperature (°C)
  const currentSeaTemp = hasWaveData && hourlyM.sea_surface_temperature && hourlyM.sea_surface_temperature[currentHourIdx] !== null
    ? hourlyM.sea_surface_temperature[currentHourIdx]
    : (hasWaveData && hourlyM.sea_surface_temperature ? (hourlyM.sea_surface_temperature.find(v => v !== null) || 29.5) : 29.5);

  // 3. Ocean Sea Current (Velocity & Direction)
  const rawCurrentVel = hasWaveData && hourlyM.ocean_current_velocity && hourlyM.ocean_current_velocity[currentHourIdx] !== null
    ? hourlyM.ocean_current_velocity[currentHourIdx]
    : (hasWaveData && hourlyM.ocean_current_velocity ? (hourlyM.ocean_current_velocity.find(v => v !== null) || 0.8) : 0.8);
  const oceanCurrentKnots = parseFloat((rawCurrentVel / 1.852).toFixed(1));
  const oceanCurrentKmh = parseFloat(rawCurrentVel.toFixed(1));
  const oceanCurrentDir = hasWaveData && hourlyM.ocean_current_direction && hourlyM.ocean_current_direction[currentHourIdx] !== null
    ? hourlyM.ocean_current_direction[currentHourIdx]
    : 90;

  // 4. Atmospheric Parameters
  const windSpeedKnots = current.wind_speed_10m ?? 0;
  const windGustsKnots = current.wind_gusts_10m ?? windSpeedKnots;
  const windDirection = current.wind_direction_10m ?? 0;
  const weatherCode = current.weather_code ?? 0;
  const tempC = current.temperature_2m ?? 28;
  const visibilityMeters = current.visibility ?? 10000;
  const humidityPct = current.relative_humidity_2m ?? (hourlyF.relative_humidity_2m ? hourlyF.relative_humidity_2m[currentHourIdx] : 80);
  const precipitationMm = current.precipitation ?? (hourlyF.precipitation ? hourlyF.precipitation[currentHourIdx] : 0);
  const precipProb = hourlyF.precipitation_probability ? (hourlyF.precipitation_probability[currentHourIdx] || 0) : 0;
  
  const surfacePressure = current.surface_pressure ?? current.pressure_msl ?? (hourlyF.surface_pressure ? hourlyF.surface_pressure[currentHourIdx] : 1011.5);
  const pressureMsl = current.pressure_msl ?? current.surface_pressure ?? 1012.0;

  // Pressure tendency (rising / falling / steady based on 3h delta)
  let pressureTrend = 'Steady';
  if (hourlyF.surface_pressure && currentHourIdx >= 3) {
    const pPrev = hourlyF.surface_pressure[currentHourIdx - 3];
    const diff = surfacePressure - pPrev;
    if (diff > 0.8) pressureTrend = 'Rising';
    else if (diff < -0.8) pressureTrend = 'Falling';
  }

  // 5. Solar UV Index
  const uvVal = current.uv_index ?? (hourlyF.uv_index ? (hourlyF.uv_index[currentHourIdx] ?? 0) : 0);
  const uvIndex = parseFloat(Number(uvVal).toFixed(1));
  let uvCategory = 'Low';
  let uvColor = 'var(--sea-green)';
  if (uvIndex >= 11) { uvCategory = 'Extreme'; uvColor = '#9333ea'; }
  else if (uvIndex >= 8) { uvCategory = 'Very High'; uvColor = 'var(--storm-red)'; }
  else if (uvIndex >= 6) { uvCategory = 'High'; uvColor = '#f97316'; }
  else if (uvIndex >= 3) { uvCategory = 'Moderate'; uvColor = '#eab308'; }

  // 6. 24-Hour Timeline Compilation
  const timeline = [];
  const hoursCount = Math.min(24, (hourlyF.time || []).length - currentHourIdx);
  
  for (let i = 0; i < hoursCount; i++) {
    const tIdx = currentHourIdx + i;
    const timeStr = hourlyF.time[tIdx];
    const waveH = hasWaveData && hourlyM.wave_height ? hourlyM.wave_height[tIdx] : 0.6;
    const wPeriod = hasWaveData && hourlyM.wave_period ? hourlyM.wave_period[tIdx] : 6;
    const wSpeed = hourlyF.wind_speed_10m ? hourlyF.wind_speed_10m[tIdx] : windSpeedKnots;
    const wGusts = hourlyF.wind_gusts_10m ? hourlyF.wind_gusts_10m[tIdx] : wSpeed;
    const wDir = hourlyF.wind_direction_10m ? hourlyF.wind_direction_10m[tIdx] : 0;
    const code = hourlyF.weather_code ? hourlyF.weather_code[tIdx] : 0;
    const vis = hourlyF.visibility ? hourlyF.visibility[tIdx] : 10000;

    const swellH = hasWaveData && hourlyM.swell_wave_height ? hourlyM.swell_wave_height[tIdx] : (waveH * 0.7);
    const swellP = hasWaveData && hourlyM.swell_wave_period ? hourlyM.swell_wave_period[tIdx] : 8;
    const swellDir = hasWaveData && hourlyM.swell_wave_direction ? hourlyM.swell_wave_direction[tIdx] : null;
    const waveDir = hasWaveData && hourlyM.wave_direction ? hourlyM.wave_direction[tIdx] : null;

    const windWaveH = hasWaveData && hourlyM.wind_wave_height ? hourlyM.wind_wave_height[tIdx] : (waveH * 0.35);
    const windWaveP = hasWaveData && hourlyM.wind_wave_period ? hourlyM.wind_wave_period[tIdx] : 3;
    const windWaveDir = hasWaveData && hourlyM.wind_wave_direction ? hourlyM.wind_wave_direction[tIdx] : null;

    const seaTemp = hasWaveData && hourlyM.sea_surface_temperature ? (hourlyM.sea_surface_temperature[tIdx] || currentSeaTemp) : currentSeaTemp;
    const curVelKmh = hasWaveData && hourlyM.ocean_current_velocity ? (hourlyM.ocean_current_velocity[tIdx] || rawCurrentVel) : rawCurrentVel;
    const curVelKn = parseFloat((curVelKmh / 1.852).toFixed(1));
    const curDir = hasWaveData && hourlyM.ocean_current_direction ? (hourlyM.ocean_current_direction[tIdx] || oceanCurrentDir) : oceanCurrentDir;

    const press = hourlyF.surface_pressure ? hourlyF.surface_pressure[tIdx] : surfacePressure;
    const hum = hourlyF.relative_humidity_2m ? hourlyF.relative_humidity_2m[tIdx] : humidityPct;
    const prec = hourlyF.precipitation ? hourlyF.precipitation[tIdx] : 0;
    const precP = hourlyF.precipitation_probability ? (hourlyF.precipitation_probability[tIdx] || 0) : 0;
    const uvValH = hourlyF.uv_index ? (hourlyF.uv_index[tIdx] || 0) : 0;

    timeline.push({
      time: timeStr,
      displayTime: formatTimeLabel(timeStr),
      waveHeight: waveH,
      wavePeriod: wPeriod,
      waveDirection: waveDir,
      swellHeight: swellH,
      swellPeriod: swellP,
      swellDirection: swellDir,
      windWaveHeight: windWaveH,
      windWavePeriod: windWaveP,
      windWaveDirection: windWaveDir,
      seaTemperature: seaTemp,
      oceanCurrentSpeedKnots: curVelKn,
      oceanCurrentSpeedKmh: curVelKmh,
      oceanCurrentDirection: curDir,
      surfacePressure: press,
      humidity: hum,
      precipitation: prec,
      precipitationProbability: precP,
      uvIndex: uvValH,
      windSpeed: wSpeed,
      windGusts: wGusts,
      windDirection: wDir,
      weatherCode: code,
      visibility: vis
    });
  }

  return {
    latitude: lat,
    longitude: lon,
    timezone: forecast.timezone,
    hasMarineData: hasWaveData,
    current: {
      waveHeight: currentWaveHeight,
      wavePeriod: currentWavePeriod,
      waveDirection: currentWaveDirection,
      swellHeight: currentSwellHeight,
      swellPeriod: currentSwellPeriod,
      swellDirection: currentSwellDirection,
      windWaveHeight: currentWindWaveHeight,
      windWavePeriod: currentWindWavePeriod,
      windWaveDirection: currentWindWaveDirection,
      seaTemperature: currentSeaTemp,
      oceanCurrentSpeedKnots: oceanCurrentKnots,
      oceanCurrentSpeedKmh: oceanCurrentKmh,
      oceanCurrentDirection: oceanCurrentDir,
      surfacePressure: surfacePressure,
      pressureMsl: pressureMsl,
      pressureTrend: pressureTrend,
      humidity: humidityPct,
      precipitation: precipitationMm,
      precipitationProbability: precipProb,
      uvIndex: uvIndex,
      uvCategory: uvCategory,
      uvColor: uvColor,
      windSpeed: windSpeedKnots,
      windGusts: windGustsKnots,
      windDirection: windDirection,
      weatherCode: weatherCode,
      temperature: tempC,
      visibility: visibilityMeters,
      isDay: current.is_day === 1
    },
    daily: {
      maxWaveHeight: dailyM.wave_height_max ? (dailyM.wave_height_max[todayIdx] ?? dailyM.wave_height_max[0] ?? 1.2) : 1.2,
      maxWindSpeed: dailyF.wind_speed_10m_max ? (dailyF.wind_speed_10m_max[todayIdx] ?? dailyF.wind_speed_10m_max[0] ?? windSpeedKnots) : windSpeedKnots,
      maxWindGusts: dailyF.wind_gusts_10m_max ? (dailyF.wind_gusts_10m_max[todayIdx] ?? dailyF.wind_gusts_10m_max[0] ?? windGustsKnots) : windGustsKnots,
      maxUvIndex: dailyF.uv_index_max ? (dailyF.uv_index_max[todayIdx] ?? dailyF.uv_index_max[0] ?? 11) : 11
    },
    timeline,
    tenDays: compileTenDayForecast(forecast, marine),
    allDailyRecords: compileAllDailyRecords(forecast, marine)
  };
}

export function compileDailyRecord(dayDataIdx, todayIdx, dailyF, hourlyF, dailyM, hourlyM, hasWaveData) {
  const dateStr = dailyF.time[dayDataIdx];
  let dayDate;
  try {
    dayDate = new Date(dateStr + 'T12:00:00');
  } catch (e) {
    dayDate = new Date();
  }

  const dayOffset = dayDataIdx - todayIdx;
  let dayLabel = '';
  if (dayOffset === 0) dayLabel = 'Today';
  else if (dayOffset === 1) dayLabel = 'Tomorrow';
  else if (dayOffset === -1) dayLabel = 'Yesterday';
  else dayLabel = dayDate.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

  const fullDate = dayDate.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const weekdayName = dayDate.toLocaleDateString([], { weekday: 'long' });

  const weatherCode = dailyF.weather_code ? dailyF.weather_code[dayDataIdx] : 0;
  const weatherCondition = WMO_CODES[weatherCode] || { label: 'Clear Sky', icon: 'fa-solid fa-sun', severity: 'safe' };

  const tempMax = dailyF.temperature_2m_max ? Math.round(dailyF.temperature_2m_max[dayDataIdx]) : 29;
  const tempMin = dailyF.temperature_2m_min ? Math.round(dailyF.temperature_2m_min[dayDataIdx]) : 26;

  const windSpeedMax = dailyF.wind_speed_10m_max ? Math.round(dailyF.wind_speed_10m_max[dayDataIdx]) : 12;
  const windGustsMax = dailyF.wind_gusts_10m_max ? Math.round(dailyF.wind_gusts_10m_max[dayDataIdx]) : windSpeedMax;
  const windDirectionDominant = dailyF.wind_direction_10m_dominant ? dailyF.wind_direction_10m_dominant[dayDataIdx] : 0;
  const windCardinal = getWindDirectionCardinal(windDirectionDominant);

  const waveHeightMax = hasWaveData && dailyM.wave_height_max && dailyM.wave_height_max[dayDataIdx] !== null
    ? parseFloat(dailyM.wave_height_max[dayDataIdx].toFixed(2))
    : (hasWaveData ? 0.9 : 0.6);
  const wavePeriodMax = hasWaveData && dailyM.wave_period_max && dailyM.wave_period_max[dayDataIdx] !== null
    ? Math.round(dailyM.wave_period_max[dayDataIdx])
    : 7;
  const waveDirectionDominant = hasWaveData && dailyM.wave_direction_dominant && dailyM.wave_direction_dominant[dayDataIdx] !== null
    ? dailyM.wave_direction_dominant[dayDataIdx]
    : 160;
  const waveCardinal = getWindDirectionCardinal(waveDirectionDominant);

  const swellHeightMax = hasWaveData && dailyM.swell_wave_height_max && dailyM.swell_wave_height_max[dayDataIdx] !== null
    ? parseFloat(dailyM.swell_wave_height_max[dayDataIdx].toFixed(2))
    : parseFloat((waveHeightMax * 0.7).toFixed(2));
  const windWaveHeightMax = hasWaveData && dailyM.wind_wave_height_max && dailyM.wind_wave_height_max[dayDataIdx] !== null
    ? parseFloat(dailyM.wind_wave_height_max[dayDataIdx].toFixed(2))
    : parseFloat((waveHeightMax * 0.35).toFixed(2));

  const precipitationSum = dailyF.precipitation_sum ? parseFloat(dailyF.precipitation_sum[dayDataIdx].toFixed(1)) : 0;
  const precipitationProbabilityMax = dailyF.precipitation_probability_max ? dailyF.precipitation_probability_max[dayDataIdx] : 0;

  const uvVal = dailyF.uv_index_max ? dailyF.uv_index_max[dayDataIdx] : 9;
  const uvIndexMax = parseFloat(Number(uvVal).toFixed(1));
  let uvCategory = 'Low';
  let uvColor = 'var(--sea-green)';
  if (uvIndexMax >= 11) { uvCategory = 'Extreme'; uvColor = '#9333ea'; }
  else if (uvIndexMax >= 8) { uvCategory = 'Very High'; uvColor = 'var(--storm-red)'; }
  else if (uvIndexMax >= 6) { uvCategory = 'High'; uvColor = '#f97316'; }
  else if (uvIndexMax >= 3) { uvCategory = 'Moderate'; uvColor = '#eab308'; }

  // Aggregate this day's 24 hours
  let startHourIdx = -1;
  if (hourlyF.time) {
    startHourIdx = hourlyF.time.findIndex(t => t.startsWith(dateStr));
  }
  if (startHourIdx === -1) {
    startHourIdx = dayDataIdx * 24;
  }

  const hours = [];
  let sumCurrentKnots = 0;
  let maxCurrentKnots = 0;
  let maxCurrentKmh = 0;
  let dominantCurrentDir = 90;
  let sumWaveH = 0;
  let countWaveH = 0;
  let sumWindSpd = 0;
  let countWindSpd = 0;
  let minVisibility = 20000;
  let sumSst = 0;
  let countSst = 0;
  let sumPressure = 0;
  let countPressure = 0;

  for (let h = 0; h < 24; h++) {
    const idx = startHourIdx + h;
    if (!hourlyF.time || idx >= hourlyF.time.length) break;

    const timeStr = hourlyF.time[idx];
    const hourNum = parseInt(timeStr.slice(11, 13), 10);
    const isDaylight = hourNum >= 6 && hourNum <= 18;

    const waveH = hasWaveData && hourlyM.wave_height && hourlyM.wave_height[idx] !== null
      ? hourlyM.wave_height[idx]
      : 0.6;
    sumWaveH += waveH;
    countWaveH++;

    const wSpeed = hourlyF.wind_speed_10m ? hourlyF.wind_speed_10m[idx] : 10;
    sumWindSpd += wSpeed;
    countWindSpd++;

    const wGusts = hourlyF.wind_gusts_10m ? hourlyF.wind_gusts_10m[idx] : wSpeed;
    const wDir = hourlyF.wind_direction_10m ? hourlyF.wind_direction_10m[idx] : 0;
    const code = hourlyF.weather_code ? hourlyF.weather_code[idx] : 0;
    const vis = hourlyF.visibility ? hourlyF.visibility[idx] : 10000;
    if (vis < minVisibility) minVisibility = vis;

    const sst = hasWaveData && hourlyM.sea_surface_temperature && hourlyM.sea_surface_temperature[idx] !== null
      ? hourlyM.sea_surface_temperature[idx]
      : 29.5;
    sumSst += sst;
    countSst++;

    const press = hourlyF.surface_pressure ? hourlyF.surface_pressure[idx] : 1011.5;
    sumPressure += press;
    countPressure++;

    // Ocean current
    const curVelKmh = hasWaveData && hourlyM.ocean_current_velocity && hourlyM.ocean_current_velocity[idx] !== null
      ? hourlyM.ocean_current_velocity[idx]
      : 1.0;
    const curKnots = parseFloat((curVelKmh / 1.852).toFixed(1));
    if (curKnots > maxCurrentKnots) {
      maxCurrentKnots = curKnots;
      maxCurrentKmh = parseFloat(curVelKmh.toFixed(1));
    }
    sumCurrentKnots += curKnots;
    if (h === 12 && hourlyM.ocean_current_direction && hourlyM.ocean_current_direction[idx] !== null) {
      dominantCurrentDir = hourlyM.ocean_current_direction[idx];
    }

    const prec = hourlyF.precipitation ? hourlyF.precipitation[idx] : 0;
    const precP = hourlyF.precipitation_probability ? hourlyF.precipitation_probability[idx] : 0;
    const uvH = hourlyF.uv_index ? hourlyF.uv_index[idx] : 0;

    hours.push({
      time: timeStr,
      displayTime: formatTimeLabel(timeStr),
      hourNum,
      isDaylight,
      waveHeight: waveH,
      wavePeriod: hasWaveData && hourlyM.wave_period ? hourlyM.wave_period[idx] : 6,
      waveDirection: hasWaveData && hourlyM.wave_direction ? hourlyM.wave_direction[idx] : null,
      swellHeight: hasWaveData && hourlyM.swell_wave_height ? hourlyM.swell_wave_height[idx] : (waveH * 0.7),
      windWaveHeight: hasWaveData && hourlyM.wind_wave_height ? hourlyM.wind_wave_height[idx] : (waveH * 0.35),
      windSpeed: wSpeed,
      windGusts: wGusts,
      windDirection: wDir,
      windCardinal: getWindDirectionCardinal(wDir),
      oceanCurrentSpeedKnots: curKnots,
      oceanCurrentSpeedKmh: parseFloat(curVelKmh.toFixed(1)),
      oceanCurrentDirection: hasWaveData && hourlyM.ocean_current_direction ? hourlyM.ocean_current_direction[idx] : dominantCurrentDir,
      precipitation: prec,
      precipitationProbability: precP,
      visibility: vis,
      surfacePressure: press,
      uvIndex: uvH,
      weatherCode: code
    });
  }

  const waveHeightAvg = countWaveH > 0 ? parseFloat((sumWaveH / countWaveH).toFixed(2)) : waveHeightMax;
  const windSpeedAvg = countWindSpd > 0 ? Math.round(sumWindSpd / countWindSpd) : Math.round(windSpeedMax * 0.75);
  const oceanCurrentSpeedAvgKnots = hours.length > 0 ? parseFloat((sumCurrentKnots / hours.length).toFixed(1)) : 0.8;
  const seaTemperature = countSst > 0 ? parseFloat((sumSst / countSst).toFixed(1)) : 29.5;
  const surfacePressureAvg = countPressure > 0 ? parseFloat((sumPressure / countPressure).toFixed(1)) : 1011.5;
  const visibilityMinKm = parseFloat((minVisibility / 1000).toFixed(1));
  const visibilityMinNm = parseFloat((minVisibility * 0.000539957).toFixed(1));

  return {
    dayIndex: dayOffset,
    rawDayIndex: dayDataIdx,
    date: dateStr,
    dayLabel,
    fullDate,
    weekdayName,
    weatherCode,
    weatherCondition,
    tempMax,
    tempMin,
    windSpeedAvg,
    windSpeedMax,
    windGustsMax,
    windDirectionDominant,
    windCardinal,
    waveHeightAvg,
    waveHeightMax,
    wavePeriodMax,
    waveDirectionDominant,
    waveCardinal,
    swellHeightMax,
    windWaveHeightMax,
    oceanCurrentSpeedMaxKnots: maxCurrentKnots || 0.8,
    oceanCurrentSpeedAvgKnots,
    oceanCurrentSpeedKmh: maxCurrentKmh || 1.5,
    oceanCurrentDirection: dominantCurrentDir,
    oceanCurrentCardinal: getWindDirectionCardinal(dominantCurrentDir),
    seaTemperature,
    precipitationSum,
    precipitationProbabilityMax,
    visibilityMinKm,
    visibilityMinNm,
    surfacePressureAvg,
    uvIndexMax,
    uvCategory,
    uvColor,
    hours
  };
}

export function compileTenDayForecast(forecast, marine) {
  const dailyF = forecast?.daily || {};
  const hourlyF = forecast?.hourly || {};
  const dailyM = marine?.daily || {};
  const hourlyM = marine?.hourly || {};

  const todayIso = (new Date()).toISOString().slice(0, 10);
  let todayIdx = 0;
  if (dailyF.time) {
    const foundIdx = dailyF.time.indexOf(todayIso);
    if (foundIdx !== -1) {
      todayIdx = foundIdx;
    } else {
      const altIdx = dailyF.time.findIndex(t => t >= todayIso);
      todayIdx = altIdx !== -1 ? altIdx : 0;
    }
  }

  const totalDays = Math.min(10, (dailyF.time || []).length - todayIdx);
  const tenDays = [];
  const hasWaveData = Array.isArray(hourlyM.wave_height) && hourlyM.wave_height.some(v => v !== null);

  for (let d = 0; d < totalDays; d++) {
    const rec = compileDailyRecord(todayIdx + d, todayIdx, dailyF, hourlyF, dailyM, hourlyM, hasWaveData);
    rec.dayIndex = d; // for Tab 2 compatibility, dayIndex is 0 to 9
    tenDays.push(rec);
  }
  return tenDays;
}

export function compileAllDailyRecords(forecast, marine) {
  const dailyF = forecast?.daily || {};
  const hourlyF = forecast?.hourly || {};
  const dailyM = marine?.daily || {};
  const hourlyM = marine?.hourly || {};

  const todayIso = (new Date()).toISOString().slice(0, 10);
  let todayIdx = 0;
  if (dailyF.time) {
    const foundIdx = dailyF.time.indexOf(todayIso);
    if (foundIdx !== -1) {
      todayIdx = foundIdx;
    } else {
      const altIdx = dailyF.time.findIndex(t => t >= todayIso);
      todayIdx = altIdx !== -1 ? altIdx : 0;
    }
  }

  const totalDays = (dailyF.time || []).length;
  const allRecords = [];
  const hasWaveData = Array.isArray(hourlyM.wave_height) && hourlyM.wave_height.some(v => v !== null);

  for (let i = 0; i < totalDays; i++) {
    allRecords.push(compileDailyRecord(i, todayIdx, dailyF, hourlyF, dailyM, hourlyM, hasWaveData));
  }
  return allRecords;
}

function formatTimeLabel(isoStr) {
  try {
    const d = new Date(isoStr);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch (e) {
    return isoStr.slice(11, 16);
  }
}

export function getWindDirectionCardinal(degrees) {
  const cardinals = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(((degrees % 360) / 22.5)) % 16;
  return cardinals[index];
}

/**
 * Computes Great-Circle Distance between two points in Nautical Miles (NM) and Kilometers (km)
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R_km = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const km = R_km * c;
  const nm = km * 0.539957;
  return {
    km: parseFloat(km.toFixed(1)),
    nm: parseFloat(nm.toFixed(1)),
    kilometers: parseFloat(km.toFixed(1)),
    nauticalMiles: parseFloat(nm.toFixed(1))
  };
}

/**
 * Computes Initial True Course Bearing (0° to 360°) from Departure to Destination
 */
export function calculateBearing(lat1, lon1, lat2, lon2) {
  const phi1 = lat1 * Math.PI / 180;
  const phi2 = lat2 * Math.PI / 180;
  const deltaLambda = (lon2 - lon1) * Math.PI / 180;

  const y = Math.sin(deltaLambda) * Math.cos(phi2);
  const x = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLambda);
  let theta = Math.atan2(y, x) * 180 / Math.PI;
  theta = (theta + 360) % 360;

  const deg = Math.round(theta);
  return {
    bearing: deg,
    cardinal: getWindDirectionCardinal(deg),
    label: `${deg}° ${getWindDirectionCardinal(deg)}`
  };
}

/**
 * Computes Geographic Midpoint between Departure and Destination (Channel Crossing Waypoint)
 */
export function calculateMidpoint(lat1, lon1, lat2, lon2) {
  const phi1 = lat1 * Math.PI / 180;
  const lambda1 = lon1 * Math.PI / 180;
  const phi2 = lat2 * Math.PI / 180;
  const deltaLambda = (lon2 - lon1) * Math.PI / 180;

  const Bx = Math.cos(phi2) * Math.cos(deltaLambda);
  const By = Math.cos(phi2) * Math.sin(deltaLambda);

  const phi3 = Math.atan2(
    Math.sin(phi1) + Math.sin(phi2),
    Math.sqrt((Math.cos(phi1) + Bx) * (Math.cos(phi1) + Bx) + By * By)
  );
  const lambda3 = lambda1 + Math.atan2(By, Math.cos(phi1) + Bx);

  return {
    latitude: parseFloat((phi3 * 180 / Math.PI).toFixed(4)),
    longitude: parseFloat((lambda3 * 180 / Math.PI).toFixed(4))
  };
}

/**
 * Classifies relative wave/wind aspect to vessel passage heading
 * Head Sea (0-45°): vessel slams directly into waves
 * Beam Sea (45-135°): waves hit side of boat, causing heavy roll
 * Following Sea (135-180°): waves push stern forward
 */
export function getRelativeSeaAspect(courseBearing, waveOrWindDirection) {
  if (waveOrWindDirection === null || waveOrWindDirection === undefined) {
    return { 
      type: 'following', 
      label: 'Following Sea / Fair Winds', 
      desc: 'Mild wave action on vessel stern', 
      angle: 0, 
      severity: 'safe',
      icon: 'fa-solid fa-arrow-down'
    };
  }
  let diff = Math.abs(courseBearing - waveOrWindDirection) % 360;
  if (diff > 180) diff = 360 - diff;

  if (diff <= 45) {
    return {
      type: 'head',
      label: 'Head Sea / Opposing Winds',
      desc: 'Waves hitting bow directly. Severe hull slamming, heavy spray, reduced safe speed limit.',
      angle: Math.round(diff),
      severity: 'danger',
      icon: 'fa-solid fa-arrow-up'
    };
  } else if (diff <= 135) {
    return {
      type: 'beam',
      label: 'Beam Sea / Cross Swell',
      desc: 'Swells rolling across the beam. High cyclic roll resonance, broaching risk for displacement hulls.',
      angle: Math.round(diff),
      severity: 'caution',
      icon: 'fa-solid fa-arrows-left-right'
    };
  } else {
    return {
      type: 'following',
      label: 'Following Sea / Fair Winds',
      desc: 'Swells and winds pushing from astern. Smoother transit angle; maintain watch for surfing in high swells.',
      angle: Math.round(diff),
      severity: 'safe',
      icon: 'fa-solid fa-arrow-down'
    };
  }
}
