// Nautical Astronomical Tide, Lunar Phase & Optimal Window Engine
import { getRelativeSeaAspect } from './marine-api.js?v=20260912-v5';
import { TIDE_STATIONS, HARMONIC_REFERENCE_EPOCH } from './tide-harmonic-constants.js?v=20260912-v5';

/**
 * Calculates accurate Lunar Phase, Illumination, and Spring/Neap Tide Classification
 */
export function getMoonPhaseInfo(date = new Date()) {
  // Reference New Moon: 2000-01-06 18:14 UTC
  const refNewMoon = new Date(Date.UTC(2000, 0, 6, 18, 14, 0));
  const synodicMonth = 29.53058867; // days
  const diffDays = (date.getTime() - refNewMoon.getTime()) / (1000 * 60 * 60 * 24);
  const phase = ((diffDays % synodicMonth) + synodicMonth) % synodicMonth / synodicMonth; // 0.0 to 1.0

  // Illumination percentage (0% to 100%)
  const illumination = Math.round(((1 - Math.cos(phase * 2 * Math.PI)) / 2) * 100);

  let phaseName = 'New Moon';
  let phaseIcon = 'fa-regular fa-circle';
  let tideType = 'Spring Tides';
  let tideImpact = 'Maximum tidal range. Strongest tidal currents flowing through atoll channels and reef passes.';

  if (phase < 0.03 || phase >= 0.97) {
    phaseName = 'New Moon';
    phaseIcon = 'fa-regular fa-circle';
    tideType = 'Spring Tides (High Range)';
    tideImpact = 'Moon and Sun aligned. Strongest tidal flow through channels (kandu). Expect significant standing waves if wind opposes current.';
  } else if (phase < 0.22) {
    phaseName = 'Waxing Crescent';
    phaseIcon = 'fa-solid fa-moon';
    tideType = 'Moderate Tides';
    tideImpact = 'Moderate tidal currents. Good water exchange with manageable channel turbulence.';
  } else if (phase < 0.28) {
    phaseName = 'First Quarter';
    phaseIcon = 'fa-solid fa-circle-half-stroke';
    tideType = 'Neap Tides (Low Range)';
    tideImpact = 'Minimum tidal range. Weakest tidal currents through channels. Safest period for speedboats and small craft crossing atoll reef passes.';
  } else if (phase < 0.47) {
    phaseName = 'Waxing Gibbous';
    phaseIcon = 'fa-solid fa-moon';
    tideType = 'Moderate Tides';
    tideImpact = 'Increasing tidal amplitude. Channel currents building towards full moon.';
  } else if (phase < 0.53) {
    phaseName = 'Full Moon';
    phaseIcon = 'fa-solid fa-circle';
    tideType = 'Spring Tides (High Range)';
    tideImpact = 'Full gravitational alignment! Strongest tidal surge and currents of the month. Watch for heavy water exchange through outer passes.';
  } else if (phase < 0.72) {
    phaseName = 'Waning Gibbous';
    phaseIcon = 'fa-solid fa-moon';
    tideType = 'Moderate Tides';
    tideImpact = 'Tidal range decreasing from spring peak. Good night visibility under strong moonlight.';
  } else if (phase < 0.78) {
    phaseName = 'Last Quarter';
    phaseIcon = 'fa-solid fa-circle-half-stroke';
    tideType = 'Neap Tides (Low Range)';
    tideImpact = 'Neap tide period. Minimal water velocity across passes. Very favorable for lagoon and channel navigation.';
  } else {
    phaseName = 'Waning Crescent';
    phaseIcon = 'fa-solid fa-moon';
    tideType = 'Approaching Spring Tides';
    tideImpact = 'Tidal amplitude rising. High water variance expected.';
  }

  // Days until next Full or New moon
  let daysToSpring = 0;
  if (phase <= 0.5) {
    daysToSpring = Math.round((0.5 - phase) * synodicMonth);
  } else {
    daysToSpring = Math.round((1.0 - phase) * synodicMonth);
  }

  return {
    phase: parseFloat(phase.toFixed(3)),
    phaseName,
    phaseIcon,
    illumination,
    tideType,
    tideImpact,
    daysToSpring
  };
}

/**
 * Computes great-circle distance in kilometers
 */
function haversineDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371.0;
  const dLat = (lat2 - lat1) * Math.PI / 180.0;
  const dLon = (lon2 - lon1) * Math.PI / 180.0;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180.0) * Math.cos(lat2 * Math.PI / 180.0) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * Spatially Interpolates 20 Harmonic Tidal Constituents across the Maldives
 * Uses inverse distance squared (IDW) weighting between:
 * - Hanimaadhoo (North, 6.746° N)
 * - Malé Port (Center, 4.175° N)
 * - Gan Addu (South, -0.694° S)
 * Performs Cartesian vector interpolation (Cx, Cy) to eliminate phase angle discontinuity.
 */
export function interpolateHarmonicConstituents(lat, lon) {
  const sHani = TIDE_STATIONS.hanimaadhoo;
  const sMale = TIDE_STATIONS.male;
  const sGan = TIDE_STATIONS.gan;

  const dHani = haversineDistanceKm(lat, lon, sHani.latitude, sHani.longitude);
  const dMale = haversineDistanceKm(lat, lon, sMale.latitude, sMale.longitude);
  const dGan = haversineDistanceKm(lat, lon, sGan.latitude, sGan.longitude);

  // Inverse distance squared weighting
  const p = 2.0;
  const minThreshold = 3.0; // km
  const wHani = 1.0 / Math.pow(Math.max(dHani, minThreshold), p);
  const wMale = 1.0 / Math.pow(Math.max(dMale, minThreshold), p);
  const wGan = 1.0 / Math.pow(Math.max(dGan, minThreshold), p);
  const wTotal = wHani + wMale + wGan;

  const pctHani = wHani / wTotal;
  const pctMale = wMale / wTotal;
  const pctGan = wGan / wTotal;

  // Dominant reference station
  let dominantStation = 'Malé Port Gauging Station';
  if (pctHani > pctMale && pctHani > pctGan) dominantStation = 'Hanimaadhoo Northern Gauge';
  else if (pctGan > pctMale && pctGan > pctHani) dominantStation = 'Gan Addu Southern Gauge';

  // Cartesian vector constituent synthesis
  const interpConstituents = [];
  const count = sMale.constituents.length; // 20 constituents

  for (let i = 0; i < count; i++) {
    const cH = sHani.constituents[i];
    const cM = sMale.constituents[i];
    const cG = sGan.constituents[i];

    const radH = cH.phase * (Math.PI / 180.0);
    const radM = cM.phase * (Math.PI / 180.0);
    const radG = cG.phase * (Math.PI / 180.0);

    const Cx = (pctHani * cH.amplitude * Math.cos(radH)) +
               (pctMale * cM.amplitude * Math.cos(radM)) +
               (pctGan * cG.amplitude * Math.cos(radG));

    const Cy = (pctHani * cH.amplitude * Math.sin(radH)) +
               (pctMale * cM.amplitude * Math.sin(radM)) +
               (pctGan * cG.amplitude * Math.sin(radG));

    const amp = Math.sqrt(Cx * Cx + Cy * Cy);
    const phaseDeg = ((Math.atan2(Cy, Cx) * 180.0 / Math.PI) + 360.0) % 360.0;

    interpConstituents.push({
      name: cM.name,
      desc: cM.desc,
      type: cM.type,
      speed: cM.speed,
      periodHours: parseFloat((360.0 / cM.speed).toFixed(2)),
      amplitude: parseFloat(amp.toFixed(4)),
      amplitudeCm: parseFloat((amp * 100.0).toFixed(1)),
      phase: parseFloat(phaseDeg.toFixed(2))
    });
  }

  const weightDesc = `Hanimaadhoo (${(pctHani * 100).toFixed(1)}%), Malé (${(pctMale * 100).toFixed(1)}%), Gan (${(pctGan * 100).toFixed(1)}%)`;

  return {
    constituents: interpConstituents,
    weights: {
      hanimaadhoo: pctHani,
      male: pctMale,
      gan: pctGan
    },
    weightDesc,
    dominantStation,
    distances: {
      hanimaadhooKm: parseFloat(dHani.toFixed(1)),
      maleKm: parseFloat(dMale.toFixed(1)),
      ganKm: parseFloat(dGan.toFixed(1))
    }
  };
}

/**
 * Predicts local water level & rate of change at a given date using 20 harmonic constituents
 * Formula: h(t) = Z_0 + sum_k [ A_k * cos(sigma_k * t - g_k) ]
 * dh/dt = - sum_k [ A_k * sigma_k * sin(sigma_k * t - g_k) ]
 */
export function predictHarmonicWaterLevel(constituents, targetDate) {
  const refEpochMs = Date.parse(HARMONIC_REFERENCE_EPOCH); // 2000-01-01T00:00:00Z
  const tHours = (targetDate.getTime() - refEpochMs) / 3600000.0;

  let deltaH = 0.0; // meters relative to Mean Sea Level (MSL)
  let dhDt = 0.0;   // meters per hour

  for (const c of constituents) {
    const thetaRad = ((c.speed * tHours) - c.phase) * (Math.PI / 180.0);
    deltaH += c.amplitude * Math.cos(thetaRad);
    dhDt -= c.amplitude * (c.speed * (Math.PI / 180.0)) * Math.sin(thetaRad);
  }

  // Chart Datum baseline: In Maldives hydrography, Mean Sea Level is ~+0.75m above Chart Datum (LAT)
  const chartDatumHeight = 0.75 + deltaH;
  const rateCmPerHr = dhDt * 100.0; // cm/hr

  // Determine Tidal State & Flow Description
  let trend = 'Slack Water';
  let trendIcon = 'fa-solid fa-minus';
  let currentSpeedDesc = 'Slack water: Minimal channel current. Optimal for reef crossings and diving!';

  if (rateCmPerHr > 3.0) {
    trend = 'Rising (Flood Tide)';
    trendIcon = 'fa-solid fa-arrow-trend-up';
    if (rateCmPerHr > 12.0) {
      currentSpeedDesc = 'Strong incoming flood current rushing into atoll lagoons through deep passes (kandu).';
    } else {
      currentSpeedDesc = 'Flood current pushing oceanic water inward through atoll reef passes.';
    }
  } else if (rateCmPerHr < -3.0) {
    trend = 'Falling (Ebb Tide)';
    trendIcon = 'fa-solid fa-arrow-trend-down';
    if (rateCmPerHr < -12.0) {
      currentSpeedDesc = 'Strong outgoing ebb current rushing out of lagoons. Watch for standing waves if wind opposes outflow!';
    } else {
      currentSpeedDesc = 'Ebb current moving seaward through channels (kandu). Watch for steep chop with opposing wind.';
    }
  } else {
    trend = deltaH > 0.15 ? 'High Slack Water' : (deltaH < -0.15 ? 'Low Slack Water' : 'Slack Water');
    trendIcon = 'fa-solid fa-water';
    currentSpeedDesc = 'Slack water window: Minimal channel current velocity. Safest period for lagoon pass transit.';
  }

  return {
    chartDatumHeight: parseFloat(chartDatumHeight.toFixed(2)),
    heightMsl: parseFloat(deltaH.toFixed(2)),
    rateCmPerHr: parseFloat(rateCmPerHr.toFixed(1)),
    trend,
    trendIcon,
    currentSpeedDesc
  };
}

/**
 * Generates continuous 24-Hour SVG Tide Curve with Extrema (High/Low peaks), MSL line & live marker
 */
export function generateTideCurve(constituents, baseDate = new Date(), durationHours = 24) {
  // Start curve 2 hours prior to now so captain can see recent trend, extending 22h ahead
  const startDate = new Date(baseDate.getTime() - (2 * 3600 * 1000));
  const totalHours = durationHours;
  const steps = 144; // 10-minute resolution
  const dtHours = totalHours / steps;

  const points = [];
  const heights = [];

  for (let i = 0; i <= steps; i++) {
    const ptDate = new Date(startDate.getTime() + (i * dtHours * 3600 * 1000));
    const pred = predictHarmonicWaterLevel(constituents, ptDate);
    points.push({
      hourOffset: i * dtHours,
      time: formatShortTime(ptDate),
      timestamp: ptDate.getTime(),
      date: ptDate,
      height: pred.chartDatumHeight,
      rate: pred.rateCmPerHr
    });
    heights.push(pred.chartDatumHeight);
  }

  const minH = Math.max(0.1, Math.min(...heights) - 0.08);
  const maxH = Math.max(...heights) + 0.08;
  const hRange = maxH - minH;

  // SVG Coordinate Box (800 x 200)
  const svgW = 800;
  const svgH = 200;
  const padL = 45;
  const padR = 25;
  const padT = 25;
  const padB = 35;
  const plotW = svgW - padL - padR;
  const plotH = svgH - padT - padB;

  function toXY(hourOffset, height) {
    const x = padL + (hourOffset / totalHours) * plotW;
    const y = padT + plotH - ((height - minH) / hRange) * plotH;
    return [parseFloat(x.toFixed(1)), parseFloat(y.toFixed(1))];
  }

  const pathCmds = [];
  const areaCmds = [];

  points.forEach((pt, idx) => {
    const [x, y] = toXY(pt.hourOffset, pt.height);
    pt.svgX = x;
    pt.svgY = y;
    const cmd = `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
    pathCmds.push(cmd);
    areaCmds.push(cmd);
  });

  const bottomY = (padT + plotH).toFixed(1);
  const lastX = points[points.length - 1].svgX;
  const firstX = points[0].svgX;
  const areaD = `${areaCmds.join(' ')} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  const lineD = pathCmds.join(' ');

  // Current Time Marker (hourOffset = 2.0)
  const nowPred = predictHarmonicWaterLevel(constituents, baseDate);
  const [nowX, nowY] = toXY(2.0, nowPred.chartDatumHeight);

  // Scan for exact High and Low tide extrema using 5-minute sampling
  const extrema = [];
  const stepMins = 5;
  const nSearch = Math.floor((totalHours * 60) / stepMins);
  let prevRate = null;

  for (let k = 0; k < nSearch; k++) {
    const curDate = new Date(startDate.getTime() + (k * stepMins * 60 * 1000));
    const curPred = predictHarmonicWaterLevel(constituents, curDate);

    if (prevRate !== null) {
      if (prevRate > 0 && curPred.rateCmPerHr <= 0) {
        // High Tide Peak
        const hourOffset = (k * stepMins) / 60.0;
        const [x, y] = toXY(hourOffset, curPred.chartDatumHeight);
        extrema.push({
          type: 'High Tide',
          time: formatShortTime(curDate),
          height: curPred.chartDatumHeight,
          hourOffset,
          svgX: x,
          svgY: y,
          isFuture: curDate.getTime() >= baseDate.getTime() - (10 * 60 * 1000)
        });
      } else if (prevRate < 0 && curPred.rateCmPerHr >= 0) {
        // Low Tide Trough
        const hourOffset = (k * stepMins) / 60.0;
        const [x, y] = toXY(hourOffset, curPred.chartDatumHeight);
        extrema.push({
          type: 'Low Tide',
          time: formatShortTime(curDate),
          height: curPred.chartDatumHeight,
          hourOffset,
          svgX: x,
          svgY: y,
          isFuture: curDate.getTime() >= baseDate.getTime() - (10 * 60 * 1000)
        });
      }
    }
    prevRate = curPred.rateCmPerHr;
  }

  // Generate 3-hour horizontal time axis ticks
  const timeTicks = [];
  for (let h = 0; h <= totalHours; h += 3) {
    const tickDate = new Date(startDate.getTime() + (h * 3600 * 1000));
    const [x] = toXY(h, minH);
    timeTicks.push({
      time: formatShortTime(tickDate),
      hourOffset: h,
      svgX: x,
      isNow: Math.abs(h - 2.0) < 1.0
    });
  }

  // Mean Sea Level (0.75m Chart Datum) reference line Y
  const [, mslY] = toXY(0, 0.75);

  return {
    svgWidth: svgW,
    svgHeight: svgH,
    svgPath: lineD,
    svgAreaPath: areaD,
    currentMarker: {
      x: nowX,
      y: nowY,
      height: nowPred.chartDatumHeight,
      heightMsl: nowPred.heightMsl,
      time: formatShortTime(baseDate),
      rate: nowPred.rateCmPerHr
    },
    mslLine: {
      y: mslY,
      label: 'MSL (0.75m CD)'
    },
    highTides: extrema.filter(e => e.type === 'High Tide'),
    lowTides: extrema.filter(e => e.type === 'Low Tide'),
    allExtrema: extrema,
    timeTicks,
    minHeight: parseFloat(Math.min(...heights).toFixed(2)),
    maxHeight: parseFloat(Math.max(...heights).toFixed(2)),
    tidalRange: parseFloat((Math.max(...heights) - Math.min(...heights)).toFixed(2))
  };
}

/**
 * Computes 20-Constituent Harmonic Astronomical Tide Predictions & Channel Currents
 * Spatially references the 3 Maldives Gauging Stations (Hanimaadhoo, Malé, Gan)
 */
export function getTidePrediction(lat, lon, baseDate = new Date()) {
  const interp = interpolateHarmonicConstituents(lat, lon);
  const currentPred = predictHarmonicWaterLevel(interp.constituents, baseDate);
  const tideCurve = generateTideCurve(interp.constituents, baseDate, 24);

  // Upcoming High and Low Tides
  const upcomingHighs = tideCurve.highTides.filter(t => t.isFuture);
  const upcomingLows = tideCurve.lowTides.filter(t => t.isFuture);

  const nextHighTide = upcomingHighs[0] || tideCurve.highTides[0] || { time: '--:--', height: 1.20 };
  const nextLowTide = upcomingLows[0] || tideCurve.lowTides[0] || { time: '--:--', height: 0.35 };

  // Next tides list
  const nextTides = tideCurve.allExtrema.filter(t => t.isFuture).slice(0, 4).map(t => ({
    type: t.type,
    time: t.time,
    height: t.height.toFixed(2),
    label: `${t.type} (${t.height.toFixed(2)}m)`
  }));

  // Hourly curve (sampled every 2 hours for compatibility)
  const hourlyCurve = [];
  for (let i = 0; i <= 12; i += 2) {
    const ptDate = new Date(baseDate.getTime() + (i * 3600 * 1000));
    const ptPred = predictHarmonicWaterLevel(interp.constituents, ptDate);
    hourlyCurve.push({
      time: formatShortTime(ptDate),
      height: ptPred.chartDatumHeight.toFixed(2)
    });
  }

  return {
    currentHeight: currentPred.chartDatumHeight.toFixed(2),
    heightMsl: currentPred.heightMsl.toFixed(2),
    tideTrend: currentPred.trend,
    trendIcon: currentPred.trendIcon,
    rateOfChangeCmPerHour: currentPred.rateCmPerHr.toFixed(1),
    currentSpeedDesc: currentPred.currentSpeedDesc,
    stationWeightingDesc: interp.weightDesc,
    dominantStation: interp.dominantStation,
    weights: interp.weights,
    distances: interp.distances,
    harmonicConstituents: interp.constituents,
    tideCurve,
    nextHighTide: {
      time: nextHighTide.time,
      height: typeof nextHighTide.height === 'number' ? nextHighTide.height.toFixed(2) : nextHighTide.height
    },
    nextLowTide: {
      time: nextLowTide.time,
      height: typeof nextLowTide.height === 'number' ? nextLowTide.height.toFixed(2) : nextLowTide.height
    },
    nextTides,
    hourlyCurve
  };
}

/**
 * Detailed Maritime Visibility Analysis
 */
export function getVisibilityAnalysis(visibilityMeters, weatherCode = 0) {
  const visMeters = visibilityMeters ?? 10000;
  const km = (visMeters / 1000).toFixed(1);
  const nauticalMiles = (visMeters / 1852).toFixed(1);

  let rating = 'Excellent';
  let badgeColor = 'emerald';
  let description = 'Horizon crystal clear. Visual navigation of coral reefs and channel beacons exceeding 8+ nautical miles.';

  if (visMeters >= 15000) {
    rating = 'Exceptional (> 15 km)';
    badgeColor = 'emerald';
    description = 'Unlimited maritime visibility. Ideal for spotting submerged reefs and distant island atoll markers.';
  } else if (visMeters >= 9000) {
    rating = 'Good (9 - 15 km)';
    badgeColor = 'emerald';
    description = 'Standard oceanic clarity. Fringing reefs and navigation buoys clearly visible from 5+ NM.';
  } else if (visMeters >= 4000) {
    rating = 'Moderate (4 - 9 km)';
    badgeColor = 'amber';
    description = 'Haze or passing rain squalls. Reduce speed when approaching narrow island passes; keep lookout on bow.';
  } else if (visMeters >= 1500) {
    rating = 'Restricted (1.5 - 4 km)';
    badgeColor = 'amber';
    description = 'Heavy squalls or dense sea spray. GPS / radar required; high vigilance for unlit dhonis and fishing craft.';
  } else {
    rating = 'Hazardous Fog / Downpour (< 1.5 km)';
    badgeColor = 'rose';
    description = 'Near-zero visibility! High collision risk. Fog horn / sound signals required. Postpone channel passage.';
  }

  return {
    meters: visMeters,
    km,
    nauticalMiles,
    rating,
    badgeColor,
    description
  };
}

/**
 * Intelligent Best Departure Travel Window Engine
 * Evaluates candidate windows over the 24-hour timeline factoring in:
 * - Maldives Met weather alerts (MMS Red/Yellow/White)
 * - Direction of wind & swells relative to passage course bearing (Head vs Following sea)
 * - Current wave height and swell period
 * - Sudden squall gust spikes (microburst fronts)
 * - Opposing wind-tide standing chop in atoll channels (kandu)
 * - Daylight hours for safe visual reef navigation
 */
export function findBestTravelWindow(timeline, vessel, mmsAlert = null, tidePrediction = null, route = null) {
  if (!timeline || timeline.length < 3) return null;

  // 1. Evaluate Every Single 1-Hour Departure Slot Across 24h
  const hourlySchedule = timeline.slice(0, 24).map(slot => {
    const wave = slot.waveHeight !== null ? slot.waveHeight : 0.6;
    const swellH = slot.swellHeight || 0.5;
    const swellP = slot.swellPeriod || slot.wavePeriod || 6;
    const wind = slot.windSpeed || 0;
    const gusts = slot.windGusts || wind;
    const weatherCode = slot.weatherCode || 0;
    const isStorm = [95, 96, 99].includes(weatherCode);
    const isSquall = [65, 82].includes(weatherCode);
    const gustSpike = gusts >= 25 || (wind >= 12 && gusts >= wind * 1.45);

    // Directional relative sea aspects
    let windAspect = null;
    let swellAspect = null;
    if (route && typeof route.bearing === 'number') {
      const wDir = slot.windDirection ?? 0;
      const sDir = slot.swellDirection ?? slot.waveDirection ?? wDir;
      windAspect = getRelativeSeaAspect(route.bearing, wDir);
      swellAspect = getRelativeSeaAspect(route.bearing, sDir);
    }

    // Check daylight (06:00 to 18:00)
    let isDaylight = true;
    try {
      const hr = parseInt(slot.displayTime.split(':')[0], 10);
      isDaylight = (hr >= 6 && hr <= 17);
    } catch (e) {}

    // Hourly Safety Score (0 - 100)
    let score = 100;
    if (wave > vessel.maxSafeWave) {
      score -= 30 * ((wave - vessel.maxSafeWave) / (vessel.cautionWave - vessel.maxSafeWave || 0.8));
    }
    if (wind > vessel.maxSafeWind) {
      score -= 25 * ((wind - vessel.maxSafeWind) / (vessel.cautionWind - vessel.maxSafeWind || 10));
    }
    if (gusts >= vessel.maxSafeGusts) {
      score -= 16;
    } else if (gustSpike) {
      score -= 10;
    }
    if (swellP >= 13 && wave >= 1.2) {
      score -= 12;
    }
    if (isStorm) {
      score -= 50;
    } else if (isSquall) {
      score -= 22;
    }

    // Route directional impact
    if (windAspect?.type === 'head' && wave >= 0.8) {
      score -= (vessel.id === 'maldives_speedboat' ? 16 : 10);
    } else if (swellAspect?.type === 'beam' && (wave >= 1.0 || swellH >= 0.8)) {
      score -= (vessel.id === 'maldives_dhoni' ? 16 : 10);
    } else if (swellAspect?.type === 'following' && windAspect?.type === 'following' && wave < 1.6) {
      score += 6;
    }

    // MMS Alert impact
    if (mmsAlert && mmsAlert.active) {
      if (mmsAlert.color === 'yellow') {
        score -= (vessel.id === 'maldives_speedboat' ? 45 : 30);
      } else if (mmsAlert.color === 'white') {
        score -= 15;
      }
    }

    // Daylight bonus / Night penalty
    if (isDaylight) {
      score += 12;
    } else {
      score -= 12;
    }

    score = Math.max(0, Math.min(100, Math.round(score)));

    let status = 'GO';
    if (score < 45 || isStorm || wave > vessel.cautionWave * 1.2 || (mmsAlert?.color === 'yellow' && vessel.id === 'maldives_speedboat')) {
      status = 'NO-GO';
    } else if (score < 75 || wave > vessel.maxSafeWave || wind > vessel.maxSafeWind || (mmsAlert && mmsAlert.color === 'white')) {
      status = 'CAUTION';
    }

    // Concise advisory tag
    let note = 'Smooth conditions';
    if (isStorm) note = 'Thunderstorm squalls';
    else if (gustSpike) note = `Squall gusts ${Math.round(gusts)} kn`;
    else if (windAspect?.type === 'head' && wave >= 0.8) note = 'Head sea bow slamming';
    else if (swellAspect?.type === 'beam' && wave >= 1.0) note = 'Cross swell roll';
    else if (!isDaylight) note = 'Night transit (reduced visibility)';
    else if (status === 'GO') note = 'Favorable sea window';

    return {
      time: slot.displayTime,
      rawTime: slot.time,
      waveHeight: wave,
      swellHeight: swellH,
      swellPeriod: swellP,
      windSpeed: wind,
      windGusts: gusts,
      isDaylight,
      isStorm,
      gustSpike,
      score,
      status,
      windAspect,
      swellAspect,
      note
    };
  });

  // 2. Sliding 3-Hour Departure Window Analysis
  const windowSize = 3;
  const scoredWindows = [];

  for (let i = 0; i <= timeline.length - windowSize; i++) {
    const chunk = timeline.slice(i, i + windowSize);
    const startSlot = chunk[0];
    const endSlot = chunk[chunk.length - 1];

    let avgWave = 0;
    let maxWave = 0;
    let avgWind = 0;
    let maxGusts = 0;
    let hasStorm = false;
    let hasGustSpike = false;
    let minVisibility = 20000;
    let headSeaCount = 0;
    let beamSeaCount = 0;

    chunk.forEach(slot => {
      const w = slot.waveHeight !== null ? slot.waveHeight : 0.6;
      avgWave += w;
      if (w > maxWave) maxWave = w;

      const spd = slot.windSpeed || 0;
      avgWind += spd;
      const g = slot.windGusts || spd;
      if (g > maxGusts) maxGusts = g;
      if (g >= 25 || (spd >= 12 && g >= spd * 1.45)) hasGustSpike = true;

      if ([95, 96, 99].includes(slot.weatherCode)) hasStorm = true;
      if (slot.visibility && slot.visibility < minVisibility) minVisibility = slot.visibility;

      if (route && typeof route.bearing === 'number') {
        const a = getRelativeSeaAspect(route.bearing, slot.windDirection);
        if (a.type === 'head') headSeaCount++;
        else if (a.type === 'beam') beamSeaCount++;
      }
    });

    avgWave = avgWave / windowSize;
    avgWind = avgWind / windowSize;

    // Daylight check
    let isDaylight = true;
    try {
      const hr = parseInt(startSlot.displayTime.split(':')[0], 10);
      isDaylight = (hr >= 6 && hr <= 17);
    } catch (e) {}

    // Window Score
    let score = 100;
    if (maxWave > vessel.maxSafeWave) {
      score -= 30 * ((maxWave - vessel.maxSafeWave) / (vessel.cautionWave - vessel.maxSafeWave || 0.8));
    }
    if (avgWind > vessel.maxSafeWind) {
      score -= 25 * ((avgWind - vessel.maxSafeWind) / (vessel.cautionWind - vessel.maxSafeWind || 10));
    }
    if (maxGusts >= vessel.maxSafeGusts) {
      score -= 18;
    } else if (hasGustSpike) {
      score -= 10;
    }
    if (hasStorm) {
      score -= 50;
    }
    if (minVisibility < 4000) {
      score -= 20;
    }
    if (mmsAlert && mmsAlert.active) {
      if (mmsAlert.color === 'yellow') score -= 35;
      else if (mmsAlert.color === 'white') score -= 15;
    }
    if (headSeaCount >= 2 && avgWave > 0.8) {
      score -= (vessel.id === 'maldives_speedboat' ? 15 : 8);
    }
    if (beamSeaCount >= 2 && avgWave > 1.0) {
      score -= (vessel.id === 'maldives_dhoni' ? 15 : 8);
    }
    if (isDaylight) {
      score += 15;
    } else {
      score -= 12;
    }

    score = Math.max(0, Math.min(100, Math.round(score)));

    // Relative aspect for start slot
    let aspectSummary = 'Open Passage';
    let aspectIcon = 'fa-solid fa-compass';
    if (route && typeof route.bearing === 'number') {
      const wAsp = getRelativeSeaAspect(route.bearing, startSlot.windDirection);
      aspectSummary = wAsp.label;
      aspectIcon = wAsp.icon;
    }

    scoredWindows.push({
      startTime: startSlot.displayTime,
      endTime: endSlot.displayTime,
      rawStartTime: startSlot.time,
      avgWave: avgWave.toFixed(1),
      maxWave: maxWave.toFixed(1),
      avgWind: Math.round(avgWind),
      maxGusts: Math.round(maxGusts),
      minVisibility: (minVisibility / 1000).toFixed(1),
      isDaylight,
      hasStorm,
      hasGustSpike,
      aspectSummary,
      aspectIcon,
      score
    });
  }

  // Sort candidate windows
  scoredWindows.sort((a, b) => b.score - a.score);
  const best = scoredWindows[0];
  if (!best) return null;

  let qualityRating = 'OPTIMAL WINDOW';
  let qualityBadge = 'emerald';
  let adviceSummary = '';

  const aspectInfo = best.aspectSummary ? ` (${best.aspectSummary})` : '';

  if (best.score >= 80) {
    qualityRating = 'OPTIMAL TRAVEL WINDOW';
    qualityBadge = 'emerald';
    adviceSummary = `Smooth ${best.avgWave}m seas, gentle ${best.avgWind} kn winds, peak gusts under ${best.maxGusts} kn${aspectInfo}. Optimal daylight window for channel crossing and speedboat passage.`;
  } else if (best.score >= 60) {
    qualityRating = 'VIABLE / MODERATE WINDOW';
    qualityBadge = 'amber';
    adviceSummary = `Moderate ${best.avgWave}m seas with gusts up to ${best.maxGusts} kn${aspectInfo}. Viable window; reduce cruise speed in channel passes and wear life jackets.`;
  } else {
    qualityRating = 'MARGINAL / ELEVATED SWELL';
    qualityBadge = 'rose';
    adviceSummary = `Unfavorable conditions persist throughout the 24h cycle (max wave ${best.maxWave}m, gusts ${best.maxGusts} kn). Inter-atoll passage not recommended for small skiffs.`;
  }

  // Find second non-overlapping window
  const alternative = scoredWindows.find(w => {
    const diff = Math.abs(parseInt(w.startTime) - parseInt(best.startTime));
    return diff >= 4 && w.score >= 55;
  }) || scoredWindows[1] || null;

  // Identify high danger hours to avoid
  const avoidCandidate = scoredWindows.slice().reverse().find(w => w.score < 60 || w.hasStorm || w.hasGustSpike) || scoredWindows[scoredWindows.length - 1];
  const avoidWindow = avoidCandidate && avoidCandidate.score < 65 ? {
    ...avoidCandidate,
    reason: avoidCandidate.hasStorm ? 'Convective storm front & lightning' : (avoidCandidate.hasGustSpike ? `Severe squall gusts up to ${avoidCandidate.maxGusts} kn` : `Rough ${avoidCandidate.maxWave}m wave chop & poor visibility`)
  } : null;

  return {
    optimal: {
      ...best,
      qualityRating,
      qualityBadge,
      adviceSummary
    },
    alternative,
    avoidWindow,
    hourlySchedule
  };
}

function formatShortTime(d) {
  try {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch (e) {
    return '12:00';
  }
}
