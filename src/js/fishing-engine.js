// Maldivian Marine & Sportfishing Intelligence Engine
// Evaluates Solunar, Tidal Current, Swell White-Water, Barometric Pressure & UV Index
// Recommends optimal windows and hotspots for Jigging (deep water/passes) and Casting (reef crests/topwater)

export const MALDIVES_FISHING_HOTSPOTS = {
  'Lhaviyani': {
    atollName: 'Lhaviyani Atoll (Faadhippolhu • Maafilaafushi Waters)',
    jiggingSpots: [
      {
        name: 'Maafilaafushi Deep Channel Ledge (Kandu)',
        depth: '60m – 150m oceanic drop',
        coordinates: '5.365°N, 73.435°E',
        targetSpecies: ['Dogtooth Tuna (30kg+)', 'Giant Trevally (GT)', 'Amberjack', 'Ruby Snapper'],
        tackle: '220g – 320g Speed & Slow-pitch glow jigs, PE 4–6, 100lb fluoro leader',
        tactics: 'Drift the outer channel ledge during peak tidal flush. Dogtooth congregate on current eddies between 80m and 120m.'
      },
      {
        name: 'Kuredu Express & Felivaru Pass',
        depth: '50m – 130m current drop-off',
        coordinates: '5.550°N, 73.470°E',
        targetSpecies: ['Yellowfin Tuna', 'Dogtooth Tuna', 'Bigeye Trevally', 'Sailfish'],
        tackle: '250g Knife jigs, high speed vertical mechanical jigging',
        tactics: 'Fish deep current rips as oceanic currents surge through the northern Lhaviyani channel corridor.'
      },
      {
        name: 'Faadhippolhu South-West Sea-Mount (Thila Pinnacle)',
        depth: '35m – 85m',
        coordinates: '5.290°N, 73.380°E',
        targetSpecies: ['Giant Trevally', 'Coronation Trout', 'Rusty Jobfish', 'Grouper'],
        tackle: '180g – 220g zebra lumo slow pitch jigs',
        tactics: 'Work the up-current face of the pinnacle during mid-flood and ebb transitions.'
      }
    ],
    castingSpots: [
      {
        name: 'Maafilaafushi Outer Barrier Faru Reef Crest',
        depth: '1.5m – 15m foaming break',
        coordinates: '5.360°N, 73.415°E',
        targetSpecies: ['Giant Trevally (GT)', 'Bluefin Trevally', 'Red Bass', 'Spanish Mackerel'],
        tackle: '140g – 180g Cup-face poppers, floating stickbaits, PE 8 braid, 130lb shock leader',
        tactics: 'Cast directly into breaking white water foam along the oceanic reef crest. Heavy violent chugs to entice cruising GT packs.'
      },
      {
        name: 'Kuredu Outer Reef Surf Point',
        depth: '2m – 18m sheer drop',
        coordinates: '5.555°N, 73.480°E',
        targetSpecies: ['Giant Trevally (GT)', 'Wahoo (shallow ambush)', 'Barracuda', 'Sailfish'],
        tackle: '150g – 190g Long-cast diving stickbaits, sweep-and-pause cadence',
        tactics: 'Cast along the edge of the blue water line where the outer reef drops into the open Indian Ocean.'
      },
      {
        name: 'Felivaru Kandu Mouth Breakers',
        depth: '3m – 20m channel crest',
        coordinates: '5.440°N, 73.490°E',
        targetSpecies: ['Giant Trevally', 'Bluefin Trevally', 'Coral Trout'],
        tackle: '130g Sinking stickbaits, fast twitch retrieve through the foam wash',
        tactics: 'Explosive surface strikes occur when lagoon baitfish get swept across the reef edge into oceanic wash.'
      }
    ]
  },
  'Haa Dhaalu': {
    atollName: 'Haa Dhaalu (Hanimaadhoo & Kulhudhuffushi)',
    jiggingSpots: [
      {
        name: 'Hanimaadhoo Channel Deep Ledge (Kandu)',
        depth: '60m – 150m oceanic drop-off',
        coordinates: '6.750°N, 73.185°E',
        targetSpecies: ['Dogtooth Tuna (30kg+)', 'Giant Trevally', 'Amberjack', 'Ruby Snapper'],
        tackle: '200g – 280g Slow pitch & knife jigs (Zebra Lumo / Pink Glow), PE 4–5 line, 80lb shock leader',
        tactics: 'Drift across the deep shelf edge as the incoming Northern Ocean tidal current pushes pelagics against the wall.'
      },
      {
        name: 'Kulhudhuffushi Outer Shelf Canyon',
        depth: '70m – 160m',
        coordinates: '6.620°N, 73.050°E',
        targetSpecies: ['Yellowfin Tuna', 'Dogtooth Tuna', 'Rusty Jobfish', 'Bigeye Trevally'],
        tackle: '220g – 300g Heavy vertical speed jigs, wire assist',
        tactics: 'Fish deep current rips as oceanic currents surge past the western Haa Dhaalu rim.'
      },
      {
        name: 'Finey & Naivaadhoo Deep Pinnacle (Thila)',
        depth: '40m – 90m',
        coordinates: '6.720°N, 73.080°E',
        targetSpecies: ['Giant Trevally', 'Coronation Trout', 'Coral Grouper'],
        tackle: '180g – 220g Slow jigs, high-flutter cadence',
        tactics: 'Target the current-facing pinnacle nose during peak tidal movement.'
      }
    ],
    castingSpots: [
      {
        name: 'Hanimaadhoo Outer Barrier Faru Breakers',
        depth: '1.5m – 16m foaming surf',
        coordinates: '6.745°N, 73.160°E',
        targetSpecies: ['Giant Trevally (GT)', 'Bluefin Trevally', 'Red Bass', 'Spanish Mackerel'],
        tackle: '140g – 180g Cup-faced poppers & floating stickbaits, PE 6–8 braid, 130lb mono shock leader',
        tactics: 'Cast directly into breaking white water foam along the oceanic reef crest. Sweep stickbait through the boiling wash.'
      },
      {
        name: 'Kumundhoo Reef Point & Surf Wash',
        depth: '2m – 18m drop',
        coordinates: '6.560°N, 73.030°E',
        targetSpecies: ['Giant Trevally (GT)', 'Wahoo', 'Barracuda'],
        tackle: '150g – 190g Long-cast diving stickbaits',
        tactics: 'Cast along the edge of the blue water line where the outer reef drops into the open Indian Ocean.'
      },
      {
        name: 'Nolhivaramfaru Channel Mouth Foam',
        depth: '3m – 20m channel crest',
        coordinates: '6.690°N, 73.110°E',
        targetSpecies: ['Giant Trevally', 'Bluefin Trevally', 'Coral Trout'],
        tackle: '130g Sinking stickbaits, fast twitch retrieve',
        tactics: 'Explosive surface strikes occur when baitfish are swept across the channel mouth into the open breakers.'
      }
    ]
  },
  'Kaafu': {
    atollName: 'Kaafu (North & South Malé Atoll)',
    jiggingSpots: [
      {
        name: 'Gaadhoo Kandu Outer Drop-Off',
        depth: '70m – 140m',
        coordinates: '4.195°N, 73.545°E',
        targetSpecies: ['Dogtooth Tuna', 'Giant Trevally', 'Amberjack', 'Ruby Snapper'],
        tackle: '200g – 300g Glow/Silver speed jigs, PE 4–5, 80lb fluoro leader',
        tactics: 'Drift along the eastern oceanic ledge during incoming flood tide. Work vertical drops from 120m up to 60m.'
      },
      {
        name: 'Vaadhoo Channel Deep Canyon',
        depth: '80m – 160m',
        coordinates: '4.115°N, 73.450°E',
        targetSpecies: ['Dogtooth Tuna', 'Rusty Jobfish', 'Coronation Trout', 'Bigeye Trevally'],
        tackle: '180g – 250g Slow pitch zebra jigs, PE 3, 60lb leader',
        tactics: 'Fish deep current eddies on the channel shoulder where pelagics ambush bait flushed from the lagoon.'
      },
      {
        name: 'Girifushi Thila & Outer Corner',
        depth: '35m – 90m',
        coordinates: '4.320°N, 73.590°E',
        targetSpecies: ['Giant Trevally', 'Bluefin Trevally', 'Red Bass', 'Coral Grouper'],
        tackle: '150g – 200g slow jigs, short pitch flutter action',
        tactics: 'Target the current-facing pinnacle tip at mid-tide when water velocity peaks.'
      }
    ],
    castingSpots: [
      {
        name: 'Helengeli Outer Barrier Faru Crest',
        depth: '1m – 15m reef edge',
        coordinates: '4.630°N, 73.560°E',
        targetSpecies: ['Giant Trevally (GT)', 'Bluefin Trevally', 'Barracuda', 'Red Bass'],
        tackle: '140g – 180g Cup-face poppers, floating stickbaits, PE 8 braid, 130lb shock leader',
        tactics: 'Cast directly into breaking surf foam along the drop-off edge. Sweep stickbait through the white water seam.'
      },
      {
        name: 'Maafushi Reef South-East Corner',
        depth: '3m – 20m drop',
        coordinates: '3.930°N, 73.495°E',
        targetSpecies: ['Giant Trevally', 'Coral Trout', 'Dogtooth Tuna (shallow patrol)'],
        tackle: '120g – 160g Sinking stickbaits, heavy inline single hooks',
        tactics: 'Work the outer breakers 2 hours before high tide as the rising flood pushes fusiliers onto the shallow reef flat.'
      },
      {
        name: 'Guraidhoo Corner Breakers',
        depth: '4m – 25m edge',
        coordinates: '3.900°N, 73.475°E',
        targetSpecies: ['Giant Trevally (GT)', 'Black GT', 'Barracuda'],
        tackle: '150g Loud chugger popper, fast cadence retrieve',
        tactics: 'Explosive topwater bites occur on the boiling wash where the Kandu channel exits to the open ocean.'
      }
    ]
  },
  'Alif Alif': {
    atollName: 'Alif Alif (North Ari & Rasdhoo Atoll)',
    jiggingSpots: [
      {
        name: 'Madivaru Corner (Legendary Pelagic Drop-off)',
        depth: '50m – 130m',
        coordinates: '4.260°N, 73.010°E',
        targetSpecies: ['Dogtooth Tuna', 'Hammerhead vicinity', 'Giant Trevally', 'Amberjack'],
        tackle: '220g – 300g heavy vertical knife jigs, PE 4–6, wire-assist or 100lb leader',
        tactics: 'Fish the outgoing tidal current flow where deep ocean upwellings attract bait balls.'
      },
      {
        name: 'Rasdhoo Ocean Wall (East Drop)',
        depth: '60m – 180m',
        coordinates: '4.270°N, 73.000°E',
        targetSpecies: ['Dogtooth Tuna', 'Yellowfin Tuna', 'Ruby Snapper', 'Jobfish'],
        tackle: '200g Slow pitch flutter jigs in pink/silver',
        tactics: 'Slow pitch fluttering between 70m and 110m depth along the sheer vertical drop.'
      },
      {
        name: 'Maaya Thila Deep Pinnacles',
        depth: '30m – 70m',
        coordinates: '4.090°N, 72.860°E',
        targetSpecies: ['Giant Trevally', 'White-tail Shark prowlers', 'Coral Trout'],
        tackle: '150g – 180g glow zebra jigs',
        tactics: 'Drop along the current edge of the submerged pinnacle during early dawn.'
      }
    ],
    castingSpots: [
      {
        name: 'Rasdhoo Barrier Reef Outer Crest',
        depth: '2m – 12m',
        coordinates: '4.265°N, 72.990°E',
        targetSpecies: ['Giant Trevally (GT)', 'Bluefin Trevally', 'Red Bass'],
        tackle: '130g – 170g Floating stickbaits (sardine/flying fish pattern)',
        tactics: 'Long casts over the reef crest into the surging ocean swell. Keep the rod tip high.'
      },
      {
        name: 'Ukulhas Channel Head Point',
        depth: '2m – 18m',
        coordinates: '4.215°N, 72.860°E',
        targetSpecies: ['Giant Trevally', 'Spanish Mackerel', 'Barracuda'],
        tackle: '120g – 150g Cup poppers, erratic twitch retrieve',
        tactics: 'Target the current line where lagoon water mixes with the outer channel.'
      }
    ]
  },
  'Alif Dhaalu': {
    atollName: 'Alif Dhaalu (South Ari Atoll)',
    jiggingSpots: [
      {
        name: 'Dhigurah Ocean Drop-off',
        depth: '60m – 140m',
        coordinates: '3.520°N, 72.935°E',
        targetSpecies: ['Dogtooth Tuna', 'Yellowfin Tuna', 'Giant Trevally'],
        tackle: '200g Knife jigs, high speed mechanical retrieve',
        tactics: 'Work the outer oceanic drop where pelagic schools migrate along the southern atoll rim.'
      },
      {
        name: 'Kudarah Thila Edge',
        depth: '40m – 80m',
        coordinates: '3.585°N, 72.910°E',
        targetSpecies: ['Amberjack', 'Ruby Snapper', 'Trevally'],
        tackle: '160g – 220g Slow pitch jigs',
        tactics: 'Fish deep current seams outside protected boundaries where bait aggregations peak.'
      }
    ],
    castingSpots: [
      {
        name: 'Dhigurah Long Faru Reef Edge',
        depth: '1m – 10m',
        coordinates: '3.530°N, 72.930°E',
        targetSpecies: ['Giant Trevally', 'Bluefin Trevally', 'Needlefish', 'Coral Trout'],
        tackle: '120g – 160g Floating stickbaits, barbless heavy trebles',
        tactics: 'Cast along the turquoise-to-deep-blue drop-off zone. Peak strikes occur during mid-flood tide.'
      }
    ]
  },
  'Baa': {
    atollName: 'Baa Atoll (Northern Waters)',
    jiggingSpots: [
      {
        name: 'Dhonfanu Thila Deep Pass',
        depth: '45m – 100m',
        coordinates: '5.170°N, 73.140°E',
        targetSpecies: ['Dogtooth Tuna', 'Amberjack', 'Giant Trevally', 'Grouper'],
        tackle: '180g – 250g vertical knife jigs, PE 4',
        tactics: 'Fast jigging on the deep channel slope when incoming current flows into the atoll.'
      },
      {
        name: 'Dharavandhoo Kandu Drop',
        depth: '55m – 120m',
        coordinates: '5.150°N, 73.135°E',
        targetSpecies: ['Dogtooth Tuna', 'Rusty Jobfish', 'Ruby Snapper'],
        tackle: '200g Slow pitch zebra jigs',
        tactics: 'Slow flutter along the 80m contour line during tidal transitions.'
      }
    ],
    castingSpots: [
      {
        name: 'Outer Hanifaru Barrier Breakers',
        depth: '2m – 15m',
        coordinates: '5.190°N, 73.160°E',
        targetSpecies: ['Giant Trevally (GT)', 'Bluefin Trevally', 'Red Bass'],
        tackle: '140g – 180g Cup poppers, heavy shock leader',
        tactics: 'Cast to the boiling white-water churn on the outer oceanic barrier reef.'
      }
    ]
  },
  'Gaafu Dhaalu': {
    atollName: 'Gaafu Dhaalu (Huvadhoo Deep Southern Atoll)',
    jiggingSpots: [
      {
        name: 'Huvadhoo Ocean Kandu (World\'s Deepest Atoll Passes)',
        depth: '70m – 160m',
        coordinates: '0.520°N, 73.010°E',
        targetSpecies: ['Dogtooth Tuna (Monsters 50kg+)', 'Amberjack', 'Ruby Snapper', 'Yellowfin'],
        tackle: '250g – 350g heavy knife jigs, PE 5–6, 100lb fluoro leader',
        tactics: 'Extreme deep current jigging in the central channel gap during strong tidal exchange.'
      }
    ],
    castingSpots: [
      {
        name: 'Blue Bowl & Beacons Outer Surf Reef Edge',
        depth: '2m – 16m',
        coordinates: '0.500°N, 73.020°E',
        targetSpecies: ['Giant Trevally (GT)', 'Black GT', 'Dogtooth Tuna on popper', 'Barracuda'],
        tackle: '160g – 200g Extra-heavy topwater poppers and diving stickbaits',
        tactics: 'Cast right along the edge of the peeling ocean swells where massive GTs cruise the foam.'
      }
    ]
  },
  'Gnaviyani': {
    atollName: 'Gnaviyani (Fuvahmulah Oceanic Island)',
    jiggingSpots: [
      {
        name: 'Fuvahmulah Deep Plateau (Oceanic Pinnacle)',
        depth: '60m – 220m',
        coordinates: '-0.300°S, 73.430°E',
        targetSpecies: ['Yellowfin Tuna', 'Dogtooth Tuna', 'Amberjack', 'Wahoo'],
        tackle: '250g – 350g Luminous speed jigs, PE 5–8',
        tactics: 'Drift over the south plateau where the isolated oceanic shelf drops into the 2000m abyss.'
      }
    ],
    castingSpots: [
      {
        name: 'Thoondu Point Breakers',
        depth: '3m – 20m sheer drop',
        coordinates: '-0.285°S, 73.415°E',
        targetSpecies: ['Giant Trevally', 'Wahoo', 'Yellowfin Tuna on topwater', 'Sailfish'],
        tackle: '150g – 190g Floating stickbaits, high-speed reel retrieve',
        tactics: 'Fuvahmulah has no lagoon barrier; cast straight into the open Indian Ocean surf.'
      }
    ]
  },
  'Seenu': {
    atollName: 'Seenu (Addu City & Gan - Southernmost)',
    jiggingSpots: [
      {
        name: 'Gan Pass (Kandu) Outer Drop-off',
        depth: '50m – 120m',
        coordinates: '-0.690°S, 73.165°E',
        targetSpecies: ['Dogtooth Tuna', 'Giant Trevally', 'Jobfish', 'Amberjack'],
        tackle: '200g – 280g knife jigs, fast rhythmic mechanical pump',
        tactics: 'Work the outer corner of the pass during the incoming equatorial current flow.'
      }
    ],
    castingSpots: [
      {
        name: 'Addu Barrier Reef Surf Break (Manta Point Edge)',
        depth: '2m – 15m',
        coordinates: '-0.680°S, 73.170°E',
        targetSpecies: ['Giant Trevally (GT)', 'Bluefin Trevally', 'Barracuda'],
        tackle: '140g – 180g Chugger poppers with deep cup',
        tactics: 'Target the outer reef teeth where swells crash and create heavy white water froth.'
      }
    ]
  }
};

/**
 * Generic oceanic fallback hotspots when location is outside specific catalogued atolls
 */
export function getFallbackHotspots(lat, lon, portName) {
  const roundedLat = parseFloat(lat || 4.175).toFixed(3);
  const roundedLon = parseFloat(lon || 73.509).toFixed(3);
  return {
    atollName: portName || 'Maldives Oceanic Passage',
    jiggingSpots: [
      {
        name: `${portName || 'Atoll'} Outer Channel Drop-Off (Kandu Edge)`,
        depth: '50m – 120m',
        coordinates: `${roundedLat}°N, ${roundedLon}°E`,
        targetSpecies: ['Dogtooth Tuna', 'Giant Trevally', 'Amberjack', 'Ruby Snapper'],
        tackle: '180g – 250g Slow pitch and speed jigs, PE 3–4, 80lb leader',
        tactics: 'Locate the outer channel entrance where atoll water flushes into deep open ocean. Work vertical drops during peak tidal current.'
      },
      {
        name: `${portName || 'Atoll'} Submerged Pinnacle (Thila Edge)`,
        depth: '35m – 80m',
        coordinates: `${roundedLat}°N, ${roundedLon}°E`,
        targetSpecies: ['Jobfish', 'Coronation Trout', 'Grouper', 'Trevally'],
        tackle: '150g – 200g Zebra glow slow pitch jigs',
        tactics: 'Target the upcurrent face of underwater sea-mounts where bait aggregations gather.'
      }
    ],
    castingSpots: [
      {
        name: `${portName || 'Atoll'} Outer Barrier Faru Reef Crest`,
        depth: '1m – 12m',
        coordinates: `${roundedLat}°N, ${roundedLon}°E`,
        targetSpecies: ['Giant Trevally (GT)', 'Bluefin Trevally', 'Red Bass', 'Barracuda'],
        tackle: '130g – 170g Floating stickbaits & cup poppers, PE 6–8 braid',
        tactics: 'Cast directly into breaking white water wash along the outer barrier reef during incoming flood tide.'
      }
    ]
  };
}

/**
 * Evaluates Comprehensive Oceanographic & Meteorological Sportfishing Conditions
 * Outputs exact Best Time for Jigging and Casting, with hourly bite curves (0 - 100)
 */
export function evaluateFishingConditions(marineReport, tideData, moonPhase, location) {
  if (!marineReport || !marineReport.timeline || marineReport.timeline.length === 0) {
    return null;
  }

  const timeline = marineReport.timeline;
  const current = marineReport.current;
  const locName = location?.name || 'Maldives';
  const locAtoll = location?.atoll || 'Kaafu';

  // Find Hotspots for current location
  const atollKey = Object.keys(MALDIVES_FISHING_HOTSPOTS).find(k => 
    locAtoll.toLowerCase().includes(k.toLowerCase()) || 
    locName.toLowerCase().includes(k.toLowerCase())
  );
  const hotspots = atollKey ? MALDIVES_FISHING_HOTSPOTS[atollKey] : getFallbackHotspots(location?.latitude, location?.longitude, locName);

  // Hourly evaluation for 24 hours
  const hourlyScores = [];
  let highestJigScore = -1;
  let highestCastScore = -1;

  timeline.forEach((slot, index) => {
    const timeStr = slot.time;
    const hourDate = new Date(timeStr);
    const hour = hourDate.getHours();
    const isDay = hour >= 6 && hour < 18;
    const isDawn = hour >= 5 && hour <= 8;
    const isDusk = hour >= 16 && hour <= 19;
    const isMidday = hour >= 10 && hour <= 14;

    // Environmental parameters for this hour
    const waveH = slot.waveHeight ?? 0.8;
    const swellH = slot.swellHeight ?? 0.7;
    const swellP = slot.swellPeriod ?? 8;
    const windWaveH = slot.windWaveHeight ?? 0.3;
    const windSpeed = slot.windSpeed ?? 10;
    const windGusts = slot.windGusts ?? windSpeed;
    const currentSpeedKnots = slot.oceanCurrentSpeedKnots ?? 0.8;
    const uvIdx = slot.uvIndex ?? 0;
    const precip = slot.precipitation ?? 0;
    const pressure = slot.surfacePressure ?? 1011.5;

    // Tidal rate of change (|dh/dt| in cm/hr)
    let tidalFlowRate = 8.0;
    let tideStage = 'Mid Tide';
    if (tideData && tideData.tideCurve && tideData.tideCurve.curvePoints) {
      const pt = tideData.tideCurve.curvePoints[index] || tideData.tideCurve.curvePoints[0];
      if (pt) {
        tidalFlowRate = Math.abs(pt.rateCmPerHr || 6.0);
        tideStage = pt.trend || 'Moving';
      }
    }

    // Solunar factor from Moon Phase
    let solunarBonus = 10;
    if (moonPhase) {
      if (moonPhase.tideType?.includes('Spring') || moonPhase.phase < 0.05 || (moonPhase.phase > 0.45 && moonPhase.phase < 0.55)) {
        solunarBonus = 20; // High feeding surge around New and Full Moon
      } else if (moonPhase.tideType?.includes('Neap')) {
        solunarBonus = 5;
      } else {
        solunarBonus = 12;
      }
    }

    // -------------------------------------------------------------
    // A. JIGGING BITE SCORE CALCULATION (Deep water, Kandus, Thilas)
    // -------------------------------------------------------------
    let jigScore = 50;

    // Tidal flow factor (Max 25 pts)
    if (tidalFlowRate >= 8 && tidalFlowRate <= 25) jigScore += 25; // Prime moving water
    else if (tidalFlowRate >= 4) jigScore += 16;
    else if (tidalFlowRate < 3) jigScore -= 15; // Slack water lockjaw!

    // Oceanic current speed factor (Max 15 pts)
    if (currentSpeedKnots >= 0.5 && currentSpeedKnots <= 1.6) jigScore += 15;
    else if (currentSpeedKnots < 0.3) jigScore += 2; // Weak drift
    else if (currentSpeedKnots > 2.2) jigScore -= 10; // Excessive boat drift

    // Wind chop & drift management (Max 15 pts)
    if (windWaveH <= 0.6 && windSpeed <= 14) jigScore += 15; // Vertical presentation achievable
    else if (windWaveH <= 1.1) jigScore += 8;
    else if (windWaveH > 1.5) jigScore -= 14; // High drift angle

    // Diurnal feeding windows (Max 15 pts)
    if (isDawn) jigScore += 15;
    else if (isDusk) jigScore += 14;
    else if (isDay && !isMidday) jigScore += 8;
    else if (isMidday) jigScore += 2; // Deep fish retreat to 120m+ depths

    // Pressure stability (Max 10 pts)
    if (pressure >= 1010 && pressure <= 1014) jigScore += 10;
    else if (pressure < 1008) jigScore -= 8; // Storm squall coming

    // Solunar alignment (Max 15 pts)
    jigScore += (solunarBonus * 0.75);

    // Weather penalty (Squall rain)
    if (precip > 2.0) jigScore -= 12;

    jigScore = Math.max(15, Math.min(98, Math.round(jigScore)));

    // -------------------------------------------------------------
    // B. CASTING BITE SCORE CALCULATION (Reef crests, Popping, Stickbaits)
    // -------------------------------------------------------------
    let castScore = 50;

    // Swell & White-water wash factor (Max 25 pts)
    if (swellH >= 0.8 && swellH <= 1.6 && swellP >= 7) {
      castScore += 25; // Perfect oxygenated surf froth on the reef drop!
    } else if (swellH >= 0.5 && swellH < 0.8) {
      castScore += 14; // Decent chop
    } else if (swellH > 2.0) {
      castScore -= 12; // Dangerous reef wash
    } else {
      castScore += 5; // Flat calm
    }

    // Tidal stage factor (Max 20 pts)
    if (tideStage.includes('Rising') || tideStage.includes('Flood')) {
      castScore += 20; // Prime flood tide pushing baitfish over shallow coral tables
    } else if (tidalFlowRate >= 5) {
      castScore += 12;
    } else {
      castScore -= 6; // Low tide
    }

    // Solar UV & Glare factor (Max 18 pts)
    if (isDawn || isDusk) {
      castScore += 18; // Low-light surface strikes
    } else if (uvIdx <= 4 && isDay) {
      castScore += 14; // Overcast cloud cover allows aggressive topwater chases
    } else if (isMidday && uvIdx >= 8) {
      castScore -= 12; // Scorching tropical glare; GTs sit deep
    } else if (isDay) {
      castScore += 6;
    }

    // Wind speed for casting accuracy (Max 12 pts)
    if (windSpeed >= 7 && windSpeed <= 16 && windGusts < 22) {
      castScore += 12; // Great casting breeze
    } else if (windSpeed > 20) {
      castScore -= 10; // Difficult to pop large cup poppers in strong headwinds
    } else {
      castScore += 6;
    }

    // Solunar alignment (Max 15 pts)
    castScore += (solunarBonus * 0.75);

    // Weather squall penalty
    if (precip > 2.0) castScore -= 10;

    castScore = Math.max(15, Math.min(99, Math.round(castScore)));

    const slotInfo = {
      time: slot.time,
      displayTime: slot.displayTime,
      hour,
      isDay,
      jigScore,
      castScore,
      waveH,
      swellH,
      windSpeed,
      currentSpeedKnots,
      uvIdx,
      tideStage,
      tidalFlowRate: tidalFlowRate.toFixed(1)
    };

    hourlyScores.push(slotInfo);

    if (jigScore > highestJigScore) {
      highestJigScore = jigScore;
    }
    if (castScore > highestCastScore) {
      highestCastScore = castScore;
    }
  });

  // Calculate contiguous best windows
  const jigWindow = findContiguousBestWindow(hourlyScores, 'jigScore', 3);
  const castWindow = findContiguousBestWindow(hourlyScores, 'castScore', 3);

  // Overall current bite rating
  const currentJigScore = hourlyScores[0]?.jigScore || 70;
  const currentCastScore = hourlyScores[0]?.castScore || 70;
  const overallBiteRating = Math.round((currentJigScore * 0.5) + (currentCastScore * 0.5));

  let biteLevel = 'Good Activity';
  let biteBadgeColor = 'var(--sea-green)';
  if (overallBiteRating >= 85) {
    biteLevel = 'Peak Solunar Feeding Frenzy';
    biteBadgeColor = '#00f0ff';
  } else if (overallBiteRating >= 72) {
    biteLevel = 'Very High Bite Potential';
    biteBadgeColor = 'var(--sea-green)';
  } else if (overallBiteRating >= 55) {
    biteLevel = 'Moderate Feeding Activity';
    biteBadgeColor = '#ffb830';
  } else {
    biteLevel = 'Slow / Slack Tide Period';
    biteBadgeColor = 'var(--storm-red)';
  }

  return {
    overallBiteRating,
    biteLevel,
    biteBadgeColor,
    currentJigScore,
    currentCastScore,
    hotspots,
    hourlyScores,
    bestJiggingWindow: {
      startTime: jigWindow.startTime,
      endTime: jigWindow.endTime,
      peakScore: jigWindow.peakScore,
      averageScore: jigWindow.avgScore,
      rationale: generateJiggingRationale(jigWindow, current),
      targetDepths: '50m – 130m Channel Drop-offs & Thilas',
      targetSpecies: ['Dogtooth Tuna', 'Giant Trevally (GT)', 'Amberjack', 'Ruby Snapper', 'Coral Trout'],
      recommendedTackle: '180g – 250g Slow Pitch & Knife Jigs (Zebra Lumo / Pink Silver), PE 3–5 line, 80lb shock leader',
      currentDriftAdvice: (current.oceanCurrentSpeedKnots || 0.8) > 1.2 ? 'Heavy current: Use 250g+ streamlined knife jigs to reach the bottom vertically.' : 'Ideal drift: Slow pitch fluttering jigs with 3-pitch cadence.'
    },
    bestCastingWindow: {
      startTime: castWindow.startTime,
      endTime: castWindow.endTime,
      peakScore: castWindow.peakScore,
      averageScore: castWindow.avgScore,
      rationale: generateCastingRationale(castWindow, current),
      targetZones: 'Outer Barrier Reef Crests (Faru) & Breaking Surf Wash',
      targetSpecies: ['Giant Trevally (GT)', 'Bluefin Trevally', 'Red Bass', 'Barracuda', 'Coral Trout'],
      recommendedTackle: '130g – 180g Cup-Faced Poppers & Floating Stickbaits, PE 6–8 braid, 130lb mono shock leader',
      surfAdvice: (current.swellHeight || 0.7) >= 1.0 ? 'Superb white water wash on the reef crest masks leader and triggers aggressive surface ambushes.' : 'Glassy surface: Use floating stickbaits with long sweep-and-pause retrieve.'
    }
  };
}

function findContiguousBestWindow(hourlyScores, scoreKey, windowLength = 3) {
  if (!hourlyScores || hourlyScores.length === 0) {
    return { startTime: '06:00', endTime: '09:00', avgScore: 80, peakScore: 85 };
  }

  let bestAvg = -1;
  let bestStartIndex = 0;

  for (let i = 0; i <= hourlyScores.length - windowLength; i++) {
    let sum = 0;
    for (let j = 0; j < windowLength; j++) {
      sum += hourlyScores[i + j][scoreKey];
    }
    const avg = sum / windowLength;
    if (avg > bestAvg) {
      bestAvg = avg;
      bestStartIndex = i;
    }
  }

  const startSlot = hourlyScores[bestStartIndex];
  const endSlot = hourlyScores[Math.min(hourlyScores.length - 1, bestStartIndex + windowLength - 1)];
  const peakInWin = Math.max(...hourlyScores.slice(bestStartIndex, bestStartIndex + windowLength).map(s => s[scoreKey]));

  return {
    startTime: startSlot.displayTime,
    endTime: endSlot.displayTime,
    avgScore: Math.round(bestAvg),
    peakScore: peakInWin,
    startSlot,
    endSlot
  };
}

function generateJiggingRationale(win, current) {
  const curKn = current.oceanCurrentSpeedKnots || 0.8;
  const wave = current.waveHeight || 0.8;
  return `Peak jigging window combines strong water exchange with manageable vertical boat drift (${curKn} kn current, ${wave}m sea wave). Dogtooth tuna and giant trevally actively patrol channel drops as baitfish get compressed against outer atoll reef ledges.`;
}

function generateCastingRationale(win, current) {
  const swell = current.swellHeight || 0.7;
  return `Optimal casting window aligns with favorable low-glare surface conditions and ${swell}m swell generating oxygenated white water along the barrier reef crest. Apex predators (GTs and red bass) push up from the depths to pin bait onto the shallow reef flat.`;
}
