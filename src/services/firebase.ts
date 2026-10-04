import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  Auth,
} from 'firebase/auth';
import {
  getFirestore,
  initializeFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  deleteDoc,
  query,
  orderBy,
  getDocFromServer,
  Firestore,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { User, AnalysisResult, SimulatorProgress, Gender } from '../types';

// Skill-mandated error handling structures
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function isPermissionError(error: unknown): boolean {
  if (!error) return false;
  const msg = error instanceof Error ? error.message : String(error);
  const code = (error as any)?.code;
  return (
    code === 'permission-denied' ||
    msg.toLowerCase().includes('permission') ||
    msg.toLowerCase().includes('insufficient')
  );
}

export function isOfflineError(error: unknown): boolean {
  if (!error) return false;
  const msg = error instanceof Error ? error.message : String(error);
  const code = (error as any)?.code;
  return (
    code === 'unavailable' ||
    code === 'failed-precondition' ||
    msg.toLowerCase().includes('offline') ||
    msg.toLowerCase().includes('unavailable') ||
    msg.toLowerCase().includes('could not reach') ||
    msg.toLowerCase().includes('network')
  );
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errMsg = error instanceof Error ? error.message : String(error);
  const errInfo: FirestoreErrorInfo = {
    error: errMsg,
    authInfo: {
      userId: auth?.currentUser?.uid,
      email: auth?.currentUser?.email,
      emailVerified: auth?.currentUser?.emailVerified,
      isAnonymous: auth?.currentUser?.isAnonymous,
      tenantId: auth?.currentUser?.tenantId,
      providerInfo:
        auth?.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };

  // Only log formatted "Firestore Error: " for security permission issues as mandated by the skill
  if (isPermissionError(error)) {
    console.error('Firestore Error: ', JSON.stringify(errInfo));
  } else {
    console.warn(`Firestore ${operationType} warning (${path}):`, errMsg);
  }
  throw new Error(JSON.stringify(errInfo));
}

/**
 * Recursively strips undefined fields from an object or array before writing to Cloud Firestore.
 * Firestore strictly rejects `undefined` values anywhere in a document payload.
 */
export function sanitizeForFirestore<T>(data: T): T {
  if (data === null || data === undefined) {
    return null as any;
  }
  if (Array.isArray(data)) {
    return data
      .filter((item) => item !== undefined)
      .map((item) => sanitizeForFirestore(item)) as any;
  }
  if (typeof data === 'object') {
    const cleaned: Record<string, any> = {};
    for (const [key, value] of Object.entries(data as Record<string, any>)) {
      if (value !== undefined) {
        cleaned[key] = sanitizeForFirestore(value);
      }
    }
    return cleaned as any;
  }
  return data;
}

// Check configuration validity
const isConfigValid = Boolean(
  firebaseConfig?.apiKey &&
    firebaseConfig.apiKey !== 'demo-api-key' &&
    firebaseConfig?.projectId &&
    firebaseConfig.projectId !== 'demo-project'
);

let appInstance: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;

export function initializeFirebase(): { app: FirebaseApp | null; auth: Auth | null; db: Firestore | null } {
  if (!appInstance && isConfigValid) {
    appInstance = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    authInstance = getAuth(appInstance);
    try {
      dbInstance = firebaseConfig.firestoreDatabaseId
        ? initializeFirestore(appInstance, {
            experimentalAutoDetectLongPolling: true,
          }, firebaseConfig.firestoreDatabaseId)
        : initializeFirestore(appInstance, {
            experimentalAutoDetectLongPolling: true,
          });
    } catch {
      dbInstance = firebaseConfig.firestoreDatabaseId
        ? getFirestore(appInstance, firebaseConfig.firestoreDatabaseId)
        : getFirestore(appInstance);
    }
  }
  return { app: appInstance, auth: authInstance, db: dbInstance };
}

// Initialize on module load
const { auth: loadedAuth, db: loadedDb } = initializeFirebase();
export const auth = loadedAuth as Auth;
export const db = loadedDb as Firestore;

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

/**
 * Validates connection to Firestore (per skill requirement)
 */
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

// Test initial connection safely
testFirestoreConnection().catch(() => {});

/**
 * Get current authenticated user
 */
export function getCurrentUser(): FirebaseUser | null {
  return auth?.currentUser || null;
}

/**
 * Helper to convert a Firestore doc to our User structure
 */
function mapDocToUser(uid: string, data: any): User {
  const fullName = data.fullName || data.name || 'Verified Investor';
  const contact = data.contact || data.mobile || '+91 98765 43210';
  const email = data.email || auth?.currentUser?.email || '';
  const age = Number(data.age) || 32;
  const gender: Gender = data.gender === 'Female' ? 'Female' : 'Male';
  const createdAt = data.createdAt || new Date().toISOString();
  const updatedAt = data.updatedAt || createdAt;

  return {
    id: uid,
    fullName,
    name: fullName,
    contact,
    mobile: contact,
    email,
    age,
    gender,
    createdAt,
    updatedAt,
    language: data.language || 'en',
  };
}

/**
 * Create a new user profile document in Firestore at users/{uid}
 */
export async function createUserProfile(uid: string, profileData: Partial<User>): Promise<User> {
  if (!db || !uid) {
    throw new Error('Database connection is not available.');
  }

  const now = new Date().toISOString();
  const fullName = profileData.fullName || profileData.name || 'Verified Investor';
  const contact = profileData.contact || profileData.mobile || '+91 98765 43210';
  const email = profileData.email || auth?.currentUser?.email || '';
  const age = Number(profileData.age) || 32;
  const gender: Gender = profileData.gender === 'Female' ? 'Female' : 'Male';

  const userDoc: Record<string, any> = {
    fullName,
    contact,
    email,
    age,
    gender,
    createdAt: profileData.createdAt || now,
    updatedAt: now,
  };

  const path = `users/${uid}`;
  try {
    await setDoc(doc(db, 'users', uid), sanitizeForFirestore(userDoc), { merge: true });
    return mapDocToUser(uid, userDoc);
  } catch (err) {
    if (isPermissionError(err)) {
      try {
        handleFirestoreError(err, OperationType.WRITE, path);
      } catch {
        throw new Error('Unable to create your profile. Please try again.');
      }
    }
    console.warn('Failed to create user profile in Firestore (offline mode):', (err as any)?.message || err);
    return mapDocToUser(uid, userDoc);
  }
}

/**
 * Retrieve user profile from Firestore at users/{uid}
 */
export async function getUserProfile(uid: string): Promise<User | null> {
  if (!db || !uid) return null;
  const path = `users/${uid}`;
  try {
    const snap = await getDoc(doc(db, 'users', uid));
    if (snap.exists()) {
      return mapDocToUser(uid, snap.data());
    }
    return null;
  } catch (err) {
    if (isPermissionError(err)) {
      handleFirestoreError(err, OperationType.GET, path);
    }
    console.warn(`Firestore profile read notice for ${path}:`, (err as any)?.message || err);
    return null;
  }
}

/**
 * Update user profile document at users/{uid}
 */
export async function updateUserProfile(uid: string, profileData: Partial<User>): Promise<User> {
  if (!db || !uid) {
    throw new Error('Database is currently offline. Progress saved locally.');
  }

  const path = `users/${uid}`;
  const now = new Date().toISOString();
  const current = await getUserProfile(uid);

  const fullName = profileData.fullName || profileData.name || current?.fullName || 'Verified Investor';
  const contact = profileData.contact || profileData.mobile || current?.contact || '+91 98765 43210';
  const email = auth?.currentUser?.email || profileData.email || current?.email || '';
  const age = Number(profileData.age ?? current?.age ?? 32);
  const gender: Gender = (profileData.gender || current?.gender) === 'Female' ? 'Female' : 'Male';
  const createdAt = current?.createdAt || profileData.createdAt || now;

  const payload = {
    fullName,
    contact,
    email,
    age,
    gender,
    createdAt,
    updatedAt: now,
  };

  try {
    await setDoc(doc(db, 'users', uid), sanitizeForFirestore(payload), { merge: true });
    return mapDocToUser(uid, payload);
  } catch (err) {
    if (isPermissionError(err)) {
      try {
        handleFirestoreError(err, OperationType.UPDATE, path);
      } catch {
        throw new Error('Unable to save your profile changes. Please try again.');
      }
    }
    console.warn('Failed to update user profile in Firestore (saving locally):', (err as any)?.message || err);
    return mapDocToUser(uid, payload);
  }
}

/**
 * Fetch learning progress from Firestore at users/{uid}/learning/progress
 */
export async function getLearningProgress(uid: string): Promise<SimulatorProgress | null> {
  if (!db || !uid) return null;
  const path = `users/${uid}/learning/progress`;
  try {
    const snap = await getDoc(doc(db, 'users', uid, 'learning', 'progress'));
    if (snap.exists()) {
      const d = snap.data();
      const points = Number(d.points ?? d.score ?? 0);
      const correctAnswers = Number(d.correctAnswers ?? 0);
      const completedQuestions = Number(d.completedQuestions ?? 0);
      const totalQuestions = Number(d.totalQuestions ?? 10);
      const completed = Boolean(d.completed ?? d.isCompleted ?? false);
      const badgeEarned = Boolean(d.badgeEarned ?? completed);
      const updatedAt = d.updatedAt || new Date().toISOString();

      return {
        points,
        score: points,
        correctAnswers,
        completedQuestions,
        totalQuestions,
        completed,
        isCompleted: completed,
        badgeEarned,
        badgeTitle: 'Investor Safety Learner',
        completedAt: d.completedAt,
        updatedAt,
      };
    }
    return null;
  } catch (err) {
    if (isPermissionError(err)) {
      handleFirestoreError(err, OperationType.GET, path);
    }
    console.warn(`Firestore learning progress read notice for ${path}:`, (err as any)?.message || err);
    return null;
  }
}

/**
 * Save learning progress immediately after each answered question
 * at users/{uid}/learning/progress
 */
export async function updateLearningProgress(
  uid: string,
  progress: Partial<SimulatorProgress>
): Promise<SimulatorProgress> {
  const path = `users/${uid}/learning/progress`;
  const now = new Date().toISOString();

  const totalQuestions = progress.totalQuestions || 10;
  const completedQuestions = progress.completedQuestions ?? 0;
  const correctAnswers = progress.correctAnswers ?? 0;
  // Calculate points: 10 points per correct answer, or existing points
  const points = progress.points ?? (progress.score !== undefined ? progress.score : correctAnswers * 10);
  const completed = completedQuestions >= totalQuestions;
  const badgeEarned = completed;

  const payload = {
    points,
    score: points,
    correctAnswers,
    completedQuestions,
    totalQuestions,
    completed,
    isCompleted: completed,
    badgeEarned,
    badgeTitle: 'Investor Safety Learner',
    completedAt: completed ? now : undefined,
    updatedAt: now,
  };

  if (!db || !uid) {
    // Return formatted progress for local state if offline
    return payload;
  }

  try {
    await setDoc(doc(db, 'users', uid, 'learning', 'progress'), sanitizeForFirestore(payload), { merge: true });
    return payload;
  } catch (err) {
    if (isPermissionError(err)) {
      try {
        handleFirestoreError(err, OperationType.WRITE, path);
      } catch {
        console.warn('Learning progress update blocked by permissions.');
      }
    } else {
      console.warn('Learning progress update saved to local storage fallback.');
    }
    return payload;
  }
}

/**
 * Save scan record to Firestore at users/{uid}/scanHistory/{scanId}
 * Sort newest scans first by createdAt
 */
export async function saveScanHistory(uid: string, scan: AnalysisResult): Promise<void> {
  if (!db || !uid || !scan.id) return;
  const path = `users/${uid}/scanHistory/${scan.id}`;

  // Extract clean risk indicators from scamDna or signals
  const riskIndicators = (scan.scamDna || []).map((s) => s.name).concat(
    (scan.signals || []).map((s) => s.title)
  ).filter(Boolean);

  const payload = {
    scanId: scan.id,
    id: scan.id,
    scanType: scan.sourceType || 'message',
    type: scan.sourceType || 'message',
    createdAt: scan.timestamp || new Date().toISOString(),
    result: scan.assessment || scan.riskLevel || 'ASSESSED',
    riskLevel: scan.riskLevel || 'LOW',
    riskIndicators: Array.from(new Set(riskIndicators)),
    summary: (scan.summary || '').substring(0, 5000),
    // Preserve full dossier object for rich report view
    dossier: {
      ...scan,
      rawInput: (scan.rawInput || '').substring(0, 4000),
    },
  };

  try {
    await setDoc(doc(db, 'users', uid, 'scanHistory', scan.id), sanitizeForFirestore(payload));
  } catch (err) {
    if (isPermissionError(err)) {
      try {
        handleFirestoreError(err, OperationType.WRITE, path);
      } catch {
        console.warn('Scan history write permission notice.');
      }
    } else {
      console.warn('Scan history saved to local fallback.');
    }
  }
}

/**
 * Retrieve user's scan history from Firestore at users/{uid}/scanHistory/{scanId}
 * Sorted newest first
 */
export async function getScanHistory(uid: string): Promise<AnalysisResult[]> {
  if (!db || !uid) return [];
  const path = `users/${uid}/scanHistory`;
  try {
    const colRef = collection(db, 'users', uid, 'scanHistory');
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    const results: AnalysisResult[] = [];

    snap.forEach((docSnap) => {
      const data = docSnap.data();
      if (data.dossier) {
        results.push(data.dossier as AnalysisResult);
      } else {
        // Construct AnalysisResult from the stored fields
        results.push({
          id: data.scanId || docSnap.id,
          timestamp: data.createdAt,
          sourceType: data.scanType || 'message',
          sourceLabel: (data.scanType || 'Message').toUpperCase(),
          rawInput: data.summary || '',
          riskScore: data.riskLevel === 'HIGH' ? 85 : data.riskLevel === 'SUSPICIOUS' ? 55 : 15,
          riskLevel: data.riskLevel || 'LOW',
          assessment:
            data.result === 'HIGH CONCERN' || data.result === 'REQUIRES CAUTION' || data.result === 'LOW CONCERN'
              ? data.result
              : data.riskLevel === 'HIGH'
              ? 'HIGH CONCERN'
              : data.riskLevel === 'SUSPICIOUS'
              ? 'REQUIRES CAUTION'
              : 'LOW CONCERN',
          warningIndicatorsCount: Array.isArray(data.riskIndicators) ? data.riskIndicators.length : 0,
          assessmentCaveat: 'Historical scan record from VeriVest ledger.',
          summary: data.summary || '',
          forensicDirective: data.result || 'RECORDED',
          whyThisMatters: 'Stored for ongoing reference and audit.',
          claims: [],
          scamDna: (data.riskIndicators || []).map((ind: string, idx: number) => ({
            id: `ind-${idx}`,
            name: ind,
            severity: 'warning',
            evidence: ind,
            whyItMatters: 'Flagged risk marker during scan.',
            recommendedAction: 'Verify through official regulator portal before sending capital.',
            category: 'Risk Indicator',
          })),
          signals: [],
          recommendedActions: ['Verify recipient credentials prior to capital transfer.'],
          limitations: ['Automated historical record.'],
        });
      }
    });

    return results;
  } catch (err) {
    if (isPermissionError(err)) {
      handleFirestoreError(err, OperationType.LIST, path);
    }
    console.warn(`Firestore scan history read notice for ${path}:`, (err as any)?.message || err);
    return [];
  }
}

/**
 * Delete a scan history item from Firestore
 */
export async function deleteScanHistoryItem(uid: string, scanId: string): Promise<void> {
  if (!db || !uid || !scanId) return;
  const path = `users/${uid}/scanHistory/${scanId}`;
  try {
    await deleteDoc(doc(db, 'users', uid, 'scanHistory', scanId));
  } catch (err) {
    if (isPermissionError(err)) {
      handleFirestoreError(err, OperationType.DELETE, path);
    }
    console.warn(`Firestore delete notice for ${path}:`, (err as any)?.message || err);
  }
}

/**
 * Sign in using Google OAuth popup via Firebase Auth
 */
export async function signInWithGoogle(): Promise<{ user: User; firebaseUser: FirebaseUser }> {
  if (!auth) {
    throw new Error('Firebase authentication is not configured.');
  }

  const result = await signInWithPopup(auth, googleProvider);
  const fbUser = result.user;

  // Retrieve existing profile from Firestore or create initial document
  let existingProfile = await getUserProfile(fbUser.uid);

  if (!existingProfile) {
    const newProfile: Partial<User> = {
      fullName: fbUser.displayName || 'Verified Investor',
      name: fbUser.displayName || 'Verified Investor',
      email: fbUser.email || '',
      contact: '+91 98765 43210',
      mobile: '+91 98765 43210',
      age: 28,
      gender: 'Male',
      createdAt: new Date().toISOString(),
    };
    existingProfile = await createUserProfile(fbUser.uid, newProfile);
  }

  return { user: existingProfile, firebaseUser: fbUser };
}

/**
 * Sign in with email and password via Firebase Auth
 */
export async function signInWithEmail(email: string, pass: string): Promise<{ user: User; firebaseUser: FirebaseUser }> {
  if (!auth) {
    throw new Error('Firebase authentication is not configured.');
  }

  const result = await signInWithEmailAndPassword(auth, email, pass);
  const fbUser = result.user;

  let existingProfile = await getUserProfile(fbUser.uid);
  if (!existingProfile) {
    const newProfile: Partial<User> = {
      fullName: fbUser.displayName || email.split('@')[0],
      email: fbUser.email || email,
      contact: '+91 98765 43210',
      age: 30,
      gender: 'Male',
      createdAt: new Date().toISOString(),
    };
    existingProfile = await createUserProfile(fbUser.uid, newProfile);
  }

  return { user: existingProfile, firebaseUser: fbUser };
}

/**
 * Sign up with email and password via Firebase Auth
 */
export async function signUpWithEmail(
  email: string,
  pass: string,
  fullName: string,
  contact?: string,
  age?: number,
  gender?: Gender
): Promise<{ user: User; firebaseUser: FirebaseUser }> {
  if (!auth) {
    throw new Error('Firebase authentication is not configured.');
  }

  const result = await createUserWithEmailAndPassword(auth, email, pass);
  const fbUser = result.user;

  const newProfile: Partial<User> = {
    fullName: fullName || email.split('@')[0],
    email: fbUser.email || email,
    contact: contact || '+91 98765 43210',
    age: age || 30,
    gender: gender || 'Male',
    createdAt: new Date().toISOString(),
  };

  const created = await createUserProfile(fbUser.uid, newProfile);
  return { user: created, firebaseUser: fbUser };
}

/**
 * Sign out current Firebase user
 */
export async function signOutFirebaseUser(): Promise<void> {
  if (!auth) return;
  await signOut(auth);
}

/**
 * Listen to auth state changes
 */
export function subscribeToAuthChanges(callback: (user: FirebaseUser | null) => void) {
  if (!auth) return () => {};
  return onAuthStateChanged(auth, callback);
}

// Backward-compatibility aliases so existing code never breaks
export const saveUserProfileToFirestore = async (u: User) => updateUserProfile(u.id, u);
export const fetchUserProfileFromFirestore = getUserProfile;
export const saveScanRecordToFirestore = saveScanHistory;
export const fetchUserScansFromFirestore = getScanHistory;
export const saveSimulatorProgressToFirestore = updateLearningProgress;
export const fetchSimulatorProgressFromFirestore = getLearningProgress;
