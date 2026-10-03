import React, { useState } from 'react';
import {
  X,
  User as UserIcon,
  BookOpen,
  HelpCircle,
  History as HistoryIcon,
  LogOut,
  Edit2,
  Check,
  Search,
  Trash2,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { User, AnalysisResult, Language, EducationGuide, Gender, SimulatorProgress } from '../../types';
import { ProfileAvatar } from '../common/ProfileAvatar';
import { AchievementCard } from '../profile/AchievementCard';
import { HowItWorksSimple } from '../howitworks/HowItWorksSimple';
import { BeforeYouPayCompact } from '../learn/BeforeYouPayCompact';
import { educationGuides } from '../../data/educationData';
import { storageService } from '../../services/storageService';
import { saveUserProfileToFirestore } from '../../services/firebase';

// EXACT 4 SIDEBAR SECTIONS FROM USER SPECIFICATION:
// 1. Profile
// 2. Learn
// 3. How It Works
// 4. Scan History
export type SidebarTab = 'profile' | 'learn' | 'how-it-works' | 'history';

interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: SidebarTab;
  onSelectTab: (tab: SidebarTab) => void;
  user: User | null;
  onUpdateUser?: (updated: User) => void;
  currentLanguage: Language;
  onSignOut: () => void;
  onNavigateLogin: () => void;
  history: AnalysisResult[];
  onSelectDossier: (dossierId: string) => void;
  onRefreshHistory: () => void;
  onStartScan: () => void;
  simulatorProgress?: SimulatorProgress;
  onOpenCookiePolicy?: () => void;
  onOpenPrivacyPolicy?: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
  user,
  onUpdateUser,
  currentLanguage,
  onSignOut,
  onNavigateLogin,
  history,
  onSelectDossier,
  onRefreshHistory,
  onStartScan,
  simulatorProgress = storageService.getSimulatorProgress(),
  onOpenCookiePolicy,
  onOpenPrivacyPolicy,
}) => {
  const isHi = currentLanguage === 'hi';
  const [historySearch, setHistorySearch] = useState('');
  const [selectedGuide, setSelectedGuide] = useState<EducationGuide | null>(null);

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(user?.name || 'Rohan Sharma');
  const [editMobile, setEditMobile] = useState(user?.mobile || '+91 98765 43210');
  const [editEmail, setEditEmail] = useState(user?.email || 'rohan.sharma@investor.in');
  const [editAge, setEditAge] = useState<number | string>(user?.age || 32);
  const [editGender, setEditGender] = useState<Gender>(user?.gender || 'Male');

  if (!isOpen) return null;

  const guides = educationGuides[currentLanguage] || educationGuides.en;

  // Filter history
  const filteredHistory = history.filter((item) => {
    if (!historySearch.trim()) return true;
    const q = historySearch.toLowerCase();
    return (
      item.id.toLowerCase().includes(q) ||
      (item.summary || '').toLowerCase().includes(q) ||
      (item.rawInput || '').toLowerCase().includes(q) ||
      (item.sourceLabel || '').toLowerCase().includes(q)
    );
  });

  const handleDeleteHistoryItem = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    storageService.deleteScan(id);
    onRefreshHistory();
  };

  const handleSaveProfile = () => {
    const updated: User = {
      id: user?.id || 'usr-8921',
      name: editName.trim() || 'Rohan Sharma',
      mobile: editMobile.trim() || '+91 98765 43210',
      email: editEmail.trim() || 'rohan.sharma@investor.in',
      age: editAge || 32,
      gender: editGender,
      language: currentLanguage,
      createdAt: user?.createdAt || 'Oct 2026',
    };
    storageService.setUser(updated);
    saveUserProfileToFirestore(updated).catch((err) =>
      console.warn('Background Firestore profile save failed:', err)
    );
    if (onUpdateUser) {
      onUpdateUser(updated);
    }
    setIsEditingProfile(false);
  };

  const menuItems: { id: SidebarTab; label: string; icon: React.ReactNode; badge?: string | number }[] = [
    {
      id: 'profile',
      label: isHi ? 'प्रोफ़ाइल (Profile)' : 'Profile',
      icon: <UserIcon className="w-4 h-4" />,
    },
    {
      id: 'learn',
      label: isHi ? 'सीखें (Learn)' : 'Learn',
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      id: 'how-it-works',
      label: isHi ? 'यह कैसे काम करता है' : 'How It Works',
      icon: <HelpCircle className="w-4 h-4" />,
    },
    {
      id: 'history',
      label: isHi ? 'स्कैन इतिहास' : 'Scan History',
      icon: <HistoryIcon className="w-4 h-4" />,
      badge: history.length > 0 ? history.length : undefined,
    },
  ];

  const currentGender = (user?.gender as Gender) || 'Male';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity"
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex">
        {/* Full Section Window: Menu Vertically on Left, Content on Right */}
        <div className="w-screen max-w-4xl bg-[#FCF9F8] border-r border-[#E5E4DE] shadow-2xl flex flex-col md:flex-row justify-between">
          
          {/* ========================================================= */}
          {/* VERTICAL MENU COLUMN (As explicitly requested by user)    */}
          {/* ========================================================= */}
          <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-[#E5E4DE] flex flex-col shrink-0">
            {/* Top Bar Header */}
            <div className="p-4 sm:p-5 border-b border-[#E5E4DE] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="font-serif text-lg font-bold text-[#111111]">VeriVest</span>
                <span className="text-[10px] font-mono text-[#66645E] uppercase tracking-wider bg-[#F5F4F0] px-2 py-0.5 rounded">
                  MENU
                </span>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-[4px] border border-[#E5E4DE] hover:border-[#111111] text-[#111111]"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Menu Items Contained Vertically */}
            <nav className="p-3 space-y-1.5 flex-1">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#888888] px-3 py-1 font-bold">
                SECTIONS
              </div>
              {menuItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id);
                      setSelectedGuide(null);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-[4px] text-xs font-mono font-medium transition-all text-left ${
                      isActive
                        ? 'bg-[#111111] text-white font-bold shadow-xs'
                        : 'text-[#444748] hover:bg-[#F5F4F0] hover:text-[#111111]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={isActive ? 'text-white' : 'text-[#66645E]'}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== undefined && (
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-white text-[#111111] font-bold'
                            : 'bg-[#E5E2E1] text-[#111111]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Quick Helper Links at bottom of vertical menu */}
            <div className="p-4 border-t border-[#E5E4DE] bg-[#FCF9F8] space-y-2 text-xs font-mono">
              <div className="text-[10px] text-[#66645E] uppercase font-bold">
                Helpline & Portal
              </div>
              <div className="flex items-center justify-between text-[#111111]">
                <span>Cyber Helpline:</span>
                <strong className="text-[#991B1B]">1930</strong>
              </div>
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noreferrer"
                className="text-[#66645E] hover:text-[#111111] flex items-center justify-between text-[11px] pt-1"
              >
                <span>cybercrime.gov.in</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              {/* Legal & Compliance Links */}
              <div className="pt-2 border-t border-[#E5E4DE] flex flex-col gap-1.5 text-[11px]">
                {onOpenPrivacyPolicy && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenPrivacyPolicy();
                    }}
                    className="text-left text-[#66645E] hover:text-[#111111] hover:underline"
                  >
                    {isHi ? 'गोपनीयता नीति (Privacy Policy)' : 'Privacy Policy'}
                  </button>
                )}
                {onOpenCookiePolicy && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenCookiePolicy();
                    }}
                    className="text-left text-[#66645E] hover:text-[#111111] hover:underline"
                  >
                    {isHi ? 'कुकी प्राथमिकताएं (Cookie Policy)' : 'Cookie Preferences'}
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* ========================================================= */}
          {/* SECTION CONTENT AREA (Opens like the section of website)   */}
          {/* ========================================================= */}
          <main className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-[#FCF9F8]">
            
            {/* ------------------------------------------------------- */}
            {/* 1. PROFILE SECTION                                      */}
            {/* ------------------------------------------------------- */}
            {activeTab === 'profile' && (
              <div className="max-w-xl mx-auto space-y-8">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
                    {isHi ? 'उपयोगकर्ता प्रोफ़ाइल' : 'Profile'}
                  </h3>
                  <p className="text-xs text-[#66645E] mt-1">
                    {isHi
                      ? 'अपनी बुनियादी खाता जानकारी और सुरक्षा उपलब्धियां देखें।'
                      : 'Basic profile information and investor safety accomplishment.'}
                  </p>
                </div>

                {/* Main Profile Info Card with Gender Character */}
                <div className="p-6 sm:p-7 rounded-[4px] border border-[#E5E4DE] bg-white shadow-[2px_2px_0px_rgba(17,17,17,0.02)] space-y-6">
                  {/* Top: Circular Container with Gender Character */}
                  <div className="flex flex-col items-center justify-center text-center space-y-3 pb-4 border-b border-[#E5E4DE]">
                    <div className="relative">
                      <ProfileAvatar
                        gender={isEditingProfile ? editGender : currentGender}
                        size="lg"
                      />
                      <span className="absolute bottom-0 right-0 px-2 py-0.5 rounded-full bg-[#111111] text-white text-[9px] font-mono uppercase font-bold">
                        {isEditingProfile ? editGender : currentGender}
                      </span>
                    </div>

                    <div className="text-xs font-mono text-[#66645E]">
                      {isEditingProfile
                        ? editGender === 'Female'
                          ? 'Female (Girl Character)'
                          : 'Male (Boy Character)'
                        : user?.gender === 'Female'
                        ? 'Girl Character Avatar'
                        : 'Boy Character Avatar'}
                    </div>
                  </div>

                  {/* Profile Fields: Full Name, Contact Number, Email, Age, Gender */}
                  {!isEditingProfile ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                        <div className="p-3 bg-[#FCF9F8] rounded border border-[#E5E4DE]">
                          <span className="text-[10px] text-[#66645E] uppercase block font-semibold">
                            Full Name
                          </span>
                          <strong className="text-sm text-[#111111] block mt-0.5 font-sans">
                            {user?.name || 'Rohan Sharma'}
                          </strong>
                        </div>

                        <div className="p-3 bg-[#FCF9F8] rounded border border-[#E5E4DE]">
                          <span className="text-[10px] text-[#66645E] uppercase block font-semibold">
                            Contact Number
                          </span>
                          <strong className="text-sm text-[#111111] block mt-0.5">
                            {user?.mobile || '+91 98765 43210'}
                          </strong>
                        </div>

                        <div className="p-3 bg-[#FCF9F8] rounded border border-[#E5E4DE]">
                          <span className="text-[10px] text-[#66645E] uppercase block font-semibold">
                            Email
                          </span>
                          <strong className="text-sm text-[#111111] block mt-0.5 truncate">
                            {user?.email || 'rohan.sharma@investor.in'}
                          </strong>
                        </div>

                        <div className="p-3 bg-[#FCF9F8] rounded border border-[#E5E4DE]">
                          <span className="text-[10px] text-[#66645E] uppercase block font-semibold">
                            Age
                          </span>
                          <strong className="text-sm text-[#111111] block mt-0.5">
                            {user?.age || 32} Years
                          </strong>
                        </div>

                        <div className="p-3 bg-[#FCF9F8] rounded border border-[#E5E4DE] sm:col-span-2">
                          <span className="text-[10px] text-[#66645E] uppercase block font-semibold">
                            Gender
                          </span>
                          <strong className="text-sm text-[#111111] block mt-0.5">
                            {user?.gender || 'Male'}
                          </strong>
                        </div>
                      </div>

                      {/* Edit Profile Action */}
                      <div className="pt-2 flex items-center justify-between border-t border-[#E5E4DE]">
                        <button
                          onClick={() => {
                            setEditName(user?.name || 'Rohan Sharma');
                            setEditMobile(user?.mobile || '+91 98765 43210');
                            setEditEmail(user?.email || 'rohan.sharma@investor.in');
                            setEditAge(user?.age || 32);
                            setEditGender(user?.gender || 'Male');
                            setIsEditingProfile(true);
                          }}
                          className="px-3.5 py-1.5 rounded-[2px] border border-[#E5E4DE] hover:border-[#111111] text-xs font-mono font-medium text-[#111111] flex items-center gap-1.5 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit Profile</span>
                        </button>

                        <button
                          onClick={() => {
                            onSignOut();
                            onClose();
                          }}
                          className="text-xs font-mono text-[#991B1B] hover:underline flex items-center gap-1"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Edit Profile Form
                    <div className="space-y-4">
                      <div className="space-y-3 text-xs font-mono">
                        <div>
                          <label className="block text-[#66645E] mb-1 font-semibold">Full Name:</label>
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full p-2.5 rounded border border-[#E5E4DE] bg-[#FCF9F8] text-sm text-[#111111] focus:outline-none focus:border-[#111111]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#66645E] mb-1 font-semibold">Contact Number:</label>
                          <input
                            type="text"
                            value={editMobile}
                            onChange={(e) => setEditMobile(e.target.value)}
                            className="w-full p-2.5 rounded border border-[#E5E4DE] bg-[#FCF9F8] text-sm text-[#111111] focus:outline-none focus:border-[#111111]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#66645E] mb-1 font-semibold">Email:</label>
                          <input
                            type="email"
                            value={editEmail}
                            onChange={(e) => setEditEmail(e.target.value)}
                            className="w-full p-2.5 rounded border border-[#E5E4DE] bg-[#FCF9F8] text-sm text-[#111111] focus:outline-none focus:border-[#111111]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#66645E] mb-1 font-semibold">Age:</label>
                          <input
                            type="number"
                            value={editAge}
                            onChange={(e) => setEditAge(e.target.value)}
                            className="w-full p-2.5 rounded border border-[#E5E4DE] bg-[#FCF9F8] text-sm text-[#111111] focus:outline-none focus:border-[#111111]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#66645E] mb-1 font-semibold">Gender (Selects Character):</label>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => setEditGender('Male')}
                              className={`p-2.5 rounded border text-xs font-mono uppercase font-bold transition-colors ${
                                editGender === 'Male'
                                  ? 'bg-[#111111] text-white border-[#111111]'
                                  : 'bg-[#FCF9F8] border-[#E5E4DE] text-[#444748] hover:border-[#111111]'
                              }`}
                            >
                              Male (Boy)
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditGender('Female')}
                              className={`p-2.5 rounded border text-xs font-mono uppercase font-bold transition-colors ${
                                editGender === 'Female'
                                  ? 'bg-[#111111] text-white border-[#111111]'
                                  : 'bg-[#FCF9F8] border-[#E5E4DE] text-[#444748] hover:border-[#111111]'
                              }`}
                            >
                              Female (Girl)
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E5E4DE]">
                        <button
                          type="button"
                          onClick={() => setIsEditingProfile(false)}
                          className="px-3 py-1.5 rounded text-xs font-mono text-[#66645E] hover:text-[#111111]"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleSaveProfile}
                          className="px-4 py-2 rounded bg-[#111111] text-white text-xs font-mono font-bold uppercase hover:bg-[#2A2A28] flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Save Changes</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Achievement Section inside Profile */}
                <AchievementCard
                  progress={simulatorProgress}
                  currentLanguage={currentLanguage}
                  onNavigateSimulator={() => {
                    onClose();
                  }}
                />
              </div>
            )}

            {/* ------------------------------------------------------- */}
            {/* 2. LEARN SECTION                                        */}
            {/* ------------------------------------------------------- */}
            {activeTab === 'learn' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
                    {isHi ? 'निवेशक सुरक्षा शिक्षा' : 'Investor Safety Guides'}
                  </h3>
                  <p className="text-xs text-[#66645E] mt-1">
                    {isHi
                      ? 'धोखाधड़ी से बचने के व्यावहारिक तरीके और चेतावनी संकेत।'
                      : 'Approachable explanations of common investment deception tactics.'}
                  </p>
                </div>

                {/* Practical "Before You Pay" Checklist inside Learn */}
                <BeforeYouPayCompact currentLanguage={currentLanguage} />

                {/* Field Guides */}
                <div className="space-y-3 pt-2">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#66645E] font-bold">
                    FIELD GUIDES & SCAM TACTICS
                  </div>

                  {selectedGuide ? (
                    <div className="p-5 rounded-[4px] border border-[#111111] bg-white space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-[#E5E4DE]">
                        <span className="text-[10px] font-mono text-[#991B1B] font-bold uppercase">
                          {selectedGuide.category}
                        </span>
                        <button
                          onClick={() => setSelectedGuide(null)}
                          className="text-xs font-mono text-[#66645E] hover:text-[#111111] underline"
                        >
                          ← All Guides
                        </button>
                      </div>

                      <h4 className="font-serif text-xl font-bold text-[#111111]">
                        {selectedGuide.title}
                      </h4>
                      <p className="text-xs text-[#333333] leading-relaxed">
                        {selectedGuide.explanation}
                      </p>

                      <div className="p-3 bg-[#FCF9F8] rounded border border-[#E5E4DE]">
                        <div className="text-[10px] font-mono uppercase font-bold text-[#66645E] mb-1">
                          Typical Example:
                        </div>
                        <p className="text-xs font-mono text-[#111111] italic">
                          "{selectedGuide.exampleSnippet}"
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <div className="text-[10px] font-mono uppercase font-bold text-[#991B1B]">
                          Red Flags:
                        </div>
                        <ul className="text-xs text-[#444748] space-y-1 list-disc list-inside">
                          {selectedGuide.redFlags.map((flag, idx) => (
                            <li key={idx}>{flag}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {guides.map((guide) => (
                        <div
                          key={guide.id}
                          onClick={() => setSelectedGuide(guide)}
                          className="p-4 rounded-[4px] border border-[#E5E4DE] bg-white hover:border-[#111111] cursor-pointer transition-colors shadow-2xs flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between text-[10px] font-mono text-[#66645E]">
                              <span className="uppercase font-semibold">{guide.category}</span>
                              <span>{guide.readTime}</span>
                            </div>
                            <div className="font-serif text-base font-bold text-[#111111] mt-1.5">
                              {guide.title}
                            </div>
                            <p className="text-xs text-[#66645E] mt-1 line-clamp-2 leading-relaxed">
                              {guide.summary}
                            </p>
                          </div>
                          <div className="pt-3 mt-3 border-t border-[#E5E4DE] text-[11px] font-mono font-semibold text-[#111111] flex items-center justify-between">
                            <span>Read Guide</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ------------------------------------------------------- */}
            {/* 3. HOW IT WORKS SECTION                                 */}
            {/* ------------------------------------------------------- */}
            {activeTab === 'how-it-works' && (
              <HowItWorksSimple
                currentLanguage={currentLanguage}
                onStartScan={() => {
                  onClose();
                  onStartScan();
                }}
              />
            )}

            {/* ------------------------------------------------------- */}
            {/* 4. SCAN HISTORY SECTION                                 */}
            {/* ------------------------------------------------------- */}
            {activeTab === 'history' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
                      {isHi ? 'स्कैन इतिहास' : 'Scan History'}
                    </h3>
                    <p className="text-xs text-[#66645E] mt-0.5">
                      Stored strictly on your local device.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#66645E]">
                    {history.length} records
                  </span>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={historySearch}
                    onChange={(e) => setHistorySearch(e.target.value)}
                    placeholder="Search past scans by message, entity or risk..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-[4px] border border-[#E5E4DE] bg-white text-xs font-mono text-[#111111] focus:outline-none focus:border-[#111111]"
                  />
                </div>

                {/* History List */}
                {filteredHistory.length === 0 ? (
                  <div className="p-8 rounded-[4px] border border-dashed border-[#D8D6CE] text-center bg-white space-y-2">
                    <p className="text-xs text-[#66645E] font-mono">No scan records found.</p>
                    <button
                      onClick={() => {
                        onClose();
                        onStartScan();
                      }}
                      className="text-xs font-mono font-bold text-[#111111] underline"
                    >
                      Run a new scan →
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredHistory.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          onSelectDossier(item.id);
                          onClose();
                        }}
                        className="p-4 rounded-[4px] border border-[#E5E4DE] bg-white hover:border-[#111111] cursor-pointer transition-all shadow-2xs space-y-2"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] text-[#66645E]">
                              #{item.id}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                                item.assessment === 'HIGH CONCERN'
                                  ? 'bg-[#FEF2F2] text-[#991B1B]'
                                  : item.assessment === 'REQUIRES CAUTION'
                                  ? 'bg-[#FFFBEB] text-[#92400E]'
                                  : 'bg-[#F0FDF4] text-[#166534]'
                              }`}
                            >
                              {item.assessment || item.riskLevel}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono text-[#66645E]">
                              {item.timestamp}
                            </span>
                            <button
                              onClick={(e) => handleDeleteHistoryItem(e, item.id)}
                              className="text-[#66645E] hover:text-[#991B1B] p-1 rounded"
                              title="Delete record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <p className="text-xs font-mono text-[#111111] line-clamp-2">
                          {item.summary || item.rawInput}
                        </p>

                        <div className="flex items-center justify-between text-[11px] font-mono text-[#66645E] pt-1 border-t border-[#E5E4DE]/60">
                          <span>{item.sourceLabel}</span>
                          <span className="text-[#111111] font-semibold flex items-center gap-1">
                            View Report <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
