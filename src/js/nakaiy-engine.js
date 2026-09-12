// Traditional Maldivian Nakaiy (Monsoon Calendar) Astronomical Engine
// Calculates the 27 Nakaiy periods of the Maldives (Hulhangu & Iruvai Monsoons)
// Integrates centuries of Maldivian seafaring wisdom ("Kanduvikun") for algorithmic fishing intelligence.

export const NAKAIY_CALENDAR = [
  // IRUVAI MONSOON (North-East Monsoon • 9 Nakaiy • Dec 10 to Apr 7)
  {
    id: 'mula',
    name: 'Mula',
    thaana: 'މުލަ',
    monsoon: 'Iruvai',
    monsoonThaana: 'އިރުވައި',
    monsoonFull: 'Iruvai Monsoon (North-East)',
    startMonth: 12, startDay: 10,
    endMonth: 12, endDay: 22,
    durationDays: 13,
    weatherPattern: 'Strong NE winds, choppy outer seas, clear skies.',
    fishingLore: 'Traditional wahoo and yellowfin tuna trolling outside atolls. Pelagics hunt bait pushed westward by the NE currents.',
    preferredTechnique: 'Pelagic Trolling & Deep Drop',
    recommendedTackle: 'High-speed trolling skirts, 250g vertical knife jigs',
    targetSpecies: ['Wahoo', 'Yellowfin Tuna', 'Sailfish', 'Dogtooth Tuna'],
    bestLocations: 'Eastern & Southeastern atoll oceanic drop-offs',
    scoreModifiers: { jigging: 10, casting: 6, trolling: 18, nightFishing: 8 }
  },
  {
    id: 'furahalha',
    name: 'Furahalha',
    thaana: 'ފުރަހަޅަ',
    monsoon: 'Iruvai',
    monsoonThaana: 'އިރުވައި',
    monsoonFull: 'Iruvai Monsoon (North-East)',
    startMonth: 12, startDay: 23,
    endMonth: 1, endDay: 5,
    durationDays: 14,
    weatherPattern: 'Strong continuous breeze, energetic oceanic swells, cooling dry air.',
    fishingLore: 'High pelagic activity. Large schools of skipjack and yellowfin tuna feed along channel entrances and deep canyons.',
    preferredTechnique: 'Deep Jigging & Trolling',
    recommendedTackle: '220g – 300g Glow/Silver speed jigs, wire assist',
    targetSpecies: ['Yellowfin Tuna', 'Amberjack', 'Dogtooth Tuna', 'Mahi-Mahi'],
    bestLocations: 'Outer oceanic channel mouths (Kandu Olhi)',
    scoreModifiers: { jigging: 15, casting: 8, trolling: 16, nightFishing: 10 }
  },
  {
    id: 'uthura-halha',
    name: 'Uthura-halha',
    thaana: 'އުތުރާޅަ',
    monsoon: 'Iruvai',
    monsoonThaana: 'އިރުވައި',
    monsoonFull: 'Iruvai Monsoon (North-East)',
    startMonth: 1, startDay: 6,
    endMonth: 1, endDay: 18,
    durationDays: 13,
    weatherPattern: 'Clear azure skies, steady moderate NE trade breeze.',
    fishingLore: 'Sailfish and Mahi-Mahi (Fiyala) congregate on current rips. Fast morning trolling and reef crest popping yield explosive strikes.',
    preferredTechnique: 'Topwater Casting & Trolling',
    recommendedTackle: '140g – 180g Diving stickbaits, bird teasers and ballyhoo rigs',
    targetSpecies: ['Sailfish', 'Giant Trevally (GT)', 'Mahi-Mahi', 'Barracuda'],
    bestLocations: 'Outer barrier faru edges and blue-water current rips',
    scoreModifiers: { jigging: 10, casting: 16, trolling: 18, nightFishing: 10 }
  },
  {
    id: 'huvan',
    name: 'Huvan',
    thaana: 'ހުވަން',
    monsoon: 'Iruvai',
    monsoonThaana: 'އިރުވައި',
    monsoonFull: 'Iruvai Monsoon (North-East)',
    startMonth: 1, startDay: 19,
    endMonth: 1, endDay: 31,
    durationDays: 13,
    weatherPattern: 'Calm seas, gentle breeze, brilliant sunny days, crystal clear visibility.',
    fishingLore: 'Legendary all-round fishing Nakaiy. Calm lagoons and channels allow perfect boat control for precision casting and jigging.',
    preferredTechnique: 'Topwater Casting & Sight Fishing',
    recommendedTackle: '130g Floating cup poppers, light PE 3–4 casting outfits',
    targetSpecies: ['Giant Trevally', 'Bluefin Trevally', 'Coral Trout', 'Jobfish'],
    bestLocations: 'Shallow reef passes, submerged thilas, and coral reef crests',
    scoreModifiers: { jigging: 14, casting: 20, trolling: 12, nightFishing: 15 }
  },
  {
    id: 'dhinasha',
    name: 'Dhinasha',
    thaana: 'ދިނަޝަ',
    monsoon: 'Iruvai',
    monsoonThaana: 'އިރުވައި',
    monsoonFull: 'Iruvai Monsoon (North-East)',
    startMonth: 2, startDay: 1,
    endMonth: 2, endDay: 13,
    durationDays: 13,
    weatherPattern: 'Pleasant NE breeze, glassy morning seas with afternoon sea-breeze.',
    fishingLore: 'Superb for reef drop-off popping and bottom fishing. Baitfish cluster around outer atoll corners.',
    preferredTechnique: 'Topwater Casting & Slow Pitch Jigging',
    recommendedTackle: '150g Stickbaits, 180g slow pitch zebra flutter jigs',
    targetSpecies: ['Giant Trevally', 'Red Bass', 'Ruby Snapper', 'Green Jobfish'],
    bestLocations: 'Channel corners (Kandu Koli) and outer reef points',
    scoreModifiers: { jigging: 16, casting: 18, trolling: 12, nightFishing: 14 }
  },
  {
    id: 'hiyavihaa',
    name: 'Hiyavihaa',
    thaana: 'ހިޔަވީހަ',
    monsoon: 'Iruvai',
    monsoonThaana: 'އިރުވައި',
    monsoonFull: 'Iruvai Monsoon (North-East)',
    startMonth: 2, startDay: 14,
    endMonth: 2, endDay: 26,
    durationDays: 13,
    weatherPattern: 'Gentle breeze, warm calm seas, ideal ocean navigation.',
    fishingLore: 'Apex billfish peak! Sailfish and marlin hunt along the 1000m oceanic shelf. Dogtooth tuna rise to shallow ledges at dusk.',
    preferredTechnique: 'Pelagic Trolling & Deep Jigging',
    recommendedTackle: 'Skirted trolling lures, 200g – 250g slow pitch jigs',
    targetSpecies: ['Sailfish', 'Dogtooth Tuna', 'Yellowfin Tuna', 'Wahoo'],
    bestLocations: 'Deep oceanic drop-offs and isolated seamounts',
    scoreModifiers: { jigging: 18, casting: 12, trolling: 20, nightFishing: 12 }
  },
  {
    id: 'fura-badhuruvaa',
    name: 'Fura-badhuruvaa',
    thaana: 'ފުރަބަދުރ',
    monsoon: 'Iruvai',
    monsoonThaana: 'އިރުވައި',
    monsoonFull: 'Iruvai Monsoon (North-East)',
    startMonth: 2, startDay: 27,
    endMonth: 3, endDay: 11,
    durationDays: 13,
    weatherPattern: 'Warm sunny days, light wind, exceptional water clarity.',
    fishingLore: 'Large schools of yellowfin tuna aggregate around FADs and oceanic current convergences. Seabirds work dense bait balls.',
    preferredTechnique: 'Offshore Tuna Popping & Jigging',
    recommendedTackle: '100g – 140g sinking stickbaits, 200g pink glow jigs',
    targetSpecies: ['Yellowfin Tuna', 'Skipjack', 'Rainbow Runner', 'Dogtooth'],
    bestLocations: 'Open ocean current lines and oceanic channels',
    scoreModifiers: { jigging: 16, casting: 16, trolling: 16, nightFishing: 12 }
  },
  {
    id: 'fas-badhuruvaa',
    name: 'Fas-badhuruvaa',
    thaana: 'ފަސްބަދުރ',
    monsoon: 'Iruvai',
    monsoonThaana: 'އިރުވައި',
    monsoonFull: 'Iruvai Monsoon (North-East)',
    startMonth: 3, startDay: 12,
    endMonth: 3, endDay: 25,
    durationDays: 14,
    weatherPattern: 'Glassy mirror seas ("Kandu Thelhee"), minimal wind, tropical heat.',
    fishingLore: 'The premier deep jigging Nakaiy of the year! Zero drift enables vertical presentation in 80m–180m for monster ruby snapper and dogtooth.',
    preferredTechnique: 'Deep Vertical Jigging (Premier)',
    recommendedTackle: '180g – 250g Slow pitch jigs, PE 2.5–4 line, 60–80lb fluorocarbon',
    targetSpecies: ['Ruby Snapper', 'Dogtooth Tuna', 'Rusty Jobfish', 'Coronation Trout', 'Grouper'],
    bestLocations: 'Deep channel ledges, deep seamounts (Fushi Thila), and oceanic drop-offs',
    scoreModifiers: { jigging: 24, casting: 8, trolling: 8, nightFishing: 20 }
  },
  {
    id: 'reyvaa',
    name: 'Reyvaa',
    thaana: 'ރޭވަ',
    monsoon: 'Iruvai',
    monsoonThaana: 'އިރުވައި',
    monsoonFull: 'Iruvai Monsoon (North-East)',
    startMonth: 3, startDay: 26,
    endMonth: 4, endDay: 7,
    durationDays: 13,
    weatherPattern: 'End of Iruvai, hot days, occasional thermal clouds and light afternoon squalls.',
    fishingLore: 'Spectacular night fishing and twilight reef casting. Emperor, snapper, and jacks feed voraciously on reef flats before monsoon change.',
    preferredTechnique: 'Night Reef Handlining & Twilight Popping',
    recommendedTackle: 'Circle hooks with fresh squid bait, 150g poppers at dawn/dusk',
    targetSpecies: ['Red Snapper', 'Spangled Emperor', 'Giant Trevally', 'Barracuda'],
    bestLocations: 'Outer reef flats, channel mouths, and lagoon pinnacles',
    scoreModifiers: { jigging: 12, casting: 14, trolling: 10, nightFishing: 22 }
  },

  // HULHANGU MONSOON (South-West Monsoon • 18 Nakaiy • Apr 8 to Dec 9)
  {
    id: 'assidha',
    name: 'Assidha',
    thaana: 'އައްސިދަ',
    monsoon: 'Hulhangu',
    monsoonThaana: 'ހުޅަނގު',
    monsoonFull: 'Hulhangu Monsoon (South-West)',
    startMonth: 4, startDay: 8,
    endMonth: 4, endDay: 21,
    durationDays: 14,
    weatherPattern: 'Onset of SW monsoon. Sudden gusty squalls ("Asidha Kolhi"), thunderstorms, then calm intervals.',
    fishingLore: 'First storms push deep ocean nutrient upwellings onto western atoll slopes. Pelagics attack aggressively around squall edges.',
    preferredTechnique: 'Trolling & Outer Channel Jigging',
    recommendedTackle: 'Heavy diving minnows (Rapala X-Rap Magnums), 250g knife jigs',
    targetSpecies: ['Dogtooth Tuna', 'Wahoo', 'Yellowfin Tuna', 'Giant Trevally'],
    bestLocations: 'Western atoll outer channels and leeward drop-offs',
    scoreModifiers: { jigging: 14, casting: 10, trolling: 16, nightFishing: 8 }
  },
  {
    id: 'burunu',
    name: 'Burunu',
    thaana: 'ބުރުނު',
    monsoon: 'Hulhangu',
    monsoonThaana: 'ހުޅަނގު',
    monsoonFull: 'Hulhangu Monsoon (South-West)',
    startMonth: 4, startDay: 22,
    endMonth: 5, endDay: 5,
    durationDays: 14,
    weatherPattern: 'Strong SW wind gusts, choppy seas, robust oceanic swells.',
    fishingLore: 'Fast tidal currents sweep through Kandu channels. Dogtooth tuna school in turbulent current rips to ambush migrating bait.',
    preferredTechnique: 'Deep Heavy Jigging',
    recommendedTackle: '250g – 320g Streamlined speed knife jigs, PE 4–6, 100lb leader',
    targetSpecies: ['Dogtooth Tuna (30kg+)', 'Giant Trevally', 'Amberjack', 'Bigeye Trevally'],
    bestLocations: 'Central and northern channel drops (Kandu ledges)',
    scoreModifiers: { jigging: 20, casting: 10, trolling: 12, nightFishing: 6 }
  },
  {
    id: 'kethi',
    name: 'Kethi',
    thaana: 'ކެތި',
    monsoon: 'Hulhangu',
    monsoonThaana: 'ހުޅަނގު',
    monsoonFull: 'Hulhangu Monsoon (South-West)',
    startMonth: 5, startDay: 6,
    endMonth: 5, endDay: 19,
    durationDays: 14,
    weatherPattern: 'Dark overcast skies, continuous showers, reduced glare.',
    fishingLore: 'Low light levels make Giant Trevally and Red Bass lose their daytime wariness. Topwater strikes occur all day long on reef flats.',
    preferredTechnique: 'All-Day Topwater Popping',
    recommendedTackle: '140g – 180g Cup-face poppers, dark silhouette lures',
    targetSpecies: ['Giant Trevally (GT)', 'Red Bass', 'Bluefin Trevally', 'Coral Trout'],
    bestLocations: 'Reef crest breakers and shallow coral terraces',
    scoreModifiers: { jigging: 10, casting: 22, trolling: 10, nightFishing: 8 }
  },
  {
    id: 'roanu',
    name: 'Roanu',
    thaana: 'ރޯނު',
    monsoon: 'Hulhangu',
    monsoonThaana: 'ހުޅަނގު',
    monsoonFull: 'Hulhangu Monsoon (South-West)',
    startMonth: 5, startDay: 20,
    endMonth: 6, endDay: 2,
    durationDays: 14,
    weatherPattern: 'High winds, rough oceanic seas, heavy western swells.',
    fishingLore: 'Outside oceanic reefs are turbulent. Maldivian skippers target protected inner-atoll thilas and sheltered lagoon pinnacles.',
    preferredTechnique: 'Protected Lagoon Jigging & Thila Casting',
    recommendedTackle: '120g – 160g Flutter jigs, sinking minnows',
    targetSpecies: ['Coronation Trout', 'Grouper', 'Bluefin Trevally', 'Rusty Jobfish'],
    bestLocations: 'Protected internal atoll thilas and eastern lee reef slopes',
    scoreModifiers: { jigging: 14, casting: 12, trolling: 6, nightFishing: 12 }
  },
  {
    id: 'miaheli',
    name: 'Miaheli',
    thaana: 'މިއަހެލި',
    monsoon: 'Hulhangu',
    monsoonThaana: 'ހުޅަނގު',
    monsoonFull: 'Hulhangu Monsoon (South-West)',
    startMonth: 6, startDay: 3,
    endMonth: 6, endDay: 16,
    durationDays: 14,
    weatherPattern: 'Rough stormy sea, strong southwest squalls, powerful surge.',
    fishingLore: 'Fish deep current seams inside wide atoll passes. Large snapper and groupers shelter in undercut caves and feed on flushed bait.',
    preferredTechnique: 'Heavy Deep Dropping & Bottom Jigging',
    recommendedTackle: '300g Glow jigs, heavy bottom rigs with cut bonito',
    targetSpecies: ['Giant Grouper', 'Ruby Snapper', 'Dogtooth Tuna', 'Jobfish'],
    bestLocations: 'Deep pass bottoms (60m–120m) and leeward channel walls',
    scoreModifiers: { jigging: 16, casting: 6, trolling: 6, nightFishing: 10 }
  },
  {
    id: 'adha',
    name: 'Adha',
    thaana: 'އަދަ',
    monsoon: 'Hulhangu',
    monsoonThaana: 'ހުޅަނގު',
    monsoonFull: 'Hulhangu Monsoon (South-West)',
    startMonth: 6, startDay: 17,
    endMonth: 6, endDay: 30,
    durationDays: 14,
    weatherPattern: 'Strong SW breeze, high energy rolling ocean swells, good visibility between squalls.',
    fishingLore: 'Swells crashing against the outer barrier reef create massive oxygen-rich white water froth. GTs patrol the foam edge in packs.',
    preferredTechnique: 'Heavy Surf Barrier Popping',
    recommendedTackle: '160g – 200g High-chug poppers, PE 8 braid, 140lb leader',
    targetSpecies: ['Giant Trevally (GT)', 'Black GT', 'Dogtooth Tuna', 'Barracuda'],
    bestLocations: 'Outer barrier faru breakers and channel entrance wash',
    scoreModifiers: { jigging: 10, casting: 22, trolling: 10, nightFishing: 6 }
  },
  {
    id: 'funoas',
    name: 'Funoas',
    thaana: 'ފުނޯސް',
    monsoon: 'Hulhangu',
    monsoonThaana: 'ހުޅަނގު',
    monsoonFull: 'Hulhangu Monsoon (South-West)',
    startMonth: 7, startDay: 1,
    endMonth: 7, endDay: 14,
    durationDays: 14,
    weatherPattern: 'Frequent rain squalls, moderate to rough seas, cloudy.',
    fishingLore: 'Deep current drops remain productive. Pelagic tuna migrate through eastern channel corridors to escape western swell chop.',
    preferredTechnique: 'Eastern Channel Jigging & Trolling',
    recommendedTackle: '200g – 280g Zebra lumo jigs, deep diving plugs',
    targetSpecies: ['Yellowfin Tuna', 'Dogtooth Tuna', 'Amberjack', 'Wahoo'],
    bestLocations: 'Eastern leeward atoll channels and deep ledges',
    scoreModifiers: { jigging: 16, casting: 12, trolling: 14, nightFishing: 8 }
  },
  {
    id: 'fus',
    name: 'Fus',
    thaana: 'ފުސް',
    monsoon: 'Hulhangu',
    monsoonThaana: 'ހުޅަނގު',
    monsoonFull: 'Hulhangu Monsoon (South-West)',
    startMonth: 7, startDay: 15,
    endMonth: 7, endDay: 27,
    durationDays: 13,
    weatherPattern: 'Overcast skies, damp cool breeze, moderate chop.',
    fishingLore: 'Yellowfin tuna schools move close to atoll channels following bait aggregations. Excellent light-tackle casting and slow jigging.',
    preferredTechnique: 'Tuna Casting & Slow Pitch Jigging',
    recommendedTackle: '90g – 130g Sinking stickbaits, 180g flutter jigs',
    targetSpecies: ['Yellowfin Tuna', 'Skipjack', 'Bigeye Trevally', 'Jobfish'],
    bestLocations: 'Channel mouths and outer continental drop-offs',
    scoreModifiers: { jigging: 16, casting: 16, trolling: 14, nightFishing: 10 }
  },
  {
    id: 'ahuliha',
    name: 'Ahuliha',
    thaana: 'އަހުލިހަ',
    monsoon: 'Hulhangu',
    monsoonThaana: 'ހުޅަނގު',
    monsoonFull: 'Hulhangu Monsoon (South-West)',
    startMonth: 7, startDay: 28,
    endMonth: 8, endDay: 10,
    durationDays: 14,
    weatherPattern: 'Winds ease down into calm intervals, pleasant sunny spells between squalls.',
    fishingLore: 'High feeding frenzy across reef crests. Spanish mackerel and barracuda hunt actively around barrier reef points.',
    preferredTechnique: 'Topwater Popping & Medium Trolling',
    recommendedTackle: '140g Diving stickbaits, fast retrieved metal spoons',
    targetSpecies: ['Spanish Mackerel', 'Giant Trevally', 'Barracuda', 'Wahoo'],
    bestLocations: 'Outer reef corners and channel breaker lines',
    scoreModifiers: { jigging: 14, casting: 18, trolling: 16, nightFishing: 12 }
  },
  {
    id: 'maa',
    name: 'Maa',
    thaana: 'މާ',
    monsoon: 'Hulhangu',
    monsoonThaana: 'ހުޅަނގު',
    monsoonFull: 'Hulhangu Monsoon (South-West)',
    startMonth: 8, startDay: 11,
    endMonth: 8, endDay: 23,
    durationDays: 13,
    weatherPattern: 'Gusty westerly wind spells, scattered showers, moderate chop.',
    fishingLore: 'Submerged pinnacles (thilas) inside the atoll hold massive aggregations of fusiliers. Giant trevally and trout hunt on the current-facing edge.',
    preferredTechnique: 'Pinnacle (Thila) Jigging & Soft Plastics',
    recommendedTackle: '150g – 200g Slow pitch jigs, 7-inch soft paddle tails',
    targetSpecies: ['Coral Trout', 'Giant Trevally', 'Coronation Trout', 'Grouper'],
    bestLocations: 'Central atoll deep pinnacles (30m–70m depth)',
    scoreModifiers: { jigging: 18, casting: 12, trolling: 10, nightFishing: 12 }
  },
  {
    id: 'fura',
    name: 'Fura',
    thaana: 'ފުރަ',
    monsoon: 'Hulhangu',
    monsoonThaana: 'ހުޅަނގު',
    monsoonFull: 'Hulhangu Monsoon (South-West)',
    startMonth: 8, startDay: 24,
    endMonth: 9, endDay: 6,
    durationDays: 14,
    weatherPattern: 'Moderate pleasant breeze, sea conditions settling, bright intervals.',
    fishingLore: 'Baitfish schools (Miyaren & Rehi) pack channel entrances. Apex predators push bait against the reef wall during flood tide.',
    preferredTechnique: 'Channel Edge Casting & Jigging',
    recommendedTackle: '130g – 170g Floating stickbaits, 200g knife jigs',
    targetSpecies: ['Giant Trevally', 'Dogtooth Tuna', 'Bluefin Trevally', 'Sailfish'],
    bestLocations: 'Incoming channel mouths and outer drop-off walls',
    scoreModifiers: { jigging: 18, casting: 18, trolling: 14, nightFishing: 14 }
  },
  {
    id: 'uthura',
    name: 'Uthura',
    thaana: 'އުތުރަ',
    monsoon: 'Hulhangu',
    monsoonThaana: 'ހުޅަނގު',
    monsoonFull: 'Hulhangu Monsoon (South-West)',
    startMonth: 9, startDay: 7,
    endMonth: 9, endDay: 20,
    durationDays: 14,
    weatherPattern: 'Pleasant moderate westerly breeze, manageable ocean swells, clear blue water.',
    fishingLore: 'One of the finest sportfishing Nakaiy of Hulhangu! Clean ocean currents bring dogtooth tuna and GTs to outer ledges before sunset.',
    preferredTechnique: 'Deep Jigging & Sunset Topwater Popping',
    recommendedTackle: '200g – 280g Slow pitch & speed jigs, 150g cup-faced poppers',
    targetSpecies: ['Dogtooth Tuna (30kg+)', 'Giant Trevally (GT)', 'Amberjack', 'Ruby Snapper', 'Coral Trout'],
    bestLocations: 'Outer channel drop-offs (60m–140m) and barrier faru surf points',
    scoreModifiers: { jigging: 22, casting: 20, trolling: 14, nightFishing: 16 }
  },
  {
    id: 'atha',
    name: 'Atha',
    thaana: 'އަތަ',
    monsoon: 'Hulhangu',
    monsoonThaana: 'ހުޅަނގު',
    monsoonFull: 'Hulhangu Monsoon (South-West)',
    startMonth: 9, startDay: 21,
    endMonth: 10, endDay: 3,
    durationDays: 13,
    weatherPattern: 'Winds become variable and lighter, occasional fast moving showers.',
    fishingLore: 'Wahoo and Spanish mackerel patrol outer drop-offs. High-speed trolling along the 100-fathom curve produces fast strikes.',
    preferredTechnique: 'High-Speed Trolling & Deep Drop',
    recommendedTackle: 'Black/Purple trolling skirts, deep diving bibbed minnows',
    targetSpecies: ['Wahoo', 'Spanish Mackerel', 'Yellowfin Tuna', 'Barracuda'],
    bestLocations: 'Outer atoll boundary reefs and oceanic channel passages',
    scoreModifiers: { jigging: 16, casting: 14, trolling: 20, nightFishing: 14 }
  },
  {
    id: 'hitha',
    name: 'Hitha',
    thaana: 'ހިތަ',
    monsoon: 'Hulhangu',
    monsoonThaana: 'ހުޅަނގު',
    monsoonFull: 'Hulhangu Monsoon (South-West)',
    startMonth: 10, startDay: 4,
    endMonth: 10, endDay: 17,
    durationDays: 14,
    weatherPattern: 'Very calm seas, light gentle winds, warm sunny conditions.',
    fishingLore: 'Exceptional deep water jigging and peaceful night handlining. Low water resistance allows vertical slow pitch down to 150m.',
    preferredTechnique: 'Deep Slow Pitch Jigging & Night Bottom Fishing',
    recommendedTackle: '180g – 220g Slow pitch zebra lumo jigs, fresh squid cut bait',
    targetSpecies: ['Ruby Snapper', 'Rusty Jobfish', 'Dogtooth Tuna', 'Emperor', 'Grouper'],
    bestLocations: 'Deep oceanic canyons and submerged offshore plateaus',
    scoreModifiers: { jigging: 22, casting: 12, trolling: 10, nightFishing: 22 }
  },
  {
    id: 'hei',
    name: 'Hei',
    thaana: 'ހެއި',
    monsoon: 'Hulhangu',
    monsoonThaana: 'ހުޅަނގު',
    monsoonFull: 'Hulhangu Monsoon (South-West)',
    startMonth: 10, startDay: 18,
    endMonth: 10, endDay: 30,
    durationDays: 13,
    weatherPattern: 'Pleasant gentle breeze, clear skies, mild swell.',
    fishingLore: 'Reef fish activity surges as baitfish schools move from lagoons to the open reef drop. Ideal for sight casting on outer flats.',
    preferredTechnique: 'Reef Flat Casting & Light Jigging',
    recommendedTackle: '120g – 150g Floating stickbaits, 100g micro jigs',
    targetSpecies: ['Giant Trevally', 'Bluefin Trevally', 'Coral Trout', 'Jobfish'],
    bestLocations: 'Outer faru reef edges and internal sandy channels',
    scoreModifiers: { jigging: 16, casting: 18, trolling: 12, nightFishing: 16 }
  },
  {
    id: 'vihaa',
    name: 'Vihaa',
    thaana: 'ވިހާ',
    monsoon: 'Hulhangu',
    monsoonThaana: 'ހުޅަނގު',
    monsoonFull: 'Hulhangu Monsoon (South-West)',
    startMonth: 10, startDay: 31,
    endMonth: 11, endDay: 13,
    durationDays: 14,
    weatherPattern: 'Winds shift from SW to NW, occasional showers, transitional currents.',
    fishingLore: 'Currents start shifting between ocean sides. Pelagic schools gather near northern and western channel entrances.',
    preferredTechnique: 'Channel Current Drift Jigging',
    recommendedTackle: '220g Knife jigs, PE 4 braid, wire assist hooks',
    targetSpecies: ['Dogtooth Tuna', 'Yellowfin Tuna', 'Giant Trevally', 'Rainbow Runner'],
    bestLocations: 'Passage channels with strong incoming tidal stream',
    scoreModifiers: { jigging: 18, casting: 14, trolling: 14, nightFishing: 12 }
  },
  {
    id: 'nora',
    name: 'Nora',
    thaana: 'ނޮރަ',
    monsoon: 'Hulhangu',
    monsoonThaana: 'ހުޅަނގު',
    monsoonFull: 'Hulhangu Monsoon (South-West)',
    startMonth: 11, startDay: 14,
    endMonth: 11, endDay: 26,
    durationDays: 13,
    weatherPattern: 'Clashing gusty winds, transition turbulence, scattered storms.',
    fishingLore: 'Monsoon transition stirs up plankton blooms. Bait aggregations attract large dogtooth tuna to shallow channel mouths.',
    preferredTechnique: 'Passage Mouth Jigging & Heavy Popping',
    recommendedTackle: '250g Heavy jigs, 160g heavy poppers',
    targetSpecies: ['Dogtooth Tuna', 'Giant Trevally', 'Wahoo', 'Amberjack'],
    bestLocations: 'Channel mouths where lagoon current meets oceanic swell',
    scoreModifiers: { jigging: 16, casting: 16, trolling: 12, nightFishing: 10 }
  },
  {
    id: 'dhosha',
    name: 'Dhosha',
    thaana: 'ދޮޝަ',
    monsoon: 'Hulhangu',
    monsoonThaana: 'ހުޅަނގު',
    monsoonFull: 'Hulhangu Monsoon (South-West)',
    startMonth: 11, startDay: 27,
    endMonth: 12, endDay: 9,
    durationDays: 13,
    weatherPattern: 'Final gusty spells of Hulhangu before Iruvai sets in, shifting NE breeze.',
    fishingLore: 'Final transition phase. Pelagics feed aggressively on outer banks. High wahoo and tuna trolling success along outer reefs.',
    preferredTechnique: 'Outer Bank Trolling & Jigging',
    recommendedTackle: 'Heavy trolling skirts, 220g speed jigs',
    targetSpecies: ['Wahoo', 'Yellowfin Tuna', 'Dogtooth Tuna', 'Sailfish'],
    bestLocations: 'Outer boundary banks and deep drop-off shelves',
    scoreModifiers: { jigging: 16, casting: 12, trolling: 18, nightFishing: 12 }
  }
];

/**
 * Calculates active Maldivian Nakaiy for a given Date
 * @param {Date} [date=new Date()]
 * @returns {Object} Active Nakaiy details, dates, monsoon context, and traditional fishing wisdom
 */
export function getCurrentNakaiy(date = new Date()) {
  const target = new Date(date);
  const month = target.getMonth() + 1; // 1-12
  const day = target.getDate();

  for (const nakaiy of NAKAIY_CALENDAR) {
    if (nakaiy.startMonth === nakaiy.endMonth) {
      // Within the same month
      if (month === nakaiy.startMonth && day >= nakaiy.startDay && day <= nakaiy.endDay) {
        return formatNakaiyResult(nakaiy, target);
      }
    } else if (nakaiy.startMonth > nakaiy.endMonth) {
      // Crosses year boundary (Dec -> Jan, e.g. Furahalha: Dec 23 - Jan 5)
      if ((month === nakaiy.startMonth && day >= nakaiy.startDay) ||
        (month === nakaiy.endMonth && day <= nakaiy.endDay)) {
        return formatNakaiyResult(nakaiy, target);
      }
    } else {
      // Crosses month boundary (e.g. end of one month to start of next)
      if ((month === nakaiy.startMonth && day >= nakaiy.startDay) ||
        (month === nakaiy.endMonth && day <= nakaiy.endDay)) {
        return formatNakaiyResult(nakaiy, target);
      }
    }
  }

  // Default fallback if boundary edge
  return formatNakaiyResult(NAKAIY_CALENDAR[20], target); // Hey Nakaiy fallback
}

function formatNakaiyResult(nakaiy, currentDate) {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const startStr = `${nakaiy.startDay} ${monthNames[nakaiy.startMonth - 1]}`;
  const endStr = `${nakaiy.endDay} ${monthNames[nakaiy.endMonth - 1]}`;

  const calIndex = NAKAIY_CALENDAR.findIndex(n => n.id === nakaiy.id);
  const nextNakaiyObj = NAKAIY_CALENDAR[(calIndex + 1) % NAKAIY_CALENDAR.length];

  // Monsoon specific index
  const isIruvai = nakaiy.monsoon === 'Iruvai';
  const monsoonList = NAKAIY_CALENDAR.filter(n => n.monsoon === nakaiy.monsoon);
  const monsoonIdx = monsoonList.findIndex(n => n.id === nakaiy.id) + 1;

  // Squall risk assessment based on centuries of Maldivian seafaring lore
  let squallRisk = 'Moderate';
  let squallRiskColor = '#ffb830';
  if (['assidha', 'burunu', 'kethi', 'roanu', 'miyahelia', 'alha'].includes(nakaiy.id)) {
    squallRisk = 'High (Frequent Squall Spells)';
    squallRiskColor = '#ff3366';
  } else if (['huvan', 'dhinasha', 'hiyagala', 'reyva', 'bandaha', 'viha', 'nora'].includes(nakaiy.id)) {
    squallRisk = 'Low (Fair Weather & Glassy Seas)';
    squallRiskColor = '#10b981';
  } else {
    squallRisk = 'Moderate (Manageable Ocean Swells)';
    squallRiskColor = '#00f0ff';
  }

  // Prevailing wind tendency
  const prevailingWind = isIruvai
    ? 'North-East Trade Winds (NE to E • 8–18 kts) — Dry continuous breeze'
    : 'South-West Monsoon Flow (W to SW • 10–22 kts) — Moist oceanic maritime winds';

  const channelCrossingAdvisory = isIruvai
    ? 'Eastern atoll passes encounter oceanic chop; western atoll channels remain sheltered with calm water.'
    : 'Western atoll barrier reefs face primary Indian Ocean swell energy. Exercise caution in deep open channels (Kandu) during active cloud bursts.';

  return {
    ...nakaiy,
    calendarIndex: calIndex + 1,
    monsoonIndex: monsoonIdx,
    monsoonTotal: monsoonList.length,
    monsoonIndexStr: `${monsoonIdx} of ${monsoonList.length} (${nakaiy.monsoonFull})`,
    dateRangeStr: `${startStr} – ${endStr}`,
    isCurrent: true,
    monsoonColor: isIruvai ? '#00f0ff' : '#00e5a3',
    monsoonIcon: isIruvai ? 'fa-sun' : 'fa-cloud-rain',
    squallRisk,
    squallRiskColor,
    prevailingWind,
    channelCrossingAdvisory,
    nextNakaiy: {
      name: nextNakaiyObj.name,
      thaana: nextNakaiyObj.thaana,
      startDate: `${nextNakaiyObj.startDay} ${monthNames[nextNakaiyObj.startMonth - 1]}`
    }
  };
}
