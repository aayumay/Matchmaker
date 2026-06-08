import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Lock, Bell, Zap, Download, Share2, MessageCircle, Calendar, Video, Mail, Check, Shield, X, FileText, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useApp } from '../hooks/useApp';


type DetailLevel = 'brief' | 'detailed' | 'comprehensive';

interface SettingsState {
  fullName: string;
  email: string;
  phone: string;
  notifications: {
    newMatches: boolean;
    weeklyDigest: boolean;
    systemUpdates: boolean;
  };
  aiPreferences: {
    autoInsights: boolean;
    threshold: number;
    detailLevel: DetailLevel;
  };
}

export default function SettingsPage() {
  const { dark, toggle } = useTheme();
  const { currentMatchmaker, register } = useApp();
  const [showToast, setShowToast] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  
  // Export Modal States
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportStep, setExportStep] = useState<1 | 2>(1);
  const [isExporting, setIsExporting] = useState(false);
  const [exportForm, setExportForm] = useState({
    clientName: '',
    recipientEmail: '',
    reportType: 'Client Biodata PDF',
    message: ''
  });
  const [settings, setSettings] = useState<SettingsState>({
    fullName: currentMatchmaker?.name || '',
    email: currentMatchmaker?.email || '',
    phone: '+91 98765 43210',
    notifications: {
      newMatches: true,
      weeklyDigest: true,
      systemUpdates: false,
    },
    aiPreferences: {
      autoInsights: true,
      threshold: 75,
      detailLevel: 'detailed',
    }
  });
  const [photoPreview, setPhotoPreview] = useState(currentMatchmaker?.photo || '');

  const [toastMessage, setToastMessage] = useState('Settings saved successfully!');

  const showNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSave = () => {
    register(settings.fullName, settings.email, photoPreview);
    showNotification('Settings saved successfully!');
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const integrationsData: Record<string, { title: string; icon: React.ReactNode; capabilities: string[]; description: string }> = {
    'WhatsApp Business': {
      title: 'WhatsApp Business Integration',
      icon: <MessageCircle className="w-5 h-5 text-gold-400" />,
      capabilities: [
        'Send match introductions',
        'Share client profiles',
        'Follow-up reminders',
        'Meeting confirmations',
        'Relationship journey updates'
      ],
      description: 'This integration will allow matchmakers to communicate with clients directly through WhatsApp Business while maintaining a professional matchmaking workflow.'
    },
    'Google Calendar': {
      title: 'Google Calendar Integration',
      icon: <Calendar className="w-5 h-5 text-gold-400" />,
      capabilities: [
        'Schedule client meetings',
        'Calendar synchronization',
        'Automated reminders',
        'Follow-up scheduling',
        'Match review sessions'
      ],
      description: 'This integration will help matchmakers manage appointments and relationship milestones efficiently.'
    },
    'Zoom': {
      title: 'Zoom Integration',
      icon: <Video className="w-5 h-5 text-gold-400" />,
      capabilities: [
        'Create video meetings',
        'Share meeting links',
        'Client consultations',
        'Match introductions',
        'Family discussion sessions'
      ],
      description: 'This integration will support virtual matchmaking consultations and client meetings.'
    },
    'Email Automation': {
      title: 'Email Automation',
      icon: <Mail className="w-5 h-5 text-gold-400" />,
      capabilities: [
        'Send match introductions',
        'Client follow-ups',
        'Meeting confirmations',
        'Relationship updates',
        'Personalized recommendations'
      ],
      description: 'This integration will automate communication between matchmakers and clients.'
    }
  };

  return (
    <div className="page-shell">
      <div className="border-b border-black/10 pb-7 dark:border-white/10">
        <span className="page-kicker">Private office preferences</span>
        <h1 className={`editorial-title ${dark ? 'text-white' : 'text-charcoal'}`}>
          Settings
        </h1>
        <p className={`mt-3 text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
          Personalise your workspace, intelligence model, and communications
        </p>
      </div>

      {showToast && (
        <motion.div
          className="fixed top-24 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {toastMessage}
        </motion.div>
      )}

      <div className="space-y-6">
        {/* Profile Section */}
        <motion.div
          className={`card-premium ${dark ? 'bg-gray-800' : 'bg-white'} p-6`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className={`font-display text-2xl font-bold mb-4 ${dark ? 'text-white' : 'text-charcoal'}`}>
            Matchmaker Profile
          </h2>
          <div className="flex items-center gap-6 mb-6">
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border border-gold-400 bg-gray-200">
              {photoPreview ? (
                <img src={photoPreview} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gold-300 font-display text-2xl font-bold text-charcoal">
                  {settings.fullName.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <label className="btn-gold cursor-pointer py-2 px-4 text-[9px]">
                Upload Photo
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
              </label>
              <p className="mt-2 text-xs text-gray-500">Square image, max 2MB</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${dark ? 'text-gray-300' : 'text-charcoal'}`}>
                Full Name
              </label>
              <input
                type="text"
                value={settings.fullName}
                onChange={(e) => setSettings({ ...settings, fullName: e.target.value })}
                className="input-premium w-full"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${dark ? 'text-gray-300' : 'text-charcoal'}`}>
                Email
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="input-premium w-full"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${dark ? 'text-gray-300' : 'text-charcoal'}`}>
                Phone
              </label>
              <input
                type="tel"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="input-premium w-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Appearance Section */}
        <motion.div
          className={`card-premium ${dark ? 'bg-gray-800' : 'bg-white'} p-6`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className={`font-display text-2xl font-bold mb-4 ${dark ? 'text-white' : 'text-charcoal'}`}>
            Appearance
          </h2>
          <div className="space-y-4">
            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className={`font-medium ${dark ? 'text-white' : 'text-charcoal'}`}>
                  Dark Mode
                </p>
                <p className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Switch between light and dark theme
                </p>
              </div>
              <button
                onClick={toggle}
                className={`w-12 h-6 rounded-full transition-all ${
                  dark ? 'bg-gold-400' : 'bg-gray-300'
                } relative`}
              >
                <motion.div
                  className="w-5 h-5 rounded-full bg-white absolute top-0.5"
                  animate={{ left: dark ? '22px' : '2px' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Notifications Section */}
        <motion.div
          className={`card-premium ${dark ? 'bg-gray-800' : 'bg-white'} p-6`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className={`font-display text-2xl font-bold mb-4 flex items-center gap-2 ${dark ? 'text-white' : 'text-charcoal'}`}>
            <Bell className="w-6 h-6 text-gold-400" />
            Notifications
          </h2>
          <div className="space-y-4">
            {[
              { key: 'newMatches', label: 'Meeting Reminders', description: 'Get notified before client meetings' },
              { key: 'weeklyDigest', label: 'Match Updates', description: 'Receive alerts for successful matches' },
              { key: 'systemUpdates', label: 'Client Follow-ups', description: 'Reminders to follow up with clients' },
            ].map((notif) => (
              <div key={notif.key} className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${dark ? 'text-white' : 'text-charcoal'}`}>
                    {notif.label}
                  </p>
                  <p className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {notif.description}
                  </p>
                </div>
                <button
                  onClick={() =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        [notif.key]: !settings.notifications[notif.key as keyof typeof settings.notifications],
                      },
                    })
                  }
                  className={`w-12 h-6 rounded-full transition-all ${
                    settings.notifications[notif.key as keyof typeof settings.notifications]
                      ? 'bg-gold-400'
                      : 'bg-gray-300'
                  } relative`}
                >
                  <motion.div
                    className="w-5 h-5 rounded-full bg-white absolute top-0.5"
                    animate={{
                      left: settings.notifications[notif.key as keyof typeof settings.notifications]
                        ? '22px'
                        : '2px',
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Preferences Section */}
        <motion.div
          className={`card-premium ${dark ? 'bg-gray-800' : 'bg-white'} p-6`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className={`font-display text-2xl font-bold mb-4 flex items-center gap-2 ${dark ? 'text-white' : 'text-charcoal'}`}>
            <Zap className="w-6 h-6 text-gold-400" />
            AI Preferences
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`font-medium ${dark ? 'text-white' : 'text-charcoal'}`}>
                  AI Match Suggestions
                </p>
                <p className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Automatically generate high-compatibility matches
                </p>
              </div>
              <button
                onClick={() =>
                  setSettings({
                    ...settings,
                    aiPreferences: {
                      ...settings.aiPreferences,
                      autoInsights: !settings.aiPreferences.autoInsights,
                    },
                  })
                }
                className={`w-12 h-6 rounded-full transition-all ${
                  settings.aiPreferences.autoInsights ? 'bg-gold-400' : 'bg-gray-300'
                } relative`}
              >
                <motion.div
                  className="w-5 h-5 rounded-full bg-white absolute top-0.5"
                  animate={{
                    left: settings.aiPreferences.autoInsights ? '22px' : '2px',
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${dark ? 'text-gray-300' : 'text-charcoal'}`}>
                Compatibility Threshold: {settings.aiPreferences.threshold}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.aiPreferences.threshold}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    aiPreferences: {
                      ...settings.aiPreferences,
                      threshold: parseInt(e.target.value),
                    },
                  })
                }
                className="w-full"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${dark ? 'text-gray-300' : 'text-charcoal'}`}>
                Detail Level
              </label>
              <select
                value={settings.aiPreferences.detailLevel}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    aiPreferences: {
                      ...settings.aiPreferences,
                      detailLevel: e.target.value as DetailLevel,
                    },
                  })
                }
                className="input-premium w-full"
              >
                <option value="brief">Brief</option>
                <option value="detailed">Detailed</option>
                <option value="comprehensive">Comprehensive</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Data & Privacy Section */}
        <motion.div
          className={`card-premium ${dark ? 'bg-gray-800' : 'bg-white'} p-6`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className={`font-display text-2xl font-bold mb-4 flex items-center gap-2 ${dark ? 'text-white' : 'text-charcoal'}`}>
            <Lock className="w-6 h-6 text-gold-400" />
            Data & Privacy
          </h2>
          <div className="space-y-3">
            <button 
              onClick={() => {
                setExportStep(1);
                setExportForm({ clientName: '', recipientEmail: '', reportType: 'Client Biodata PDF', message: '' });
                setIsExportModalOpen(true);
              }}
              className={`w-full px-4 py-2 rounded-lg border ${
                dark
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              } transition-colors flex items-center justify-center gap-2`}
            >
              <Download className="w-4 h-4" />
              Export Client Reports
            </button>
            <button 
              onClick={() => setIsPrivacyModalOpen(true)}
              className={`w-full px-4 py-2 rounded-lg border ${
                dark
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              } transition-colors flex items-center justify-center gap-2`}
            >
              <Shield className="w-4 h-4" />
              Privacy Policy
            </button>
          </div>
        </motion.div>

        {/* Integrations Section */}
        <motion.div
          className={`card-premium ${dark ? 'bg-gray-800' : 'bg-white'} p-6`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className={`font-display text-2xl font-bold mb-4 ${dark ? 'text-white' : 'text-charcoal'}`}>
            Matchmaker Integrations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.keys(integrationsData).map((integration) => (
              <button
                key={integration}
                onClick={() => setSelectedIntegration(integration)}
                className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                  dark
                    ? 'border-gold-400/30 text-gold-300 hover:bg-gold-400/10'
                    : 'border-gold-400 text-gold-600 hover:bg-gold-50'
                }`}
              >
                {integrationsData[integration].icon}
                {integration}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.button
          onClick={handleSave}
          className="btn-gold w-full py-3 flex items-center justify-center gap-2 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Save className="w-5 h-5" />
          Save Settings
        </motion.button>
      </div>

      {/* Integration Roadmap Modal */}
      <AnimatePresence>
        {selectedIntegration && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`w-full max-w-md border shadow-2xl relative overflow-hidden ${
                dark ? 'bg-[#151513] border-gold-400/30' : 'bg-ivory border-gold-400/30'
              }`}
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-3 rounded-xl ${dark ? 'bg-white/5' : 'bg-black/5'}`}>
                    {integrationsData[selectedIntegration].icon}
                  </div>
                  <span className="inline-flex items-center px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gold-600 border border-gold-500/30 bg-gold-500/10 rounded-full">
                    Planned Feature
                  </span>
                </div>
                
                <h2 className={`font-display text-3xl font-bold mb-3 ${dark ? 'text-white' : 'text-charcoal'}`}>
                  {integrationsData[selectedIntegration].title}
                </h2>
                
                <p className={`text-sm leading-relaxed mb-8 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {integrationsData[selectedIntegration].description}
                </p>

                <div className="space-y-4 mb-8">
                  <h3 className={`text-[10px] font-bold uppercase tracking-widest ${dark ? 'text-white/70' : 'text-charcoal/70'}`}>
                    Future Capabilities
                  </h3>
                  <div className="space-y-3">
                    {integrationsData[selectedIntegration].capabilities.map((cap, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gold-500/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-gold-500" />
                        </div>
                        <span className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {cap}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedIntegration(null)}
                  className="btn-gold w-full"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {isPrivacyModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`w-full max-w-2xl border shadow-2xl relative overflow-hidden max-h-[90vh] flex flex-col ${
                dark ? 'bg-[#151513] border-gold-400/30' : 'bg-ivory border-gold-400/30'
              }`}
            >
              <div className="p-8 pb-6 border-b border-gold-400/20 flex-shrink-0 relative">
                <button 
                  onClick={() => setIsPrivacyModalOpen(false)}
                  className="absolute top-8 right-8 text-gray-500 hover:text-gold-500 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-4 mb-4">
                  <Shield className="w-8 h-8 text-gold-500" />
                  <span className="inline-flex items-center px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 rounded-full">
                    Secure & Active
                  </span>
                </div>
                <h2 className={`font-display text-4xl font-bold mb-3 ${dark ? 'text-white' : 'text-charcoal'}`}>
                  Privacy & Confidentiality Policy
                </h2>
                <p className={`text-sm leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                  The Date Crew is committed to protecting client privacy and maintaining confidentiality throughout the matchmaking journey.
                </p>
              </div>
              
              <div className="p-8 overflow-y-auto space-y-8 flex-1">
                <section>
                  <h3 className={`font-display text-xl font-semibold mb-4 text-gold-500`}>
                    Client Data Protection
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Personal information is securely stored.',
                      'Sensitive client information is protected.',
                      'Access is restricted to authorized matchmakers.'
                    ].map((item, i) => (
                      <li key={i} className={`flex items-start gap-3 text-sm ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                        <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gold-500 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className={`font-display text-xl font-semibold mb-4 text-gold-500`}>
                    Confidential Matchmaking
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Client profiles are shared only when appropriate.',
                      'Match recommendations are handled confidentially.',
                      'Personal preferences remain protected.'
                    ].map((item, i) => (
                      <li key={i} className={`flex items-start gap-3 text-sm ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                        <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gold-500 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className={`font-display text-xl font-semibold mb-4 text-gold-500`}>
                    AI Usage
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'AI is used to assist matchmakers.',
                      'AI-generated recommendations are reviewed by humans.',
                      'AI does not make final matchmaking decisions.'
                    ].map((item, i) => (
                      <li key={i} className={`flex items-start gap-3 text-sm ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                        <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gold-500 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className={`font-display text-xl font-semibold mb-4 text-gold-500`}>
                    Communication & Consent
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Client information is shared only with consent.',
                      'Match introductions follow privacy guidelines.',
                      'Clients maintain control over personal information.'
                    ].map((item, i) => (
                      <li key={i} className={`flex items-start gap-3 text-sm ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                        <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gold-500 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Export Client Reports Modal */}
      <AnimatePresence>
        {isExportModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`w-full max-w-md border shadow-2xl relative overflow-hidden ${
                dark ? 'bg-[#151513] border-gold-400/30' : 'bg-ivory border-gold-400/30'
              }`}
            >
              <div className="p-8">
                {exportStep === 1 ? (
                  <>
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`p-2 rounded-lg ${dark ? 'bg-white/5' : 'bg-black/5'}`}>
                        <FileText className="w-6 h-6 text-gold-500" />
                      </div>
                      <h2 className={`font-display text-2xl font-bold ${dark ? 'text-white' : 'text-charcoal'}`}>
                        Generate & Share Report
                      </h2>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <label className={`block text-[10px] font-bold uppercase tracking-widest mb-2 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                          Client Name
                        </label>
                        <input
                          type="text"
                          value={exportForm.clientName}
                          onChange={(e) => setExportForm({ ...exportForm, clientName: e.target.value })}
                          placeholder="e.g. Priya Sharma"
                          className={`w-full p-3 rounded-lg border text-sm focus:outline-none focus:border-gold-400 transition-colors ${
                            dark ? 'bg-[#1e1e1a] border-white/10 text-white placeholder:text-white/20' : 'bg-white border-black/10 text-charcoal placeholder:text-charcoal/30'
                          }`}
                        />
                      </div>

                      <div>
                        <label className={`block text-[10px] font-bold uppercase tracking-widest mb-2 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                          Recipient Email
                        </label>
                        <input
                          type="email"
                          value={exportForm.recipientEmail}
                          onChange={(e) => setExportForm({ ...exportForm, recipientEmail: e.target.value })}
                          placeholder="client@example.com"
                          className={`w-full p-3 rounded-lg border text-sm focus:outline-none focus:border-gold-400 transition-colors ${
                            dark ? 'bg-[#1e1e1a] border-white/10 text-white placeholder:text-white/20' : 'bg-white border-black/10 text-charcoal placeholder:text-charcoal/30'
                          }`}
                        />
                      </div>

                      <div>
                        <label className={`block text-[10px] font-bold uppercase tracking-widest mb-2 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                          Report Type
                        </label>
                        <select
                          value={exportForm.reportType}
                          onChange={(e) => setExportForm({ ...exportForm, reportType: e.target.value })}
                          className={`w-full p-3 rounded-lg border text-sm focus:outline-none focus:border-gold-400 transition-colors appearance-none ${
                            dark ? 'bg-[#1e1e1a] border-white/10 text-white' : 'bg-white border-black/10 text-charcoal'
                          }`}
                        >
                          <option value="Client Biodata PDF">Client Biodata PDF</option>
                          <option value="Match Report PDF">Match Report PDF</option>
                          <option value="Meeting Notes PDF">Meeting Notes PDF</option>
                        </select>
                      </div>

                      <div>
                        <label className={`block text-[10px] font-bold uppercase tracking-widest mb-2 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                          Optional Message
                        </label>
                        <textarea
                          value={exportForm.message}
                          onChange={(e) => setExportForm({ ...exportForm, message: e.target.value })}
                          placeholder="Add a personalized note..."
                          className={`w-full p-3 rounded-lg border text-sm focus:outline-none focus:border-gold-400 transition-colors resize-none h-24 ${
                            dark ? 'bg-[#1e1e1a] border-white/10 text-white placeholder:text-white/20' : 'bg-white border-black/10 text-charcoal placeholder:text-charcoal/30'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="mt-8 flex gap-3">
                      <button
                        onClick={() => setIsExportModalOpen(false)}
                        className={`flex-1 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.16em] border rounded-lg transition-colors ${
                          dark ? 'border-white/15 text-white/60 hover:bg-white/5' : 'border-black/15 text-charcoal/60 hover:bg-black/5'
                        }`}
                        disabled={isExporting}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          if (!exportForm.recipientEmail) {
                            showNotification('Please enter a recipient email.');
                            return;
                          }
                          setIsExporting(true);
                          setTimeout(() => {
                            setIsExporting(false);
                            setExportStep(2);
                          }, 1500); // Simulate report generation delay
                        }}
                        className="btn-gold flex-1 flex items-center justify-center gap-2"
                        disabled={isExporting}
                      >
                        {isExporting ? (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : null}
                        {isExporting ? 'Generating...' : 'Generate & Send'}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.5 }}
                      className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    </motion.div>
                    
                    <h2 className={`font-display text-2xl font-bold mb-2 ${dark ? 'text-white' : 'text-charcoal'}`}>
                      Report Generated Successfully
                    </h2>
                    
                    <p className={`text-sm mb-1 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Report shared with:
                    </p>
                    <a 
                      href={`mailto:${exportForm.recipientEmail}`}
                      className="text-gold-500 font-medium hover:underline text-sm block mb-8"
                    >
                      {exportForm.recipientEmail}
                    </a>

                    <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs px-4 py-3 rounded-lg mb-8 inline-flex items-center gap-2">
                      <Zap className="w-3 h-3" />
                      Demo Mode - Email delivery simulated.
                    </div>

                    <button
                      onClick={() => setIsExportModalOpen(false)}
                      className="btn-gold w-full"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
