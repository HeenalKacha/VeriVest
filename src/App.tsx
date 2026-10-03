/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, User, AnalysisResult } from './types';
import { storageService } from './services/storageService';
import { analyzerService } from './services/analyzer';
import { Header, MainSection } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { AppSidebar, SidebarTab } from './components/sidebar/AppSidebar';

// Primary Product Pages (Exact Three Sections from Section 1)
import { ScanPage } from './pages/ScanPage';
import { LearnSimulatorPage } from './pages/LearnSimulatorPage';
import { TipProfilerPage } from './pages/TipProfilerPage';

// Scanner Workflow Pages
import { LoadingAnalysisPage } from './pages/LoadingAnalysisPage';
import { RiskResultPage } from './pages/RiskResultPage';

// Auth Pages
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { PublicAchievementPage } from './pages/PublicAchievementPage';

// Compliance & Error Pages
import { CookieConsentBanner } from './components/common/CookieConsentBanner';
import { CookiePolicyPage } from './pages/CookiePolicyPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { ErrorPage } from './pages/ErrorPage';

// Firebase Services
import {
  saveScanRecordToFirestore,
  fetchUserScansFromFirestore,
  signOutFirebaseUser,
  subscribeToAuthChanges,
  fetchUserProfileFromFirestore,
} from './services/firebase';

export default function App() {
  const [language, setLanguage] = useState<Language>(() => storageService.getLanguage());
  const [user, setUser] = useState<User | null>(() => storageService.getUser());
  const [history, setHistory] = useState<AnalysisResult[]>(() => storageService.getHistory());
  const [activeDossier, setActiveDossier] = useState<AnalysisResult>(() => storageService.getActiveDossier());

  // Check for public shareable achievement route (?achievement=true)
  const [isPublicAchievement] = useState<boolean>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('achievement') === 'true';
    } catch {
      return false;
    }
  });

  // Primary navigation: ONLY THREE SECTIONS (Scan, Learn / Simulator, Tip & Group Profiler)
  const [activeSection, setActiveSection] = useState<MainSection>('scan');

  // Secondary/Transient views
  type ViewState =
    | 'section'
    | 'loading'
    | 'result'
    | 'login'
    | 'signup'
    | 'cookie-policy'
    | 'privacy-policy'
    | 'error';

  const [activeView, setActiveView] = useState<ViewState>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('view') === 'privacy') return 'privacy-policy';
      if (params.get('view') === 'cookies') return 'cookie-policy';
      if (params.get('view') === '404') return 'error';
    } catch {
      // fallback
    }
    return 'section';
  });

  const [errorDetails, setErrorDetails] = useState<{ type: '404' | 'network'; message?: string }>({
    type: '404',
  });

  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<SidebarTab>('profile');

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(async (fbUser) => {
      if (fbUser) {
        try {
          const cloudProfile = await fetchUserProfileFromFirestore(fbUser.uid);
          if (cloudProfile) {
            setUser(cloudProfile);
            storageService.setUser(cloudProfile);
          }
        } catch (err) {
          console.warn('Could not sync auth profile from Firestore:', err);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Listen to browser network connectivity
  useEffect(() => {
    const handleOffline = () => {
      console.warn('Network connection lost.');
    };
    window.addEventListener('offline', handleOffline);
    return () => window.removeEventListener('offline', handleOffline);
  }, []);

  useEffect(() => {
    storageService.setLanguage(language);
  }, [language]);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    storageService.setLanguage(newLang);
  };

  const handleLoginSuccess = async (loggedInUser: User) => {
    setUser(loggedInUser);
    storageService.setUser(loggedInUser);
    setActiveView('section');

    // Attempt to merge cloud scans from Firestore
    if (loggedInUser.id) {
      try {
        const cloudScans = await fetchUserScansFromFirestore(loggedInUser.id);
        if (cloudScans && cloudScans.length > 0) {
          cloudScans.forEach((s) => storageService.saveScan(s));
          setHistory(storageService.getHistory());
        }
      } catch (err) {
        console.warn('Failed to load cloud scans:', err);
      }
    }
  };

  const handleSignUpSuccess = (newUser: User) => {
    setUser(newUser);
    storageService.setUser(newUser);
    setActiveView('section');
  };

  const handleSignOut = async () => {
    try {
      await signOutFirebaseUser();
    } catch {
      // ignore
    }
    setUser(null);
    storageService.setUser(null);
  };

  const handleSelectSection = (section: MainSection) => {
    setActiveSection(section);
    setActiveView('section');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSidebarTab = (tab: SidebarTab) => {
    setSidebarTab(tab);
    setSidebarOpen(true);
  };

  const handleStartAnalysis = async (req: {
    type: 'message' | 'url' | 'screenshot' | 'broker' | 'tip';
    content: string;
    brokerName?: string;
    regNumber?: string;
    imageBase64?: string;
  }) => {
    // If browser is offline, route to network error
    if (!navigator.onLine) {
      setErrorDetails({
        type: 'network',
        message: 'You are currently offline. Please reconnect to scan investment claims.',
      });
      setActiveView('error');
      return;
    }

    setActiveView('loading');
    try {
      const result = await analyzerService.analyze({
        type: req.type,
        content: req.content,
        brokerName: req.brokerName,
        regNumber: req.regNumber,
        imageBase64: req.imageBase64,
        language,
      });

      storageService.saveScan(result);
      setHistory(storageService.getHistory());
      setActiveDossier(result);
      storageService.setActiveDossier(result);

      // Persist to Firebase Firestore if user is signed in
      if (user?.id) {
        saveScanRecordToFirestore(user.id, result).catch((err) =>
          console.warn('Background Firestore scan save failed:', err)
        );
      }
    } catch (err) {
      console.error('Analysis failed:', err);
      setErrorDetails({
        type: 'network',
        message: 'Could not connect to the verification engine. Please check your network and retry.',
      });
      setActiveView('error');
    }
  };

  const handleLoadingFinished = () => {
    setActiveView('result');
  };

  const handleSelectDossier = (dossierId: string) => {
    const found = history.find((h) => h.id === dossierId);
    if (found) {
      setActiveDossier(found);
      storageService.setActiveDossier(found);
      setActiveView('result');
    }
  };

  const refreshHistory = () => {
    setHistory(storageService.getHistory());
  };

  const isAuthPage = activeView === 'login' || activeView === 'signup';

  if (isPublicAchievement) {
    const params = new URLSearchParams(window.location.search);
    const score = Number(params.get('score')) || 80;
    const correct = Number(params.get('correct')) || 8;
    const total = Number(params.get('total')) || 10;
    return (
      <PublicAchievementPage
        score={score}
        correct={correct}
        total={total}
        onNavigateHome={() => {
          window.history.replaceState({}, '', window.location.pathname);
          window.location.reload();
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FCF9F8] text-[#1B1C1C] flex flex-col font-sans selection:bg-[#E5E2E1] selection:text-[#111111]">
      {/* 1. HEADER (Section 2) */}
      {!isAuthPage && (
        <Header
          currentLanguage={language}
          onLanguageChange={handleLanguageChange}
          activeSection={activeSection}
          onSelectSection={handleSelectSection}
          onOpenSidebar={() => setSidebarOpen(true)}
          user={user}
          hasBadge={Boolean(user && storageService.getSimulatorProgress().isCompleted)}
          onNavigateLogin={() => setActiveView('login')}
        />
      )}

      {/* 2. SIDEBAR (Section 7) */}
      <AppSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeTab={sidebarTab}
        onSelectTab={(tab) => setSidebarTab(tab)}
        user={user}
        onUpdateUser={(updated) => setUser(updated)}
        currentLanguage={language}
        onSignOut={handleSignOut}
        onNavigateLogin={() => {
          setSidebarOpen(false);
          setActiveView('login');
        }}
        history={history}
        onSelectDossier={handleSelectDossier}
        onRefreshHistory={refreshHistory}
        onStartScan={() => {
          setSidebarOpen(false);
          handleSelectSection('scan');
        }}
        onOpenCookiePolicy={() => {
          setSidebarOpen(false);
          setActiveView('cookie-policy');
        }}
        onOpenPrivacyPolicy={() => {
          setSidebarOpen(false);
          setActiveView('privacy-policy');
        }}
      />

      {/* 3. MAIN BODY ROUTER */}
      <main className="flex-1">
        {/* Full-screen auth flows */}
        {activeView === 'login' && (
          <LoginPage
            currentLanguage={language}
            onLanguageChange={handleLanguageChange}
            onLoginSuccess={handleLoginSuccess}
            onNavigate={(route) => {
              if (route === 'signup') setActiveView('signup');
              else setActiveView('section');
            }}
          />
        )}

        {activeView === 'signup' && (
          <SignUpPage
            currentLanguage={language}
            onLanguageChange={handleLanguageChange}
            onSignUpSuccess={handleSignUpSuccess}
            onNavigate={(route) => {
              if (route === 'login') setActiveView('login');
              else setActiveView('section');
            }}
          />
        )}

        {/* Loading Step */}
        {activeView === 'loading' && (
          <LoadingAnalysisPage
            currentLanguage={language}
            onFinished={handleLoadingFinished}
          />
        )}

        {/* Explainable Result Page */}
        {activeView === 'result' && (
          <RiskResultPage
            currentLanguage={language}
            result={activeDossier}
            onNavigate={(route) => {
              if (route === 'education') {
                handleSelectSection('learn-simulator');
              } else {
                handleSelectSection('scan');
              }
            }}
          />
        )}

        {/* Compliance & Policy Views */}
        {activeView === 'cookie-policy' && (
          <CookiePolicyPage
            currentLanguage={language}
            onNavigateHome={() => setActiveView('section')}
            onOpenPrivacyPolicy={() => setActiveView('privacy-policy')}
          />
        )}

        {activeView === 'privacy-policy' && (
          <PrivacyPolicyPage
            currentLanguage={language}
            onNavigateHome={() => setActiveView('section')}
            onOpenCookiePolicy={() => setActiveView('cookie-policy')}
          />
        )}

        {/* 404 & Network Error Page */}
        {activeView === 'error' && (
          <ErrorPage
            type={errorDetails.type}
            errorMessage={errorDetails.message}
            currentLanguage={language}
            onNavigateHome={() => {
              setErrorDetails({ type: '404' });
              setActiveView('section');
            }}
            onOpenHistory={() => {
              setActiveView('section');
              handleOpenSidebarTab('history');
            }}
          />
        )}

        {/* EXACT THREE MAIN PRODUCT SECTIONS (Section 1) */}
        {activeView === 'section' && (
          <>
            {/* Primary Section 1: Scan */}
            {activeSection === 'scan' && (
              <ScanPage
                currentLanguage={language}
                onStartAnalysis={handleStartAnalysis}
                onNavigateHowItWorks={() => handleOpenSidebarTab('how-it-works')}
              />
            )}

            {/* Primary Section 2: Learn / Simulator */}
            {activeSection === 'learn-simulator' && (
              <LearnSimulatorPage
                currentLanguage={language}
                onNavigateScan={() => handleSelectSection('scan')}
                onOpenProfile={() => handleOpenSidebarTab('profile')}
              />
            )}

            {/* Primary Section 3: Tip & Group Profiler */}
            {activeSection === 'tip-profiler' && (
              <TipProfilerPage
                currentLanguage={language}
                onAnalyzeMessage={(msg) =>
                  handleStartAnalysis({
                    type: 'tip',
                    content: msg,
                  })
                }
                onNavigateScan={() => handleSelectSection('scan')}
              />
            )}
          </>
        )}
      </main>

      {/* 4. MINIMAL FOOTER (Section 12) */}
      {!isAuthPage && activeView !== 'cookie-policy' && activeView !== 'privacy-policy' && activeView !== 'error' && (
        <Footer
          onOpenHowItWorks={() => handleOpenSidebarTab('how-it-works')}
          onOpenHistory={() => handleOpenSidebarTab('history')}
          onOpenSafetyChecklist={() => handleOpenSidebarTab('learn')}
          onOpenCookiePolicy={() => setActiveView('cookie-policy')}
          onOpenPrivacyPolicy={() => setActiveView('privacy-policy')}
        />
      )}

      {/* 5. COOKIE CONSENT BANNER */}
      <CookieConsentBanner
        currentLanguage={language}
        onOpenCookiePolicy={() => setActiveView('cookie-policy')}
        onOpenPrivacyPolicy={() => setActiveView('privacy-policy')}
      />
    </div>
  );
}
