// Harmonic Tidal Constants for Maldives Stations derived from 3 Tide Station Datasets
// Stations: Hanimaadhoo (North), Malé (Center), Gan (South)
// Reference Epoch: 2000-01-01 00:00:00 UTC

export const HARMONIC_REFERENCE_EPOCH = "2000-01-01T00:00:00Z";

export const TIDE_STATIONS = {
  "hanimaadhoo": {
    "stationKey": "hanimaadhoo",
    "name": "Hanimaadhoo (Haa Dhaalu Atoll)",
    "region": "Northern Maldives",
    "latitude": 6.7464,
    "longitude": 73.1706,
    "z0": 1.0447,
    "constituents": [
      {
        "name": "M2",
        "speed": 28.9841042,
        "desc": "Principal lunar semidiurnal",
        "type": "Semidiurnal",
        "amplitude": 0.2299,
        "phase": 60.63
      },
      {
        "name": "S2",
        "speed": 30.0,
        "desc": "Principal solar semidiurnal",
        "type": "Semidiurnal",
        "amplitude": 0.1116,
        "phase": 246.97
      },
      {
        "name": "N2",
        "speed": 28.4397295,
        "desc": "Larger lunar elliptic semidiurnal",
        "type": "Semidiurnal",
        "amplitude": 0.0411,
        "phase": 160.03
      },
      {
        "name": "K2",
        "speed": 30.0821373,
        "desc": "Lunisolar semidiurnal",
        "type": "Semidiurnal",
        "amplitude": 0.0309,
        "phase": 45.01
      },
      {
        "name": "K1",
        "speed": 15.0410686,
        "desc": "Lunar diurnal / lunisolar declinational",
        "type": "Diurnal",
        "amplitude": 0.1836,
        "phase": 330.55
      },
      {
        "name": "O1",
        "speed": 13.9430356,
        "desc": "Lunar diurnal principal",
        "type": "Diurnal",
        "amplitude": 0.0932,
        "phase": 222.51
      },
      {
        "name": "P1",
        "speed": 14.9589314,
        "desc": "Solar diurnal principal",
        "type": "Diurnal",
        "amplitude": 0.0548,
        "phase": 348.03
      },
      {
        "name": "Q1",
        "speed": 13.3986609,
        "desc": "Larger lunar elliptic diurnal",
        "type": "Diurnal",
        "amplitude": 0.0217,
        "phase": 356.8
      },
      {
        "name": "M4",
        "speed": 57.9682084,
        "desc": "Shallow water lunar overtide",
        "type": "Shallow Water",
        "amplitude": 0.002,
        "phase": 207.2
      },
      {
        "name": "MS4",
        "speed": 58.9841042,
        "desc": "Shallow water lunisolar overtide",
        "type": "Shallow Water",
        "amplitude": 0.0006,
        "phase": 28.35
      },
      {
        "name": "MN4",
        "speed": 57.4238337,
        "desc": "Shallow water quarter-diurnal",
        "type": "Shallow Water",
        "amplitude": 0.0016,
        "phase": 250.94
      },
      {
        "name": "2N2",
        "speed": 27.8953548,
        "desc": "Lunar elliptic second-order semidiurnal",
        "type": "Semidiurnal",
        "amplitude": 0.0037,
        "phase": 236.77
      },
      {
        "name": "MU2",
        "speed": 27.9682084,
        "desc": "Variational semidiurnal",
        "type": "Semidiurnal",
        "amplitude": 0.0008,
        "phase": 305.39
      },
      {
        "name": "NU2",
        "speed": 28.5125831,
        "desc": "Larger lunar evectional semidiurnal",
        "type": "Semidiurnal",
        "amplitude": 0.0087,
        "phase": 129.93
      },
      {
        "name": "L2",
        "speed": 29.5284789,
        "desc": "Smaller lunar elliptic semidiurnal",
        "type": "Semidiurnal",
        "amplitude": 0.0083,
        "phase": 135.33
      },
      {
        "name": "T2",
        "speed": 29.9589333,
        "desc": "Larger solar elliptic semidiurnal",
        "type": "Semidiurnal",
        "amplitude": 0.008,
        "phase": 236.78
      },
      {
        "name": "S1",
        "speed": 15.0,
        "desc": "Solar diurnal",
        "type": "Diurnal",
        "amplitude": 0.0048,
        "phase": 333.18
      },
      {
        "name": "2Q1",
        "speed": 12.8542862,
        "desc": "Larger elliptic diurnal",
        "type": "Diurnal",
        "amplitude": 0.0039,
        "phase": 108.37
      },
      {
        "name": "OO1",
        "speed": 16.1391017,
        "desc": "Lunar diurnal",
        "type": "Diurnal",
        "amplitude": 0.0089,
        "phase": 305.21
      },
      {
        "name": "MF",
        "speed": 1.0980331,
        "desc": "Lunar fortnightly",
        "type": "Long Period",
        "amplitude": 0.0172,
        "phase": 305.37
      }
    ]
  },
  "male": {
    "stationKey": "male",
    "name": "Mal\u00e9 (Kaafu Atoll)",
    "region": "Central Maldives",
    "latitude": 4.1755,
    "longitude": 73.5093,
    "z0": 1.6131,
    "constituents": [
      {
        "name": "M2",
        "speed": 28.9841042,
        "desc": "Principal lunar semidiurnal",
        "type": "Semidiurnal",
        "amplitude": 0.2997,
        "phase": 115.78
      },
      {
        "name": "S2",
        "speed": 30.0,
        "desc": "Principal solar semidiurnal",
        "type": "Semidiurnal",
        "amplitude": 0.1807,
        "phase": 286.19
      },
      {
        "name": "N2",
        "speed": 28.4397295,
        "desc": "Larger lunar elliptic semidiurnal",
        "type": "Semidiurnal",
        "amplitude": 0.0488,
        "phase": 240.24
      },
      {
        "name": "K2",
        "speed": 30.0821373,
        "desc": "Lunisolar semidiurnal",
        "type": "Semidiurnal",
        "amplitude": 0.0516,
        "phase": 82.88
      },
      {
        "name": "K1",
        "speed": 15.0410686,
        "desc": "Lunar diurnal / lunisolar declinational",
        "type": "Diurnal",
        "amplitude": 0.0906,
        "phase": 349.21
      },
      {
        "name": "O1",
        "speed": 13.9430356,
        "desc": "Lunar diurnal principal",
        "type": "Diurnal",
        "amplitude": 0.0528,
        "phase": 247.77
      },
      {
        "name": "P1",
        "speed": 14.9589314,
        "desc": "Solar diurnal principal",
        "type": "Diurnal",
        "amplitude": 0.0265,
        "phase": 10.28
      },
      {
        "name": "Q1",
        "speed": 13.3986609,
        "desc": "Larger lunar elliptic diurnal",
        "type": "Diurnal",
        "amplitude": 0.014,
        "phase": 18.02
      },
      {
        "name": "M4",
        "speed": 57.9682084,
        "desc": "Shallow water lunar overtide",
        "type": "Shallow Water",
        "amplitude": 0.0014,
        "phase": 290.06
      },
      {
        "name": "MS4",
        "speed": 58.9841042,
        "desc": "Shallow water lunisolar overtide",
        "type": "Shallow Water",
        "amplitude": 0.0015,
        "phase": 194.27
      },
      {
        "name": "MN4",
        "speed": 57.4238337,
        "desc": "Shallow water quarter-diurnal",
        "type": "Shallow Water",
        "amplitude": 0.0007,
        "phase": 327.93
      },
      {
        "name": "2N2",
        "speed": 27.8953548,
        "desc": "Lunar elliptic second-order semidiurnal",
        "type": "Semidiurnal",
        "amplitude": 0.0063,
        "phase": 8.02
      },
      {
        "name": "MU2",
        "speed": 27.9682084,
        "desc": "Variational semidiurnal",
        "type": "Semidiurnal",
        "amplitude": 0.0093,
        "phase": 355.52
      },
      {
        "name": "NU2",
        "speed": 28.5125831,
        "desc": "Larger lunar evectional semidiurnal",
        "type": "Semidiurnal",
        "amplitude": 0.0096,
        "phase": 204.17
      },
      {
        "name": "L2",
        "speed": 29.5284789,
        "desc": "Smaller lunar elliptic semidiurnal",
        "type": "Semidiurnal",
        "amplitude": 0.0117,
        "phase": 170.41
      },
      {
        "name": "T2",
        "speed": 29.9589333,
        "desc": "Larger solar elliptic semidiurnal",
        "type": "Semidiurnal",
        "amplitude": 0.0098,
        "phase": 284.37
      },
      {
        "name": "S1",
        "speed": 15.0,
        "desc": "Solar diurnal",
        "type": "Diurnal",
        "amplitude": 0.0035,
        "phase": 3.93
      },
      {
        "name": "2Q1",
        "speed": 12.8542862,
        "desc": "Larger elliptic diurnal",
        "type": "Diurnal",
        "amplitude": 0.0027,
        "phase": 130.1
      },
      {
        "name": "OO1",
        "speed": 16.1391017,
        "desc": "Lunar diurnal",
        "type": "Diurnal",
        "amplitude": 0.0041,
        "phase": 321.59
      },
      {
        "name": "MF",
        "speed": 1.0980331,
        "desc": "Lunar fortnightly",
        "type": "Long Period",
        "amplitude": 0.017,
        "phase": 303.39
      }
    ]
  },
  "gan": {
    "stationKey": "gan",
    "name": "Gan (Addu Atoll)",
    "region": "Southern Maldives",
    "latitude": -0.6936,
    "longitude": 73.1558,
    "z0": 1.9413,
    "constituents": [
      {
        "name": "M2",
        "speed": 28.9841042,
        "desc": "Principal lunar semidiurnal",
        "type": "Semidiurnal",
        "amplitude": 0.2351,
        "phase": 89.78
      },
      {
        "name": "S2",
        "speed": 30.0,
        "desc": "Principal solar semidiurnal",
        "type": "Semidiurnal",
        "amplitude": 0.1377,
        "phase": 270.46
      },
      {
        "name": "N2",
        "speed": 28.4397295,
        "desc": "Larger lunar elliptic semidiurnal",
        "type": "Semidiurnal",
        "amplitude": 0.0347,
        "phase": 200.08
      },
      {
        "name": "K2",
        "speed": 30.0821373,
        "desc": "Lunisolar semidiurnal",
        "type": "Semidiurnal",
        "amplitude": 0.0364,
        "phase": 68.45
      },
      {
        "name": "K1",
        "speed": 15.0410686,
        "desc": "Lunar diurnal / lunisolar declinational",
        "type": "Diurnal",
        "amplitude": 0.1163,
        "phase": 335.65
      },
      {
        "name": "O1",
        "speed": 13.9430356,
        "desc": "Lunar diurnal principal",
        "type": "Diurnal",
        "amplitude": 0.0625,
        "phase": 232.86
      },
      {
        "name": "P1",
        "speed": 14.9589314,
        "desc": "Solar diurnal principal",
        "type": "Diurnal",
        "amplitude": 0.0366,
        "phase": 351.5
      },
      {
        "name": "Q1",
        "speed": 13.3986609,
        "desc": "Larger lunar elliptic diurnal",
        "type": "Diurnal",
        "amplitude": 0.0162,
        "phase": 8.99
      },
      {
        "name": "M4",
        "speed": 57.9682084,
        "desc": "Shallow water lunar overtide",
        "type": "Shallow Water",
        "amplitude": 0.0029,
        "phase": 271.28
      },
      {
        "name": "MS4",
        "speed": 58.9841042,
        "desc": "Shallow water lunisolar overtide",
        "type": "Shallow Water",
        "amplitude": 0.0015,
        "phase": 127.0
      },
      {
        "name": "MN4",
        "speed": 57.4238337,
        "desc": "Shallow water quarter-diurnal",
        "type": "Shallow Water",
        "amplitude": 0.0008,
        "phase": 306.16
      },
      {
        "name": "2N2",
        "speed": 27.8953548,
        "desc": "Lunar elliptic second-order semidiurnal",
        "type": "Semidiurnal",
        "amplitude": 0.0024,
        "phase": 317.96
      },
      {
        "name": "MU2",
        "speed": 27.9682084,
        "desc": "Variational semidiurnal",
        "type": "Semidiurnal",
        "amplitude": 0.0047,
        "phase": 359.36
      },
      {
        "name": "NU2",
        "speed": 28.5125831,
        "desc": "Larger lunar evectional semidiurnal",
        "type": "Semidiurnal",
        "amplitude": 0.0074,
        "phase": 165.93
      },
      {
        "name": "L2",
        "speed": 29.5284789,
        "desc": "Smaller lunar elliptic semidiurnal",
        "type": "Semidiurnal",
        "amplitude": 0.0097,
        "phase": 155.52
      },
      {
        "name": "T2",
        "speed": 29.9589333,
        "desc": "Larger solar elliptic semidiurnal",
        "type": "Semidiurnal",
        "amplitude": 0.0083,
        "phase": 249.87
      },
      {
        "name": "S1",
        "speed": 15.0,
        "desc": "Solar diurnal",
        "type": "Diurnal",
        "amplitude": 0.0064,
        "phase": 350.57
      },
      {
        "name": "2Q1",
        "speed": 12.8542862,
        "desc": "Larger elliptic diurnal",
        "type": "Diurnal",
        "amplitude": 0.0033,
        "phase": 120.01
      },
      {
        "name": "OO1",
        "speed": 16.1391017,
        "desc": "Lunar diurnal",
        "type": "Diurnal",
        "amplitude": 0.0047,
        "phase": 309.26
      },
      {
        "name": "MF",
        "speed": 1.0980331,
        "desc": "Lunar fortnightly",
        "type": "Long Period",
        "amplitude": 0.0155,
        "phase": 302.14
      }
    ]
  }
};
