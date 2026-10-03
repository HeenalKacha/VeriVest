import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  query,
  orderBy,
  getDocFromServer,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { User, AnalysisResult, SimulatorProgress } from '../types';

const firebaseConfigured = Boolean(
  firebaseConfig?.apiKey &&
    firebaseConfig.apiKey !== 'demo-api-key' &&
    firebaseConfig?.projectId &&
    firebaseConfig.projectId !== 'demo-project'
);

// Initialize Firebase App only when real config exists
const app = firebaseConfigured
  ? getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApp()
  : null;

// Initialize Auth
export const auth = app && firebaseConfigured ? getAuth(app) : null as any;
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// Initialize Firestore (targeting configured database id)
export const db = app && firebaseConfigured
  ? firebaseConfig.firestoreDatabaseId
    ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
    : getFirestore(app)
  : null as any;

// Connectivity validation per skill instructions
export async function testFirestoreConnection(): Promise<boolean> {
  if (!db) return false;
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline or network is disconnected.');
    }
    return false;
  }
}

// Initial connection check
testFirestoreConnection();

/**
 * Sign in using real Google OAuth popup via Firebase Auth
 */
export async function signInWithGoogle(): Promise<{ user: User; firebaseUser: FirebaseUser }> {
  if (!auth || !db) {
    throw new Error('Firebase is not configured for sign-in in this local demo environment.');
  }
  const result = await signInWithPopup(auth, googleProvider);
  const fbUser = result.user;

  // Check if profile already exists in Firestore
  const userRef = doc(db, 'users', fbUser.uid);
  let existingProfile: User | null = null;
  try {
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      existingProfile = snap.data() as User;
    }
  } catch (err) {
    console.warn('Could not read existing user doc from Firestore:', err);
  }

  const userProfile: User = {
    id: fbUser.uid,
    name: fbUser.displayName || existingProfile?.name || 'Verified Investor',
    email: fbUser.email || existingProfile?.email || '',
    mobile: existingProfile?.mobile || '+91 98765 43210',
    age: existingProfile?.age || 28,
    gender: existingProfile?.gender || 'Male',
    language: existingProfile?.language || 'en',
    createdAt: existingProfile?.createdAt || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
  };

  // Persist updated profile to Firestore
  try {
    await setDoc(userRef, userProfile, { merge: true });
  } catch (err) {
    console.warn('Failed to write user profile to Firestore:', err);
  }

  return { user: userProfile, firebaseUser: fbUser };
}

/**
 * Sign out current Firebase user
 */
export async function signOutFirebaseUser(): Promise<void> {
  if (!auth) return;
  await signOut(auth);
}

/**
 * Save user profile to Firestore
 */
export async function saveUserProfileToFirestore(user: User): Promise<void> {
  if (!db || !user.id) return;
  const userRef = doc(db, 'users', user.id);
  await setDoc(userRef, user, { merge: true });
}

/**
 * Fetch user profile from Firestore
 */
export async function fetchUserProfileFromFirestore(userId: string): Promise<User | null> {
  if (!db || !userId) return null;
  try {
    const userRef = doc(db, 'users', userId);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data() as User;
    }
  } catch (err) {
    console.warn('Error reading user profile from Firestore:', err);
  }
  return null;
}

/**
 * Save scan result to user's Firestore scans collection
 */
export async function saveScanRecordToFirestore(userId: string, scan: AnalysisResult): Promise<void> {
  if (!db || !userId) return;
  try {
    const scanRef = doc(db, 'users', userId, 'scans', scan.id);
    const payload = {
      id: scan.id,
      userId,
      type: scan.sourceType || 'message',
      timestamp: scan.timestamp,
      riskLevel: scan.assessment || scan.riskLevel,
      score: scan.riskScore || 0,
      summary: scan.summary || '',
      rawInput: (scan.rawInput || '').substring(0, 4500),
      createdAt: new Date().toISOString(),
    };
    await setDoc(scanRef, payload);
  } catch (err) {
    console.warn('Failed to save scan to Firestore:', err);
  }
}

/**
 * Fetch scan history from Firestore
 */
export async function fetchUserScansFromFirestore(userId: string): Promise<AnalysisResult[]> {
  if (!db || !userId) return [];
  try {
    const scansCol = collection(db, 'users', userId, 'scans');
    const q = query(scansCol, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const list: AnalysisResult[] = [];
    querySnapshot.forEach((d) => {
      const data = d.data();
      list.push(data as AnalysisResult);
    });
    return list;
  } catch (err) {
    console.warn('Failed to fetch scans from Firestore:', err);
    return [];
  }
}

/**
 * Save simulator progress to Firestore
 */
export async function saveSimulatorProgressToFirestore(
  userId: string,
  progress: SimulatorProgress
): Promise<void> {
  try {
    const progRef = doc(db, 'users', userId, 'progress', 'simulator');
    const payload = {
      userId,
      totalQuestions: progress.totalQuestions,
      completedQuestions: progress.completedQuestions,
      correctAnswers: progress.correctAnswers,
      score: progress.score,
      isCompleted: progress.isCompleted,
      badgeTitle: progress.badgeTitle || 'Investor Safety Learner',
      completedAt: progress.completedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await setDoc(progRef, payload, { merge: true });
  } catch (err) {
    console.warn('Failed to save simulator progress to Firestore:', err);
  }
}

/**
 * Listen to auth state changes
 */
export function subscribeToAuthChanges(callback: (user: FirebaseUser | null) => void) {
  if (!auth) return () => {};
  return onAuthStateChanged(auth, callback);
}