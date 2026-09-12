// Maldivian Marine & Sportfishing Intelligence Engine
// Evaluates Solunar, Tidal Current, Swell White-Water, Barometric Pressure, UV Index
// and Traditional Maldivian Monsoon Calendar (Nakaiy / "Kanduvikun")
// Provides Single-Location / Atoll Sportfishing Intelligence, Spot Discovery, Modality Ranking & Best Times of Day

import { getCurrentNakaiy } from './nakaiy-engine.js?v=20260912-v7';

export const MALDIVES_ATOLL_LIST = [
  { code: 'Lh', key: 'Lhaviyani', name: 'Lhaviyani Atoll (Faadhippolhu)', shortName: 'Lh. Atoll', lat: 5.365, lon: 73.435, region: 'Northern Atolls' },
  { code: 'K', key: 'Kaafu', name: 'Kaafu Atoll (North & South Malé)', shortName: 'K. Atoll', lat: 4.175, lon: 73.509, region: 'Central Atolls' },
  { code: 'B', key: 'Baa', name: 'Baa Atoll (South Maalhosmadulu)', shortName: 'B. Atoll', lat: 5.158, lon: 73.131, region: 'Northern Atolls' },
  { code: 'AA', key: 'Alif Alif', name: 'Alif Alif (North Ari & Rasdhoo)', shortName: 'AA. Atoll', lat: 4.262, lon: 72.990, region: 'Central Western Atolls' },
  { code: 'ADh', key: 'Alif Dhaalu', name: 'Alif Dhaalu (South Ari Atoll)', shortName: 'ADh. Atoll', lat: 3.535, lon: 72.927, region: 'Central Western Atolls' },
  { code: 'HDh', key: 'Haa Dhaalu', name: 'Haa Dhaalu (Hanimaadhoo Waters)', shortName: 'HDh. Atoll', lat: 6.750, lon: 73.185, region: 'Far Northern Atolls' },
  { code: 'HA', key: 'Haa Alif', name: 'Haa Alif (Thiladhunmathi North)', shortName: 'HA. Atoll', lat: 6.980, lon: 72.950, region: 'Far Northern Atolls' },
  { code: 'Sh', key: 'Shaviyani', name: 'Shaviyani (Miladhunmadulu North)', shortName: 'Sh. Atoll', lat: 6.300, lon: 73.050, region: 'Northern Atolls' },
  { code: 'N', key: 'Noonu', name: 'Noonu (Miladhunmadulu South)', shortName: 'N. Atoll', lat: 5.850, lon: 73.250, region: 'Northern Atolls' },
  { code: 'R', key: 'Raa', name: 'Raa Atoll (North Maalhosmadulu)', shortName: 'R. Atoll', lat: 5.600, lon: 72.950, region: 'Northern Atolls' },
  { code: 'V', key: 'Vaavu', name: 'Vaavu Atoll (Felidhe • Fotteyo Ledge)', shortName: 'V. Atoll', lat: 3.550, lon: 73.550, region: 'Eastern Outer Rim' },
  { code: 'M', key: 'Meemu', name: 'Meemu Atoll (Mulaku Waters)', shortName: 'M. Atoll', lat: 2.950, lon: 73.550, region: 'Central Eastern Atolls' },
  { code: 'F', key: 'Faafu', name: 'Faafu Atoll (Nilandhe North)', shortName: 'F. Atoll', lat: 3.250, lon: 72.950, region: 'Central Western Atolls' },
  { code: 'Dh', key: 'Dhaalu', name: 'Dhaalu Atoll (Nilandhe South)', shortName: 'Dh. Atoll', lat: 2.850, lon: 72.950, region: 'Central Western Atolls' },
  { code: 'Th', key: 'Thaa', name: 'Thaa Atoll (Kolhumadulu)', shortName: 'Th. Atoll', lat: 2.350, lon: 73.150, region: 'Southern Central Atolls' },
  { code: 'L', key: 'Laamu', name: 'Laamu Atoll (Haddhunmathi)', shortName: 'L. Atoll', lat: 1.950, lon: 73.450, region: 'Southern Central Atolls' },
  { code: 'GA', key: 'Gaafu Alif', name: 'Gaafu Alif (North Huvadhoo)', shortName: 'GA. Atoll', lat: 0.750, lon: 73.350, region: 'Deep Southern Atolls' },
  { code: 'GDh', key: 'Gaafu Dhaalu', name: 'Gaafu Dhaalu (South Huvadhoo)', shortName: 'GDh. Atoll', lat: 0.520, lon: 73.010, region: 'Deep Southern Atolls' },
  { code: 'Gn', key: 'Gnaviyani', name: 'Gnaviyani (Fuvahmulah Oceanic Island)', shortName: 'Gn. Atoll', lat: -0.300, lon: 73.430, region: 'Equatorial Oceanic Island' },
  { code: 'S', key: 'Seenu', name: 'Seenu Atoll (Addu City & Gan)', shortName: 'S. Atoll', lat: -0.690, lon: 73.165, region: 'Southernmost Equatorial' }
];

export const MALDIVES_FISHING_HOTSPOTS = {
  'Lhaviyani': {
    atollName: 'Lhaviyani Atoll (Faadhippolhu • Lh. Atoll)',
    shortCode: 'Lh',
    description: 'Surrounded by oceanic trenches with strong tidal flushes through Felivaru and Kuredu channels. Legendary Dogtooth Tuna and GT casting territory.',
    jiggingSpots: [
      {
        name: 'Maafilaafushi Deep Channel Ledge (Kandu)',
        type: 'Oceanic Channel Drop',
        depth: '60m – 150m oceanic drop',
        coordinates: '5.365°N, 73.435°E',
        targetSpecies: ['Dogtooth Tuna (30kg+)', 'Giant Trevally (GT)', 'Amberjack', 'Ruby Snapper'],
        tackle: '220g – 320g Speed & Slow-pitch glow jigs, PE 4–6, 100lb fluoro leader',
        tactics: 'Drift the outer channel ledge during peak tidal flush. Dogtooth congregate on current eddies between 80m and 120m.'
      },
      {
        name: 'Kuredu Express & Felivaru Pass',
        type: 'Fast Current Channel',
        depth: '50m – 130m current drop-off',
        coordinates: '5.550°N, 73.470°E',
        targetSpecies: ['Yellowfin Tuna', 'Dogtooth Tuna', 'Bigeye Trevally', 'Sailfish'],
        tackle: '250g Knife jigs, high speed vertical mechanical jigging',
        tactics: 'Fish deep current rips as oceanic currents surge through the northern Lhaviyani channel corridor.'
      },
      {
        name: 'Faadhippolhu South-West Sea-Mount (Thila Pinnacle)',
        type: 'Submerged Seamount',
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
        type: 'Surf Barrier Reef',
        depth: '1.5m – 15m foaming break',
        coordinates: '5.360°N, 73.415°E',
        targetSpecies: ['Giant Trevally (GT)', 'Bluefin Trevally', 'Red Bass', 'Spanish Mackerel'],
        tackle: '140g – 180g Cup-face poppers, floating stickbaits, PE 8 braid, 130lb shock leader',
        tactics: 'Cast directly into breaking white water foam along the oceanic reef crest. Heavy violent chugs to entice cruising GT packs.'
      },
      {
        name: 'Kuredu Outer Reef Surf Point',
        type: 'Oceanic Blue-Water Drop',
        depth: '2m – 18m sheer drop',
        coordinates: '5.555°N, 73.480°E',
        targetSpecies: ['Giant Trevally (GT)', 'Wahoo (shallow ambush)', 'Barracuda', 'Sailfish'],
        tackle: '150g – 190g Long-cast diving stickbaits, sweep-and-pause cadence',
        tactics: 'Cast along the edge of the blue water line where the outer reef drops into the open Indian Ocean.'
      },
      {
        name: 'Felivaru Kandu Mouth Breakers',
        type: 'Channel Crest Wash',
        depth: '3m – 20m channel crest',
        coordinates: '5.440°N, 73.490°E',
        targetSpecies: ['Giant Trevally', 'Bluefin Trevally', 'Coral Trout'],
        tackle: '130g Sinking stickbaits, fast twitch retrieve through the foam wash',
        tactics: 'Explosive surface strikes occur when lagoon baitfish get swept across the reef edge into oceanic wash.'
      }
    ],
    trollingSpots: [
      {
        name: 'Lhaviyani East Oceanic Trench (1000m Contour)',
        type: 'Pelagic Drop-Off',
        depth: '200m – 1000m abyss',
        coordinates: '5.420°N, 73.550°E',
        targetSpecies: ['Yellowfin Tuna (40kg+)', 'Sailfish', 'Wahoo', 'Mahi-Mahi'],
        tackle: 'Black/Purple trolling skirts, daisy chain teasers, 80lb trolling outfits',
        tactics: 'Troll the sheer outer oceanic contour line where upwelling currents bring schooling squid and flying fish.'
      }
    ],
    nightSpots: [
      {
        name: 'Faadhippolhu Inner Atoll Reef Slope',
        type: 'Sheltered Reef Drop',
        depth: '20m – 45m',
        coordinates: '5.380°N, 73.400°E',
        targetSpecies: ['Spangled Emperor (Filolhu)', 'Red Snapper', 'Squirrelfish', 'Reef Shark prowlers'],
        tackle: 'Traditional Maldivian handline or PE 3 overhead reel, fresh bonito chunk',
        tactics: 'Anchor on the lee side of the reef under starlight. Chum generously with fresh fish scraps.'
      }
    ]
  },
  'Kaafu': {
    atollName: 'Kaafu Atoll (North & South Malé • K. Atoll)',
    shortCode: 'K',
    description: 'Central maritime hub with deep channel canyons (Vaadhoo Kandu) and world-renowned surf reef crests.',
    jiggingSpots: [
      {
        name: 'Gaadhoo Kandu Outer Drop-Off',
        type: 'Oceanic Channel Drop',
        depth: '70m – 140m',
        coordinates: '4.195°N, 73.545°E',
        targetSpecies: ['Dogtooth Tuna', 'Giant Trevally', 'Amberjack', 'Ruby Snapper'],
        tackle: '200g – 300g Glow/Silver speed jigs, PE 4–5, 80lb fluoro leader',
        tactics: 'Drift along the eastern oceanic ledge during incoming flood tide. Work vertical drops from 120m up to 60m.'
      },
      {
        name: 'Vaadhoo Channel Deep Canyon',
        type: 'Deep Atoll Canyon',
        depth: '80m – 160m',
        coordinates: '4.115°N, 73.450°E',
        targetSpecies: ['Dogtooth Tuna', 'Rusty Jobfish', 'Coronation Trout', 'Bigeye Trevally'],
        tackle: '180g – 250g Slow pitch zebra jigs, PE 3, 60lb leader',
        tactics: 'Fish deep current eddies on the channel shoulder where pelagics ambush bait flushed from the lagoon.'
      },
      {
        name: 'Girifushi Thila & Outer Corner',
        type: 'Current Pinnacle',
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
        type: 'Surf Barrier Reef',
        depth: '1m – 15m reef edge',
        coordinates: '4.630°N, 73.560°E',
        targetSpecies: ['Giant Trevally (GT)', 'Bluefin Trevally', 'Barracuda', 'Red Bass'],
        tackle: '140g – 180g Cup-face poppers, floating stickbaits, PE 8 braid, 130lb shock leader',
        tactics: 'Cast directly into breaking surf foam along the drop-off edge. Sweep stickbait through the white water seam.'
      },
      {
        name: 'Maafushi Reef South-East Corner',
        type: 'Reef Corner Point',
        depth: '3m – 20m drop',
        coordinates: '3.930°N, 73.495°E',
        targetSpecies: ['Giant Trevally', 'Coral Trout', 'Dogtooth Tuna (shallow patrol)'],
        tackle: '120g – 160g Sinking stickbaits, heavy inline single hooks',
        tactics: 'Work the outer breakers 2 hours before high tide as the rising flood pushes fusiliers onto the shallow reef flat.'
      }
    ],
    trollingSpots: [
      {
        name: 'Vaadhoo Trench Blue Water Line',
        type: 'Pelagic Channel',
        depth: '300m – 800m',
        coordinates: '4.100°N, 73.480°E',
        targetSpecies: ['Sailfish', 'Wahoo', 'Yellowfin Tuna', 'Mahi-Mahi'],
        tackle: 'Skirted ballyhoo & cedar plugs',
        tactics: 'Troll the mid-channel rip line where the ocean current compresses between North and South Malé atolls.'
      }
    ],
    nightSpots: [
      {
        name: 'Gulhi Outer Thila Slope',
        type: 'Night Reef Bank',
        depth: '25m – 40m',
        coordinates: '3.980°N, 73.510°E',
        targetSpecies: ['Emperor (Meyna)', 'Red Snapper', 'Jobfish'],
        tackle: 'Handline with fresh fish cubes and glowing beads',
        tactics: 'Drift over the plateau edge 1 hour after full darkness during gentle slack current.'
      }
    ]
  },
  'Baa': {
    atollName: 'Baa Atoll (South Maalhosmadulu • B. Atoll)',
    shortCode: 'B',
    description: 'UNESCO Biosphere Reserve perimeter with rich deep canyons, Hanifaru currents, and prolific outer pinnacles.',
    jiggingSpots: [
      {
        name: 'Dhonfanu Thila Deep Pass',
        type: 'Deep Pass Pinnacle',
        depth: '45m – 100m',
        coordinates: '5.170°N, 73.140°E',
        targetSpecies: ['Dogtooth Tuna', 'Amberjack', 'Giant Trevally', 'Grouper'],
        tackle: '180g – 250g vertical knife jigs, PE 4',
        tactics: 'Fast jigging on the deep channel slope when incoming current flows into the atoll.'
      },
      {
        name: 'Dharavandhoo Kandu Drop',
        type: 'Deep Channel Ledge',
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
        type: 'Reef Barrier Crest',
        depth: '2m – 15m',
        coordinates: '5.190°N, 73.160°E',
        targetSpecies: ['Giant Trevally (GT)', 'Bluefin Trevally', 'Red Bass'],
        tackle: '140g – 180g Cup poppers, heavy shock leader',
        tactics: 'Cast to the boiling white-water churn on the outer oceanic barrier reef.'
      }
    ],
    trollingSpots: [
      {
        name: 'Baa West Ocean Wall',
        type: 'Oceanic Drop',
        depth: '150m – 600m',
        coordinates: '5.120°N, 72.980°E',
        targetSpecies: ['Wahoo', 'Yellowfin Tuna', 'Sailfish'],
        tackle: 'High-speed wahoo lures (Yo-Zuri Bonita, Halco Max)',
        tactics: 'Troll at 9–11 knots along the western drop-off where ocean swells crash into deep water.'
      }
    ],
    nightSpots: [
      {
        name: 'Kendhoo Channel Corner',
        type: 'Channel Slope',
        depth: '30m – 50m',
        coordinates: '5.280°N, 73.020°E',
        targetSpecies: ['Red Snapper', 'Green Jobfish', 'Coronation Trout'],
        tackle: 'Bottom ledger rig with 12/0 circle hooks',
        tactics: 'Fish the gentle drop into the lagoon during incoming tide.'
      }
    ]
  },
  'Alif Alif': {
    atollName: 'Alif Alif (North Ari & Rasdhoo • AA. Atoll)',
    shortCode: 'AA',
    description: 'Home to the legendary Madivaru pelagic corner, vertical ocean drop-offs, and abundant dogtooth and hammerheads.',
    jiggingSpots: [
      {
        name: 'Madivaru Corner (Legendary Pelagic Drop-off)',
        type: 'Oceanic Trench Ledge',
        depth: '50m – 130m',
        coordinates: '4.260°N, 73.010°E',
        targetSpecies: ['Dogtooth Tuna', 'Giant Trevally', 'Amberjack', 'Ruby Snapper'],
        tackle: '220g – 300g heavy vertical knife jigs, PE 4–6, wire-assist or 100lb leader',
        tactics: 'Fish the outgoing tidal current flow where deep ocean upwellings attract bait balls.'
      },
      {
        name: 'Rasdhoo Ocean Wall (East Drop)',
        type: 'Vertical Drop-Off',
        depth: '60m – 180m',
        coordinates: '4.270°N, 73.000°E',
        targetSpecies: ['Dogtooth Tuna', 'Yellowfin Tuna', 'Ruby Snapper', 'Jobfish'],
        tackle: '200g Slow pitch flutter jigs in pink/silver',
        tactics: 'Slow pitch fluttering between 70m and 110m depth along the sheer vertical drop.'
      }
    ],
    castingSpots: [
      {
        name: 'Rasdhoo Barrier Reef Outer Crest',
        type: 'Reef Crest',
        depth: '2m – 12m',
        coordinates: '4.265°N, 72.990°E',
        targetSpecies: ['Giant Trevally (GT)', 'Bluefin Trevally', 'Red Bass'],
        tackle: '130g – 170g Floating stickbaits (sardine/flying fish pattern)',
        tactics: 'Long casts over the reef crest into the surging ocean swell. Keep the rod tip high.'
      },
      {
        name: 'Ukulhas Channel Head Point',
        type: 'Channel Point',
        depth: '2m – 18m',
        coordinates: '4.215°N, 72.860°E',
        targetSpecies: ['Giant Trevally', 'Spanish Mackerel', 'Barracuda'],
        tackle: '120g – 150g Cup poppers, erratic twitch retrieve',
        tactics: 'Target the current line where lagoon water mixes with the outer channel.'
      }
    ],
    trollingSpots: [
      {
        name: 'Rasdhoo - Ari Oceanic Gap',
        type: 'Deep Ocean Trench',
        depth: '300m – 700m',
        coordinates: '4.240°N, 72.950°E',
        targetSpecies: ['Wahoo', 'Yellowfin Tuna', 'Mahi-Mahi', 'Black Marlin'],
        tackle: 'Medium skirted trolling heads, running at 7–8 knots',
        tactics: 'Target current rips forming between Rasdhoo and the main Ari atoll rim.'
      }
    ],
    nightSpots: [
      {
        name: 'Mathiveri Reef Table',
        type: 'Reef Table Slope',
        depth: '25m – 45m',
        coordinates: '4.200°N, 72.800°E',
        targetSpecies: ['Coral Trout', 'Spangled Emperor', 'Sweetlips'],
        tackle: 'Fresh squid bait, handline with 60lb mono',
        tactics: 'Anchor on the sandy slope just off the reef rim under gentle breeze.'
      }
    ]
  },
  'Alif Dhaalu': {
    atollName: 'Alif Dhaalu (South Ari Atoll • ADh. Atoll)',
    shortCode: 'ADh',
    description: 'Famous for the southern oceanic rim, whale shark corridor, and deep seamounts.',
    jiggingSpots: [
      {
        name: 'Dhigurah Ocean Drop-off',
        type: 'Pelagic Drop',
        depth: '60m – 140m',
        coordinates: '3.520°N, 72.935°E',
        targetSpecies: ['Dogtooth Tuna', 'Yellowfin Tuna', 'Giant Trevally'],
        tackle: '200g Knife jigs, high speed mechanical retrieve',
        tactics: 'Work the outer oceanic drop where pelagic schools migrate along the southern atoll rim.'
      },
      {
        name: 'Kudarah Thila Edge',
        type: 'Protected Pinnacle',
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
        type: 'Reef Edge',
        depth: '1m – 10m',
        coordinates: '3.530°N, 72.930°E',
        targetSpecies: ['Giant Trevally', 'Bluefin Trevally', 'Needlefish', 'Coral Trout'],
        tackle: '120g – 160g Floating stickbaits, barbless heavy trebles',
        tactics: 'Cast along the turquoise-to-deep-blue drop-off zone. Peak strikes occur during mid-flood tide.'
      }
    ],
    trollingSpots: [
      {
        name: 'South Ari Oceanic Ridge',
        type: 'Oceanic Wall',
        depth: '200m – 800m',
        coordinates: '3.450°N, 72.900°E',
        targetSpecies: ['Yellowfin Tuna', 'Wahoo', 'Sailfish'],
        tackle: 'High speed diving minnows',
        tactics: 'Work along the southern point where deep currents split around the atoll.'
      }
    ],
    nightSpots: [
      {
        name: 'Maamigili Outer Shelf',
        type: 'Outer Shelf',
        depth: '30m – 55m',
        coordinates: '3.480°N, 72.840°E',
        targetSpecies: ['Red Snapper', 'Jobfish', 'Barracuda'],
        tackle: 'Heavy handline with whole sardine or squid',
        tactics: 'Drift slowly off the reef flat into the channel.'
      }
    ]
  },
  'Haa Dhaalu': {
    atollName: 'Haa Dhaalu (Hanimaadhoo & Kulhudhuffushi • HDh. Atoll)',
    shortCode: 'HDh',
    description: 'Northern deep oceanic corridor with extreme tidal flows from the open northern Indian Ocean.',
    jiggingSpots: [
      {
        name: 'Hanimaadhoo Channel Deep Ledge (Kandu)',
        type: 'Oceanic Channel Drop',
        depth: '60m – 150m oceanic drop-off',
        coordinates: '6.750°N, 73.185°E',
        targetSpecies: ['Dogtooth Tuna (30kg+)', 'Giant Trevally', 'Amberjack', 'Ruby Snapper'],
        tackle: '200g – 280g Slow pitch & knife jigs, PE 4–5 line, 80lb shock leader',
        tactics: 'Drift across the deep shelf edge as incoming ocean currents push pelagics against the wall.'
      },
      {
        name: 'Kulhudhuffushi Outer Shelf Canyon',
        type: 'Oceanic Canyon',
        depth: '70m – 160m',
        coordinates: '6.620°N, 73.050°E',
        targetSpecies: ['Yellowfin Tuna', 'Dogtooth Tuna', 'Rusty Jobfish', 'Bigeye Trevally'],
        tackle: '220g – 300g Heavy vertical speed jigs',
        tactics: 'Fish deep current rips as oceanic currents surge past the western rim.'
      }
    ],
    castingSpots: [
      {
        name: 'Hanimaadhoo Outer Barrier Faru Breakers',
        type: 'Surf Barrier Reef',
        depth: '1.5m – 16m foaming surf',
        coordinates: '6.745°N, 73.160°E',
        targetSpecies: ['Giant Trevally (GT)', 'Bluefin Trevally', 'Red Bass', 'Spanish Mackerel'],
        tackle: '140g – 180g Cup-faced poppers & floating stickbaits, PE 6–8 braid, 130lb leader',
        tactics: 'Cast directly into breaking white water foam along the oceanic reef crest.'
      }
    ],
    trollingSpots: [
      {
        name: 'Haa Dhaalu North-East Deep Line',
        type: 'Open Ocean Deep',
        depth: '400m – 1200m',
        coordinates: '6.800°N, 73.250°E',
        targetSpecies: ['Yellowfin Tuna', 'Sailfish', 'Wahoo', 'Skipjack'],
        tackle: 'Trolling birds with feather skirts',
        tactics: 'Work birds working over surface tuna feeding frenzies.'
      }
    ],
    nightSpots: [
      {
        name: 'Nolhivaranfaru Inner Channel Shelf',
        type: 'Channel Shelf',
        depth: '25m – 45m',
        coordinates: '6.680°N, 73.130°E',
        targetSpecies: ['Emperor', 'Coral Trout', 'Jobfish'],
        tackle: 'Traditional handline, fresh bonito strips',
        tactics: 'Night bottom dropping on the lee side of the channel entrance.'
      }
    ]
  },
  'Vaavu': {
    atollName: 'Vaavu Atoll (Felidhe • Fotteyo • V. Atoll)',
    shortCode: 'V',
    description: 'Easternmost point of the Maldives archipelago with extreme vertical drop-offs (Fotteyo) and premier big game action.',
    jiggingSpots: [
      {
        name: 'Fotteyo Kandu Deep Drop-Off',
        type: 'Vertical Abyss Ledge',
        depth: '60m – 160m',
        coordinates: '3.470°N, 73.740°E',
        targetSpecies: ['Dogtooth Tuna (40kg+)', 'Giant Trevally', 'Amberjack', 'Hammerhead vicinity'],
        tackle: '250g – 350g Heavy knife jigs, PE 5–6, 120lb leader',
        tactics: 'Extreme vertical jigging along the easternmost wall where the Maldives drops directly into the deep Indian Ocean basin.'
      },
      {
        name: 'Miyaru Kandu Channel Ledge',
        type: 'Predator Pass',
        depth: '45m – 110m',
        coordinates: '3.580°N, 73.530°E',
        targetSpecies: ['Dogtooth Tuna', 'Bigeye Trevally', 'Coral Trout', 'Ruby Snapper'],
        tackle: '200g Slow pitch jigs in zebra lumo',
        tactics: 'Work up-current entrance during incoming flood tide.'
      }
    ],
    castingSpots: [
      {
        name: 'Fotteyo Faru Surf Tip',
        type: 'Oceanic Surf Point',
        depth: '2m – 18m',
        coordinates: '3.460°N, 73.750°E',
        targetSpecies: ['Giant Trevally (GT)', 'Bluefin Trevally', 'Dogtooth on surface popper', 'Barracuda'],
        tackle: '160g – 200g Heavy cup poppers, PE 8 braid, 150lb leader',
        tactics: 'Violent topwater pops into the breaking ocean swell crashing onto the easternmost point of the archipelago.'
      }
    ],
    trollingSpots: [
      {
        name: 'Vaavu East Ocean Trench',
        type: 'Pelagic Ocean Wall',
        depth: '500m – 1500m',
        coordinates: '3.500°N, 73.800°E',
        targetSpecies: ['Blue Marlin', 'Sailfish', 'Yellowfin Tuna', 'Wahoo'],
        tackle: 'Large skirted trolling lures (Mold Craft, Black Bart)',
        tactics: 'Troll 3–5 miles offshore from Fotteyo over deep upwellings.'
      }
    ],
    nightSpots: [
      {
        name: 'Alimatha Channel Sand Shelf',
        type: 'Pass Shelf',
        depth: '20m – 35m',
        coordinates: '3.600°N, 73.500°E',
        targetSpecies: ['Giant Trevally', 'Nurse Shark prowlers', 'Snapper', 'Emperor'],
        tackle: 'Heavy circle hooks, fresh cut bonito bait',
        tactics: 'Night handlining in gentle current along the pass shoulder.'
      }
    ]
  },
  'Gaafu Dhaalu': {
    atollName: 'Gaafu Dhaalu (Huvadhoo South • GDh. Atoll)',
    shortCode: 'GDh',
    description: 'Part of Huvadhoo Atoll—the second largest atoll in the world—featuring massive oceanic passes up to 90m deep.',
    jiggingSpots: [
      {
        name: 'Huvadhoo Deep Ocean Kandu (World-Class Deep Pass)',
        type: 'Deep Ocean Pass',
        depth: '70m – 160m',
        coordinates: '0.520°N, 73.010°E',
        targetSpecies: ['Dogtooth Tuna (Monster 50kg+)', 'Amberjack', 'Ruby Snapper', 'Yellowfin Tuna'],
        tackle: '250g – 350g Heavy knife jigs, PE 5–6, 100lb fluoro leader',
        tactics: 'Extreme deep current jigging in the central channel gap during strong tidal exchange.'
      }
    ],
    castingSpots: [
      {
        name: 'Beacons & Blue Bowl Outer Surf Barrier',
        type: 'Oceanic Reef Surf Break',
        depth: '2m – 16m',
        coordinates: '0.500°N, 73.020°E',
        targetSpecies: ['Giant Trevally (GT)', 'Black GT', 'Dogtooth Tuna on popper', 'Barracuda'],
        tackle: '160g – 200g Extra-heavy topwater poppers and diving stickbaits',
        tactics: 'Cast right along the edge of the peeling ocean swells where massive GTs cruise the foam.'
      }
    ],
    trollingSpots: [
      {
        name: 'Huvadhoo Southern Channel Gap',
        type: 'Equatorial Ocean Corridor',
        depth: '500m – 1200m',
        coordinates: '0.400°N, 73.050°E',
        targetSpecies: ['Yellowfin Tuna', 'Wahoo', 'Sailfish', 'Mahi-Mahi'],
        tackle: 'High-speed bibless minnows and jet heads',
        tactics: 'Troll through the equatorial oceanic corridor connecting Huvadhoo to Fuvahmulah.'
      }
    ],
    nightSpots: [
      {
        name: 'Thinadhoo Deep Lagoon Pinnacles',
        type: 'Inner Lagoon Thila',
        depth: '30m – 55m',
        coordinates: '0.540°N, 72.980°E',
        targetSpecies: ['Red Snapper', 'Jobfish', 'Coral Trout', 'Spangled Emperor'],
        tackle: 'Handline with 80lb mono and live bait / bonito strips',
        tactics: 'Night bottom fishing on inner pinnacle ledges.'
      }
    ]
  },
  'Gnaviyani': {
    atollName: 'Gnaviyani (Fuvahmulah Island • Gn. Atoll)',
    shortCode: 'Gn',
    description: 'Unique solitary oceanic island rising directly from 2000m abyss without lagoon barrier. Shark capital and extreme pelagic hotspot.',
    jiggingSpots: [
      {
        name: 'Fuvahmulah Deep South Plateau (Oceanic Pinnacle)',
        type: 'Oceanic Pinnacle Plateau',
        depth: '60m – 220m',
        coordinates: '-0.300°S, 73.430°E',
        targetSpecies: ['Yellowfin Tuna', 'Dogtooth Tuna (huge)', 'Amberjack', 'Wahoo'],
        tackle: '250g – 350g Luminous speed jigs, PE 5–8 line',
        tactics: 'Drift over the south plateau where the isolated oceanic shelf drops into the 2000m abyss.'
      }
    ],
    castingSpots: [
      {
        name: 'Thoondu Point Breakers',
        type: 'Open Ocean Surf',
        depth: '3m – 20m sheer drop',
        coordinates: '-0.285°S, 73.415°E',
        targetSpecies: ['Giant Trevally', 'Wahoo on popper', 'Yellowfin Tuna on surface', 'Sailfish'],
        tackle: '150g – 190g Floating stickbaits, high-speed retrieve',
        tactics: 'Fuvahmulah has no protective lagoon; cast directly into the surging Indian Ocean surf line.'
      }
    ],
    trollingSpots: [
      {
        name: 'Fuvahmulah Deep Oceanic Rim (Tiger & Pelagic Alley)',
        type: 'Abyssal Drop',
        depth: '500m – 2000m',
        coordinates: '-0.310°S, 73.450°E',
        targetSpecies: ['Yellowfin Tuna (Super-cow 60kg+)', 'Wahoo', 'Tiger Shark vicinity', 'Sailfish'],
        tackle: 'Extra-heavy trolling gear, wire traces',
        tactics: 'Troll just 500 meters off the beach where the seafloor plummets into the deep equatorial ocean.'
      }
    ],
    nightSpots: [
      {
        name: 'Fuvahmulah Harbour Mouth Drift',
        type: 'Harbour Drop',
        depth: '35m – 70m',
        coordinates: '-0.300°S, 73.410°E',
        targetSpecies: ['Dogtooth Tuna (night patrol)', 'Giant Trevally', 'Jobfish'],
        tackle: 'Heavy drift handline with whole flying fish or squid',
        tactics: 'Drift with the offshore current at night.'
      }
    ]
  },
  'Seenu': {
    atollName: 'Seenu Atoll (Addu City & Gan • S. Atoll)',
    shortCode: 'S',
    description: 'Southernmost atoll situated south of the Equator. Heart-shaped atoll with deep natural passes and rich pelagic diversity.',
    jiggingSpots: [
      {
        name: 'Gan Pass (Kandu) Outer Drop-off',
        type: 'Equatorial Pass Drop',
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
        type: 'Barrier Surf Crest',
        depth: '2m – 15m',
        coordinates: '-0.680°S, 73.170°E',
        targetSpecies: ['Giant Trevally (GT)', 'Bluefin Trevally', 'Barracuda'],
        tackle: '140g – 180g Chugger poppers with deep cup',
        tactics: 'Target the outer reef teeth where swells crash and create heavy white water froth.'
      }
    ],
    trollingSpots: [
      {
        name: 'Equatorial Oceanic Line (Addu South)',
        type: 'Equatorial Deep',
        depth: '400m – 1500m',
        coordinates: '-0.730°S, 73.180°E',
        targetSpecies: ['Yellowfin Tuna', 'Skipjack', 'Wahoo', 'Mahi-Mahi'],
        tackle: 'Feather trolling lures, green machines, cedar plugs',
        tactics: 'Troll along the southern ocean border where equatorial currents collide.'
      }
    ],
    nightSpots: [
      {
        name: 'Hithadhoo Outer Reef Slope',
        type: 'Lee Reef Slope',
        depth: '25m – 45m',
        coordinates: '-0.600°S, 73.080°E',
        targetSpecies: ['Spangled Emperor', 'Red Snapper', 'Coral Trout'],
        tackle: 'Handline with 50lb mono, cut bonito bait',
        tactics: 'Calm night bottom fishing on the western lee slope.'
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
  const name = portName || 'Maldives Oceanic Waters';
  return {
    atollName: name,
    shortCode: 'MV',
    description: `Deep ocean atoll waters around ${name}. Rich in pelagic predators, channel drop-offs and barrier reef crests.`,
    jiggingSpots: [
      {
        name: `${name} Outer Channel Drop-Off (Kandu Edge)`,
        type: 'Oceanic Channel Drop',
        depth: '50m – 130m',
        coordinates: `${roundedLat}°N, ${roundedLon}°E`,
        targetSpecies: ['Dogtooth Tuna', 'Giant Trevally', 'Amberjack', 'Ruby Snapper'],
        tackle: '180g – 250g Slow pitch and speed jigs, PE 3–4, 80lb leader',
        tactics: 'Locate the outer channel entrance where atoll water flushes into deep open ocean. Work vertical drops during peak tidal current.'
      },
      {
        name: `${name} Submerged Pinnacle (Thila Edge)`,
        type: 'Submerged Pinnacle',
        depth: '35m – 80m',
        coordinates: `${roundedLat}°N, ${roundedLon}°E`,
        targetSpecies: ['Jobfish', 'Coronation Trout', 'Grouper', 'Trevally'],
        tackle: '150g – 200g Zebra glow slow pitch jigs',
        tactics: 'Target the upcurrent face of underwater sea-mounts where bait aggregations gather.'
      }
    ],
    castingSpots: [
      {
        name: `${name} Outer Barrier Faru Reef Crest`,
        type: 'Reef Crest Foam',
        depth: '1m – 12m',
        coordinates: `${roundedLat}°N, ${roundedLon}°E`,
        targetSpecies: ['Giant Trevally (GT)', 'Bluefin Trevally', 'Red Bass', 'Barracuda'],
        tackle: '130g – 170g Floating stickbaits & cup poppers, PE 6–8 braid',
        tactics: 'Cast directly into breaking white water wash along the outer barrier reef during incoming flood tide.'
      }
    ],
    trollingSpots: [
      {
        name: `${name} Oceanic Blue Water Trench`,
        type: 'Pelagic Drop',
        depth: '200m – 800m',
        coordinates: `${roundedLat}°N, ${roundedLon}°E`,
        targetSpecies: ['Wahoo', 'Yellowfin Tuna', 'Sailfish'],
        tackle: 'Trolling skirts and bibbed minnows',
        tactics: 'Troll along the 100-fathom edge outside the atoll barrier.'
      }
    ],
    nightSpots: [
      {
        name: `${name} Lee Reef Sand Slope`,
        type: 'Protected Night Shelf',
        depth: '25m – 45m',
        coordinates: `${roundedLat}°N, ${roundedLon}°E`,
        targetSpecies: ['Red Snapper', 'Spangled Emperor', 'Jobfish'],
        tackle: 'Handline with fresh squid or cut bonito',
        tactics: 'Anchor on the lee slope during gentle nocturnal drift.'
      }
    ]
  };
}

/**
 * Evaluates Comprehensive Oceanographic, Meteorological, Nakaiy & Solunar Sportfishing Conditions
 * for a SINGLE Maldivian location/atoll.
 *
 * @param {Object} marineReport - Live Open-Meteo marine telemetry
 * @param {Object} tideData - Tide curve & extremes
 * @param {Object} moonPhase - Solunar moon phase
 * @param {Object} location - Chosen atoll or coordinate location
 * @param {Object} [nakaiyData] - Active Maldivian Nakaiy details
 * @returns {Object} Comprehensive sportfishing intelligence report
 */
export function evaluateFishingConditions(marineReport, tideData, moonPhase, location, nakaiyData) {
  if (!marineReport || !marineReport.timeline || marineReport.timeline.length === 0) {
    return null;
  }

  // Active Nakaiy
  const nakaiy = nakaiyData || getCurrentNakaiy(new Date());
  const nakaiyMods = nakaiy.scoreModifiers || { jigging: 15, casting: 15, trolling: 15, nightFishing: 15 };

  const timeline = marineReport.timeline;
  const current = marineReport.current;
  const locName = location?.name || 'Lhaviyani Atoll';
  const locAtoll = location?.atoll || location?.shortName || location?.key || 'Lhaviyani';

  // Find Hotspots for chosen Atoll
  const atollKey = Object.keys(MALDIVES_FISHING_HOTSPOTS).find(k => 
    locAtoll.toLowerCase().includes(k.toLowerCase()) || 
    locName.toLowerCase().includes(k.toLowerCase())
  );
  const hotspots = atollKey ? MALDIVES_FISHING_HOTSPOTS[atollKey] : getFallbackHotspots(location?.latitude, location?.longitude, locName);

  // Hourly evaluation for 24 hours
  const hourlyScores = [];
  let highestJigScore = -1;
  let highestCastScore = -1;
  let highestTrollScore = -1;
  let highestNightScore = -1;

  timeline.forEach((slot, index) => {
    const timeStr = slot.time;
    const hourDate = new Date(timeStr);
    const hour = hourDate.getHours();
    const isDay = hour >= 6 && hour < 18;
    const isDawn = hour >= 5 && hour <= 8;
    const isDusk = hour >= 16 && hour <= 19;
    const isMidday = hour >= 10 && hour <= 14;
    const isNight = hour >= 20 || hour <= 4;

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
    let solunarBonus = 12;
    if (moonPhase) {
      if (moonPhase.tideType?.includes('Spring') || moonPhase.phase < 0.05 || (moonPhase.phase > 0.45 && moonPhase.phase < 0.55)) {
        solunarBonus = 22; // High feeding surge around New and Full Moon
      } else if (moonPhase.tideType?.includes('Neap')) {
        solunarBonus = 6;
      } else {
        solunarBonus = 14;
      }
    }

    // -------------------------------------------------------------
    // 1. JIGGING BITE SCORE (Channels, Kandus, Thilas, Deep Ledges)
    // -------------------------------------------------------------
    let jigScore = 45;
    jigScore += nakaiyMods.jigging; // Nakaiy seasonal weight

    if (tidalFlowRate >= 8 && tidalFlowRate <= 25) jigScore += 24; // Moving water
    else if (tidalFlowRate >= 4) jigScore += 15;
    else if (tidalFlowRate < 3) jigScore -= 12; // Slack lockjaw

    if (currentSpeedKnots >= 0.5 && currentSpeedKnots <= 1.6) jigScore += 14;
    else if (currentSpeedKnots > 2.2) jigScore -= 12; // Excessive drift

    if (windWaveH <= 0.6 && windSpeed <= 14) jigScore += 14; // Good vertical drop
    else if (windWaveH > 1.4) jigScore -= 12;

    if (isDawn) jigScore += 14;
    else if (isDusk) jigScore += 13;
    else if (isDay && !isMidday) jigScore += 8;

    if (pressure >= 1010 && pressure <= 1014) jigScore += 8;
    else if (pressure < 1008) jigScore -= 8;

    jigScore += (solunarBonus * 0.5);
    if (precip > 2.0) jigScore -= 10;
    jigScore = Math.max(15, Math.min(99, Math.round(jigScore)));

    // -------------------------------------------------------------
    // 2. TOPWATER CASTING SCORE (Reef crests, Poppers, Stickbaits)
    // -------------------------------------------------------------
    let castScore = 45;
    castScore += nakaiyMods.casting; // Nakaiy seasonal weight

    if (swellH >= 0.8 && swellH <= 1.6 && swellP >= 7) castScore += 24; // Oxygenated foam
    else if (swellH >= 0.5 && swellH < 0.8) castScore += 14;
    else if (swellH > 2.2) castScore -= 14; // Dangerous breakers

    if (tideStage.includes('Rising') || tideStage.includes('Flood')) castScore += 20; // Flood on reef flat
    else if (tidalFlowRate >= 5) castScore += 12;

    if (isDawn || isDusk) castScore += 18;
    else if (uvIdx <= 4 && isDay) castScore += 14; // Overcast GT frenzy
    else if (isMidday && uvIdx >= 8) castScore -= 12; // Bright glare

    if (windSpeed >= 6 && windSpeed <= 16 && windGusts < 22) castScore += 10;
    else if (windSpeed > 20) castScore -= 10;

    castScore += (solunarBonus * 0.5);
    if (precip > 2.0) castScore -= 8;
    castScore = Math.max(15, Math.min(99, Math.round(castScore)));

    // -------------------------------------------------------------
    // 3. PELAGIC TROLLING SCORE (Blue water, Wahoo, Tuna, Sailfish)
    // -------------------------------------------------------------
    let trollScore = 45;
    trollScore += nakaiyMods.trolling;
    if (isDawn || isDusk) trollScore += 16;
    else if (isDay) trollScore += 10;
    if (windSpeed >= 8 && windSpeed <= 18) trollScore += 14; // Good surface chop
    if (waveH >= 0.8 && waveH <= 1.8) trollScore += 12;
    trollScore += (solunarBonus * 0.4);
    if (precip > 3.0) trollScore -= 14;
    trollScore = Math.max(15, Math.min(99, Math.round(trollScore)));

    // -------------------------------------------------------------
    // 4. NIGHT REEF HANDLINING SCORE (Emperors, Snappers, Coral Trout)
    // -------------------------------------------------------------
    let nightScore = 40;
    nightScore += nakaiyMods.nightFishing;
    if (isNight) nightScore += 22;
    else if (isDusk || isDawn) nightScore += 12;
    else nightScore -= 15; // Day bottom fishing less productive on shallow reefs
    if (currentSpeedKnots <= 1.0) nightScore += 14; // Gentle drift for handline
    else nightScore -= 10;
    nightScore += (solunarBonus * 0.4);
    nightScore = Math.max(15, Math.min(98, Math.round(nightScore)));

    const slotInfo = {
      time: slot.time,
      displayTime: slot.displayTime,
      hour,
      isDay,
      isNight,
      jigScore,
      castScore,
      trollScore,
      nightScore,
      bestScore: Math.max(jigScore, castScore, trollScore, nightScore),
      waveH,
      swellH,
      windSpeed,
      currentSpeedKnots,
      uvIdx,
      tideStage,
      tidalFlowRate: tidalFlowRate.toFixed(1)
    };

    hourlyScores.push(slotInfo);

    if (jigScore > highestJigScore) highestJigScore = jigScore;
    if (castScore > highestCastScore) highestCastScore = castScore;
    if (trollScore > highestTrollScore) highestTrollScore = trollScore;
    if (nightScore > highestNightScore) highestNightScore = nightScore;
  });

  // Calculate contiguous best windows
  const jigWindow = findContiguousBestWindow(hourlyScores, 'jigScore', 3);
  const castWindow = findContiguousBestWindow(hourlyScores, 'castScore', 3);
  const trollWindow = findContiguousBestWindow(hourlyScores, 'trollScore', 3);
  const nightWindow = findContiguousBestWindow(hourlyScores, 'nightScore', 3);

  // Overall current bite rating
  const currentJigScore = hourlyScores[0]?.jigScore || 70;
  const currentCastScore = hourlyScores[0]?.castScore || 70;
  const currentTrollScore = hourlyScores[0]?.trollScore || 65;
  const currentNightScore = hourlyScores[0]?.nightScore || 50;

  const currentScores = [
    { type: 'jigging', label: 'Deep Jigging', score: currentJigScore, icon: 'fa-anchor', win: jigWindow },
    { type: 'casting', label: 'Topwater Casting', score: currentCastScore, icon: 'fa-burst', win: castWindow },
    { type: 'trolling', label: 'Pelagic Trolling', score: currentTrollScore, icon: 'fa-ship', win: trollWindow },
    { type: 'night', label: 'Night Reef Fishing', score: currentNightScore, icon: 'fa-moon', win: nightWindow }
  ];

  currentScores.sort((a, b) => b.score - a.score);
  const topRecommended = currentScores[0];

  const overallBiteRating = Math.round(
    (currentJigScore * 0.35) + 
    (currentCastScore * 0.35) + 
    (currentTrollScore * 0.2) + 
    (currentNightScore * 0.1)
  );

  let biteLevel = 'Good Feeding Activity';
  let biteBadgeColor = 'var(--sea-green)';
  if (overallBiteRating >= 85) {
    biteLevel = 'Peak Solunar Feeding Frenzy';
    biteBadgeColor = '#00f0ff';
  } else if (overallBiteRating >= 72) {
    biteLevel = 'Very High Feeding Potential';
    biteBadgeColor = 'var(--sea-green)';
  } else if (overallBiteRating >= 55) {
    biteLevel = 'Moderate Seasonal Activity';
    biteBadgeColor = '#ffb830';
  } else {
    biteLevel = 'Slow / Slack Current Window';
    biteBadgeColor = 'var(--storm-red)';
  }

  // Generate algorithmic Captain's Verdict
  const captainVerdict = generateCaptainVerdict(topRecommended, nakaiy, current, hotspots.atollName);

  return {
    overallBiteRating,
    biteLevel,
    biteBadgeColor,
    currentJigScore,
    currentCastScore,
    currentTrollScore,
    currentNightScore,
    topRecommended,
    allModalityRankings: currentScores,
    captainVerdict,
    nakaiy,
    hotspots,
    hourlyScores,
    bestTimeOfDay: {
      primaryWindow: `${topRecommended.win.startTime} – ${topRecommended.win.endTime}`,
      modality: topRecommended.label,
      peakScore: topRecommended.win.peakScore,
      rationale: `Optimal ${topRecommended.label} conditions coincide with tidal current exchange and ${nakaiy.name} Nakaiy solar alignment.`
    },
    bestJiggingWindow: {
      startTime: jigWindow.startTime,
      endTime: jigWindow.endTime,
      peakScore: jigWindow.peakScore,
      averageScore: jigWindow.avgScore,
      rationale: generateJiggingRationale(jigWindow, current, nakaiy),
      targetDepths: '50m – 140m Channel Drop-offs & Deep Seamounts',
      targetSpecies: ['Dogtooth Tuna (30kg+)', 'Giant Trevally (GT)', 'Amberjack', 'Ruby Snapper', 'Coral Trout'],
      recommendedTackle: '200g – 280g Slow Pitch & Knife Jigs (Zebra Lumo / Pink Silver), PE 4–6 line, 100lb shock leader',
      currentDriftAdvice: (current.oceanCurrentSpeedKnots || 0.8) > 1.2 ? 'Heavy ocean current: Use 280g+ knife jigs for vertical presentation.' : 'Ideal gentle drift: Slow pitch fluttering jigs with 3-pitch flutter cadence.'
    },
    bestCastingWindow: {
      startTime: castWindow.startTime,
      endTime: castWindow.endTime,
      peakScore: castWindow.peakScore,
      averageScore: castWindow.avgScore,
      rationale: generateCastingRationale(castWindow, current, nakaiy),
      targetZones: 'Outer Barrier Reef Crests (Faru) & Breaking Surf Wash',
      targetSpecies: ['Giant Trevally (GT)', 'Bluefin Trevally', 'Red Bass', 'Barracuda', 'Coral Trout'],
      recommendedTackle: '140g – 180g Cup-Faced Poppers & Floating Stickbaits, PE 6–8 braid, 130lb mono shock leader',
      surfAdvice: (current.swellHeight || 0.7) >= 1.0 ? 'Superb white water foam on the outer reef crest masks leader and triggers aggressive surface ambushes.' : 'Glassy surface: Use floating stickbaits with long sweep-and-pause cadence.'
    },
    bestTrollingWindow: {
      startTime: trollWindow.startTime,
      endTime: trollWindow.endTime,
      peakScore: trollWindow.peakScore,
      averageScore: trollWindow.avgScore,
      targetZones: 'Outer Atoll 100-Fathom Trench & Open Blue Water',
      targetSpecies: ['Wahoo', 'Yellowfin Tuna', 'Sailfish', 'Mahi-Mahi'],
      recommendedTackle: 'High-speed bibless minnows, skirted ballyhoo, 80lb trolling outfits'
    },
    bestNightWindow: {
      startTime: nightWindow.startTime,
      endTime: nightWindow.endTime,
      peakScore: nightWindow.peakScore,
      averageScore: nightWindow.avgScore,
      targetZones: 'Inner Atoll Reef Slopes & Protected Sandy Thilas',
      targetSpecies: ['Spangled Emperor (Filolhu)', 'Red Snapper', 'Green Jobfish', 'Grouper'],
      recommendedTackle: 'Traditional Maldivian handline, 50–70lb monofilament, fresh bonito/squid cut bait'
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

function generateCaptainVerdict(topModality, nakaiy, current, atollName) {
  const windKn = Math.round(current.windSpeed || 12);
  const swellM = (current.swellHeight || 0.8).toFixed(1);
  return `In ${atollName} during active ${nakaiy.name} (${nakaiy.thaana}) Nakaiy (${nakaiy.monsoon} Monsoon), conditions strongly favor ${topModality.label} (Score: ${topModality.score}/100). Moderate ${windKn} knot breeze and ${swellM}m ocean swell create ideal feeding triggers. ${nakaiy.fishingLore}`;
}

function generateJiggingRationale(win, current, nakaiy) {
  const curKn = current.oceanCurrentSpeedKnots || 0.8;
  const wave = current.waveHeight || 0.8;
  return `Peak jigging window (${win.startTime} – ${win.endTime}) combines strong tidal water exchange with manageable vertical boat drift (${curKn} kn current, ${wave}m wave). Fused with ${nakaiy.name} Nakaiy dynamics, dogtooth tuna and giant trevally actively patrol channel drops as baitfish get pinned against outer ledges.`;
}

function generateCastingRationale(win, current, nakaiy) {
  const swell = (current.swellHeight || 0.7).toFixed(1);
  return `Optimal casting window (${win.startTime} – ${win.endTime}) aligns with favorable surface low-light conditions and ${swell}m swell generating oxygenated white water along the barrier reef crest. Apex predators (GTs and red bass) push up from deep water to trap baitfish across shallow coral flats.`;
}
