import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Activity,
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  HeartHandshake,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import {
  weeklyMatchData,
  stageDistribution,
  notifications as notifData,
} from '../data/dashboard';
import { profiles } from '../data/profiles';

const metrics = [
  { label: 'Private clients', value: '247', change: '+12.5%', icon: Users },
  { label: 'Introductions', value: '18', change: '+15.2%', icon: HeartHandshake },
  { label: 'Success rate', value: '78.4%', change: '+4.7%', icon: Target },
  { label: 'Appointments', value: '12', change: 'This week', icon: CalendarDays },
];

export default function DashboardPage() {
  const { dark } = useTheme();
  const navigate = useNavigate();
  const featuredProfiles = profiles.slice(0, 2);
  const today = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date());

  return (
    <div className="page-shell">
      <header className="flex flex-col justify-between gap-5 border-b border-black/10 pb-7 sm:flex-row sm:items-end dark:border-white/10">
        <div>
          <span className="page-kicker">{today} · Private desk</span>
          <h1 className={`editorial-title max-w-3xl ${dark ? 'text-white' : 'text-charcoal'}`}>
            Relationship intelligence,
            <br />
            <em className="font-medium text-gold-600">refined by instinct.</em>
          </h1>
        </div>
        <button onClick={() => navigate('/matchmaking')} className="btn-gold self-start sm:self-auto">
          Open match studio
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </button>
      </header>

      <section className="grid gap-5 xl:grid-cols-[1.45fr_0.55fr]">
        <motion.div
          className="luxury-panel min-h-[390px] p-7 sm:p-10"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="relative z-10 flex h-full flex-col">
            <div className="flex items-center justify-between">
              <span className="eyebrow">Curated introduction · 001</span>
              <span className="border border-gold-400/40 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-gold-300">
                96% aligned
              </span>
            </div>

            <div className="mt-9 grid flex-1 gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
              <div>
                <div className="mb-5 flex -space-x-5">
                  {featuredProfiles.map((profile, index) => (
                    <div
                      key={profile.id}
                      className="relative h-24 w-20 overflow-hidden border-2 border-[#11110f] bg-neutral-800"
                      style={{ zIndex: 2 - index }}
                    >
                      <img
                        src={profile.photo}
                        alt={`${profile.firstName} ${profile.lastName}`}
                        className="portrait-treatment h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="eyebrow mb-3">Today’s signature pairing</p>
                <h2 className="font-display text-5xl font-semibold leading-[0.88] text-white sm:text-6xl">
                  Arun
                  <span className="mx-2 font-light text-gold-400">&</span>
                  Priya
                </h2>
                <p className="mt-5 max-w-md text-sm leading-6 text-white/55">
                  Shared ambition, complementary family values, and a strong lifestyle fit create an unusually balanced introduction.
                </p>
              </div>

              <div className="grid grid-cols-2 border border-white/10">
                {[
                  ['Values', '98'],
                  ['Lifestyle', '94'],
                  ['Family', '96'],
                  ['Vision', '93'],
                ].map(([label, value], index) => (
                  <div
                    key={label}
                    className={`p-4 ${index % 2 === 0 ? 'border-r border-white/10' : ''} ${
                      index < 2 ? 'border-b border-white/10' : ''
                    }`}
                  >
                    <p className="text-[9px] uppercase tracking-[0.2em] text-white/35">{label}</p>
                    <p className="mt-2 font-display text-3xl text-gold-300">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => navigate('/matchmaking')}
              className="mt-8 flex items-center justify-between border-t border-gold-400/30 pt-5 text-left"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold-300">
                Review the full compatibility dossier
              </span>
              <ChevronRight className="h-4 w-4 text-gold-300" />
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-px border border-black/10 bg-black/10 dark:border-white/10 dark:bg-white/10 xl:grid-cols-1">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                className={`group bg-[#fbfaf6] p-5 transition-colors hover:bg-white dark:bg-[#181816] dark:hover:bg-[#1d1d1a] ${
                  index === metrics.length - 1 ? 'col-span-2 xl:col-span-1' : ''
                }`}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <div className="flex items-start justify-between">
                  <Icon className="h-4 w-4 text-gold-500" strokeWidth={1.5} />
                  <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">
                    {metric.change}
                  </span>
                </div>
                <p className={`mt-5 font-display text-4xl font-semibold ${dark ? 'text-white' : 'text-charcoal'}`}>
                  {metric.value}
                </p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500">
                  {metric.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="card-premium p-6 sm:p-8">
          <div className="mb-7 flex items-end justify-between">
            <div>
              <span className="eyebrow">Introduction performance</span>
              <h2 className={`mt-2 font-display text-3xl font-semibold ${dark ? 'text-white' : 'text-charcoal'}`}>
                Weekly momentum
              </h2>
            </div>
            <span className="text-xs text-gray-500">Last 7 days</span>
          </div>
          <ResponsiveContainer width="100%" height={270}>
            <AreaChart data={weeklyMatchData}>
              <defs>
                <linearGradient id="luxuryMatches" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#B28A3C" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#B28A3C" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke={dark ? '#2b2b27' : '#e4ded2'} />
              <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#8b8378', fontSize: 10 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8b8378', fontSize: 10 }} />
              <Tooltip
                contentStyle={{
                  background: dark ? '#181816' : '#fffdf8',
                  border: '1px solid #b28a3c',
                  borderRadius: 0,
                  fontSize: 12,
                }}
              />
              <Area
                type="monotone"
                dataKey="matches"
                stroke="#B28A3C"
                strokeWidth={2}
                fill="url(#luxuryMatches)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card-premium p-6 sm:p-8">
          <span className="eyebrow">Portfolio status</span>
          <h2 className={`mt-2 font-display text-3xl font-semibold ${dark ? 'text-white' : 'text-charcoal'}`}>
            Client journey
          </h2>
          <div className="relative mt-4 h-[190px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stageDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={58}
                  outerRadius={78}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {stageDistribution.map((_, index) => (
                    <Cell key={index} fill={['#B28A3C', '#1A1A18', '#D9CCB2'][index % 3]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className={`font-display text-3xl font-semibold ${dark ? 'text-white' : 'text-charcoal'}`}>247</span>
              <span className="text-[9px] uppercase tracking-[0.18em] text-gray-500">clients</span>
            </div>
          </div>
          <div className="space-y-2">
            {stageDistribution.slice(0, 3).map((stage, index) => (
              <div key={stage.name} className="flex items-center justify-between border-b border-black/5 pb-2 text-xs dark:border-white/5">
                <span className="flex items-center gap-2 text-gray-500">
                  <span className="h-1.5 w-1.5" style={{ background: ['#B28A3C', '#1A1A18', '#D9CCB2'][index] }} />
                  {stage.name}
                </span>
                <span className={dark ? 'text-white' : 'text-charcoal'}>{stage.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="card-premium p-6 sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <span className="eyebrow">Concierge log</span>
            <h2 className={`mt-2 flex items-center gap-3 font-display text-3xl font-semibold ${dark ? 'text-white' : 'text-charcoal'}`}>
              <Activity className="h-5 w-5 text-gold-500" />
              Recent activity
            </h2>
          </div>
          <Sparkles className="h-5 w-5 text-gold-500" />
        </div>
        <div className="grid gap-px bg-black/10 dark:bg-white/10 md:grid-cols-2 xl:grid-cols-4">
          {notifData.slice(0, 4).map((notif, index) => (
            <div key={notif.id || index} className="bg-[#fbfaf6] p-5 dark:bg-[#181816]">
              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-gold-600">
                0{index + 1}
              </span>
              <p className={`mt-4 text-sm leading-6 ${dark ? 'text-gray-300' : 'text-charcoal'}`}>{notif.message}</p>
              <p className="mt-4 text-[10px] uppercase tracking-[0.14em] text-gray-400">
                {new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(notif.createdAt))}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
