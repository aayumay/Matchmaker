import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Zap, CheckCircle2, AlertTriangle, Send, X, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { profiles } from '../data/profiles';

type MatchDemo = {
  id: string;
  maleId: string;
  femaleId: string;
  score: number;
  pillars: string[];
  concern: string;
  recommendation: string;
  reasoning: string;
};

const suggestedMatches: MatchDemo[] = [
  {
    id: 'match-1',
    maleId: 'p001', // Arjun Mehta
    femaleId: 'p002', // Priya Sharma
    score: 90,
    pillars: ['Preference Alignment', 'Family Values', 'Lifestyle Compatibility'],
    concern: 'Differing relocation flexibility',
    recommendation: 'Strong Recommendation',
    reasoning: 'Both individuals demonstrate strong alignment in family values, communication style, and long-term relationship goals.',
  },
  {
    id: 'match-2',
    maleId: 'p003', // Rohan Desai
    femaleId: 'p004', // Neha Gupta
    score: 84,
    pillars: ['Career Ambition', 'Financial Goals', 'High Society Lifestyle'],
    concern: 'Rohan prefers joint family, Neha is highly independent',
    recommendation: 'Needs Discussion',
    reasoning: 'Excellent professional and financial alignment, but family structure expectations will require careful and upfront navigation.',
  },
  {
    id: 'match-3',
    maleId: 'p007', // Siddharth Reddy
    femaleId: 'p008', // Sneha Iyer
    score: 88,
    pillars: ['Intellectual Pursuits', 'Traditional yet Progressive', 'Arts & Culture'],
    concern: 'Both have exceptionally demanding tech/science careers',
    recommendation: 'Moderate Recommendation',
    reasoning: 'Deep intellectual and cultural resonance. Shared South Indian heritage with modern, progressive outlooks.',
  },
];

export default function InsightsPage() {
  const { dark } = useTheme();
  const navigate = useNavigate();

  const [activeMatch, setActiveMatch] = useState<MatchDemo | null>(null);
  const [introStep, setIntroStep] = useState<1 | 2>(1);
  const [isSending, setIsSending] = useState(false);
  const [introType, setIntroType] = useState('Soft Introduction');

  const getProfile = (id: string) => profiles.find((p) => p.id === id)!;

  const handleOpenIntro = (match: MatchDemo) => {
    setActiveMatch(match);
    setIntroStep(1);
    setIntroType('Soft Introduction');
  };

  const getActiveMale = () => activeMatch ? getProfile(activeMatch.maleId) : null;
  const getActiveFemale = () => activeMatch ? getProfile(activeMatch.femaleId) : null;

  return (
    <div className="page-shell pb-32">
      <div className="border-b border-black/10 pb-7 mb-8 dark:border-white/10">
        <span className="page-kicker">Match Intelligence Center</span>
        <h1 className={`editorial-title ${dark ? 'text-white' : 'text-charcoal'}`}>
          Suggested Matches
        </h1>
        <p className={`mt-3 text-sm max-w-2xl ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
          Deep-learning assessments comparing values, lifestyle, and preferences across your client portfolio.
        </p>
      </div>

      {/* Match Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {suggestedMatches.map((match, index) => {
          const male = getProfile(match.maleId);
          const female = getProfile(match.femaleId);

          return (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`card-premium p-6 flex flex-col ${dark ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className="flex justify-between items-center mb-6">
                <div className={`px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-full border ${
                  match.score >= 88 
                    ? 'bg-gold-500/10 border-gold-500/30 text-gold-600'
                    : 'bg-gray-500/10 border-gray-500/30 text-gray-500 dark:text-gray-400'
                }`}>
                  {match.recommendation}
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-gold-500" />
                  <span className={`font-display font-bold text-lg ${dark ? 'text-white' : 'text-charcoal'}`}>
                    {match.score}% Match
                  </span>
                </div>
              </div>

              {/* Profiles Row */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col items-center flex-1">
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-gold-400 mb-3">
                    <img src={male.photo} alt={male.firstName} className="w-full h-full object-cover grayscale contrast-125" />
                  </div>
                  <button
                    onClick={() => navigate(`/clients/${male.id}`)}
                    className={`font-semibold text-sm hover:text-gold-500 transition-colors ${dark ? 'text-white' : 'text-charcoal'}`}
                  >
                    {male.firstName} {male.lastName}
                  </button>
                  <span className="text-[10px] text-gray-500 mt-1">{male.city}</span>
                </div>

                <div className="w-8 h-8 rounded-full border border-gold-400/30 flex flex-shrink-0 items-center justify-center bg-gold-400/5 mx-2">
                  <span className="text-gold-500 font-display text-sm">↔</span>
                </div>

                <div className="flex flex-col items-center flex-1">
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-gold-400 mb-3">
                    <img src={female.photo} alt={female.firstName} className="w-full h-full object-cover grayscale contrast-125" />
                  </div>
                  <button
                    onClick={() => navigate(`/clients/${female.id}`)}
                    className={`font-semibold text-sm hover:text-gold-500 transition-colors ${dark ? 'text-white' : 'text-charcoal'}`}
                  >
                    {female.firstName} {female.lastName}
                  </button>
                  <span className="text-[10px] text-gray-500 mt-1">{female.city}</span>
                </div>
              </div>

              {/* Pillars & Concerns */}
              <div className="space-y-4 mb-8 flex-1">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Top Pillars</p>
                  <div className="space-y-1.5">
                    {match.pillars.map((pillar, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-gold-500" />
                        <span className={`text-xs ${dark ? 'text-gray-300' : 'text-gray-600'}`}>{pillar}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`p-3 rounded-lg border-l-2 border-l-amber-500 ${dark ? 'bg-amber-900/10' : 'bg-amber-50'}`}>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500 mt-0.5" />
                    <p className={`text-xs leading-relaxed ${dark ? 'text-amber-200/70' : 'text-amber-900/70'}`}>
                      {match.concern}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleOpenIntro(match)}
                className="btn-gold w-full text-xs py-3"
              >
                Review & Introduce
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Introduction Modal */}
      <AnimatePresence>
        {activeMatch && getActiveMale() && getActiveFemale() && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`w-full max-w-2xl border shadow-2xl relative my-8 ${
                dark ? 'bg-[#151513] border-gold-400/30' : 'bg-ivory border-gold-400/30'
              }`}
            >
              <div className="p-8">
                {introStep === 1 ? (
                  <>
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${dark ? 'bg-white/5' : 'bg-black/5'}`}>
                          <Send className="w-6 h-6 text-gold-500" />
                        </div>
                        <h2 className={`font-display text-3xl font-bold ${dark ? 'text-white' : 'text-charcoal'}`}>
                          Create Introduction
                        </h2>
                      </div>
                      <button 
                        onClick={() => setActiveMatch(null)}
                        className="text-gray-500 hover:text-gold-500 transition-colors"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={`block text-[10px] font-bold uppercase tracking-widest mb-2 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Male Client Email
                          </label>
                          <input
                            type="email"
                            value={`${getActiveMale()?.firstName.toLowerCase()}.${getActiveMale()?.lastName.toLowerCase()}@example.com`}
                            readOnly
                            className={`w-full p-3 rounded-lg border text-sm opacity-70 cursor-not-allowed ${
                              dark ? 'bg-[#1e1e1a] border-white/10 text-white' : 'bg-white border-black/10 text-charcoal'
                            }`}
                          />
                        </div>
                        <div>
                          <label className={`block text-[10px] font-bold uppercase tracking-widest mb-2 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Female Client Email
                          </label>
                          <input
                            type="email"
                            value={`${getActiveFemale()?.firstName.toLowerCase()}.${getActiveFemale()?.lastName.toLowerCase()}@example.com`}
                            readOnly
                            className={`w-full p-3 rounded-lg border text-sm opacity-70 cursor-not-allowed ${
                              dark ? 'bg-[#1e1e1a] border-white/10 text-white' : 'bg-white border-black/10 text-charcoal'
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className={`block text-[10px] font-bold uppercase tracking-widest mb-2 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                          Introduction Type
                        </label>
                        <select
                          value={introType}
                          onChange={(e) => setIntroType(e.target.value)}
                          className={`w-full p-3 rounded-lg border text-sm focus:outline-none focus:border-gold-400 transition-colors appearance-none ${
                            dark ? 'bg-[#1e1e1a] border-white/10 text-white' : 'bg-white border-black/10 text-charcoal'
                          }`}
                        >
                          <option value="Soft Introduction">Soft Introduction</option>
                          <option value="Profile Exchange">Profile Exchange</option>
                          <option value="Full Match Recommendation">Full Match Recommendation</option>
                        </select>
                      </div>

                      <div>
                        <label className={`block text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                          <Brain className="w-3 h-3 text-gold-500" />
                          AI Generated Introduction
                        </label>
                        <textarea
                          readOnly
                          value={`Hello,\n\nBased on our relationship intelligence analysis, we would like to introduce ${getActiveMale()?.firstName} ${getActiveMale()?.lastName} and ${getActiveFemale()?.firstName} ${getActiveFemale()?.lastName}.\n\n${activeMatch.reasoning} The AI analysis indicates an ${activeMatch.score}% overall match probability.\n\nPlease review the attached profiles.`}
                          className={`w-full p-4 rounded-lg border text-sm leading-relaxed h-40 resize-none ${
                            dark ? 'bg-[#1e1e1a] border-gold-400/20 text-gray-300' : 'bg-white border-gold-400/30 text-charcoal'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="mt-8 flex gap-3">
                      <button
                        onClick={() => setActiveMatch(null)}
                        className={`flex-1 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.16em] border rounded-lg transition-colors ${
                          dark ? 'border-white/15 text-white/60 hover:bg-white/5' : 'border-black/15 text-charcoal/60 hover:bg-black/5'
                        }`}
                        disabled={isSending}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          setIsSending(true);
                          setTimeout(() => {
                            setIsSending(false);
                            setIntroStep(2);
                          }, 1500);
                        }}
                        className="btn-gold flex-1 flex items-center justify-center gap-2"
                        disabled={isSending}
                      >
                        {isSending ? (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : null}
                        {isSending ? 'Sending...' : 'Send Introduction'}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.5 }}
                      className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                    </motion.div>
                    
                    <h2 className={`font-display text-3xl font-bold mb-4 ${dark ? 'text-white' : 'text-charcoal'}`}>
                      Introduction Sent Successfully
                    </h2>
                    
                    <div className={`p-6 rounded-lg border inline-block text-left mb-8 w-full ${dark ? 'bg-[#1e1e1a] border-white/10' : 'bg-white border-black/10'}`}>
                      <div className="flex items-center gap-8 justify-between mb-4">
                        <span className={`font-semibold ${dark ? 'text-white' : 'text-charcoal'}`}>
                          {getActiveMale()?.firstName} {getActiveMale()?.lastName}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {getActiveMale()?.firstName.toLowerCase()}.{getActiveMale()?.lastName.toLowerCase()}@example.com
                        </span>
                      </div>
                      <div className="flex items-center gap-8 justify-between">
                        <span className={`font-semibold ${dark ? 'text-white' : 'text-charcoal'}`}>
                          {getActiveFemale()?.firstName} {getActiveFemale()?.lastName}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {getActiveFemale()?.firstName.toLowerCase()}.{getActiveFemale()?.lastName.toLowerCase()}@example.com
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-center mb-10">
                      <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs px-4 py-3 rounded-lg inline-flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        <span className="font-bold uppercase tracking-wider">Demo Mode</span>
                        <span className="px-2">|</span>
                        <span>Email delivery simulated successfully.</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveMatch(null)}
                      className="btn-gold w-full py-4 text-sm"
                    >
                      Return to Intelligence Center
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
