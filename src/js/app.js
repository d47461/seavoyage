// Vue 3 Maritime Voyage Application with Maldives Meteorological Service (MMS) Integration & Route Optimization
import { createApp, ref, computed, watch, onMounted, nextTick } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js';
import { 
  fetchMarineAndWeatherData, 
  searchLocations, 
  fetchMMSAlerts, 
  matchMMSAlert, 
  MALDIVES_PORTS, 
  FAMOUS_PORTS, 
  POPULAR_ROUTES,
  MAAFILAAFUSHI_PORT,
  MAAFILAAFUSHI_DEVICE_LOCATION,
  HANIMAADHOO_PORT,
  WMO_CODES, 
  getWindDirectionCardinal,
  isCoordinateInMaldives,
  calculateDistance,
  calculateBearing,
  calculateMidpoint,
  getRelativeSeaAspect,
  MALDIVES_ISLANDS_DATABASE,
  MALDIVES_ATOLLS,
  MALDIVES_ATOLL_LIST,
  searchMaldivesDirectory,
  getIslandsByAtoll,
  getZoomEarthUrl
} from './marine-api.js?v=20260913-v5';
import { 
  VESSEL_PROFILES, 
  evaluateSeaSafety, 
  getBeaufortScale, 
  getDouglasSeaState,
  evaluateDayTripPlanning,
  generateTenDayTripSummary,
  generate7DaySafetyTrend
} from './safety-engine.js?v=20260913-v2';
import { 
  generateCaptainAdvisory 
} from './ai-advisory.js?v=20260912-v7';
import { 
  initAuthListener, 
  loginAnonymously, 
  saveFavoriteLocation, 
  fetchFavoriteLocations, 
  removeFavoriteLocation 
} from './firebase-config.js?v=20260912-v8';
import {
  getMoonPhaseInfo,
  getTidePrediction,
  getVisibilityAnalysis,
  findBestTravelWindow
} from './tide-lunar.js?v=20260912-v8';
import {
  evaluateFishingConditions,
  MALDIVES_FISHING_HOTSPOTS
} from './fishing-engine.js?v=20260912-v8';
import {
  getCurrentNakaiy,
  NAKAIY_CALENDAR
} from './nakaiy-engine.js?v=20260912-v10';

const app = createApp({
  setup() {
    // 1. Dual Location Route Planning State
    // Default departure location is ALWAYS Maafilaafushi (Lhaviyani Atoll: 5.3625°N, 73.4197°E)
    // unless the user explicitly wants to change it to their device GPS or another island.
    const departureLocation = ref({ ...MAAFILAAFUSHI_PORT });
    const destinationLocation = ref({ ...HANIMAADHOO_PORT }); // Hanimaadhoo (Haa Dhaalu Atoll) by default
    const activePickerTarget = ref('departure'); // 'departure' or 'destination'
    const popularRoutes = ref(POPULAR_ROUTES);

    // Dedicated Atoll & Island Directory Filtering for Departure & Destination
    const maldivesAtolls = ref(MALDIVES_ATOLLS);
    const departureAtollFilter = ref('Lhaviyani');
    const destinationAtollFilter = ref('Kaafu');
    const departureSearchQuery = ref('');
    const destinationSearchQuery = ref('');

    const departureFilteredIslands = computed(() => {
      const q = departureSearchQuery.value?.trim();
      if (q && q.length > 0) {
        return searchMaldivesDirectory(q, 35);
      }
      return getIslandsByAtoll(departureAtollFilter.value);
    });

    const destinationFilteredIslands = computed(() => {
      const q = destinationSearchQuery.value?.trim();
      if (q && q.length > 0) {
        return searchMaldivesDirectory(q, 35);
      }
      return getIslandsByAtoll(destinationAtollFilter.value);
    });

    function setDepartureIsland(island) {
      if (!island) return;
      departureLocation.value = { ...island, isDeviceLocation: false };
      departureSearchQuery.value = '';
      loadDataForRoute();
    }

    function setDestinationIsland(island) {
      if (!island) return;
      destinationLocation.value = { ...island };
      destinationSearchQuery.value = '';
      loadDataForRoute();
    }

    // Check if Departure is currently set to the default Maafilaafushi
    const isMaafilaafushiDeparture = computed(() => {
      if (!departureLocation.value) return false;
      return (
        Math.abs(departureLocation.value.latitude - 5.3625) < 0.005 &&
        Math.abs(departureLocation.value.longitude - 73.4197) < 0.005 &&
        !departureLocation.value.isDeviceLocation
      );
    });

    // Device Geolocation State
    const isLocatingDevice = ref(false);
    const deviceLocation = ref({ ...MAAFILAAFUSHI_PORT });
    const deviceLocationError = ref(null);
    const isUsingDeviceLocation = computed(() => departureLocation.value?.isDeviceLocation === true);

    // Top-Level Main Navigation Tab ('advisories' | 'weather' | 'planning' | 'fishing')
    const activeMainTab = ref('advisories');

    // Single-Screen Sub-Navigation States (Default: Safety Verdict & MMS)
    const activeAdvisorySubTab = ref('verdict'); // 'verdict', 'chart', 'hazards'
    const activeWeatherSubTab = ref('nakaiy'); // 'nakaiy', 'telemetry', 'forecast', 'tides'
    const activePlanningSubTab = ref('travel-date'); // 'travel-date', 'best-window', 'hourly', 'briefing', 'corridor'
    const activeFishingSubTab = ref('intel'); // 'intel', 'jigging', 'casting', 'trolling', 'spots'
    const showRoutePlannerModal = ref(false);

    function setAdvisorySubTab(subKey) {
      activeAdvisorySubTab.value = subKey;
      if (subKey === 'chart') {
        nextTick(() => {
          if (typeof leafletMap !== 'undefined' && leafletMap) {
            leafletMap.invalidateSize();
          } else {
            initMap();
          }
        });
      }
    }

    function setWeatherSubTab(subKey) {
      activeWeatherSubTab.value = subKey;
    }

    function setPlanningSubTab(subKey) {
      activePlanningSubTab.value = subKey;
    }

    function setFishingSubTab(subKey) {
      activeFishingSubTab.value = subKey;
      if (['jigging', 'casting', 'trolling', 'night'].includes(subKey)) {
        activeFishingTab.value = subKey;
      }
    }

    function setMainTab(tabKey) {
      activeMainTab.value = tabKey;
      if (typeof window !== 'undefined' && window.innerWidth <= 1200) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      if (tabKey === 'map') {
        nextTick(() => {
          if (typeof leafletMap !== 'undefined' && leafletMap) {
            leafletMap.invalidateSize();
            fitRouteBounds();
          } else {
            initMap();
          }
        });
      }
    }

    // Maldivian Sportfishing Advisory State (Jigging vs Casting)
    const activeFishingTab = ref('jigging'); // 'jigging' or 'casting'

    // Search & Autocomplete
    const searchQuery = ref('');
    const searchResults = ref([]);
    const isSearching = ref(false);
    
    const maldivesPorts = ref(MALDIVES_PORTS);
    const famousPorts = ref(FAMOUS_PORTS);
    const activeRegionTab = ref('maldives'); // 'maldives' or 'global'

    // Vessel Profile & Units (Default: Maldivian Speedboat)
    const selectedVesselKey = ref('maldives_speedboat');
    const vesselProfiles = ref(VESSEL_PROFILES);
    const selectedVessel = computed(() => vesselProfiles.value[selectedVesselKey.value] || vesselProfiles.value.maldives_speedboat);
    const unitSystem = ref('nautical'); // 'nautical' (knots/m), 'metric' (km/h/m), 'imperial' (mph/ft)

    // Maldives Meteorological Service (MMS) Alerts State
    const mmsAlerts = ref([]);
    const isLoadingMmsAlerts = ref(false);

    // Marine State & Safety Evaluation
    const marineReport = ref(null);
    const safetyEvaluation = ref(null);
    const isLoadingData = ref(false);
    const errorMessage = ref(null);

    // 10-Day Weather Predictions & Trip Planning State
    const tenDayForecast = ref([]);
    const selectedDayIndex = ref(0);
    const tenDayFilter = ref('all'); // 'all', 'go', 'next3', 'weekend'
    const tenDaySummary = ref(null);

    const selectedDayForecast = computed(() => {
      if (!tenDayForecast.value || tenDayForecast.value.length === 0) return null;
      return tenDayForecast.value[selectedDayIndex.value] || tenDayForecast.value[0];
    });

    const filteredTenDays = computed(() => {
      if (!tenDayForecast.value) return [];
      if (tenDayFilter.value === 'go') {
        return tenDayForecast.value.filter(d => d.status === 'GO');
      }
      if (tenDayFilter.value === 'next3') {
        return tenDayForecast.value.filter(d => d.dayIndex < 3);
      }
      if (tenDayFilter.value === 'weekend') {
        return tenDayForecast.value.filter(d => d.weekdayName === 'Friday' || d.weekdayName === 'Saturday' || d.weekdayName === 'Sunday');
      }
      return tenDayForecast.value;
    });

    function selectForecastDay(idx) {
      selectedDayIndex.value = idx;
    }

    function setTenDayFilter(filter) {
      tenDayFilter.value = filter;
    }

    function planVoyageForDay(day) {
      if (!day) return;
      selectedDayIndex.value = day.dayIndex;
      const el = document.getElementById('ten-day-detail-panel');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Dedicated Trip Planning Calendar & 7-Day Sea Travel Safety Trend State
    const selectedTravelDate = ref((new Date()).toISOString().slice(0, 10));

    const calendarMinDate = computed(() => {
      const d = new Date();
      d.setDate(d.getDate() - 4);
      return d.toISOString().slice(0, 10);
    });

    const calendarMaxDate = computed(() => {
      const d = new Date();
      d.setDate(d.getDate() + 14);
      return d.toISOString().slice(0, 10);
    });

    const sevenDaySafetyTrend = computed(() => {
      if (!marineReport.value) return null;
      const allRecords = marineReport.value.allDailyRecords || marineReport.value.tenDays || [];
      const vessel = selectedVesselKey.value;
      const route = routeData.value;
      const alert = currentMmsAlert.value;
      return generate7DaySafetyTrend(
        selectedTravelDate.value,
        allRecords,
        vessel,
        route,
        alert
      );
    });

    const travelDateSafetyReport = computed(() => {
      if (sevenDaySafetyTrend.value && sevenDaySafetyTrend.value.travelDay) {
        return sevenDaySafetyTrend.value.travelDay;
      }
      return null;
    });

    const travelDateNakaiy = computed(() => {
      try {
        const d = new Date(selectedTravelDate.value + 'T12:00:00Z');
        return getCurrentNakaiy(d);
      } catch (e) {
        return currentNakaiy.value;
      }
    });

    const travelDateMoon = computed(() => {
      try {
        const d = new Date(selectedTravelDate.value + 'T12:00:00Z');
        return getMoonPhaseInfo(d);
      } catch (e) {
        return moonPhase.value;
      }
    });

    function setTravelDate(dateStr) {
      if (!dateStr) return;
      selectedTravelDate.value = dateStr;
    }

    function stepTravelDate(deltaDays) {
      try {
        const cur = new Date(selectedTravelDate.value + 'T12:00:00Z');
        cur.setDate(cur.getDate() + deltaDays);
        selectedTravelDate.value = cur.toISOString().slice(0, 10);
      } catch (e) {
        console.warn('stepTravelDate error:', e);
      }
    }

    function setTravelDatePreset(preset) {
      const now = new Date();
      if (preset === 'today') {
        selectedTravelDate.value = now.toISOString().slice(0, 10);
      } else if (preset === 'tomorrow') {
        const tom = new Date(now.getTime() + 86400000);
        selectedTravelDate.value = tom.toISOString().slice(0, 10);
      } else if (preset === 'plus2') {
        const p2 = new Date(now.getTime() + 2 * 86400000);
        selectedTravelDate.value = p2.toISOString().slice(0, 10);
      } else if (preset === 'weekend') {
        const day = now.getDay();
        const daysUntilFri = (5 - day + 7) % 7 || 7;
        const fri = new Date(now.getTime() + daysUntilFri * 86400000);
        selectedTravelDate.value = fri.toISOString().slice(0, 10);
      }
    }

    function formatTravelDateFull(dateStr) {
      if (!dateStr) return '';
      try {
        const d = new Date(dateStr + 'T12:00:00Z');
        return d.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      } catch (e) {
        return dateStr;
      }
    }

    // AI Chief Mate Advisory
    const aiBrief = ref('');
    const isAiLoading = ref(false);

    // User & Persistence
    const currentUser = ref(null);
    const favoriteLocations = ref([]);
    const showHarmonicsModal = ref(false);
    const showNakaiyModal = ref(false);
    const selectedConstituent = ref(null);

    // Theme Management: System, Dark, Light
    const themeMode = ref(localStorage.getItem('seavoyage_theme') || 'system');
    const systemPrefersDark = ref(
      typeof window !== 'undefined' && window.matchMedia
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
        : true
    );

    const currentEffectiveTheme = computed(() => {
      if (themeMode.value === 'system') {
        return systemPrefersDark.value ? 'ocean' : 'light';
      }
      return themeMode.value;
    });

    function applyTheme(mode) {
      const target = mode || themeMode.value;
      const effective = target === 'system'
        ? (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'ocean' : 'light')
        : target;

      document.documentElement.setAttribute('data-theme', effective);
      document.documentElement.setAttribute('data-theme-mode', target);
    }

    function setTheme(mode) {
      themeMode.value = mode;
      localStorage.setItem('seavoyage_theme', mode);
      applyTheme(mode);
    }

    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleSystemThemeChange = (e) => {
        systemPrefersDark.value = e.matches;
        if (themeMode.value === 'system') {
          applyTheme('system');
        }
      };

      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleSystemThemeChange);
      } else if (mediaQuery.addListener) {
        mediaQuery.addListener(handleSystemThemeChange);
      }
    }


    // Live Date & Time Display Ticker
    const currentClockTime = ref(new Date());
    let clockTimer = null;

    const liveClock = computed(() => {
      const d = currentClockTime.value;
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const dayName = days[d.getDay()];
      const dateNum = d.getDate();
      const monthName = months[d.getMonth()];
      const year = d.getFullYear();
      const hours = String(d.getHours()).padStart(2, '0');
      const mins = String(d.getMinutes()).padStart(2, '0');
      const secs = String(d.getSeconds()).padStart(2, '0');
      return {
        dateStr: `${dayName}, ${dateNum} ${monthName} ${year}`,
        timeStr: `${hours}:${mins}:${secs}`,
        fullStamp: `${dateNum} ${monthName} ${year} • ${hours}:${mins}:${secs} MVT`
      };
    });

    // New Voyage Plan Form
    const voyageForm = ref({
      title: '',
      departureDate: new Date().toISOString().slice(0, 16),
      notes: ''
    });

    // Leaflet Map References
    let leafletMap = null;
    let departureMarker = null;
    let destinationMarker = null;
    let routePolyline = null;

    // SVG Score Gauge Circumference
    const gaugeRadius = 60;
    const gaugeCircumference = 2 * Math.PI * gaugeRadius;

    const gaugeOffset = computed(() => {
      if (!safetyEvaluation.value) return gaugeCircumference;
      const score = safetyEvaluation.value.score;
      return gaugeCircumference - (score / 100) * gaugeCircumference;
    });

    // Weather Condition Display
    const weatherCondition = computed(() => {
      if (!marineReport.value) return { label: 'Clear Sky', icon: 'fa-solid fa-sun' };
      const code = marineReport.value.current.weatherCode;
      return WMO_CODES[code] || { label: 'Clear Sky', icon: 'fa-solid fa-sun' };
    });

    // Wind Cardinal Direction
    const windCardinal = computed(() => {
      if (!marineReport.value) return 'N';
      return getWindDirectionCardinal(marineReport.value.current.windDirection);
    });

    // Check if route is in Maldives
    const isMaldives = computed(() => {
      return (
        isCoordinateInMaldives(departureLocation.value.latitude, departureLocation.value.longitude) ||
        isCoordinateInMaldives(destinationLocation.value.latitude, destinationLocation.value.longitude) ||
        departureLocation.value.country === 'Maldives' ||
        destinationLocation.value.country === 'Maldives'
      );
    });

    // Active MMS Alert for this voyage route (checks departure, destination, or corridor)
    const currentMmsAlert = computed(() => {
      const depAlert = matchMMSAlert(
        departureLocation.value.latitude, 
        departureLocation.value.longitude, 
        departureLocation.value.name, 
        mmsAlerts.value
      );
      if (depAlert && depAlert.active) return depAlert;

      const destAlert = matchMMSAlert(
        destinationLocation.value.latitude, 
        destinationLocation.value.longitude, 
        destinationLocation.value.name, 
        mmsAlerts.value
      );
      if (destAlert && destAlert.active) return destAlert;

      return depAlert || {
        active: false,
        color: 'green',
        headline: 'No Active Severe Weather Warning',
        description: 'Normal sea conditions prevailing according to Maldives Meteorological Service.',
        areaDesc: 'From Haa Alif Atoll to Addu City (All Atolls Clear - Normal Weather)',
        startAtoll: 'Haa Alif Atoll',
        endAtoll: 'Addu City',
        inEffect: false
      };
    });

    // Astronomical Moon Phase ("Moon Face") & Illumination
    const moonPhase = computed(() => {
      return getMoonPhaseInfo(new Date());
    });

    // Astronomical Tide Prediction & Channel Water Velocity
    const tideData = computed(() => {
      return getTidePrediction(
        departureLocation.value.latitude,
        departureLocation.value.longitude,
        new Date()
      );
    });

    // Detailed Maritime Visibility
    const visibilityData = computed(() => {
      const vis = marineReport.value?.current?.visibility ?? 10000;
      const code = marineReport.value?.current?.weatherCode ?? 0;
      return getVisibilityAnalysis(vis, code);
    });

    // 2. Spherical Passage Route Calculation (Distance, Course Heading, Transit Time, Sea Aspect)
    const routeData = computed(() => {
      const dep = departureLocation.value;
      const dest = destinationLocation.value;
      if (!dep || !dest) return null;

      const dist = calculateDistance(dep.latitude, dep.longitude, dest.latitude, dest.longitude);
      const bearingObj = calculateBearing(dep.latitude, dep.longitude, dest.latitude, dest.longitude);
      const mid = calculateMidpoint(dep.latitude, dep.longitude, dest.latitude, dest.longitude);

      const vessel = vesselProfiles.value[selectedVesselKey.value] || vesselProfiles.value.maldives_speedboat;
      const distNm = dist.nauticalMiles ?? dist.nm ?? 0;
      const distKm = dist.kilometers ?? dist.km ?? 0;
      const speedKn = vessel.cruisingSpeedKnots || 20;
      const transitHours = distNm / speedKn;
      const totalMins = Math.round(transitHours * 60);
      const hrs = Math.floor(totalMins / 60);
      const mins = totalMins % 60;
      const transitTimeStr = hrs > 0 ? (mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`) : `${mins}m`;

      // Match famous passage channel
      const matchedRoute = POPULAR_ROUTES.find(r => 
        (r.departure.name === dep.name && r.destination.name === dest.name) ||
        (r.departure.name === dest.name && r.destination.name === dep.name)
      );
      const channelName = matchedRoute ? matchedRoute.channelName : `${dep.atoll || 'Atoll'} ➔ ${dest.atoll || 'Channel Pass'}`;

      const windDir = marineReport.value?.current?.windDirection;
      const swellDir = marineReport.value?.current?.swellDirection ?? marineReport.value?.current?.waveDirection ?? windDir;
      const windAspect = getRelativeSeaAspect(bearingObj.bearing, windDir);
      const swellAspect = getRelativeSeaAspect(bearingObj.bearing, swellDir);

      return {
        departure: dep,
        destination: dest,
        distanceNm: distNm,
        distanceKm: distKm,
        bearing: bearingObj.bearing,
        cardinal: bearingObj.cardinal,
        label: bearingObj.label,
        midpoint: mid,
        channelName,
        cruisingSpeedKnots: speedKn,
        transitTimeStr,
        transitMinutes: totalMins,
        windAspect,
        swellAspect
      };
    });

    // Refined Best Window to Travel factoring in Met alert, wind direction, waves, swells & gusts
    const bestTravelWindow = computed(() => {
      if (!marineReport.value || !marineReport.value.timeline) return null;
      const vessel = vesselProfiles.value[selectedVesselKey.value];
      let timelineToUse = marineReport.value.timeline;
      const isToday = selectedTravelDate.value === (new Date()).toISOString().slice(0, 10);
      if (!isToday && travelDateSafetyReport.value && travelDateSafetyReport.value.hours && travelDateSafetyReport.value.hours.length >= 3) {
        timelineToUse = travelDateSafetyReport.value.hours;
      }
      return findBestTravelWindow(
        timelineToUse,
        vessel,
        (isToday ? currentMmsAlert.value : null),
        tideData.value,
        routeData.value
      );
    });

    // Dedicated Single-Location Maldivian Sportfishing Intelligence State
    const fishingAtolls = ref(MALDIVES_ATOLL_LIST);
    const selectedFishingAtollKey = ref('Lhaviyani'); // Default to Lh. Atoll (Faadhippolhu)
    const selectedFishingAtoll = computed(() => {
      return fishingAtolls.value.find(a => a.key === selectedFishingAtollKey.value) || fishingAtolls.value[0];
    });

    const activeFishingModality = ref('jigging'); // 'jigging', 'casting', 'trolling', 'night'
    const fishingMarineReport = ref(null);
    const isFishingLoading = ref(false);

    // Active Traditional Maldivian Nakaiy (Monsoon Calendar)
    const currentNakaiy = computed(() => {
      return getCurrentNakaiy(currentClockTime.value || new Date());
    });

    // Fetch marine telemetry specifically for selected fishing atoll
    async function loadFishingAtollData(atollKey) {
      const atoll = fishingAtolls.value.find(a => a.key === atollKey) || selectedFishingAtoll.value;
      if (!atoll) return;
      isFishingLoading.value = true;
      try {
        const report = await fetchMarineAndWeatherData(atoll.lat, atoll.lon);
        if (report) {
          fishingMarineReport.value = report;
        }
      } catch (err) {
        console.warn('Dedicated fishing atoll marine fetch fallback:', err);
      } finally {
        isFishingLoading.value = false;
      }
    }

    function setFishingAtoll(atollKey) {
      selectedFishingAtollKey.value = atollKey;
      loadFishingAtollData(atollKey);
    }

    // Maldivian Sportfishing Intelligence Advisory (Single Atoll + Nakaiy + Solunar + 4 Modalities)
    const fishingReport = computed(() => {
      const reportToUse = fishingMarineReport.value || marineReport.value;
      if (!reportToUse) return null;
      return evaluateFishingConditions(
        reportToUse,
        tideData.value,
        moonPhase.value,
        selectedFishingAtoll.value,
        currentNakaiy.value
      );
    });

    // Check if current departure is bookmarked
    const isFavorite = computed(() => {
      return favoriteLocations.value.some(l => 
        Math.abs(l.latitude - departureLocation.value.latitude) < 0.01 && 
        Math.abs(l.longitude - departureLocation.value.longitude) < 0.01
      );
    });

    // Backwards-compatible alias for single location references
    const activeLocation = computed(() => departureLocation.value);

    // Dynamic Badges for Main Navigation Tabs
    const advisoriesTabBadge = computed(() => {
      if (currentMmsAlert.value?.active && currentMmsAlert.value.color && currentMmsAlert.value.color !== 'green') {
        return {
          type: 'alert-' + currentMmsAlert.value.color,
          label: (currentMmsAlert.value.color || 'ALERT').toUpperCase() + ' ALERT',
          isAlert: true
        };
      }
      if (safetyEvaluation.value) {
        return {
          type: 'status-' + (safetyEvaluation.value.status || 'caution').toLowerCase(),
          label: `${safetyEvaluation.value.status} (${safetyEvaluation.value.tripScore || safetyEvaluation.value.safetyScore || 0}%)`,
          isAlert: false
        };
      }
      return null;
    });

    const weatherTabBadge = computed(() => {
      if (marineReport.value?.current) {
        const wave = marineReport.value.current.waveHeight != null ? `${marineReport.value.current.waveHeight.toFixed(1)}m` : '';
        const wind = marineReport.value.current.windSpeed != null ? `${Math.round(marineReport.value.current.windSpeed)}kn` : '';
        if (wave && wind) return `${wave} • ${wind}`;
      }
      return '10-Day Live';
    });

    const fishingTabBadge = computed(() => {
      if (fishingReport.value?.overallBiteRating != null) {
        return `${fishingReport.value.overallBiteRating}/100`;
      }
      return 'Solunar';
    });

    const planningTabBadge = computed(() => {
      if (bestTravelWindow.value?.optimal?.startTime) {
        return `${bestTravelWindow.value.optimal.startTime}`;
      }
      return '24h Rec';
    });

    // 1-Click apply window or hourly departure to route planner
    function applyBestWindowToVoyage(win) {
      if (!win) return;
      showRoutePlannerModal.value = true;
    }

    // 1-Click apply hourly slot to route planner
    function applyHourToVoyage(slot) {
      if (!slot) return;
      showRoutePlannerModal.value = true;
    }

    // Formatters
    function formatWave(meters) {
      if (meters === null || meters === undefined) return '0.5 m';
      const m = typeof meters === 'number' ? meters : parseFloat(meters);
      if (isNaN(m)) return `${meters}`;
      if (unitSystem.value === 'imperial') {
        const feet = m * 3.28084;
        return `${feet.toFixed(1)} ft`;
      }
      return `${m.toFixed(1)} m`;
    }

    function formatWind(knots) {
      if (knots === null || knots === undefined) return '0 kn';
      const k = typeof knots === 'number' ? knots : parseFloat(knots);
      if (isNaN(k)) return `${knots}`;
      if (unitSystem.value === 'metric') {
        const kmh = k * 1.852;
        return `${Math.round(kmh)} km/h`;
      } else if (unitSystem.value === 'imperial') {
        const mph = k * 1.15078;
        return `${Math.round(mph)} mph`;
      }
      return `${Math.round(k)} kn`;
    }

    function formatTemp(celsius) {
      if (celsius === null || celsius === undefined) return '28°C';
      const c = typeof celsius === 'number' ? celsius : parseFloat(celsius);
      if (isNaN(c)) return `${celsius}`;
      if (unitSystem.value === 'imperial') {
        const f = (c * 9/5) + 32;
        return `${Math.round(f)}°F`;
      }
      return `${Math.round(c)}°C`;
    }

    function formatSeaTemp(celsius) {
      if (celsius === null || celsius === undefined) return '29.5°C';
      const c = typeof celsius === 'number' ? celsius : parseFloat(celsius);
      if (isNaN(c)) return `${celsius}°C`;
      if (unitSystem.value === 'imperial') {
        const f = (c * 9/5) + 32;
        return `${f.toFixed(1)}°F`;
      }
      return `${c.toFixed(1)}°C`;
    }

    function formatCurrentSpeed(speedKnots) {
      if (speedKnots === null || speedKnots === undefined) return '0.8 kn';
      const kn = typeof speedKnots === 'number' ? speedKnots : parseFloat(speedKnots);
      if (isNaN(kn)) return `${speedKnots} kn`;
      if (unitSystem.value === 'metric') {
        const kmh = kn * 1.852;
        return `${kmh.toFixed(1)} km/h`;
      }
      return `${kn.toFixed(1)} kn`;
    }

    function formatPressure(hPa) {
      if (hPa === null || hPa === undefined) return '1011.5 hPa';
      const p = typeof hPa === 'number' ? hPa : parseFloat(hPa);
      if (isNaN(p)) return `${hPa} hPa`;
      if (unitSystem.value === 'imperial') {
        const inHg = p * 0.02953;
        return `${inHg.toFixed(2)} inHg`;
      }
      return `${p.toFixed(1)} hPa`;
    }

    function formatPrecipitation(mm) {
      if (mm === null || mm === undefined) return '0.0 mm';
      const m = typeof mm === 'number' ? mm : parseFloat(mm);
      if (isNaN(m)) return `${mm} mm`;
      if (unitSystem.value === 'imperial') {
        const inches = m * 0.03937;
        return `${inches.toFixed(2)} in`;
      }
      return `${m.toFixed(1)} mm`;
    }

    function formatHumidity(pct) {
      if (pct === null || pct === undefined) return '80%';
      return `${Math.round(pct)}%`;
    }

    function formatUvIndex(uv) {
      if (uv === null || uv === undefined) return '0.0';
      return Number(uv).toFixed(1);
    }

    function getFirstName(name) {
      if (!name) return '';
      return String(name).split(' ')[0];
    }

    function formatTideStageBadge(stage) {
      if (!stage) return '● Slack';
      const s = String(stage);
      if (s.includes('Rising')) return '▲ Rising';
      if (s.includes('Falling')) return '▼ Falling';
      return '● Slack';
    }

    // Load Live Maldives Meteorological Service Alerts
    async function loadMmsAlerts() {
      isLoadingMmsAlerts.value = true;
      try {
        const alerts = await fetchMMSAlerts();
        mmsAlerts.value = alerts;
        recalculateSafety();
      } catch (err) {
        console.warn("Could not load MMS alerts:", err);
      } finally {
        isLoadingMmsAlerts.value = false;
      }
    }

    // Load Marine Data for Passage Route Corridor (evaluated at channel midpoint)
    async function loadDataForRoute() {
      isLoadingData.value = true;
      errorMessage.value = null;
      try {
        const dep = departureLocation.value;
        const dest = destinationLocation.value;

        // Query live marine and atmospheric observations at Departure (device location by default)
        const data = await fetchMarineAndWeatherData(dep.latitude, dep.longitude);
        marineReport.value = data;

        recalculateSafety();
        updateMapRoute();
        fetchAiBrief();
      } catch (err) {
        console.error("Error loading route marine data:", err);
        errorMessage.value = "Unable to fetch live marine observations for this route. Please verify coordinates or network connection.";
      } finally {
        isLoadingData.value = false;
      }
    }

    function recalculateSafety() {
      if (!marineReport.value) return;
      safetyEvaluation.value = evaluateSeaSafety(
        marineReport.value, 
        selectedVesselKey.value,
        currentMmsAlert.value,
        routeData.value,
        tideData.value,
        moonPhase.value,
        currentNakaiy.value
      );

      // Evaluate 10-Day Environmental Weather Predictions & Trip Planning with Lunar & Nakaiy dynamics
      if (marineReport.value.tenDays && marineReport.value.tenDays.length > 0) {
        tenDayForecast.value = marineReport.value.tenDays.map(d => {
          const dMoon = getMoonPhaseInfo(new Date(d.date + 'T12:00:00Z'));
          const dNakaiy = getCurrentNakaiy(new Date(d.date + 'T12:00:00Z'));
          return evaluateDayTripPlanning(d, selectedVesselKey.value, routeData.value, currentMmsAlert.value, dMoon, dNakaiy);
        });
        tenDaySummary.value = generateTenDayTripSummary(
          tenDayForecast.value, 
          vesselProfiles.value[selectedVesselKey.value], 
          routeData.value
        );
      } else {
        tenDayForecast.value = [];
        tenDaySummary.value = null;
      }
    }

    async function fetchAiBrief() {
      if (!marineReport.value || !safetyEvaluation.value) return;
      isAiLoading.value = true;
      try {
        let locationContext = `Passage: ${departureLocation.value.name} ➔ ${destinationLocation.value.name} (${routeData.value?.distanceNm} NM, heading ${routeData.value?.cardinal}, Est Transit: ${routeData.value?.transitTimeStr})`;
        if (currentNakaiy.value) {
          locationContext += ` [Active Nakaiy: ${currentNakaiy.value.name} (${currentNakaiy.value.thaana}) • ${currentNakaiy.value.monsoonFull} • ${currentNakaiy.value.weatherPattern}]`;
        }
        if (currentMmsAlert.value && currentMmsAlert.value.active) {
          locationContext += ` [MMS Alert: ${currentMmsAlert.value.headline} - ${currentMmsAlert.value.areaDesc}]`;
        }
        const brief = await generateCaptainAdvisory(
          locationContext, 
          safetyEvaluation.value, 
          marineReport.value
        );
        aiBrief.value = brief;
      } catch (err) {
        console.warn("AI brief error:", err);
      } finally {
        isAiLoading.value = false;
      }
    }

    function selectVessel(key) {
      selectedVesselKey.value = key;
      recalculateSafety();
    }

    // Route Switching Actions
    function swapLocations() {
      const temp = departureLocation.value;
      departureLocation.value = destinationLocation.value;
      destinationLocation.value = temp;
      loadDataForRoute();
    }

    function selectPopularRoute(pRoute) {
      departureLocation.value = pRoute.departure;
      destinationLocation.value = pRoute.destination;
      loadDataForRoute();
    }

    function selectDeparture(port) {
      departureLocation.value = port;
      loadDataForRoute();
    }

    function selectDestination(port) {
      destinationLocation.value = port;
      loadDataForRoute();
    }

    function setPickerTarget(target) {
      activePickerTarget.value = target;
    }

    function selectSearchResult(loc) {
      if (activePickerTarget.value === 'destination') {
        destinationLocation.value = loc;
      } else {
        departureLocation.value = loc;
      }
      searchQuery.value = '';
      searchResults.value = [];
      loadDataForRoute();
    }

    function setDepartureToMaafilaafushi() {
      departureLocation.value = { ...MAAFILAAFUSHI_PORT };
      searchQuery.value = '';
      searchResults.value = [];
      loadDataForRoute();
    }

    function selectIsland(island, target = null) {
      const which = target || activePickerTarget.value;
      if (which === 'destination') {
        destinationLocation.value = island;
      } else {
        departureLocation.value = island;
      }
      searchQuery.value = '';
      searchResults.value = [];
      loadDataForRoute();
    }

    // Build standard Location Object for GPS Device Coordinates
    function buildDeviceLocationObject(lat, lon, accuracy) {
      const parsedLat = parseFloat(lat);
      const parsedLon = parseFloat(lon);

      // Proximity check for Maafilaafushi (within 15km)
      const dMaaf = calculateDistance(parsedLat, parsedLon, 5.3625, 73.4197);
      const distMaafKm = dMaaf.kilometers ?? dMaaf.km ?? 9999;
      if (distMaafKm < 15) {
        return {
          name: 'Device Location (Maafilaafushi • Lhaviyani Atoll)',
          atoll: 'Lhaviyani',
          region: 'Northern Atolls / Faadhippolhu',
          country: 'Maldives',
          latitude: parsedLat,
          longitude: parsedLon,
          accuracy: accuracy || 12,
          isDeviceLocation: true,
          timestamp: new Date().toISOString()
        };
      }

      let closestPort = null;
      let minDistance = Infinity;
      maldivesPorts.value.forEach(port => {
        const d = calculateDistance(parsedLat, parsedLon, port.latitude, port.longitude);
        const distKm = d.kilometers ?? d.km ?? 9999;
        if (distKm < minDistance) {
          minDistance = distKm;
          closestPort = port;
        }
      });

      const inMaldives = isCoordinateInMaldives(parsedLat, parsedLon) || (minDistance < 60);
      let name, atoll, country;

      if (closestPort && minDistance < 15) {
        name = `Device Location (${closestPort.name})`;
        atoll = closestPort.atoll;
        country = 'Maldives';
      } else if (closestPort && inMaldives) {
        name = `Device Location (${closestPort.atoll} Atoll)`;
        atoll = closestPort.atoll;
        country = 'Maldives';
      } else {
        const latStr = Math.abs(parsedLat).toFixed(3) + (parsedLat >= 0 ? '°N' : '°S');
        const lonStr = Math.abs(parsedLon).toFixed(3) + (parsedLon >= 0 ? '°E' : '°W');
        name = `Device Location (${latStr}, ${lonStr})`;
        atoll = inMaldives ? (closestPort?.atoll || 'Maldives') : 'Current GPS';
        country = inMaldives ? 'Maldives' : 'Local Waters';
      }

      return {
        name,
        atoll,
        country,
        latitude: parsedLat,
        longitude: parsedLon,
        accuracy: accuracy || null,
        isDeviceLocation: true,
        timestamp: new Date().toISOString()
      };
    }

    // Automatically Detect & Set Device Location via HTML5 Geolocation API
    async function detectDeviceLocation(forceUserPrompt = false) {
      if (window.__customDevicePosition) {
        isLocatingDevice.value = false;
        const { latitude, longitude, accuracy } = window.__customDevicePosition;
        const devLoc = buildDeviceLocationObject(latitude, longitude, accuracy);
        deviceLocation.value = devLoc;
        departureLocation.value = devLoc;
        try {
          localStorage.setItem('seavoyage_device_location_v2', JSON.stringify(devLoc));
        } catch (e) {}
        if (destinationLocation.value && 
            Math.abs(destinationLocation.value.latitude - latitude) < 0.02 && 
            Math.abs(destinationLocation.value.longitude - longitude) < 0.02) {
          const altDest = maldivesPorts.value.find(p => Math.abs(p.latitude - latitude) > 0.1) || HANIMAADHOO_PORT;
          destinationLocation.value = altDest;
        }
        await loadDataForRoute();
        return devLoc;
      }

      if (typeof navigator === 'undefined' || !navigator.geolocation) {
        if (!deviceLocation.value || !deviceLocation.value.isDeviceLocation) {
          deviceLocation.value = MAAFILAAFUSHI_DEVICE_LOCATION;
          departureLocation.value = MAAFILAAFUSHI_DEVICE_LOCATION;
        }
        deviceLocationError.value = "Geolocation is not supported by your browser. Default device location is Maafilaafushi.";
        console.warn(deviceLocationError.value);
        return MAAFILAAFUSHI_DEVICE_LOCATION;
      }

      isLocatingDevice.value = true;
      deviceLocationError.value = null;

      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            isLocatingDevice.value = false;
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const accuracy = position.coords.accuracy;

            const devLoc = buildDeviceLocationObject(lat, lon, accuracy);
            deviceLocation.value = devLoc;
            departureLocation.value = devLoc;

            // Cache device location for instant restoration on subsequent visits
            try {
              localStorage.setItem('seavoyage_device_location_v2', JSON.stringify(devLoc));
            } catch (e) {}

            // Ensure destination is not identical to device location
            if (destinationLocation.value && 
                Math.abs(destinationLocation.value.latitude - lat) < 0.02 && 
                Math.abs(destinationLocation.value.longitude - lon) < 0.02) {
              const altDest = maldivesPorts.value.find(p => Math.abs(p.latitude - lat) > 0.1) || HANIMAADHOO_PORT;
              destinationLocation.value = altDest;
            }

            // Reload all telemetry, weather, tides, and fishing reports for device location
            await loadDataForRoute();
            resolve(devLoc);
          },
          (err) => {
            isLocatingDevice.value = false;
            console.warn("Device geolocation notice:", err.message);
            if (!deviceLocation.value || !deviceLocation.value.isDeviceLocation) {
              deviceLocation.value = MAAFILAAFUSHI_DEVICE_LOCATION;
              departureLocation.value = MAAFILAAFUSHI_DEVICE_LOCATION;
            }
            if (forceUserPrompt) {
              deviceLocationError.value = `Unable to acquire live GPS hardware signal (${err.message}). Showing default device location: Maafilaafushi.`;
            }
            resolve(deviceLocation.value || MAAFILAAFUSHI_DEVICE_LOCATION);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000
          }
        );
      });
    }

    let searchDebounce = null;
    function onSearchInput() {
      clearTimeout(searchDebounce);
      if (!searchQuery.value || searchQuery.value.trim().length < 2) {
        searchResults.value = [];
        return;
      }
      searchDebounce = setTimeout(async () => {
        isSearching.value = true;
        try {
          searchResults.value = await searchLocations(searchQuery.value);
        } catch (e) {
          searchResults.value = [];
        } finally {
          isSearching.value = false;
        }
      }, 350);
    }

    async function toggleFavorite() {
      const loc = departureLocation.value;
      if (isFavorite.value) {
        const existing = favoriteLocations.value.find(l => 
          Math.abs(l.latitude - loc.latitude) < 0.01 && 
          Math.abs(l.longitude - loc.longitude) < 0.01
        );
        if (existing) {
          favoriteLocations.value = await removeFavoriteLocation(currentUser.value, existing.id);
        }
      } else {
        favoriteLocations.value = await saveFavoriteLocation(currentUser.value, loc);
      }
    }

    async function refreshUserData() {
      if (currentUser.value) {
        favoriteLocations.value = await fetchFavoriteLocations(currentUser.value);
      }
    }



    // Basemap State & Free Imagery Layers (Esri & Bing Maps with Zero API Keys)
    const activeBasemap = ref('esri_sat'); // 'esri_sat', 'bing_aerial', 'esri_ocean'
    const showSeamarks = ref(true);

    let esriSatelliteLayer = null;
    let bingAerialLayer = null;
    let esriOceanLayer = null;
    let esriOceanRefLayer = null;
    let openSeaMapLayer = null;

    function createBingAerialLayer() {
      const BingLayer = L.TileLayer.extend({
        getTileUrl: function(coords) {
          let quadkey = '';
          for (let i = coords.z; i > 0; i--) {
            let digit = 0;
            const mask = 1 << (i - 1);
            if ((coords.x & mask) !== 0) digit += 1;
            if ((coords.y & mask) !== 0) digit += 2;
            quadkey += digit;
          }
          const sub = Math.abs((coords.x + coords.y) % 4);
          return `https://ecn.t${sub}.tiles.virtualearth.net/tiles/a${quadkey}.jpeg?g=1`;
        }
      });
      return new BingLayer('', {
        maxZoom: 19,
        attribution: 'Tiles &copy; Microsoft &mdash; Free Bing Maps Aerial'
      });
    }

    function setBasemap(type) {
      if (!leafletMap) return;
      activeBasemap.value = type;

      // Remove current basemaps
      if (esriSatelliteLayer && leafletMap.hasLayer(esriSatelliteLayer)) leafletMap.removeLayer(esriSatelliteLayer);
      if (bingAerialLayer && leafletMap.hasLayer(bingAerialLayer)) leafletMap.removeLayer(bingAerialLayer);
      if (esriOceanLayer && leafletMap.hasLayer(esriOceanLayer)) leafletMap.removeLayer(esriOceanLayer);
      if (esriOceanRefLayer && leafletMap.hasLayer(esriOceanRefLayer)) leafletMap.removeLayer(esriOceanRefLayer);

      if (type === 'bing_aerial') {
        if (!bingAerialLayer) bingAerialLayer = createBingAerialLayer();
        bingAerialLayer.addTo(leafletMap);
      } else if (type === 'esri_ocean') {
        if (!esriOceanLayer) {
          esriOceanLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}', {
            maxZoom: 13,
            attribution: 'Tiles &copy; Esri Ocean Basemap & Bathymetry'
          });
        }
        if (!esriOceanRefLayer) {
          esriOceanRefLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}', {
            maxZoom: 13
          });
        }
        esriOceanLayer.addTo(leafletMap);
        esriOceanRefLayer.addTo(leafletMap);
      } else {
        // Default: Esri World Imagery (High-Resolution Satellite)
        if (!esriSatelliteLayer) {
          esriSatelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            maxZoom: 19,
            attribution: 'Tiles &copy; Esri &mdash; Free World Imagery Satellite'
          });
        }
        esriSatelliteLayer.addTo(leafletMap);
      }

      // Keep seamarks on top if enabled
      if (showSeamarks.value && openSeaMapLayer && leafletMap.hasLayer(openSeaMapLayer)) {
        openSeaMapLayer.bringToFront();
      }
    }

    function toggleSeamarks() {
      if (!leafletMap) return;
      showSeamarks.value = !showSeamarks.value;
      if (!openSeaMapLayer) {
        openSeaMapLayer = L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
          maxZoom: 18,
          opacity: 0.9,
          attribution: 'Seamarks &copy; OpenSeaMap contributors'
        });
      }
      if (showSeamarks.value) {
        openSeaMapLayer.addTo(leafletMap);
        openSeaMapLayer.bringToFront();
      } else {
        if (leafletMap.hasLayer(openSeaMapLayer)) {
          leafletMap.removeLayer(openSeaMapLayer);
        }
      }
    }

    function fitRouteBounds() {
      if (!leafletMap) return;
      const dep = departureLocation.value;
      const dest = destinationLocation.value;
      const bounds = L.latLngBounds([[dep.latitude, dep.longitude], [dest.latitude, dest.longitude]]);
      leafletMap.fitBounds(bounds, { padding: [55, 55], maxZoom: 12 });
    }

    function openZoomEarth(mode = 'satellite') {
      const dep = departureLocation.value;
      const dest = destinationLocation.value;
      const midLat = (dep.latitude + dest.latitude) / 2;
      const midLon = (dep.longitude + dest.longitude) / 2;
      const url = getZoomEarthUrl(midLat, midLon, 9, mode);
      window.open(url, '_blank', 'noopener,noreferrer');
    }

    // Leaflet Interactive Satellite & Nautical Chart Initialization
    function initMap() {
      if (typeof L === 'undefined') return;

      const dep = departureLocation.value;
      leafletMap = L.map('sea-map', {
        zoomControl: true,
        attributionControl: true
      }).setView([dep.latitude, dep.longitude], 9);

      // 100% Free Default: Esri World Imagery (High-Resolution Satellite)
      esriSatelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        attribution: 'Tiles &copy; Esri &mdash; Free World Imagery Satellite'
      }).addTo(leafletMap);

      // OpenSeaMap Seamarks Overlay
      if (showSeamarks.value) {
        openSeaMapLayer = L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
          maxZoom: 18,
          opacity: 0.9,
          attribution: 'Seamarks &copy; OpenSeaMap'
        }).addTo(leafletMap);
      }

      updateMapRoute();

      setTimeout(() => {
        if (leafletMap) {
          leafletMap.invalidateSize();
        }
      }, 250);

      // Click on map to set Departure or Destination
      leafletMap.on('click', async (e) => {
        const clickedLat = e.latlng.lat;
        const clickedLng = e.latlng.lng;
        const inMv = isCoordinateInMaldives(clickedLat, clickedLng);

        const newLoc = {
          name: inMv ? `Maldives Atoll Waters (${clickedLat.toFixed(3)}°N, ${clickedLng.toFixed(3)}°E)` : `Nautical Waypoint (${clickedLat.toFixed(3)}°, ${clickedLng.toFixed(3)}°)`,
          country: inMv ? 'Maldives' : 'Open Waters / Offshore',
          latitude: clickedLat,
          longitude: clickedLng,
          region: inMv ? 'Maldives Archipelago Channel' : 'Ocean Sector',
          isMaldives: inMv
        };

        if (activePickerTarget.value === 'destination') {
          destinationLocation.value = newLoc;
        } else {
          departureLocation.value = newLoc;
        }
        loadDataForRoute();
      });
    }

    // Draw route markers and animated polyline
    function updateMapRoute() {
      if (!leafletMap) return;
      const dep = departureLocation.value;
      const dest = destinationLocation.value;

      const depLatLng = [dep.latitude, dep.longitude];
      const destLatLng = [dest.latitude, dest.longitude];

      // 1. Departure Marker (Anchor or GPS Crosshairs)
      const isDevice = dep.isDeviceLocation === true;
      const depIcon = L.divIcon({
        className: 'custom-dep-pin',
        html: `
          <div style="
            background: #10b981;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 15px #10b981, 0 0 30px rgba(16, 185, 129, 0.5);
            border: 2px solid #ffffff;
            font-size: 15px;
            cursor: pointer;
          " title="${isDevice ? 'Device Location (GPS): ' : 'Departure: '}${dep.name}"><i class="${isDevice ? 'fa-solid fa-location-crosshairs' : 'fa-solid fa-anchor'}" style="color: #060c18;"></i></div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18]
      });

      if (departureMarker) {
        departureMarker.setLatLng(depLatLng);
        departureMarker.setIcon(depIcon);
      } else {
        departureMarker = L.marker(depLatLng, { icon: depIcon }).addTo(leafletMap);
      }
      departureMarker.bindTooltip(isDevice ? `<b>Device Location (GPS)</b>: ${dep.name}` : `<b>Departure</b>: ${dep.name}`, { direction: 'top' });

      // 2. Destination Marker (Cyan Flag / Target)
      const destIcon = L.divIcon({
        className: 'custom-dest-pin',
        html: `
          <div style="
            background: #00f0ff;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 15px #00f0ff, 0 0 30px rgba(0, 240, 255, 0.5);
            border: 2px solid #ffffff;
            font-size: 15px;
            cursor: pointer;
          " title="Destination: ${dest.name}"><i class="fa-solid fa-flag-checkered" style="color: #060c18;"></i></div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18]
      });

      if (destinationMarker) {
        destinationMarker.setLatLng(destLatLng);
        destinationMarker.setIcon(destIcon);
      } else {
        destinationMarker = L.marker(destLatLng, { icon: destIcon }).addTo(leafletMap);
      }
      destinationMarker.bindTooltip(`<b>Destination</b>: ${dest.name}`, { direction: 'top' });

      // 3. Passage Polyline
      const distInfo = routeData.value ? `${routeData.value.distanceNm} NM • Course ${routeData.value.cardinal} • Est ${routeData.value.transitTimeStr}` : '';
      if (routePolyline) {
        routePolyline.setLatLngs([depLatLng, destLatLng]);
      } else {
        routePolyline = L.polyline([depLatLng, destLatLng], {
          color: '#00f0ff',
          weight: 4,
          opacity: 0.85,
          dashArray: '8, 8'
        }).addTo(leafletMap);
      }
      routePolyline.bindTooltip(`<b>Voyage Route</b><br>${dep.name} ➔ ${dest.name}<br>${distInfo}`, { sticky: true });

      // Fit map bounds to show full route passage
      const bounds = L.latLngBounds([depLatLng, destLatLng]);
      leafletMap.fitBounds(bounds, { padding: [55, 55], maxZoom: 12 });
    }

    onMounted(async () => {
      applyTheme();

      initAuthListener(async (user) => {
        currentUser.value = user;
        if (user) {
          await refreshUserData();
        } else {
          const guest = await loginAnonymously();
          currentUser.value = guest;
          await refreshUserData();
        }
      });

      // 1. Ensure default departure location (Maafilaafushi) is set
      if (!departureLocation.value || !departureLocation.value.latitude) {
        departureLocation.value = { ...MAAFILAAFUSHI_PORT };
        deviceLocation.value = { ...MAAFILAAFUSHI_PORT };
      }

      // 2. Fetch official MMS alerts first
      await loadMmsAlerts();

      // 3. Fetch marine conditions for route passage
      await loadDataForRoute();

      // 4. Fetch dedicated sportfishing telemetry for default atoll (Lhaviyani)
      loadFishingAtollData(selectedFishingAtollKey.value);

      // 5. Initialize interactive nautical map
      nextTick(() => {
        initMap();
      });

      // 4. Start live clock ticker
      clockTimer = setInterval(() => {
        currentClockTime.value = new Date();
      }, 1000);
    });


    return {
      departureLocation,
      destinationLocation,
      activePickerTarget,
      popularRoutes,
      routeData,
      activeLocation,
      searchQuery,
      searchResults,
      isSearching,
      maldivesPorts,
      famousPorts,
      activeRegionTab,
      selectedVesselKey,
      vesselProfiles,
      selectedVessel,
      unitSystem,
      mmsAlerts,
      currentMmsAlert,
      isMaldives,
      isLoadingMmsAlerts,
      marineReport,
      safetyEvaluation,
      isLoadingData,
      errorMessage,
      tenDayForecast,
      selectedDayIndex,
      selectedDayForecast,
      tenDayFilter,
      filteredTenDays,
      tenDaySummary,
      selectForecastDay,
      setTenDayFilter,
      planVoyageForDay,
      aiBrief,
      isAiLoading,
      currentUser,
      favoriteLocations,
      showHarmonicsModal,
      selectedConstituent,
      gaugeRadius,
      gaugeCircumference,
      gaugeOffset,
      weatherCondition,
      windCardinal,
      getWindDirectionCardinal,
      isFavorite,
      moonPhase,
      tideData,
      visibilityData,
      activeFishingTab,
      fishingReport,
      fishingAtolls,
      selectedFishingAtollKey,
      selectedFishingAtoll,
      activeFishingModality,
      fishingMarineReport,
      isFishingLoading,
      currentNakaiy,
      NAKAIY_CALENDAR,
      showNakaiyModal,
      setFishingAtoll,
      loadFishingAtollData,
      bestTravelWindow,
      applyBestWindowToVoyage,
      applyHourToVoyage,
      formatWave,
      formatWind,
      formatTemp,
      formatSeaTemp,
      formatCurrentSpeed,
      formatPressure,
      formatPrecipitation,
      formatHumidity,
      formatUvIndex,
      getFirstName,
      formatTideStageBadge,
      selectVessel,
      selectedVesselKey,
      vesselProfiles,
      selectedVessel,
      swapLocations,
      selectPopularRoute,
      selectDeparture,
      selectDestination,
      setPickerTarget,
      selectSearchResult,
      onSearchInput,
      toggleFavorite,
      fetchAiBrief,
      loadMmsAlerts,
      isLocatingDevice,
      deviceLocation,
      deviceLocationError,
      isUsingDeviceLocation,
      detectDeviceLocation,
      isMaafilaafushiDeparture,
      setDepartureToMaafilaafushi,
      selectIsland,
      MAAFILAAFUSHI_PORT,
      liveClock,
      activeMainTab,
      setMainTab,
      activeBasemap,
      setBasemap,
      showSeamarks,
      toggleSeamarks,
      fitRouteBounds,
      openZoomEarth,
      activeAdvisorySubTab,
      setAdvisorySubTab,
      activeWeatherSubTab,
      setWeatherSubTab,
      activeFishingSubTab,
      setFishingSubTab,
      showRoutePlannerModal,
      advisoriesTabBadge,
      weatherTabBadge,
      planningTabBadge,
      fishingTabBadge,
      activePlanningSubTab,
      setPlanningSubTab,
      maldivesAtolls,
      departureAtollFilter,
      destinationAtollFilter,
      departureSearchQuery,
      destinationSearchQuery,
      departureFilteredIslands,
      destinationFilteredIslands,
      setDepartureIsland,
      setDestinationIsland,
      themeMode,
      currentEffectiveTheme,
      setTheme,
      selectedTravelDate,
      calendarMinDate,
      calendarMaxDate,
      sevenDaySafetyTrend,
      travelDateSafetyReport,
      travelDateNakaiy,
      travelDateMoon,
      formatTravelDateFull,
      setTravelDate,
      stepTravelDate,
      setTravelDatePreset
    };
  }
});

app.config.errorHandler = (err, instance, info) => {
  console.error("VUE ERROR:", err, info);
  window.__vueError = { message: err?.message, stack: err?.stack, info };
};

app.mount('#app');
