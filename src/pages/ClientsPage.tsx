import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Search, MapPin, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { getStageBadge } from '../utils/matching';
import { profiles } from '../data/profiles';

interface FilterState {
  search: string;
  stage: string;
  gender: string;
  city: string;
  sortBy: string;
}

function StageBadge({ stage }: { stage: string }) {
  const badge = getStageBadge(stage);
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.12em] ${badge.bg} ${badge.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${badge.dot}`} />
      {stage}
    </span>
  );
}

export default function ClientsPage() {
  const { dark } = useTheme();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    stage: '',
    gender: '',
    city: '',
    sortBy: 'recent',
  });

  const filteredProfiles = useMemo(() => {
    let result = [...profiles];

    if (filters.search) {
      result = result.filter((p) =>
        `${p.firstName} ${p.lastName}`.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.stage) {
      result = result.filter((p) => p.stage === filters.stage);
    }

    if (filters.gender) {
      result = result.filter((p) => p.gender === filters.gender);
    }

    if (filters.city) {
      result = result.filter((p) => p.city === filters.city);
    }

    if (filters.sortBy === 'name') {
      result.sort((a, b) =>
        `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
      );
    }

    return result;
  }, [filters]);

  const stages = ['Discovery', 'Preferences Collected', 'Match Review', 'Meeting Scheduled', 'Family Discussion', 'Success Journey'];
  const cities = Array.from(new Set(profiles.map((p) => p.city)));

  return (
    <div className="page-shell">
      <div className="flex flex-col justify-between gap-5 border-b border-black/10 pb-7 sm:flex-row sm:items-end dark:border-white/10">
        <div>
          <span className="page-kicker">Confidential portfolio</span>
          <h1 className={`editorial-title ${dark ? 'text-white' : 'text-charcoal'}`}>
            Private clients
          </h1>
          <p className={`mt-3 text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
            {filteredProfiles.length} active profiles under private management
          </p>
        </div>
        <button className="btn-gold self-start sm:self-auto">
          <Plus className="mr-2 h-4 w-4" />
          New client
        </button>
      </div>

      <div className="card-premium p-5">
        <div className="mb-4 flex items-center justify-between">
          <span className="eyebrow">Refine portfolio</span>
          <span className="text-[10px] uppercase tracking-[0.14em] text-gray-400">Private index · {filteredProfiles.length}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className={`mb-2 block text-[9px] font-bold uppercase tracking-[0.16em] ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-4 h-4 w-4 text-gold-500" />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                placeholder="Name or ID..."
                className="input-premium pl-10 w-full"
              />
            </div>
          </div>

          <div>
            <label className={`mb-2 block text-[9px] font-bold uppercase tracking-[0.16em] ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
              Stage
            </label>
            <select
              value={filters.stage}
              onChange={(e) => setFilters({ ...filters, stage: e.target.value })}
              className="input-premium w-full"
            >
              <option value="">All Stages</option>
              {stages.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={`mb-2 block text-[9px] font-bold uppercase tracking-[0.16em] ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
              Gender
            </label>
            <select
              value={filters.gender}
              onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
              className="input-premium w-full"
            >
              <option value="">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label className={`mb-2 block text-[9px] font-bold uppercase tracking-[0.16em] ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
              City
            </label>
            <select
              value={filters.city}
              onChange={(e) => setFilters({ ...filters, city: e.target.value })}
              className="input-premium w-full"
            >
              <option value="">All Cities</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={`mb-2 block text-[9px] font-bold uppercase tracking-[0.16em] ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              className="input-premium w-full"
            >
              <option value="recent">Recently Added</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {filteredProfiles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProfiles.map((profile, index) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigate(`/clients/${profile.id}`)}
              className="card-premium group cursor-pointer"
            >
              <div className="relative h-72 overflow-hidden bg-charcoal">
                <img
                  src={profile.photo}
                  alt={`${profile.firstName} ${profile.lastName}`}
                  className="portrait-treatment h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/10" />
                <div className="absolute left-4 top-4 border border-gold-300/60 bg-black/35 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.18em] text-gold-200 backdrop-blur">
                  Private · {profile.id.toUpperCase()}
                </div>
                <div className="absolute right-4 top-4">
                  <CheckCircle2 className="h-5 w-5 text-gold-200" />
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="font-display text-3xl font-semibold leading-none">
                    {profile.firstName} {profile.lastName}, {profile.age}
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-white/60">
                    {profile.designation} · {profile.company}
                  </p>
                </div>
              </div>

              <div className="space-y-4 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs">
                    <MapPin className="h-3.5 w-3.5 text-gold-500" />
                    <span className={dark ? 'text-gray-400' : 'text-gray-600'}>
                    {profile.city}
                  </span>
                  </div>
                  <StageBadge stage={profile.stage} />
                </div>

                <p className="border-t border-black/10 pt-4 text-[10px] uppercase tracking-[0.13em] text-gray-500 dark:border-white/10">
                  Matchmaker: {profile.matchmaker}
                </p>

                <div className="flex gap-2">
                  <button className="flex-1 border border-black/15 px-3 py-2.5 text-[9px] font-bold uppercase tracking-[0.14em] transition-colors hover:border-gold-400 dark:border-white/15">
                    Dossier
                  </button>
                  <button className="flex flex-1 items-center justify-center gap-2 bg-charcoal px-3 py-2.5 text-[9px] font-bold uppercase tracking-[0.14em] text-gold-200 dark:bg-gold-400 dark:text-charcoal">
                    Matches
                    <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div
          className={`text-center py-12 rounded-lg ${
            dark ? 'bg-gray-800' : 'bg-gold-50'
          }`}
        >
          <p className={dark ? 'text-gray-400' : 'text-gray-600'}>
            No clients found. Try adjusting your filters.
          </p>
        </div>
      )}
    </div>
  );
}
