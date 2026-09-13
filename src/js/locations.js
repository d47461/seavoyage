// Comprehensive Maldives Islands, Ports, Airports & Atolls Directory
// Covers all 20 Administrative Atolls with accurate navigational coordinates (WGS84)
// Provides instant in-memory search and localized atoll filtering for Passage Route Planning

export const MALDIVES_ATOLLS = [
  { code: 'HA', key: 'Haa Alif', name: 'Haa Alif (Thiladhunmathi Uthuru)', shortName: 'HA. Atoll', region: 'Far Northern Atolls' },
  { code: 'HDh', key: 'Haa Dhaalu', name: 'Haa Dhaalu (Thiladhunmathi Dhekunu)', shortName: 'HDh. Atoll', region: 'Far Northern Atolls' },
  { code: 'Sh', key: 'Shaviyani', name: 'Shaviyani (Miladhunmadulu Uthuru)', shortName: 'Sh. Atoll', region: 'Northern Atolls' },
  { code: 'N', key: 'Noonu', name: 'Noonu (Miladhunmadulu Dhekunu)', shortName: 'N. Atoll', region: 'Northern Atolls' },
  { code: 'R', key: 'Raa', name: 'Raa (Maalhosmadulu Uthuru)', shortName: 'R. Atoll', region: 'Northern Atolls' },
  { code: 'B', key: 'Baa', name: 'Baa (Maalhosmadulu Dhekunu • Biosphere)', shortName: 'B. Atoll', region: 'Northern Atolls' },
  { code: 'Lh', key: 'Lhaviyani', name: 'Lhaviyani (Faadhippolhu)', shortName: 'Lh. Atoll', region: 'Northern Atolls' },
  { code: 'K', key: 'Kaafu', name: 'Kaafu (Malé & Velana Hub)', shortName: 'K. Atoll', region: 'Central Atolls' },
  { code: 'AA', key: 'Alif Alif', name: 'Alif Alif (Ari Uthuru & Rasdhoo)', shortName: 'AA. Atoll', region: 'Central Western Atolls' },
  { code: 'ADh', key: 'Alif Dhaalu', name: 'Alif Dhaalu (Ari Dhekunu)', shortName: 'ADh. Atoll', region: 'Central Western Atolls' },
  { code: 'V', key: 'Vaavu', name: 'Vaavu (Felidhe Atoll)', shortName: 'V. Atoll', region: 'Central Eastern Atolls' },
  { code: 'M', key: 'Meemu', name: 'Meemu (Mulaku Atoll)', shortName: 'M. Atoll', region: 'Central Eastern Atolls' },
  { code: 'F', key: 'Faafu', name: 'Faafu (Nilandhe Uthuru)', shortName: 'F. Atoll', region: 'Central Western Atolls' },
  { code: 'Dh', key: 'Dhaalu', name: 'Dhaalu (Nilandhe Dhekunu)', shortName: 'Dh. Atoll', region: 'Central Western Atolls' },
  { code: 'Th', key: 'Thaa', name: 'Thaa (Kolhumadulu)', shortName: 'Th. Atoll', region: 'Southern Central Atolls' },
  { code: 'L', key: 'Laamu', name: 'Laamu (Haddhunmathi)', shortName: 'L. Atoll', region: 'Southern Central Atolls' },
  { code: 'GA', key: 'Gaafu Alif', name: 'Gaafu Alif (Huvadhu Uthuru)', shortName: 'GA. Atoll', region: 'Deep Southern Atolls' },
  { code: 'GDh', key: 'Gaafu Dhaalu', name: 'Gaafu Dhaalu (Huvadhu Dhekunu)', shortName: 'GDh. Atoll', region: 'Deep Southern Atolls' },
  { code: 'Gn', key: 'Gnaviyani', name: 'Gnaviyani (Fuvahmulah City)', shortName: 'Gn. Atoll', region: 'Equatorial Channel' },
  { code: 'S', key: 'Seenu', name: 'Seenu / Addu City', shortName: 'S. Atoll', region: 'Southernmost Equatorial' }
];

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

export const MALDIVES_ISLANDS_DATABASE = [
  // LHAVIYANI ATOLL (Lh)
  { name: 'Maafilaafushi (Lhaviyani Atoll)', island: 'Maafilaafushi', atoll: 'Lhaviyani', atollCode: 'Lh', latitude: 5.3625, longitude: 73.4197, country: 'Maldives', isDefault: true, type: 'Base / Coast Guard / Port' },
  { name: 'Naifaru (Capital • Lhaviyani)', island: 'Naifaru', atoll: 'Lhaviyani', atollCode: 'Lh', latitude: 5.4444, longitude: 73.3658, country: 'Maldives', type: 'Atoll Capital' },
  { name: 'Hinnavaru (Lhaviyani Atoll)', island: 'Hinnavaru', atoll: 'Lhaviyani', atollCode: 'Lh', latitude: 5.4931, longitude: 73.4128, country: 'Maldives', type: 'Inhabited Island' },
  { name: 'Kuredu Island (Lhaviyani Atoll)', island: 'Kuredu', atoll: 'Lhaviyani', atollCode: 'Lh', latitude: 5.5500, longitude: 73.4667, country: 'Maldives', type: 'Resort & Fishing Point' },
  { name: 'Olhuvelifushi (Lhaviyani Atoll)', island: 'Olhuvelifushi', atoll: 'Lhaviyani', atollCode: 'Lh', latitude: 5.2750, longitude: 73.5778, country: 'Maldives', type: 'Inhabited Island' },
  { name: 'Kurendhoo (Lhaviyani Atoll)', island: 'Kurendhoo', atoll: 'Lhaviyani', atollCode: 'Lh', latitude: 5.3333, longitude: 73.4667, country: 'Maldives', type: 'Inhabited Island' },
  { name: 'Madivaru Airport (Lhaviyani Atoll)', island: 'Madivaru', atoll: 'Lhaviyani', atollCode: 'Lh', latitude: 5.4389, longitude: 73.3750, country: 'Maldives', type: 'Domestic Airport' },

  // KAAFU ATOLL (K)
  { name: 'Malé City (National Capital)', island: 'Malé City', atoll: 'Kaafu', atollCode: 'K', latitude: 4.1755, longitude: 73.5093, country: 'Maldives', type: 'National Capital / Port' },
  { name: 'Velana International Airport (Hulhulé)', island: 'Velana Airport / Hulhulé', atoll: 'Kaafu', atollCode: 'K', latitude: 4.1918, longitude: 73.5290, country: 'Maldives', type: 'International Airport' },
  { name: 'Hulhumalé (Kaafu Atoll)', island: 'Hulhumalé', atoll: 'Kaafu', atollCode: 'K', latitude: 4.2144, longitude: 73.5397, country: 'Maldives', type: 'Urban Island / Marina' },
  { name: 'Villimalé (Kaafu Atoll)', island: 'Villimalé', atoll: 'Kaafu', atollCode: 'K', latitude: 4.1717, longitude: 73.4864, country: 'Maldives', type: 'City Ward' },
  { name: 'Maafushi (South Malé Atoll)', island: 'Maafushi', atoll: 'Kaafu', atollCode: 'K', latitude: 3.9400, longitude: 73.4900, country: 'Maldives', type: 'Tourism & Harbor Hub' },
  { name: 'Gulhi (South Malé Atoll)', island: 'Gulhi', atoll: 'Kaafu', atollCode: 'K', latitude: 3.9897, longitude: 73.5089, country: 'Maldives', type: 'Boat Building / Port' },
  { name: 'Guraidhoo (South Malé Atoll)', island: 'Guraidhoo', atoll: 'Kaafu', atollCode: 'K', latitude: 3.9011, longitude: 73.4672, country: 'Maldives', type: 'Surf & Marine Hub' },
  { name: 'Thulusdhoo (Capital • Kaafu Atoll)', island: 'Thulusdhoo', atoll: 'Kaafu', atollCode: 'K', latitude: 4.3736, longitude: 73.6494, country: 'Maldives', type: 'Atoll Capital / Surf' },
  { name: 'Dhiffushi (Kaafu Atoll)', island: 'Dhiffushi', atoll: 'Kaafu', atollCode: 'K', latitude: 4.4417, longitude: 73.7139, country: 'Maldives', type: 'Easternmost Inhabited' },
  { name: 'Himmafushi (Kaafu Atoll)', island: 'Himmafushi', atoll: 'Kaafu', atollCode: 'K', latitude: 4.3106, longitude: 73.5722, country: 'Maldives', type: 'Surf & Marine Hub' },
  { name: 'Girifushi (Kaafu Atoll)', island: 'Girifushi', atoll: 'Kaafu', atollCode: 'K', latitude: 4.3167, longitude: 73.5833, country: 'Maldives', type: 'MNDF Training Base / Marine Centre' },
  { name: 'Huraa (Kaafu Atoll)', island: 'Huraa', atoll: 'Kaafu', atollCode: 'K', latitude: 4.3339, longitude: 73.6006, country: 'Maldives', type: 'Inhabited Island' },
  { name: 'Kaashidhoo (Channel Island)', island: 'Kaashidhoo', atoll: 'Kaafu', atollCode: 'K', latitude: 4.9583, longitude: 73.4625, country: 'Maldives', type: 'Ocean Channel Island' },
  { name: 'Gaafaru (Kaafu Atoll)', island: 'Gaafaru', atoll: 'Kaafu', atollCode: 'K', latitude: 4.7389, longitude: 73.5000, country: 'Maldives', type: 'Single-Island Atoll' },

  // BAA ATOLL (B)
  { name: 'Eydhafushi (Capital • Baa Atoll)', island: 'Eydhafushi', atoll: 'Baa', atollCode: 'B', latitude: 5.1039, longitude: 73.0700, country: 'Maldives', type: 'Atoll Capital' },
  { name: 'Dharavandhoo & Hanifaru (Baa Atoll)', island: 'Dharavandhoo', atoll: 'Baa', atollCode: 'B', latitude: 5.1583, longitude: 73.1311, country: 'Maldives', type: 'Domestic Airport / Biosphere' },
  { name: 'Thulhaadhoo (Baa Atoll)', island: 'Thulhaadhoo', atoll: 'Baa', atollCode: 'B', latitude: 5.0222, longitude: 72.9361, country: 'Maldives', type: 'Lacquer Craft Hub' },
  { name: 'Kendhoo (Baa Atoll)', island: 'Kendhoo', atoll: 'Baa', atollCode: 'B', latitude: 5.2833, longitude: 73.0167, country: 'Maldives', type: 'Inhabited Island' },
  { name: 'Kamadhoo (Baa Atoll)', island: 'Kamadhoo', atoll: 'Baa', atollCode: 'B', latitude: 5.2417, longitude: 73.1111, country: 'Maldives', type: 'Inhabited Island' },
  { name: 'Kudarikilu (Baa Atoll)', island: 'Kudarikilu', atoll: 'Baa', atollCode: 'B', latitude: 5.2972, longitude: 73.1389, country: 'Maldives', type: 'Inhabited Island' },
  { name: 'Kihaadhoo (Baa Atoll)', island: 'Kihaadhoo', atoll: 'Baa', atollCode: 'B', latitude: 5.2056, longitude: 73.1306, country: 'Maldives', type: 'Inhabited Island' },
  { name: 'Donfanu (Baa Atoll)', island: 'Donfanu', atoll: 'Baa', atollCode: 'B', latitude: 5.2167, longitude: 73.1500, country: 'Maldives', type: 'Inhabited Island' },
  { name: 'Fulhadhoo (Goidhoo Atoll • Baa)', island: 'Fulhadhoo', atoll: 'Baa', atollCode: 'B', latitude: 4.8861, longitude: 72.9306, country: 'Maldives', type: 'Lagoon Paradise' },
  { name: 'Fehendhoo (Goidhoo Atoll • Baa)', island: 'Fehendhoo', atoll: 'Baa', atollCode: 'B', latitude: 4.8778, longitude: 72.9611, country: 'Maldives', type: 'Inhabited Island' },
  { name: 'Goidhoo (Goidhoo Atoll • Baa)', island: 'Goidhoo', atoll: 'Baa', atollCode: 'B', latitude: 4.8694, longitude: 72.9972, country: 'Maldives', type: 'Agricultural Hub' },

  // ALIF ALIF ATOLL (AA)
  { name: 'Rasdhoo (Capital • North Ari)', island: 'Rasdhoo', atoll: 'Alif Alif', atollCode: 'AA', latitude: 4.2625, longitude: 72.9900, country: 'Maldives', type: 'Atoll Capital / Dive Hub' },
  { name: 'Ukulhas (North Ari Atoll)', island: 'Ukulhas', atoll: 'Alif Alif', atollCode: 'AA', latitude: 4.2144, longitude: 72.8639, country: 'Maldives', type: 'Eco-Island / Port' },
  { name: 'Thoddoo (Ari Atoll Region)', island: 'Thoddoo', atoll: 'Alif Alif', atollCode: 'AA', latitude: 4.4361, longitude: 72.9611, country: 'Maldives', type: 'Agricultural Hub' },
  { name: 'Mathiveri (North Ari Atoll)', island: 'Mathiveri', atoll: 'Alif Alif', atollCode: 'AA', latitude: 4.1917, longitude: 72.7944, country: 'Maldives', type: 'Inhabited Island' },
  { name: 'Bodufolhudhoo (North Ari Atoll)', island: 'Bodufolhudhoo', atoll: 'Alif Alif', atollCode: 'AA', latitude: 4.1861, longitude: 72.7722, country: 'Maldives', type: 'Inhabited Island' },
  { name: 'Feridhoo (North Ari Atoll)', island: 'Feridhoo', atoll: 'Alif Alif', atollCode: 'AA', latitude: 3.9306, longitude: 72.7222, country: 'Maldives', type: 'Cultural Island' },
  { name: 'Himandhoo (North Ari Atoll)', island: 'Himandhoo', atoll: 'Alif Alif', atollCode: 'AA', latitude: 3.9222, longitude: 72.7444, country: 'Maldives', type: 'Inhabited Island' },
  { name: 'Maalhos (North Ari Atoll)', island: 'Maalhos', atoll: 'Alif Alif', atollCode: 'AA', latitude: 3.9861, longitude: 72.7222, country: 'Maldives', type: 'Inhabited Island' },

  // ALIF DHAALU ATOLL (ADh)
  { name: 'Mahibadhoo (Capital • South Ari)', island: 'Mahibadhoo', atoll: 'Alif Dhaalu', atollCode: 'ADh', latitude: 3.7572, longitude: 72.9686, country: 'Maldives', type: 'Atoll Capital' },
  { name: 'Dhigurah (South Ari Atoll)', island: 'Dhigurah', atoll: 'Alif Dhaalu', atollCode: 'ADh', latitude: 3.5350, longitude: 72.9270, country: 'Maldives', type: 'Whale Shark Hub' },
  { name: 'Maamigili & Villa Airport (South Ari)', island: 'Maamigili', atoll: 'Alif Dhaalu', atollCode: 'ADh', latitude: 3.4750, longitude: 72.8361, country: 'Maldives', type: 'Domestic Airport / Harbor' },
  { name: 'Dhangethi (South Ari Atoll)', island: 'Dhangethi', atoll: 'Alif Dhaalu', atollCode: 'ADh', latitude: 3.6056, longitude: 72.9556, country: 'Maldives', type: 'Tourism / Dive Hub' },
  { name: 'Fenfushi (South Ari Atoll)', island: 'Fenfushi', atoll: 'Alif Dhaalu', atollCode: 'ADh', latitude: 3.4917, longitude: 72.7861, country: 'Maldives', type: 'Historical Mosque' },
  { name: 'Omadhoo (South Ari Atoll)', island: 'Omadhoo', atoll: 'Alif Dhaalu', atollCode: 'ADh', latitude: 3.7889, longitude: 72.9278, country: 'Maldives', type: 'Inhabited Island' },
  { name: 'Hangnaameedhoo (South Ari Atoll)', island: 'Hangnaameedhoo', atoll: 'Alif Dhaalu', atollCode: 'ADh', latitude: 3.8472, longitude: 72.9528, country: 'Maldives', type: 'Inhabited Island' },
  { name: 'Mandhoo (South Ari Atoll)', island: 'Mandhoo', atoll: 'Alif Dhaalu', atollCode: 'ADh', latitude: 3.7028, longitude: 72.7111, country: 'Maldives', type: 'Inhabited Island' },

  // HAA ALIF ATOLL (HA)
  { name: 'Dhidhdhoo (Capital • Haa Alif)', island: 'Dhidhdhoo', atoll: 'Haa Alif', atollCode: 'HA', latitude: 6.8878, longitude: 73.1142, country: 'Maldives', type: 'Atoll Capital' },
  { name: 'Utheemu (Historical • Haa Alif)', island: 'Utheemu', atoll: 'Haa Alif', atollCode: 'HA', latitude: 6.9011, longitude: 73.1114, country: 'Maldives', type: 'National Palace Site' },
  { name: 'Ihavandhoo (Haa Alif Atoll)', island: 'Ihavandhoo', atoll: 'Haa Alif', atollCode: 'HA', latitude: 6.9531, longitude: 72.9261, country: 'Maldives', type: 'Boatbuilding Hub' },
  { name: 'Kelaa (Haa Alif Atoll)', island: 'Kelaa', atoll: 'Haa Alif', atollCode: 'HA', latitude: 6.9606, longitude: 73.2181, country: 'Maldives', type: 'Agricultural Hub' },
  { name: 'Baarah (Haa Alif Atoll)', island: 'Baarah', atoll: 'Haa Alif', atollCode: 'HA', latitude: 6.8186, longitude: 73.2081, country: 'Maldives', type: 'Kalhuohfummi Berth' },
  { name: 'Hoarafushi & Airport (Haa Alif)', island: 'Hoarafushi', atoll: 'Haa Alif', atollCode: 'HA', latitude: 6.9806, longitude: 72.8958, country: 'Maldives', type: 'Domestic Airport' },
  { name: 'Filladhoo (Haa Alif Atoll)', island: 'Filladhoo', atoll: 'Haa Alif', atollCode: 'HA', latitude: 6.8775, longitude: 73.2294, country: 'Maldives', type: 'Inhabited Island' },
  { name: 'Uligan (Northern Gateway • HA)', island: 'Uligan', atoll: 'Haa Alif', atollCode: 'HA', latitude: 7.0811, longitude: 72.9242, country: 'Maldives', type: 'Yacht Port of Entry' },
  { name: 'Turakunu (Northernmost Island)', island: 'Turakunu', atoll: 'Haa Alif', atollCode: 'HA', latitude: 7.1025, longitude: 72.8942, country: 'Maldives', type: 'Northernmost Point' },

  // HAA DHAALU ATOLL (HDh)
  { name: 'Kulhudhuffushi City (Northern Capital)', island: 'Kulhudhuffushi City', atoll: 'Haa Dhaalu', atollCode: 'HDh', latitude: 6.6222, longitude: 73.0700, country: 'Maldives', type: 'Regional City / Port' },
  { name: 'Hanimaadhoo International Airport', island: 'Hanimaadhoo', atoll: 'Haa Dhaalu', atollCode: 'HDh', latitude: 6.7464, longitude: 73.1706, country: 'Maldives', type: 'International Airport' },
  { name: 'Nolhivaranfaru (Capital • HDh)', island: 'Nolhivaranfaru', atoll: 'Haa Dhaalu', atollCode: 'HDh', latitude: 6.6897, longitude: 73.1161, country: 'Maldives', type: 'Inhabited Island' },
  { name: 'Nolhivaram (Haa Dhaalu Atoll)', island: 'Nolhivaram', atoll: 'Haa Dhaalu', atollCode: 'HDh', latitude: 6.6575, longitude: 73.0994, country: 'Maldives', type: 'Inhabited Island' },
  { name: 'Vaikaradhoo (Haa Dhaalu Atoll)', island: 'Vaikaradhoo', atoll: 'Haa Dhaalu', atollCode: 'HDh', latitude: 6.5494, longitude: 72.9511, country: 'Maldives', type: 'Inhabited Island' },
  { name: 'Makunudhoo (Isolated Western Atoll)', island: 'Makunudhoo', atoll: 'Haa Dhaalu', atollCode: 'HDh', latitude: 6.4056, longitude: 72.7039, country: 'Maldives', type: 'Westernmost Outlier' },
  { name: 'Nellaidhoo (Haa Dhaalu Atoll)', island: 'Nellaidhoo', atoll: 'Haa Dhaalu', atollCode: 'HDh', latitude: 6.5567, longitude: 72.9467, country: 'Maldives', type: 'Fishing Hub' },

  // SHAVIYANI ATOLL (Sh)
  { name: 'Funadhoo & Airport (Capital • Shaviyani)', island: 'Funadhoo', atoll: 'Shaviyani', atollCode: 'Sh', latitude: 6.1500, longitude: 73.2900, country: 'Maldives', type: 'Atoll Capital / Airport' },
  { name: 'Milandhoo (Shaviyani Atoll)', island: 'Milandhoo', atoll: 'Shaviyani', atollCode: 'Sh', latitude: 6.2847, longitude: 73.2425, country: 'Maldives', type: 'Large Inhabited Island' },
  { name: 'Komandoo (Shaviyani Atoll)', island: 'Komandoo', atoll: 'Shaviyani', atollCode: 'Sh', latitude: 6.0028, longitude: 73.0561, country: 'Maldives', type: 'Dense Fishing Hub' },
  { name: 'Foakaidhoo (Shaviyani Atoll)', island: 'Foakaidhoo', atoll: 'Shaviyani', atollCode: 'Sh', latitude: 6.2736, longitude: 73.1539, country: 'Maldives', type: 'Inhabited Island' },
  { name: 'Kanditheemu (Shaviyani Atoll)', island: 'Kanditheemu', atoll: 'Shaviyani', atollCode: 'Sh', latitude: 6.4250, longitude: 72.9778, country: 'Maldives', type: 'Earliest Thaana Site' },

  // NOONU ATOLL (N)
  { name: 'Manadhoo (Capital • Noonu Atoll)', island: 'Manadhoo', atoll: 'Noonu', atollCode: 'N', latitude: 5.7667, longitude: 73.4139, country: 'Maldives', type: 'Atoll Capital' },
  { name: 'Velidhoo (Noonu Atoll)', island: 'Velidhoo', atoll: 'Noonu', atollCode: 'N', latitude: 5.6606, longitude: 73.2722, country: 'Maldives', type: 'Boatbuilding Hub' },
  { name: 'Holhudhoo (Noonu Atoll)', island: 'Holhudhoo', atoll: 'Noonu', atollCode: 'N', latitude: 5.7556, longitude: 73.2611, country: 'Maldives', type: 'Inhabited Island' },
  { name: 'Kendhikulhudhoo (Noonu Atoll)', island: 'Kendhikulhudhoo', atoll: 'Noonu', atollCode: 'N', latitude: 5.9472, longitude: 73.4000, country: 'Maldives', type: 'Mangrove Ecology' },
  { name: 'Maafaru International Airport (Noonu)', island: 'Maafaru', atoll: 'Noonu', atollCode: 'N', latitude: 5.8236, longitude: 73.4833, country: 'Maldives', type: 'International Airport' },

  // RAA ATOLL (R)
  { name: 'Ungoofaaru (Capital • Raa Atoll)', island: 'Ungoofaaru', atoll: 'Raa', atollCode: 'R', latitude: 5.6681, longitude: 73.0236, country: 'Maldives', type: 'Atoll Capital / Hospital' },
  { name: 'Dhuvaafaru (Raa Atoll)', island: 'Dhuvaafaru', atoll: 'Raa', atollCode: 'R', latitude: 5.5778, longitude: 73.0139, country: 'Maldives', type: 'Planned Model Island' },
  { name: 'Meedhoo (Raa Atoll)', island: 'Meedhoo', atoll: 'Raa', atollCode: 'R', latitude: 5.4569, longitude: 72.9528, country: 'Maldives', type: 'Inhabited Island' },
  { name: 'Alifushi (Raa Atoll)', island: 'Alifushi', atoll: 'Raa', atollCode: 'R', latitude: 5.9667, longitude: 72.9556, country: 'Maldives', type: 'Carpentry & Boatbuilding' },
  { name: 'Maduvvari (Raa Atoll)', island: 'Maduvvari', atoll: 'Raa', atollCode: 'R', latitude: 5.4611, longitude: 72.9625, country: 'Maldives', type: 'Fishing Hub' },
  { name: 'Ifuru Domestic Airport (Raa Atoll)', island: 'Ifuru', atoll: 'Raa', atollCode: 'R', latitude: 5.7039, longitude: 73.0244, country: 'Maldives', type: 'Domestic Airport' },

  // VAAVU ATOLL (V)
  { name: 'Felidhoo (Capital • Vaavu Atoll)', island: 'Felidhoo', atoll: 'Vaavu', atollCode: 'V', latitude: 3.4717, longitude: 73.5489, country: 'Maldives', type: 'Atoll Capital' },
  { name: 'Keyodhoo (Vaavu Atoll)', island: 'Keyodhoo', atoll: 'Vaavu', atollCode: 'V', latitude: 3.4639, longitude: 73.5500, country: 'Maldives', type: 'Big Game Fishing Hub' },
  { name: 'Fulidhoo (Vaavu Atoll)', island: 'Fulidhoo', atoll: 'Vaavu', atollCode: 'V', latitude: 3.6806, longitude: 73.4150, country: 'Maldives', type: 'Guest House Island' },
  { name: 'Thinadhoo (Vaavu Atoll)', island: 'Thinadhoo', atoll: 'Vaavu', atollCode: 'V', latitude: 3.4861, longitude: 73.5389, country: 'Maldives', type: 'Bikini Beach Island' },
  { name: 'Rakeedhoo (Southern Tip • Vaavu)', island: 'Rakeedhoo', atoll: 'Vaavu', atollCode: 'V', latitude: 3.3222, longitude: 73.4694, country: 'Maldives', type: 'Deep Channel Point' },

  // MEEMU ATOLL (M)
  { name: 'Muli & Airport (Capital • Meemu Atoll)', island: 'Muli', atoll: 'Meemu', atollCode: 'M', latitude: 2.9222, longitude: 73.5806, country: 'Maldives', type: 'Atoll Capital / Airport' },
  { name: 'Dhiggaru (Meemu Atoll)', island: 'Dhiggaru', atoll: 'Meemu', atollCode: 'M', latitude: 3.1111, longitude: 73.5694, country: 'Maldives', type: 'Rihaakuru Production Hub' },
  { name: 'Mulah (Meemu Atoll)', island: 'Mulah', atoll: 'Meemu', atollCode: 'M', latitude: 2.9444, longitude: 73.5833, country: 'Maldives', type: 'Agricultural Island' },
  { name: 'Kolhufushi (Meemu Atoll)', island: 'Kolhufushi', atoll: 'Meemu', atollCode: 'M', latitude: 2.7806, longitude: 73.4278, country: 'Maldives', type: 'Southern Tip Meemu' },

  // FAAFU ATOLL (F)
  { name: 'Nilandhoo (Capital • Faafu Atoll)', island: 'Nilandhoo', atoll: 'Faafu', atollCode: 'F', latitude: 3.0569, longitude: 72.8889, country: 'Maldives', type: 'Atoll Capital / Aasaari Miskiiy' },
  { name: 'Magoodhoo (Faafu Atoll)', island: 'Magoodhoo', atoll: 'Faafu', atollCode: 'F', latitude: 3.0806, longitude: 72.9639, country: 'Maldives', type: 'Marine Research Hub' },
  { name: 'Feeali (Faafu Atoll)', island: 'Feeali', atoll: 'Faafu', atollCode: 'F', latitude: 3.2833, longitude: 72.9917, country: 'Maldives', type: 'Fishing Community' },

  // DHAALU ATOLL (Dh)
  { name: 'Kudahuvadhoo (Capital & Airport • Dhaalu)', island: 'Kudahuvadhoo', atoll: 'Dhaalu', atollCode: 'Dh', latitude: 2.6708, longitude: 72.8944, country: 'Maldives', type: 'Atoll Capital / Domestic Airport' },
  { name: 'Meedhoo (Dhaalu Atoll)', island: 'Meedhoo', atoll: 'Dhaalu', atollCode: 'Dh', latitude: 2.9972, longitude: 72.9778, country: 'Maldives', type: 'Inhabited Island' },
  { name: 'Rinbudhoo (Jewelry Island • Dhaalu)', island: 'Rinbudhoo', atoll: 'Dhaalu', atollCode: 'Dh', latitude: 2.9194, longitude: 72.9806, country: 'Maldives', type: 'Silversmith Heritage' },
  { name: 'Hulhudheli (Dhaalu Atoll)', island: 'Hulhudheli', atoll: 'Dhaalu', atollCode: 'Dh', latitude: 2.8361, longitude: 72.8528, country: 'Maldives', type: 'Inhabited Island' },

  // THAA ATOLL (Th)
  { name: 'Veymandoo (Capital • Thaa Atoll)', island: 'Veymandoo', atoll: 'Thaa', atollCode: 'Th', latitude: 2.1889, longitude: 73.0944, country: 'Maldives', type: 'Atoll Capital' },
  { name: 'Thimarafushi & Airport (Thaa Atoll)', island: 'Thimarafushi', atoll: 'Thaa', atollCode: 'Th', latitude: 2.2083, longitude: 73.1417, country: 'Maldives', type: 'Domestic Airport / Fisheries' },
  { name: 'Guraidhoo (Thaa Atoll)', island: 'Guraidhoo', atoll: 'Thaa', atollCode: 'Th', latitude: 2.3167, longitude: 73.3167, country: 'Maldives', type: 'Inhabited Island' },
  { name: 'Vilufushi (Thaa Atoll)', island: 'Vilufushi', atoll: 'Thaa', atollCode: 'Th', latitude: 2.4417, longitude: 73.3556, country: 'Maldives', type: 'Maritime Port' },
  { name: 'Kinbidhoo (Thaa Atoll)', island: 'Kinbidhoo', atoll: 'Thaa', atollCode: 'Th', latitude: 2.1972, longitude: 73.0361, country: 'Maldives', type: 'Archeological Veyru' },

  // LAAMU ATOLL (L)
  { name: 'Fonadhoo (Capital • Laamu Atoll)', island: 'Fonadhoo', atoll: 'Laamu', atollCode: 'L', latitude: 1.8333, longitude: 73.5028, country: 'Maldives', type: 'Atoll Capital' },
  { name: 'Gan Island (Laamu Link Road Hub)', island: 'Gan', atoll: 'Laamu', atollCode: 'L', latitude: 1.9167, longitude: 73.5417, country: 'Maldives', type: 'Largest Landmass Island' },
  { name: 'Kadhdhoo Domestic Airport (Laamu)', island: 'Kadhdhoo', atoll: 'Laamu', atollCode: 'L', latitude: 1.8583, longitude: 73.5208, country: 'Maldives', type: 'Domestic Airport / MNDF' },
  { name: 'Isdhoo (Historical • Laamu Atoll)', island: 'Isdhoo', atoll: 'Laamu', atollCode: 'L', latitude: 2.1222, longitude: 73.5722, country: 'Maldives', type: 'Isdhoo Loamaafaanu' },
  { name: 'Hithadhoo (Laamu Atoll)', island: 'Hithadhoo', atoll: 'Laamu', atollCode: 'L', latitude: 1.7972, longitude: 73.3917, country: 'Maldives', type: 'Southern Tip Laamu' },

  // GAAFU ALIF ATOLL (GA)
  { name: 'Villingili (Capital • Gaafu Alif)', island: 'Villingili', atoll: 'Gaafu Alif', atollCode: 'GA', latitude: 0.7583, longitude: 73.4361, country: 'Maldives', type: 'Atoll Capital' },
  { name: 'Kooddoo Airport & Fisheries Harbor', island: 'Kooddoo', atoll: 'Gaafu Alif', atollCode: 'GA', latitude: 0.7333, longitude: 73.4333, country: 'Maldives', type: 'Airport / Tuna Cannery' },
  { name: 'Dhaandhoo (Gaafu Alif Atoll)', island: 'Dhaandhoo', atoll: 'Gaafu Alif', atollCode: 'GA', latitude: 0.6194, longitude: 73.4583, country: 'Maldives', type: 'Fishing Community' },
  { name: 'Kolamaafushi (Gaafu Alif Atoll)', island: 'Kolamaafushi', atoll: 'Gaafu Alif', atollCode: 'GA', latitude: 0.8667, longitude: 73.4028, country: 'Maldives', type: 'Northern Huvadhoo' },
  { name: 'Gemanafushi (Gaafu Alif Atoll)', island: 'Gemanafushi', atoll: 'Gaafu Alif', atollCode: 'GA', latitude: 0.5472, longitude: 73.4694, country: 'Maldives', type: 'Major Yellowfin Hub' },

  // GAAFU DHAALU ATOLL (GDh)
  { name: 'Thinadhoo City (Southern Capital)', island: 'Thinadhoo City', atoll: 'Gaafu Dhaalu', atollCode: 'GDh', latitude: 0.5317, longitude: 72.9972, country: 'Maldives', type: 'Regional City / Port' },
  { name: 'Gadhdhoo (Weaving Heritage • GDh)', island: 'Gadhdhoo', atoll: 'Gaafu Dhaalu', atollCode: 'GDh', latitude: 0.2889, longitude: 73.4583, country: 'Maldives', type: 'Thundu Kunaa Heritage' },
  { name: 'Kaadedhdhoo Airport (Gaafu Dhaalu)', island: 'Kaadedhdhoo', atoll: 'Gaafu Dhaalu', atollCode: 'GDh', latitude: 0.4917, longitude: 72.9972, country: 'Maldives', type: 'Domestic Airport' },
  { name: 'Faresmaathodaa Airport (GDh)', island: 'Faresmaathodaa', atoll: 'Gaafu Dhaalu', atollCode: 'GDh', latitude: 0.2194, longitude: 73.0417, country: 'Maldives', type: 'Domestic Airport' },
  { name: 'Vaadhoo (Huvadhoo Channel • GDh)', island: 'Vaadhoo', atoll: 'Gaafu Dhaalu', atollCode: 'GDh', latitude: 0.2333, longitude: 73.2083, country: 'Maldives', type: 'Equatorial Channel Gateway' },

  // GNAVIYANI ATOLL (Gn)
  { name: 'Fuvahmulah City (Oceanic Atoll City)', island: 'Fuvahmulah City', atoll: 'Gnaviyani', atollCode: 'Gn', latitude: -0.2988, longitude: 73.4241, country: 'Maldives', type: 'Single Island Atoll / Airport' },

  // SEENU ATOLL / ADDU CITY (S)
  { name: 'Hithadhoo (Administrative City • Addu)', island: 'Hithadhoo', atoll: 'Seenu', atollCode: 'S', latitude: -0.6000, longitude: 73.0889, country: 'Maldives', type: 'Addu City Hub' },
  { name: 'Gan International Airport (Addu City)', island: 'Gan Airport', atoll: 'Seenu', atollCode: 'S', latitude: -0.6936, longitude: 73.1558, country: 'Maldives', type: 'International Airport' },
  { name: 'Maradhoo (Addu City)', island: 'Maradhoo', atoll: 'Seenu', atollCode: 'S', latitude: -0.6500, longitude: 73.1222, country: 'Maldives', type: 'Slipway & Harbor Hub' },
  { name: 'Feydhoo (Addu City)', island: 'Feydhoo', atoll: 'Seenu', atollCode: 'S', latitude: -0.6833, longitude: 73.1472, country: 'Maldives', type: 'Ferry Port to Gan/Hulhumeedhoo' },
  { name: 'Hulhumeedhoo (Addu City Outer)', island: 'Hulhumeedhoo', atoll: 'Seenu', atollCode: 'S', latitude: -0.5847, longitude: 73.2333, country: 'Maldives', type: 'Isolated Addu Hub' }
];

/**
 * Instant in-memory search across all Maldivian islands, airports, and atolls
 * @param {string} query
 * @param {number} [limit=15]
 * @returns {Array} Matching island objects
 */
export function searchMaldivesDirectory(query, limit = 15) {
  if (!query || typeof query !== 'string') return [];
  const q = query.toLowerCase().trim();
  if (q.length === 0) return [];

  return MALDIVES_ISLANDS_DATABASE.filter(item => {
    return item.island.toLowerCase().includes(q) ||
           item.name.toLowerCase().includes(q) ||
           item.atoll.toLowerCase().includes(q) ||
           item.atollCode.toLowerCase() === q ||
           (item.type && item.type.toLowerCase().includes(q));
  }).slice(0, limit);
}

/**
 * Filter islands by specific atoll code or atoll key
 * @param {string} atollIdentifier (e.g. 'Lh' or 'Lhaviyani')
 * @returns {Array} List of islands in that atoll
 */
export function getIslandsByAtoll(atollIdentifier) {
  if (!atollIdentifier || atollIdentifier === 'ALL') {
    return MALDIVES_ISLANDS_DATABASE;
  }
  const id = atollIdentifier.toLowerCase().trim();
  return MALDIVES_ISLANDS_DATABASE.filter(item => 
    item.atollCode.toLowerCase() === id || 
    item.atoll.toLowerCase() === id
  );
}
