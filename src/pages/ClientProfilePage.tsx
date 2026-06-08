import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Briefcase,
  CheckCircle2,
  ChevronDown,
  HeartHandshake,
  MapPin,
  Send,
  Sparkles,
  Users,
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useApp } from '../hooks/useApp';
import { getStageBadge } from '../utils/matching';
import { profiles } from '../data/profiles';

interface DossierSection {
  title: string;
  icon: React.ReactNode;
  fields: Array<[string, string]>;
}

function StageBadge({ stage }: { stage: string }) {
  const badge = getStageBadge(stage);
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] ${badge.bg} ${badge.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${badge.dot}`} />
      {stage}
    </span>
  );
}

export default function ClientProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { dark } = useTheme();
  const { getProfile, getMatchesForProfile, matches, sendMatch, currentMatchmaker } = useApp();
  const [expandedSection, setExpandedSection] = useState('Personal profile');
  const [pendingMatchId, setPendingMatchId] = useState<string | null>(null);
  const [personalRecommendation, setPersonalRecommendation] = useState('');
  
  // New Sharing/Export States
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareEmail, setShareEmail] = useState('');
  const [matchRecipient, setMatchRecipient] = useState('');
  const [matchSubject, setMatchSubject] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const profile = (id ? getProfile(id) : undefined) || profiles[0];

  useEffect(() => {
    getMatchesForProfile(profile.id);
  }, [getMatchesForProfile, profile.id]);

  const profileMatches = matches.filter(
    (match) => match.profileA === profile.id || match.profileB === profile.id
  );

  const sections: DossierSection[] = [
    {
      title: 'Personal profile',
      icon: <HeartHandshake className="h-4 w-4" />,
      fields: [
        ['Full name', `${profile.firstName} ${profile.lastName}`],
        ['Age', String(profile.age)],
        ['Height', profile.height],
        ['Religion', profile.religion],
        ['Languages', profile.languages.join(', ')],
        ['Location', `${profile.city}, ${profile.country}`],
      ],
    },
    {
      title: 'Education & career',
      icon: <Briefcase className="h-4 w-4" />,
      fields: [
        ['Degree', profile.degree],
        ['College', profile.college],
        ['Masters', profile.masters || 'Not specified'],
        ['Designation', profile.designation],
        ['Company', profile.company],
        ['Work mode', profile.workMode],
      ],
    },
    {
      title: 'Family & lifestyle',
      icon: <Users className="h-4 w-4" />,
      fields: [
        ['Family type', profile.familyType],
        ['Family values', profile.familyValues],
        ['Parents', profile.parentsProfession],
        ['Fitness', profile.fitness],
        ['Travel', profile.travel],
        ['Diet', profile.diet],
      ],
    },
    {
      title: 'Relationship preferences',
      icon: <Sparkles className="h-4 w-4" />,
      fields: [
        ['Preferred age', `${profile.preferredAgeRange[0]}–${profile.preferredAgeRange[1]}`],
        ['Preferred cities', profile.preferredCities.join(', ')],
        ['Open to relocate', profile.openToRelocate],
        ['Wants children', profile.wantKids],
        ['Preferred education', profile.preferredEducation.join(', ')],
        ['Private note', profile.notes],
      ],
    },
  ];

  return (
    <div className="page-shell">
      <motion.section
        className="luxury-panel grid min-h-[420px] md:grid-cols-[0.7fr_1.3fr]"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="relative min-h-[360px] overflow-hidden">
          <img
            src={profile.photo}
            alt={`${profile.firstName} ${profile.lastName}`}
            className="portrait-treatment absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute left-5 top-5 border border-gold-300/60 bg-black/30 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.2em] text-gold-200 backdrop-blur">
            Confidential dossier · {profile.id.toUpperCase()}
          </div>
        </div>

        <div className="relative z-10 flex flex-col justify-between p-7 sm:p-10">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="eyebrow">Verified private client</span>
              <StageBadge stage={profile.stage} />
            </div>
            <h1 className="mt-8 font-display text-5xl font-semibold leading-[0.88] text-white sm:text-6xl">
              {profile.firstName}
              <br />
              <em className="font-medium text-gold-200">{profile.lastName}, {profile.age}</em>
            </h1>
            <p className="mt-5 text-sm uppercase tracking-[0.12em] text-white/50">
              {profile.designation} · {profile.company}
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm text-gold-200">
              <MapPin className="h-4 w-4" />
              {profile.city}, {profile.country}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-3 border border-white/10">
            {[
              ['Compatibility', '85%'],
              ['Introductions', '12'],
              ['Meetings', '03'],
            ].map(([label, value], index) => (
              <div key={label} className={`p-4 ${index < 2 ? 'border-r border-white/10' : ''}`}>
                <p className="text-[8px] uppercase tracking-[0.16em] text-white/35">{label}</p>
                <p className="mt-2 font-display text-3xl text-gold-200">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-3">
          <div className="mb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="page-kicker">Private particulars</span>
              <h2 className={`font-display text-4xl font-semibold ${dark ? 'text-white' : 'text-charcoal'}`}>
                Client dossier
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsPdfModalOpen(true)}
                className="btn-gold px-4 py-2 text-[9px] bg-transparent border-gold-400 text-charcoal hover:bg-gold-400 hover:text-white"
              >
                Generate PDF
              </button>
              <button 
                onClick={() => setIsShareModalOpen(true)}
                className="btn-gold px-4 py-2 text-[9px]"
              >
                Share Profile
              </button>
            </div>
          </div>

          {sections.map((section) => {
            const open = expandedSection === section.title;
            return (
              <div key={section.title} className="card-premium">
                <button
                  onClick={() => setExpandedSection(open ? '' : section.title)}
                  className="flex w-full items-center justify-between px-5 py-4"
                >
                  <span className="flex items-center gap-3 text-left">
                    <span className="text-gold-500">{section.icon}</span>
                    <span className={`text-[11px] font-bold uppercase tracking-[0.14em] ${dark ? 'text-white' : 'text-charcoal'}`}>
                      {section.title}
                    </span>
                  </span>
                  <motion.span animate={{ rotate: open ? 180 : 0 }}>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-px border-t border-black/10 bg-black/10 dark:border-white/10 dark:bg-white/10 sm:grid-cols-2">
                        {section.fields.map(([label, value]) => (
                          <div key={label} className="bg-[#fbfaf6] p-4 dark:bg-[#181816]">
                            <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-gray-400">{label}</p>
                            <p className={`mt-2 text-sm ${dark ? 'text-gray-200' : 'text-charcoal'}`}>{value}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div>
          <div className="mb-5">
            <span className="page-kicker">Curated by intelligence</span>
            <h2 className={`font-display text-4xl font-semibold ${dark ? 'text-white' : 'text-charcoal'}`}>
              Leading introductions
            </h2>
          </div>

          <div className="space-y-4">
            {profileMatches.slice(0, 4).map((match, index) => {
              const candidateId = match.profileA === profile.id ? match.profileB : match.profileA;
              const candidate = getProfile(candidateId);
              if (!candidate) return null;

              return (
                <motion.article
                  key={match.id}
                  className="card-premium grid grid-cols-[100px_1fr] sm:grid-cols-[132px_1fr]"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.07 }}
                >
                  <img
                    src={candidate.photo}
                    alt={`${candidate.firstName} ${candidate.lastName}`}
                    className="portrait-treatment h-full min-h-44 w-full object-cover"
                  />
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="eyebrow">{match.matchLevel} match</p>
                        <h3 className={`mt-2 font-display text-2xl font-semibold ${dark ? 'text-white' : 'text-charcoal'}`}>
                          {candidate.firstName} {candidate.lastName}
                        </h3>
                        <p className="mt-1 text-xs text-gray-500">{candidate.designation} · {candidate.city}</p>
                      </div>
                      <span className="font-display text-3xl text-gold-600">{Math.round(match.compatibilityScore)}%</span>
                    </div>
                    <p className="mt-4 line-clamp-2 text-xs leading-5 text-gray-500">{match.aiExplanation}</p>
                    <button
                  onClick={() => {
                    const matchProfile = profiles.find(p => p.id === match.profileB);
                    setPendingMatchId(match.id);
                    setMatchRecipient(profile.email);
                    setMatchSubject(`Introduction: ${matchProfile?.firstName}`);
                    setPersonalRecommendation(`Hi ${profile.firstName},\n\nWe'd like to introduce you to ${matchProfile?.firstName}, a ${matchProfile?.designation} from ${matchProfile?.city} who shares your family values and long-term goals.\n\nLet me know if you would like to proceed with a meeting.`);
                  }}
                  className="btn-gold w-full mt-4"
                >
                  Send Match
                </button>
                  </div>
                </motion.article>
              );
            })}

            {profileMatches.length === 0 && (
              <div className="card-premium p-8 text-center text-sm text-gray-500">
                Curating compatible introductions…
              </div>
            )}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {pendingMatchId && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-lg border border-gold-400/30 bg-[#151513] p-8 text-white"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <CheckCircle2 className="h-7 w-7 text-gold-300" />
              <h2 className="mt-5 font-display text-4xl font-semibold">Prepare introduction</h2>
              <p className="mt-3 text-sm leading-6 text-white/50">
                The private introduction and compatibility summary will be prepared for both clients.
              </p>
              
              <div className="mt-6 space-y-4">
                 <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.16em] text-white/70 mb-2">Recipient</label>
                  <input type="email" value={matchRecipient} onChange={(e) => setMatchRecipient(e.target.value)} className="w-full bg-[#1e1e1a] border border-white/10 text-white p-3 text-sm focus:outline-none focus:border-gold-400" />
                 </div>
                 <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.16em] text-white/70 mb-2">Subject</label>
                  <input type="text" value={matchSubject} onChange={(e) => setMatchSubject(e.target.value)} className="w-full bg-[#1e1e1a] border border-white/10 text-white p-3 text-sm focus:outline-none focus:border-gold-400" />
                 </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.16em] text-white/70 mb-2">
                    Personal Recommendation (Optional)
                  </label>
                  <textarea
                    value={personalRecommendation}
                    onChange={(e) => setPersonalRecommendation(e.target.value)}
                    placeholder="Add a personal note about why you chose this match..."
                    className="w-full bg-[#1e1e1a] border border-white/10 text-white p-3 text-sm resize-none h-24 focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => {
                    setPendingMatchId(null);
                    setPersonalRecommendation('');
                  }}
                  className="flex-1 border border-white/15 px-4 py-3 text-[9px] font-bold uppercase tracking-[0.16em] text-white/60"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    sendMatch(pendingMatchId);
                    setPendingMatchId(null);
                    setPersonalRecommendation('');
                    triggerToast('Introduction sent successfully');
                  }}
                  className="btn-gold flex-1"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PDF Generation Modal */}
      <AnimatePresence>
        {isPdfModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-lg border border-gold-400/30 bg-[#151513] p-8 shadow-2xl relative"
            >
              <h2 className="font-display text-3xl font-semibold text-white">Preview PDF Report</h2>
              <div className="mt-6 aspect-[1/1.3] bg-ivory p-6 text-charcoal flex flex-col items-center justify-center border-4 border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply" />
                <div className="text-center relative z-10">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center border border-gold-500 font-display text-xl text-gold-600 mb-6">
                    DC
                  </div>
                  <h1 className="font-display text-3xl font-bold">{profile.firstName} {profile.lastName}</h1>
                  <p className="text-[10px] uppercase tracking-widest text-gold-600 mt-3 font-bold">Confidential Biodata</p>
                  <div className="h-px w-24 bg-gold-400 mx-auto mt-6 mb-6" />
                  <p className="text-xs text-charcoal/60 max-w-[220px] mx-auto leading-relaxed">
                    This document is prepared exclusively for {currentMatchmaker?.name || 'our Matchmakers'} and approved clients.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => setIsPdfModalOpen(false)}
                  className="flex-1 border border-white/15 px-4 py-3 text-[9px] font-bold uppercase tracking-[0.16em] text-white/60"
                >
                  Close Preview
                </button>
                <button
                  onClick={() => {
                    triggerToast('PDF generated and downloaded successfully.');
                    setIsPdfModalOpen(false);
                  }}
                  className="btn-gold flex-1"
                >
                  Download PDF
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Profile Modal */}
      <AnimatePresence>
        {isShareModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-md border border-gold-400/30 bg-[#151513] p-8 shadow-2xl relative"
            >
              <h2 className="font-display text-3xl font-semibold text-white">Share Profile</h2>
              <p className="mt-2 text-sm text-white/50">Send {profile.firstName}'s profile securely to a client via email.</p>
              
              <div className="mt-6">
                <label className="block text-[10px] font-bold uppercase tracking-[0.16em] text-white/70 mb-2">
                  Client Email Address
                </label>
                <input
                  type="email"
                  value={shareEmail}
                  onChange={(e) => setShareEmail(e.target.value)}
                  placeholder="client@example.com"
                  className="w-full bg-[#1e1e1a] border border-white/10 text-white p-3 text-sm focus:outline-none focus:border-gold-400 placeholder:text-white/20"
                />
              </div>
              
              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => {
                    setIsShareModalOpen(false);
                    setShareEmail('');
                  }}
                  className="flex-1 border border-white/15 px-4 py-3 text-[9px] font-bold uppercase tracking-[0.16em] text-white/60"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if(!shareEmail.trim()) {
                      triggerToast('Please enter a valid email.');
                      return;
                    }
                    triggerToast('Profile sent successfully.');
                    setIsShareModalOpen(false);
                    setShareEmail('');
                  }}
                  className="btn-gold flex-1"
                >
                  Send Profile
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            className="fixed top-24 right-6 bg-[#b28a3c] text-charcoal font-semibold px-6 py-3 rounded-none shadow-lg z-[100] flex items-center gap-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <CheckCircle2 className="h-4 w-4" />
            <span className="text-sm">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
