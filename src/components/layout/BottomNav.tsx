import { NavLink } from 'react-router-dom';
import { LayoutGrid, Users, HeartHandshake, BrainCircuit } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export default function BottomNav() {
  const { dark } = useTheme();

  const navItems = [
    { path: '/', label: 'Overview', icon: LayoutGrid },
    { path: '/clients', label: 'Clients', icon: Users },
    { path: '/matchmaking', label: 'Studio', icon: HeartHandshake },
    { path: '/insights', label: 'Insights', icon: BrainCircuit },
  ];

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t pb-safe pt-2 md:hidden ${
        dark
          ? 'border-white/10 bg-[#11110f]/90 backdrop-blur-xl'
          : 'border-black/10 bg-[#f4f0e8]/90 backdrop-blur-xl'
      }`}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 w-full py-2 transition-colors ${
                isActive
                  ? 'text-gold-500'
                  : dark
                    ? 'text-white/50 hover:text-white/80'
                    : 'text-charcoal/50 hover:text-charcoal/80'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={`h-5 w-5 ${isActive ? 'text-gold-500' : ''}`} strokeWidth={1.5} />
                <span className="text-[10px] font-medium tracking-wide">
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}
