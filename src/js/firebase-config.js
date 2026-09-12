// Firebase v10 Modular SDK Integration
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { 
  getAuth, 
  signInAnonymously, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

// Configuration injected from workspace .env
const firebaseConfig = {
  apiKey: "AIzaSyD6E8z59COpBpb-cw9KDER6TSGedUYMm5w",
  authDomain: "ssc1-476ee.firebaseapp.com",
  projectId: "ssc1-476ee",
  storageBucket: "ssc1-476ee.firebasestorage.app",
  messagingSenderId: "218902143630",
  appId: "1:218902143630:web:71ca7a0b9ae21c54fe1fdf",
  measurementId: "G-HFS0V1BZ9P"
};

let app = null;
let auth = null;
let db = null;
let isFirebaseInitialized = false;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  isFirebaseInitialized = true;
  console.log("Firebase initialized successfully with project:", firebaseConfig.projectId);
} catch (err) {
  console.warn("Firebase initialization warning (falling back to LocalStorage cache):", err);
}

// Local Storage Fallback Helpers for robust offline capability
const LOCAL_FAVORITES_KEY = 'seavoyage_favorites';
const LOCAL_LOGS_KEY = 'seavoyage_trip_logs';

function getLocalData(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function setLocalData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("LocalStorage write error:", e);
  }
}

// Auth State Wrapper
export function initAuthListener(onUserChanged) {
  if (!isFirebaseInitialized || !auth) {
    // Local demo guest
    onUserChanged({ uid: 'local-guest', isAnonymous: true, displayName: 'Maritime Guest' });
    return () => {};
  }
  return onAuthStateChanged(auth, (user) => {
    onUserChanged(user);
  });
}

// Sign in anonymously for rapid hassle-free sea travel assessment
export async function loginAnonymously() {
  if (!isFirebaseInitialized || !auth) {
    return { uid: 'local-guest', isAnonymous: true, displayName: 'Maritime Guest' };
  }
  try {
    const credential = await signInAnonymously(auth);
    return credential.user;
  } catch (err) {
    console.warn("Anonymous sign-in error, using local guest:", err);
    return { uid: 'local-guest', isAnonymous: true, displayName: 'Maritime Guest' };
  }
}

export async function loginWithEmail(email, password) {
  if (!isFirebaseInitialized || !auth) {
    throw new Error("Firebase Auth is offline. Using local session.");
  }
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  } catch (err) {
    if (err.code === 'auth/configuration-not-found' || (err.message && err.message.includes('configuration-not-found'))) {
      throw new Error("Firebase Authentication is not enabled yet in your Firebase project ('ssc1-476ee'). Please go to Firebase Console -> Build -> Authentication, click 'Get Started', and enable 'Email/Password' under Sign-in method.");
    }
    if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
      throw new Error("Invalid email or password. If you do not have an account yet, click 'Need an account? Register'.");
    }
    throw err;
  }
}

export async function registerWithEmail(email, password) {
  if (!isFirebaseInitialized || !auth) {
    throw new Error("Firebase Auth is offline. Using local session.");
  }
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    return cred.user;
  } catch (err) {
    if (err.code === 'auth/configuration-not-found' || (err.message && err.message.includes('configuration-not-found'))) {
      throw new Error("Firebase Authentication is not enabled yet in your Firebase project ('ssc1-476ee'). Please go to Firebase Console -> Build -> Authentication, click 'Get Started', and enable 'Email/Password' under Sign-in method.");
    }
    if (err.code === 'auth/email-already-in-use') {
      throw new Error("This email is already registered. Please click 'Already have an account? Sign in'.");
    }
    if (err.code === 'auth/weak-password') {
      throw new Error("Password should be at least 6 characters.");
    }
    throw err;
  }
}

export async function logoutUser() {
  if (isFirebaseInitialized && auth) {
    await signOut(auth);
  }
}

// Saved / Favorite Harbors & Locations
export async function saveFavoriteLocation(user, location) {
  const item = {
    name: location.name,
    country: location.country || '',
    latitude: location.latitude,
    longitude: location.longitude,
    vessel: location.vessel || 'Small Craft',
    createdAt: new Date().toISOString()
  };

  // Always save locally for instant offline reliability
  const localList = getLocalData(LOCAL_FAVORITES_KEY);
  const exists = localList.some(l => Math.abs(l.latitude - location.latitude) < 0.001 && Math.abs(l.longitude - location.longitude) < 0.001);
  if (!exists) {
    localList.unshift({ ...item, id: 'loc_' + Date.now() });
    setLocalData(LOCAL_FAVORITES_KEY, localList);
  }

  // Cloud sync if Firebase Firestore is available
  if (isFirebaseInitialized && db && user && !user.isAnonymous) {
    try {
      const colRef = collection(db, `users/${user.uid}/favorites`);
      await addDoc(colRef, { ...item, timestamp: serverTimestamp() });
    } catch (e) {
      console.warn("Cloud favorite sync failed, retained in local storage:", e);
    }
  }

  return localList;
}

export async function fetchFavoriteLocations(user) {
  if (isFirebaseInitialized && db && user && !user.isAnonymous) {
    try {
      const colRef = collection(db, `users/${user.uid}/favorites`);
      const q = query(colRef, orderBy('timestamp', 'desc'));
      const snap = await getDocs(q);
      const cloudItems = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      if (cloudItems.length > 0) {
        setLocalData(LOCAL_FAVORITES_KEY, cloudItems);
        return cloudItems;
      }
    } catch (e) {
      console.warn("Cloud fetch favorites fallback to local storage:", e);
    }
  }
  return getLocalData(LOCAL_FAVORITES_KEY);
}

export async function removeFavoriteLocation(user, id) {
  let localList = getLocalData(LOCAL_FAVORITES_KEY);
  localList = localList.filter(item => item.id !== id);
  setLocalData(LOCAL_FAVORITES_KEY, localList);

  if (isFirebaseInitialized && db && user && !user.isAnonymous) {
    try {
      await deleteDoc(doc(db, `users/${user.uid}/favorites`, id));
    } catch (e) {
      console.warn("Cloud delete failed:", e);
    }
  }
  return localList;
}

// Sea Voyage Plan & Logbook
export async function saveVoyageLog(user, voyage) {
  const record = {
    id: 'voyage_' + Date.now(),
    title: voyage.title || `${voyage.departure} → ${voyage.destination}`,
    locationName: voyage.locationName,
    latitude: voyage.latitude,
    longitude: voyage.longitude,
    vesselType: voyage.vesselType,
    departureTime: voyage.departureTime || new Date().toISOString(),
    advisoryStatus: voyage.advisoryStatus, // GO / CAUTION / NO-GO
    safetyScore: voyage.safetyScore,
    waveHeight: voyage.waveHeight,
    windSpeed: voyage.windSpeed,
    notes: voyage.notes || '',
    createdAt: new Date().toISOString()
  };

  const logs = getLocalData(LOCAL_LOGS_KEY);
  logs.unshift(record);
  setLocalData(LOCAL_LOGS_KEY, logs);

  if (isFirebaseInitialized && db && user && !user.isAnonymous) {
    try {
      const colRef = collection(db, `users/${user.uid}/voyages`);
      await addDoc(colRef, { ...record, timestamp: serverTimestamp() });
    } catch (e) {
      console.warn("Cloud voyage log sync fallback to local storage:", e);
    }
  }

  return logs;
}

export async function fetchVoyageLogs(user) {
  if (isFirebaseInitialized && db && user && !user.isAnonymous) {
    try {
      const colRef = collection(db, `users/${user.uid}/voyages`);
      const q = query(colRef, orderBy('timestamp', 'desc'));
      const snap = await getDocs(q);
      const cloudLogs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      if (cloudLogs.length > 0) {
        setLocalData(LOCAL_LOGS_KEY, cloudLogs);
        return cloudLogs;
      }
    } catch (e) {
      console.warn("Cloud fetch voyages fallback to local storage:", e);
    }
  }
  return getLocalData(LOCAL_LOGS_KEY);
}

export async function removeVoyageLog(user, id) {
  let logs = getLocalData(LOCAL_LOGS_KEY);
  logs = logs.filter(l => l.id !== id);
  setLocalData(LOCAL_LOGS_KEY, logs);

  if (isFirebaseInitialized && db && user && !user.isAnonymous) {
    try {
      await deleteDoc(doc(db, `users/${user.uid}/voyages`, id));
    } catch (e) {
      console.warn("Cloud delete voyage log failed:", e);
    }
  }
  return logs;
}

export { isFirebaseInitialized, auth };
