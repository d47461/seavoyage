// Maritime Travel Safety Assessment Engine with Maldives Meteorological Service (MMS) Integration
import { getRelativeSeaAspect } from './marine-api.js?v=20260912-v5';

export const VESSEL_PROFILES = {
  maldives_speedboat: {
    id: 'maldives_speedboat',
    name: 'Maldivian Speedboat (Island / Transfer)',
    subtitle: '24 - 38ft • Highly sensitive to channel chop (kandu)',
    icon: 'fa-solid fa-bolt',
    cruisingSpeedKnots: 30, // Twin 250HP outboards
    maxSafeWave: 0.9,     // meters
    cautionWave: 1.5,
    maxSafeWind: 14,      // knots
    cautionWind: 20,
    maxSafeGusts: 25,
    minSafeVisibility: 2500
  },
  maldives_dhoni: {
    id: 'maldives_dhoni',
    name: 'Safari Boat / Traditional Dhoni',
    subtitle: '45 - 85ft • Wooden displacement hull, rolling in beam swell',
    icon: 'fa-solid fa-sailboat',
    cruisingSpeedKnots: 8.5, // Traditional diesel inboard
    maxSafeWave: 1.8,
    cautionWave: 2.6,
    maxSafeWind: 20,
    cautionWind: 27,
    maxSafeGusts: 32,
    minSafeVisibility: 1500
  },
  maldives_rtl_ferry: {
    id: 'maldives_rtl_ferry',
    name: 'RTL Speed Ferry / MTCC Ferry',
    subtitle: '50 - 75ft • Passenger catamaran / public transit',
    icon: 'fa-solid fa-ferry',
    cruisingSpeedKnots: 22, // MTCC twin-hull passenger ferry
    maxSafeWave: 2.2,
    cautionWave: 3.2,
    maxSafeWind: 23,
    cautionWind: 30,
    maxSafeGusts: 38,
    minSafeVisibility: 1000
  },
  sailing_yacht: {
    id: 'sailing_yacht',
    name: 'Yacht / Cruiser / Liveaboard',
    subtitle: '7 - 25m (23 - 80ft) • Pleasure & expedition craft',
    icon: 'fa-solid fa-ship',
    cruisingSpeedKnots: 9.0, // Monohull / Catamaran cruiser
    maxSafeWave: 1.6,
    cautionWave: 2.5,
    maxSafeWind: 19,
    cautionWind: 26,
    maxSafeGusts: 30,
    minSafeVisibility: 2000
  },
  commercial_ship: {
    id: 'commercial_ship',
    name: 'Cargo Supply Dhoni / Commercial Ship',
    subtitle: '> 30m • Inter-atoll supply & heavy cargo',
    icon: 'fa-solid fa-anchor',
    cruisingSpeedKnots: 7.5, // Heavy inter-atoll vessel
    maxSafeWave: 3.5,
    cautionWave: 4.8,
    maxSafeWind: 30,
    cautionWind: 42,
    maxSafeGusts: 50,
    minSafeVisibility: 800
  }
};

export function getBeaufortScale(knots) {
  if (knots < 1) return { force: 0, desc: 'Calm', seaDesc: 'Sea like a mirror' };
  if (knots <= 3) return { force: 1, desc: 'Light Air', seaDesc: 'Ripples with appearance of scales' };
  if (knots <= 6) return { force: 2, desc: 'Light Breeze', seaDesc: 'Small wavelets, glassy crests' };
  if (knots <= 10) return { force: 3, desc: 'Gentle Breeze', seaDesc: 'Large wavelets, crests begin to break' };
  if (knots <= 16) return { force: 4, desc: 'Moderate Breeze', seaDesc: 'Small waves becoming longer, whitecaps' };
  if (knots <= 21) return { force: 5, desc: 'Fresh Breeze', seaDesc: 'Moderate waves, many whitecaps, chance of spray' };
  if (knots <= 27) return { force: 6, desc: 'Strong Breeze', seaDesc: 'Large waves forming, extensive white foam crests' };
  if (knots <= 33) return { force: 7, desc: 'Near Gale', seaDesc: 'Sea heaps up, white foam blown in streaks' };
  if (knots <= 40) return { force: 8, desc: 'Gale', seaDesc: 'Moderately high waves, spindrift begins' };
  if (knots <= 47) return { force: 9, desc: 'Strong Gale', seaDesc: 'High waves with dense streaks of foam' };
  if (knots <= 55) return { force: 10, desc: 'Storm', seaDesc: 'Very high waves with long overhanging crests' };
  if (knots <= 63) return { force: 11, desc: 'Violent Storm', seaDesc: 'Exceptionally high waves, visibility affected' };
  return { force: 12, desc: 'Hurricane Force', seaDesc: 'Huge waves, sea completely white with driving spray' };
}

export function getDouglasSeaState(waveMeters) {
  if (waveMeters === null || waveMeters === undefined) return { degree: null, name: 'Calm Waters / Lagoon' };
  if (waveMeters < 0.1) return { degree: 0, name: 'Calm (Glassy)' };
  if (waveMeters < 0.5) return { degree: 1, name: 'Calm (Rippled Lagoon)' };
  if (waveMeters < 1.25) return { degree: 2, name: 'Smooth (Wavelets)' };
  if (waveMeters < 2.5) return { degree: 3, name: 'Slight to Moderate Chop' };
  if (waveMeters < 4.0) return { degree: 4, name: 'Rough Channel Seas' };
  if (waveMeters < 6.0) return { degree: 5, name: 'Very Rough' };
  if (waveMeters < 9.0) return { degree: 6, name: 'High Sea' };
  return { degree: 7, name: 'Very High to Phenomenal' };
}

/**
 * Evaluates sea travel safety factoring in marine weather, Maldives Meteorological Service alerts, and voyage route
 */
export function evaluateSeaSafety(marineReport, vesselProfileKey = 'maldives_speedboat', mmsAlert = null, route = null, tidePrediction = null) {
  const vessel = VESSEL_PROFILES[vesselProfileKey] || VESSEL_PROFILES.maldives_speedboat;
  const current = marineReport.current || {};

  const waveHeight = current.waveHeight !== null ? current.waveHeight : (current.swellHeight || 0.6);
  const swellHeight = current.swellHeight || 0.5;
  const swellPeriod = current.swellPeriod || current.wavePeriod || 6;
  const windSpeed = current.windSpeed || 0;
  const windGusts = current.windGusts || windSpeed;
  const weatherCode = current.weatherCode || 0;
  const visibility = current.visibility || 10000;

  let score = 100;
  const hazards = [];
  const positiveFactors = [];

  // ==========================================
  // 1. MALDIVES METEOROLOGICAL SERVICE ALERTS
  // ==========================================
  let mmsOverrideStatus = null;
  if (mmsAlert && mmsAlert.active) {
    const alertColor = (mmsAlert.color || '').toLowerCase();

    if (alertColor === 'red') {
      score -= 65;
      mmsOverrideStatus = 'NO-GO';
      hazards.push({
        level: 'danger',
        source: 'MMS',
        text: `MALDIVES METEOROLOGICAL SERVICE RED ALERT: Severe tropical storm / depression! Coast Guard prohibits all sea vessel movement. Ports closed.`
      });
    } else if (alertColor === 'yellow') {
      score -= 42;
      // Speedboats have mandatory Coast Guard travel restriction during yellow alerts in the Maldives
      if (vessel.id === 'maldives_speedboat') {
        mmsOverrideStatus = 'NO-GO';
      }
      hazards.push({
        level: 'danger',
        source: 'MMS',
        text: `MALDIVES METEOROLOGICAL SERVICE YELLOW WARNING: Torrential downpours, strong winds (25-30 kn, gusts 45-55 mph), very rough seas. Speedboats & small skiffs strictly advised against open channel crossings (kandu)!`
      });
    } else if (alertColor === 'white') {
      score -= 22;
      hazards.push({
        level: 'warning',
        source: 'MMS',
        text: `MALDIVES METEOROLOGICAL SERVICE WHITE ALERT: Thunderstorms with gusts up to 40 mph and rough seas expected (${mmsAlert.areaDesc}). Speedboat passengers must wear life jackets; avoid deep channel crossings during active squall lines.`
      });
    }
  } else if (mmsAlert && !mmsAlert.active) {
    positiveFactors.push('Maldives Meteorological Service: Normal weather, no active severe atoll alerts.');
  }

  // ==========================================
  // 2. WAVE HEIGHT & SWELL EVALUATION
  // ==========================================
  if (waveHeight <= vessel.maxSafeWave) {
    positiveFactors.push(`Wave height of ${waveHeight.toFixed(1)}m is well within safe operating envelope for ${vessel.name}.`);
  } else if (waveHeight <= vessel.cautionWave) {
    const penalty = 25 * ((waveHeight - vessel.maxSafeWave) / (vessel.cautionWave - vessel.maxSafeWave));
    score -= penalty;
    hazards.push({
      level: 'caution',
      text: `Moderate seas (${waveHeight.toFixed(1)}m). Expect sharp hull slamming and spray in open atoll channels (kandu).`
    });
  } else {
    const penalty = 45 + Math.min(35, (waveHeight - vessel.cautionWave) * 20);
    score -= penalty;
    hazards.push({
      level: 'danger',
      text: `High wave crests (${waveHeight.toFixed(1)}m) exceed seaworthiness limits for ${vessel.name}. High danger of swamping or passenger injury in channel passages.`
    });
  }

  // ==========================================
  // 3. WIND SPEED & SQUALL GUST EVALUATION
  // ==========================================
  if (windSpeed <= vessel.maxSafeWind) {
    positiveFactors.push(`Gentle breeze at ${Math.round(windSpeed)} knots. Good sea conditions.`);
  } else if (windSpeed <= vessel.cautionWind) {
    const penalty = 20 * ((windSpeed - vessel.maxSafeWind) / (vessel.cautionWind - vessel.maxSafeWind));
    score -= penalty;
    hazards.push({
      level: 'caution',
      text: `Elevated wind force (${Math.round(windSpeed)} knots, Beaufort ${getBeaufortScale(windSpeed).force}). Requires vigilant throttles and trim.`
    });
  } else {
    const penalty = 40 + Math.min(30, (windSpeed - vessel.cautionWind) * 3);
    score -= penalty;
    hazards.push({
      level: 'danger',
      text: `Strong wind velocities (${Math.round(windSpeed)} knots with gusts up to ${Math.round(windGusts)} kn). Risk of losing steerage or high drift in channels.`
    });
  }

  // Gust Hazard & Spikes
  if (windGusts >= vessel.maxSafeGusts) {
    score -= 15;
    hazards.push({
      level: 'warning',
      text: `Monsoon squall gusts reaching ${Math.round(windGusts)} knots recorded. Dangerous sudden heeling for dhonis and small skiffs.`
    });
  } else if (windSpeed >= 12 && windGusts >= windSpeed * 1.45) {
    score -= 10;
    hazards.push({
      level: 'warning',
      text: `Squall Gust Spikes: Peak gusts (${Math.round(windGusts)} kn) exceed sustained wind (${Math.round(windSpeed)} kn) by > 45%. Watch for sudden microbursts.`
    });
  }

  // ==========================================
  // 4. SWELL & SHOALING REEF HAZARD
  // ==========================================
  if (swellPeriod >= 13 && waveHeight >= 1.3) {
    score -= 15;
    hazards.push({
      level: 'caution',
      text: `Long swell period (${swellPeriod.toFixed(0)}s). Heavy groundswell creating dangerous breaking surf over island reef entrances and harbor channels.`
    });
  }

  // ==========================================
  // 5. THUNDERSTORM / SQUALL DETECTION
  // ==========================================
  const isThunderstorm = [95, 96, 99].includes(weatherCode);
  const isHeavyRainOrSquall = [65, 82].includes(weatherCode);

  if (isThunderstorm) {
    score -= 35;
    hazards.push({
      level: 'danger',
      text: `Active convective thunderstorm cell! Lightning hazard and sudden erratic 40+ knot microburst squalls.`
    });
  } else if (isHeavyRainOrSquall) {
    score -= 20;
    hazards.push({
      level: 'warning',
      text: `Heavy tropical downpours creating sudden localized whitecaps and near-zero navigational visibility.`
    });
  }

  // Visibility
  if (visibility < vessel.minSafeVisibility) {
    score -= 15;
    hazards.push({
      level: 'warning',
      text: `Restricted visibility (${(visibility / 1000).toFixed(1)} km). GPS / radar navigation required; elevated collision risk in busy lagoon channels.`
    });
  } else if (visibility >= 10000) {
    positiveFactors.push('Clear horizon with visibility exceeding 10 km.');
  }

  // ==========================================
  // 6. PASSAGE ROUTE & DIRECTIONAL SEA ASPECT
  // ==========================================
  let routeMetrics = null;
  if (route && typeof route.bearing === 'number') {
    const windDir = current.windDirection;
    const swellDir = current.swellDirection ?? current.waveDirection ?? windDir;
    const windAspect = getRelativeSeaAspect(route.bearing, windDir);
    const swellAspect = getRelativeSeaAspect(route.bearing, swellDir);

    const speedKn = vessel.cruisingSpeedKnots || 20;
    const transitDurationHours = route.distanceNm / speedKn;
    const totalMins = Math.round(transitDurationHours * 60);
    const hrs = Math.floor(totalMins / 60);
    const mins = totalMins % 60;
    const transitTimeStr = hrs > 0 ? (mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`) : `${mins}m`;

    routeMetrics = {
      distanceNm: route.distanceNm,
      distanceKm: route.distanceKm,
      bearing: Math.round(route.bearing),
      cardinal: route.cardinal,
      channelName: route.channelName || 'Inter-Atoll Channel Crossing',
      transitTimeStr,
      transitMinutes: totalMins,
      cruisingSpeedKnots: speedKn,
      windAspect,
      swellAspect
    };

    // Head Sea bow pounding evaluation
    if (windAspect.type === 'head' || swellAspect.type === 'head') {
      const dominantAspect = windAspect.type === 'head' ? windAspect : swellAspect;
      if (waveHeight >= 0.8) {
        if (vessel.id === 'maldives_speedboat') {
          score -= 18;
          hazards.push({
            level: 'danger',
            text: `Head Sea Bow Pounding: Course ${Math.round(route.bearing)}° drives directly into ${waveHeight.toFixed(1)}m waves (${dominantAspect.angle}° angle). Severe slamming against fiberglass hull; reduce speed to 14-16 kn, extending passage by ~35%.`
          });
        } else {
          score -= 10;
          hazards.push({
            level: 'caution',
            text: `Head Sea Resistance: Navigating into oncoming seas (${dominantAspect.angle}°). Increased engine strain, bow spray, and heavy pitching.`
          });
        }
      } else {
        positiveFactors.push(`Head sea angle (${dominantAspect.angle}°), but light chop (${waveHeight.toFixed(1)}m) allows smooth cruising.`);
      }
    }

    // Beam Sea rolling evaluation (especially for dhonis)
    if (swellAspect.type === 'beam') {
      if (waveHeight >= 1.0 || swellHeight >= 0.8) {
        if (vessel.id === 'maldives_dhoni') {
          score -= 18;
          hazards.push({
            level: 'danger',
            text: `Beam Sea Dynamic Roll: Cross-swell hitting port/starboard beam at ${swellAspect.angle}°. High rhythmic roll resonance for wooden displacement hulls; secure passengers and cargo.`
          });
        } else {
          score -= 10;
          hazards.push({
            level: 'caution',
            text: `Beam Sea Lateral Swell: ${swellAspect.angle}° cross-swell causing significant side-to-side vessel roll in open channel.`
          });
        }
      }
    }

    // Following Sea push evaluation
    if (swellAspect.type === 'following' && windAspect.type === 'following') {
      if (waveHeight < 1.8) {
        score += 6;
        positiveFactors.push(`Following Sea: Swells & wind pushing from astern (${swellAspect.angle}°). Favorable heading for smooth passenger comfort.`);
      } else {
        hazards.push({
          level: 'caution',
          text: `Following Sea Surf Hazard: Heavy ${waveHeight.toFixed(1)}m swells from astern. Maintain alert steering to prevent bow digging into wave troughs.`
        });
      }
    }

    // Standing chop from wind opposing tidal current in channel
    if (tidePrediction && tidePrediction.tideTrend) {
      if ((tidePrediction.tideTrend.includes('Ebb') || tidePrediction.tideTrend.includes('Flood')) && windSpeed >= 13) {
        score -= 8;
        hazards.push({
          level: 'caution',
          text: `Channel Pass Standing Waves: Strong ${tidePrediction.tideTrend} tidal current opposes ${Math.round(windSpeed)} kn wind across channel mouth (kandu). Expect steep, breaking standing chop.`
        });
      }
    }
  }

  // Bound score between 0 and 100
  score = Math.max(0, Math.min(100, Math.round(score)));

  // Final Decision Synthesis
  let status = 'GO';
  let badgeColor = 'emerald';
  let title = 'CLEAR TO SAIL';
  let verdictSummary = `Favorable marine conditions. Sea passage is recommended with standard navigational precautions.`;

  if (mmsOverrideStatus === 'NO-GO' || score < 45 || isThunderstorm || waveHeight > vessel.cautionWave * 1.25) {
    status = 'NO-GO';
    badgeColor = 'rose';
    title = 'UNSAFE / DO NOT SAIL';
    verdictSummary = `Sea travel is NOT recommended for ${vessel.name}. High risk of maritime emergency, swamping, or Coast Guard travel restrictions. Postpone inter-atoll and channel passage.`;
  } else if (score < 75 || waveHeight > vessel.maxSafeWave || windSpeed > vessel.maxSafeWind || (mmsAlert && mmsAlert.color === 'white')) {
    status = 'CAUTION';
    badgeColor = 'amber';
    title = 'EXERCISE CAUTION';
    verdictSummary = `Marginal sea conditions. Travel only recommended with an experienced captain, mandatory life jackets on all passengers, bilge pumps operational, and VHF Radio tuned to Channel 16.`;
  }

  const timelineWindows = analyzeDepartureWindows(marineReport.timeline || [], vessel, route);

  return {
    status,
    score,
    title,
    badgeColor,
    verdictSummary,
    vessel,
    hazards,
    positiveFactors,
    mmsAlert,
    routeMetrics,
    beaufort: getBeaufortScale(windSpeed),
    seaState: getDouglasSeaState(waveHeight),
    timelineWindows
  };
}

function analyzeDepartureWindows(timeline, vessel, route = null) {
  if (!timeline || timeline.length === 0) return [];

  return timeline.map(slot => {
    const wave = slot.waveHeight !== null ? slot.waveHeight : 0.6;
    const wind = slot.windSpeed || 0;
    const isStorm = [95, 96, 99].includes(slot.weatherCode);

    let slotScore = 100;
    if (wave > vessel.maxSafeWave) slotScore -= 30 * (wave / vessel.cautionWave);
    if (wind > vessel.maxSafeWind) slotScore -= 30 * (wind / vessel.cautionWind);
    if (isStorm) slotScore -= 45;

    // Route-specific directional aspect if route bearing available
    let relativeAspect = null;
    if (route && typeof route.bearing === 'number') {
      const wDir = slot.windDirection || 0;
      relativeAspect = getRelativeSeaAspect(route.bearing, wDir);
      if (relativeAspect.type === 'head' && wave > 0.8) {
        slotScore -= 12;
      }
    }

    slotScore = Math.max(0, Math.min(100, Math.round(slotScore)));

    let status = 'GO';
    if (slotScore < 45 || isStorm || wave > vessel.cautionWave) status = 'NO-GO';
    else if (slotScore < 75 || wave > vessel.maxSafeWave || wind > vessel.maxSafeWind) status = 'CAUTION';

    return {
      time: slot.displayTime,
      rawTime: slot.time,
      waveHeight: wave,
      windSpeed: wind,
      score: slotScore,
      status,
      relativeAspect
    };
  });
}

/**
 * Evaluates trip planning feasibility and safety for a specific forecast day
 */
export function evaluateDayTripPlanning(day, vesselProfileKey = 'maldives_speedboat', route = null, mmsAlert = null) {
  const vessel = VESSEL_PROFILES[vesselProfileKey] || VESSEL_PROFILES.maldives_speedboat;

  let score = 100;
  const hazards = [];
  const positiveFactors = [];

  const waveMax = day.waveHeightMax || 0.6;
  const windMax = day.windSpeedMax || 0;
  const gustsMax = day.windGustsMax || windMax;
  const isStorm = [95, 96, 99].includes(day.weatherCode);
  const isHeavyRain = [65, 82].includes(day.weatherCode);

  // 1. MMS Alerts (applies primarily to Day 0)
  if (day.dayIndex === 0 && mmsAlert && mmsAlert.active) {
    const alertColor = (mmsAlert.color || '').toLowerCase();
    if (alertColor === 'red') {
      score -= 65;
      hazards.push({ level: 'danger', text: `MMS RED ALERT: Coast Guard prohibits all sea vessel movement.` });
    } else if (alertColor === 'yellow') {
      score -= 42;
      hazards.push({ level: 'danger', text: `MMS YELLOW WARNING: Speedboats advised against channel crossings (kandu).` });
    } else if (alertColor === 'white') {
      score -= 20;
      hazards.push({ level: 'warning', text: `MMS WHITE ALERT: Thunderstorms with gusts up to 40 mph.` });
    }
  }

  // 2. Waves & Swell
  if (waveMax <= vessel.maxSafeWave) {
    positiveFactors.push(`Max wave height of ${waveMax.toFixed(1)}m is optimal for ${vessel.name}.`);
  } else if (waveMax <= vessel.cautionWave) {
    const p = 25 * ((waveMax - vessel.maxSafeWave) / (vessel.cautionWave - vessel.maxSafeWave || 0.8));
    score -= p;
    hazards.push({
      level: 'caution',
      text: `Moderate seas (max ${waveMax.toFixed(1)}m). Expect sharp hull slamming in open channels.`
    });
  } else {
    const p = 45 + Math.min(35, (waveMax - vessel.cautionWave) * 20);
    score -= p;
    hazards.push({
      level: 'danger',
      text: `Wave crests (${waveMax.toFixed(1)}m) exceed seaworthiness limit for ${vessel.name}. High swamping hazard.`
    });
  }

  // 3. Wind & Gusts
  if (windMax <= vessel.maxSafeWind) {
    positiveFactors.push(`Pleasant winds (max ${windMax} kn).`);
  } else if (windMax <= vessel.cautionWind) {
    const p = 20 * ((windMax - vessel.maxSafeWind) / (vessel.cautionWind - vessel.maxSafeWind || 10));
    score -= p;
    hazards.push({
      level: 'caution',
      text: `Elevated winds (${windMax} kn). Throttles must be adjusted for channel chop.`
    });
  } else {
    const p = 40 + Math.min(30, (windMax - vessel.cautionWind) * 3);
    score -= p;
    hazards.push({
      level: 'danger',
      text: `High wind velocities (${windMax} kn). High drift risk in inter-atoll passages.`
    });
  }

  if (gustsMax >= vessel.maxSafeGusts) {
    score -= 18;
    hazards.push({
      level: 'danger',
      text: `Squall gusts up to ${gustsMax} kn expected. Sudden white-water chop spikes.`
    });
  } else if (gustsMax >= 24) {
    score -= 8;
    hazards.push({
      level: 'caution',
      text: `Occasional wind gusts up to ${gustsMax} kn.`
    });
  }

  // 4. Ocean Currents
  if (day.oceanCurrentSpeedMaxKnots >= 2.0) {
    score -= 12;
    hazards.push({
      level: 'caution',
      text: `Strong oceanic current (${day.oceanCurrentSpeedMaxKnots} kn). Steep standing chop in reef passes.`
    });
  } else if (day.oceanCurrentSpeedMaxKnots <= 1.0) {
    positiveFactors.push(`Mild oceanic current (${day.oceanCurrentSpeedMaxKnots} kn).`);
  }

  // 5. Precipitation & Convective Squalls
  if (isStorm) {
    score -= 45;
    hazards.push({
      level: 'danger',
      text: `Thunderstorm squalls & lightning hazard predicted.`
    });
  } else if (isHeavyRain) {
    score -= 25;
    hazards.push({
      level: 'warning',
      text: `Heavy rain downpours (${day.precipitationSum} mm). Severely reduced visibility.`
    });
  } else if (day.precipitationProbabilityMax >= 65) {
    score -= 10;
    hazards.push({
      level: 'caution',
      text: `High probability of scattered showers (${day.precipitationProbabilityMax}%).`
    });
  } else if (day.precipitationProbabilityMax <= 20) {
    positiveFactors.push(`Mostly dry deck conditions (${day.precipitationProbabilityMax}% rain chance).`);
  }

  // 6. Visibility
  if (day.visibilityMinKm < 3.5) {
    score -= 18;
    hazards.push({
      level: 'warning',
      text: `Reduced navigational visibility (${day.visibilityMinKm} km / ${day.visibilityMinNm} NM).`
    });
  } else {
    positiveFactors.push(`Clear visibility (${day.visibilityMinKm} km).`);
  }

  // 7. Route Directional Sea Aspect
  let relativeAspect = null;
  if (route && typeof route.bearing === 'number') {
    relativeAspect = getRelativeSeaAspect(route.bearing, day.windDirectionDominant);
    if (relativeAspect.type === 'head' && waveMax > 0.8) {
      score -= (vessel.id === 'maldives_speedboat' ? 14 : 8);
      hazards.push({
        level: 'caution',
        text: `Head sea aspect (${relativeAspect.angle}°). Hull pounding into opposing waves.`
      });
    } else if (relativeAspect.type === 'beam' && waveMax > 1.0) {
      score -= (vessel.id === 'maldives_dhoni' ? 14 : 8);
      hazards.push({
        level: 'caution',
        text: `Beam sea aspect (${relativeAspect.angle}°). Cross-swell roll on vessel sides.`
      });
    } else {
      positiveFactors.push(`Favorable relative sea aspect (${relativeAspect.label}).`);
    }
  }

  score = Math.max(0, Math.min(100, Math.round(score)));

  let status = 'GO';
  if (score < 48 || isStorm || waveMax > vessel.cautionWave || (day.dayIndex === 0 && mmsAlert?.active && mmsAlert.color === 'red')) {
    status = 'NO-GO';
  } else if (score < 75 || waveMax > vessel.maxSafeWave || windMax > vessel.maxSafeWind) {
    status = 'CAUTION';
  }

  let badgeColor = 'emerald';
  let qualityRating = 'OPTIMAL TRIP DAY';
  if (status === 'NO-GO') {
    badgeColor = 'rose';
    qualityRating = 'ADVERSE / NO-GO';
  } else if (status === 'CAUTION') {
    badgeColor = 'amber';
    qualityRating = 'CAUTION ADVISED';
  }

  // 8. Find Best 3-Hour Daylight Window for this day
  let bestWindow = null;
  if (day.hours && day.hours.length >= 3) {
    const daylightHours = day.hours.filter(h => h.isDaylight);
    if (daylightHours.length >= 3) {
      let bestHScore = -1;
      for (let i = 0; i <= daylightHours.length - 3; i++) {
        const chunk = daylightHours.slice(i, i + 3);
        const avgW = chunk.reduce((s, c) => s + c.waveHeight, 0) / 3;
        const avgSpd = chunk.reduce((s, c) => s + c.windSpeed, 0) / 3;
        const maxG = Math.max(...chunk.map(c => c.windGusts));
        const rainP = Math.max(...chunk.map(c => c.precipitationProbability));

        let hScore = 100 - (avgW * 25) - (avgSpd * 1.5) - (maxG * 0.8) - (rainP * 0.2);
        if (hScore > bestHScore) {
          bestHScore = hScore;
          bestWindow = {
            startTime: chunk[0].displayTime,
            endTime: chunk[chunk.length - 1].displayTime,
            avgWave: avgW.toFixed(1),
            avgWind: Math.round(avgSpd),
            maxGusts: Math.round(maxG),
            rainProb: rainP,
            score: Math.round(hScore)
          };
        }
      }
    }
  }

  if (!bestWindow && day.hours && day.hours.length > 0) {
    bestWindow = {
      startTime: '06:00',
      endTime: '10:00',
      avgWave: day.waveHeightAvg,
      avgWind: day.windSpeedAvg,
      maxGusts: day.windGustsMax,
      rainProb: day.precipitationProbabilityMax,
      score
    };
  }

  // Concise verdict summary
  let verdictSummary = '';
  if (status === 'GO') {
    verdictSummary = `Excellent day for passage. Calm seas averaging ${day.waveHeightAvg}m with light ${day.windSpeedAvg} kn breeze. Best departure around ${bestWindow.startTime} – ${bestWindow.endTime}.`;
  } else if (status === 'CAUTION') {
    verdictSummary = `Passage viable with heightened watch. Wave chop peaks at ${waveMax.toFixed(1)}m with gusts to ${gustsMax} kn. Target the morning window (${bestWindow.startTime} – ${bestWindow.endTime}) and ensure safety gear is donned.`;
  } else {
    verdictSummary = `Sea travel not recommended for ${vessel.name}. Adverse conditions with waves to ${waveMax.toFixed(1)}m and gusts to ${gustsMax} kn. Delay voyage to a subsequent GO window.`;
  }

  return {
    ...day,
    status,
    score,
    badgeColor,
    qualityRating,
    hazards,
    positiveFactors,
    relativeAspect,
    bestWindow,
    verdictSummary,
    beaufort: getBeaufortScale(windMax),
    seaState: getDouglasSeaState(waveMax)
  };
}

/**
 * Generates an overarching strategic trip planning summary across the entire 10-day window
 */
export function generateTenDayTripSummary(evaluatedDays, vessel, route) {
  if (!evaluatedDays || evaluatedDays.length === 0) return null;

  const sortedByScore = [...evaluatedDays].sort((a, b) => b.score - a.score);
  const topDays = sortedByScore.filter(d => d.status === 'GO').slice(0, 3);
  const avoidDays = evaluatedDays.filter(d => d.status === 'NO-GO');
  const goDaysCount = evaluatedDays.filter(d => d.status === 'GO').length;

  const calmestDay = [...evaluatedDays].sort((a, b) => (a.waveHeightMax + a.windSpeedMax * 0.1) - (b.waveHeightMax + b.windSpeedMax * 0.1))[0];
  const roughestDay = [...evaluatedDays].sort((a, b) => (b.waveHeightMax + b.windGustsMax * 0.1) - (a.waveHeightMax + a.windGustsMax * 0.1))[0];

  let strategicPassageAdvice = '';
  if (goDaysCount >= 7) {
    strategicPassageAdvice = `Favorable weather window prevailing across the next 10 days with ${goDaysCount} clear sailing days. The calmest passage day is ${calmestDay.dayLabel} (${calmestDay.fullDate}) with ${calmestDay.waveHeightMax}m seas. Ideal for leisurely inter-atoll cruising.`;
  } else if (goDaysCount >= 3) {
    strategicPassageAdvice = `Variable conditions across the 10-day outlook with ${goDaysCount} favorable travel windows. Top recommended departure days are ${topDays.map(d => d.dayLabel).join(', ')}. Avoid ${avoidDays.length > 0 ? avoidDays.map(d => d.dayLabel).join(', ') : 'rough afternoon transitions'} due to elevated channel chop and squalls.`;
  } else {
    strategicPassageAdvice = `Unsettled maritime patterns dominant across the 10-day period with only ${goDaysCount} limited clear windows. Peak seas reach ${roughestDay.waveHeightMax}m with gusts to ${roughestDay.windGustsMax} kn on ${roughestDay.dayLabel}. Exercise extreme vigilance; schedule passage strictly during morning micro-windows.`;
  }

  return {
    topDays,
    avoidDays,
    calmestDay,
    roughestDay,
    goDaysCount,
    totalDays: evaluatedDays.length,
    strategicPassageAdvice
  };
}

