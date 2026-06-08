import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutGrid, Users, HeartHandshake, BrainCircuit, CalendarDays, NotebookPen, Settings } from 'lucide-react';
import { useApp } from '../../hooks/useApp';

export default function Sidebar() {
  const { sidebarOpen, currentMatchmaker, toggleSidebar } = useApp();

  const navItems = [
    { path: '/', label: 'Overview', icon: LayoutGrid },
    { path: '/clients', label: 'Clients', icon: Users },
    { path: '/matchmaking', label: 'Match Studio', icon: HeartHandshake },
    { path: '/insights', label: 'Intelligence', icon: BrainCircuit },
    { path: '/calendar', label: 'Calendar', icon: CalendarDays },
    { path: '/notes', label: 'Private Notes', icon: NotebookPen },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <motion.div
      className={`fixed left-0 top-0 z-40 flex h-screen flex-col overflow-hidden border-r border-gold-400/20 bg-[#11110f] text-white shadow-2xl transition-transform duration-300 md:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      animate={{ width: sidebarOpen ? 280 : 88 }}
      initial={{ width: 280 }}
    >
      <div className="flex h-[88px] items-center gap-3 border-b border-white/10 px-5">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center border border-gold-400/70 bg-gold-400/5">
          <span className="font-display text-2xl font-semibold text-gold-300">DC</span>
        </div>
        {sidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-w-0">
            <p className="font-display text-xl font-semibold leading-none tracking-wide text-white">
              The Date Crew
            </p>
            <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.3em] text-gold-400">
              Private Office
            </p>
          </motion.div>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-8">
        {sidebarOpen && (
          <p className="mb-4 px-3 text-[9px] font-bold uppercase tracking-[0.28em] text-white/35">
            Concierge suite
          </p>
        )}
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => {
                if (window.innerWidth < 768 && sidebarOpen) toggleSidebar();
              }}
              className={({ isActive }) =>
                `group relative flex items-center gap-4 px-3 py-3.5 transition-all duration-200 ${
                  isActive
                    ? 'bg-white/[0.07] text-gold-200'
                    : 'text-white/55 hover:bg-white/[0.04] hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={`absolute left-0 top-1/2 h-7 w-px -translate-y-1/2 bg-gold-400 transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                  <Icon className={`h-[18px] w-[18px] flex-shrink-0 ${isActive ? 'text-gold-300' : 'text-white/45 group-hover:text-gold-300'}`} strokeWidth={1.5} />
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="whitespace-nowrap text-[12px] font-semibold uppercase tracking-[0.12em]"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 border border-white/10 bg-white/[0.035] p-3">
          {currentMatchmaker?.photo ? (
            <img 
              src={currentMatchmaker.photo} 
              alt={currentMatchmaker.name || 'Matchmaker'}
              className="relative h-9 w-9 flex-shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gold-300 font-display text-lg font-bold text-charcoal">
              {(currentMatchmaker?.name || 'MM').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#11110f] bg-emerald-400" />
            </div>
          )}
          {sidebarOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-white">
                {currentMatchmaker?.name || 'Matchmaker'}
              </p>
              <p className="mt-0.5 text-[9px] uppercase tracking-[0.16em] text-gold-400">
                {currentMatchmaker?.role || 'Senior matchmaker'}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
