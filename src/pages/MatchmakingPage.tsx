import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, MapPin, Send, SlidersHorizontal, Sparkles } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useApp } from '../hooks/useApp';
import { profiles } from '../data/profiles';

export default function MatchmakingPage() {
  const { dark } = useTheme();
  const { getMatchesForProfile, matches: allMatches, sendMatch, getProfile } = useApp();
  const [selectedProfileId, setSelectedProfileId] = useState(profiles[0].id);
  const [minimumScore, setMinimumScore] = useState(70);
  const [pendingMatchId, setPendingMatchId] = useState<string | null>(null);

  const selectedProfile = getProfile(selectedProfileId) || profiles[0];

  useEffect(() => {
    getMatchesForProfile(selectedProfileId);
  }, [getMatchesForProfile, selectedProfileId]);

  const matches = allMatches
    .filter((match) => match.profileA === selectedProfileId || match.profileB === selectedProfileId)
    .filter((match) => match.compatibilityScore >= minimumScore);

  return (
    <div className="page-shell">
      <header className="flex flex-col justify-between gap-5 border-b border-black/10 pb-7 lg:flex-row lg:items-end dark:border-white/10">
        <div>
          <span className="page-kicker">Private compatibility atelier</span>
          <h1 className={`editorial-title ${dark ? 'text-white' : 'text-charcoal'}`}>
            Match studio
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-gray-500">
            Human judgment supported by a complete compatibility intelligence model.
          </p>
        </div>
        <div className="w-full max-w-md">
          <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.16em] text-gray-500">
            Active client
          </label>
          <select
            value={selectedProfileId}
            onChange={(event) => setSelectedProfileId(event.target.value)}
            className="input-premium"
          >
            {profiles.map((profile) => (
              <option key={profile.id} value={profile.id}>
                {profile.firstName} {profile.lastName}, {profile.age} · {profile.city}
              </option>
            ))}
          </select>
        </div>
      </header>

      <section className="luxury-panel grid md:grid-cols-[280px_1fr]">
        <div className="relative min-h-[340px] overflow-hidden">
          <img
            src={selectedProfile.photo}
            alt={`${selectedProfile.firstName} ${selectedProfile.lastName}`}
            className="portrait-treatment absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 flex flex-col justify-between p-7 sm:p-10">
          <div>
            <span className="eyebrow">Matching for · {selectedProfile.id.toUpperCase()}</span>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.9] text-white">
              {selectedProfile.firstName}
              <br />
              <em className="text-gold-200">{selectedProfile.lastName}</em>
            </h2>
            <p className="mt-5 text-sm text-white/50">
              {selectedProfile.designation} · {selectedProfile.company}
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm text-gold-200">
              <MapPin className="h-4 w-4" />
              {selectedProfile.city}
            </p>
          </div>

          <div className="mt-8 border-t border-white/15 pt-6">
            <div className="mb-3 flex items-center justify-between">
              <span className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-white/45">
                <SlidersHorizontal className="h-3.5 w-3.5 text-gold-300" />
                Minimum compatibility
              </span>
              <span className="font-display text-2xl text-gold-200">{minimumScore}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="95"
              value={minimumScore}
              onChange={(event) => setMinimumScore(Number(event.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-end justify-between">
          <div>
            <span className="page-kicker">Curated shortlist</span>
            <h2 className={`font-display text-4xl font-semibold ${dark ? 'text-white' : 'text-charcoal'}`}>
              {matches.length} qualified introductions
            </h2>
          </div>
          <Sparkles className="h-5 w-5 text-gold-500" />
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          {matches.map((match, index) => {
            const candidateId = match.profileA === selectedProfileId ? match.profileB : match.profileA;
            const candidate = getProfile(candidateId);
            if (!candidate) return null;

            return (
              <motion.article
                key={match.id}
                className="card-premium grid grid-cols-[120px_1fr] sm:grid-cols-[170px_1fr]"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
              >
                <div className="relative min-h-[290px] overflow-hidden bg-charcoal">
                  <img
                    src={candidate.photo}
                    alt={`${candidate.firstName} ${candidate.lastName}`}
                    className="portrait-treatment h-full w-full object-cover transition duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-[8px] font-bold uppercase tracking-[0.16em] text-gold-200">
                    {candidate.id.toUpperCase()}
                  </span>
                </div>

                <div className="flex flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="eyebrow">{match.matchLevel} match</span>
                      <h3 className={`mt-2 font-display text-3xl font-semibold leading-none ${dark ? 'text-white' : 'text-charcoal'}`}>
                        {candidate.firstName} {candidate.lastName}
                      </h3>
                      <p className="mt-2 text-xs text-gray-500">{candidate.designation} · {candidate.city}</p>
                    </div>
                    <span className="font-display text-3xl text-gold-600">{Math.round(match.compatibilityScore)}%</span>
                  </div>

                  <p className="mt-5 line-clamp-3 text-xs leading-5 text-gray-500">{match.aiExplanation}</p>

                  <div className="mt-5 space-y-2">
                    {match.strengths.slice(0, 2).map((strength) => (
                      <p key={strength} className="flex items-start gap-2 text-[10px] text-gray-500">
                        <CheckCircle2 className="mt-0.5 h-3 w-3 flex-shrink-0 text-gold-500" />
                        {strength}
                      </p>
                    ))}
                  </div>

                  <button
                    onClick={() => setPendingMatchId(match.id)}
                    className="btn-gold mt-auto w-full"
                  >
                    <Send className="mr-2 h-3.5 w-3.5" />
                    Prepare introduction
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>

        {matches.length === 0 && (
          <div className="card-premium p-10 text-center text-sm text-gray-500">
            No introductions meet this threshold. Lower the compatibility minimum to broaden the shortlist.
          </div>
        )}
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
              className="w-full max-w-xl border border-gold-400/30 bg-[#151513] p-8 text-white"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <span className="eyebrow">Private introduction</span>
              <h2 className="mt-4 font-display text-4xl font-semibold">Your note to both clients</h2>
              <textarea
                className="input-premium mt-6 h-28 resize-none"
                defaultValue="I believe this introduction deserves your attention. Your values, ambitions, and approach to family show exceptional alignment."
              />
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setPendingMatchId(null)}
                  className="flex-1 border border-white/15 px-4 py-3 text-[9px] font-bold uppercase tracking-[0.16em] text-white/60"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    sendMatch(pendingMatchId);
                    setPendingMatchId(null);
                  }}
                  className="btn-gold flex-1"
                >
                  Send privately
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
