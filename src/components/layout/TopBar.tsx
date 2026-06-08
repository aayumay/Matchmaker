import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Sun, Moon, Bell, LogOut, Search, Command } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useApp } from '../../hooks/useApp';
import { notifications } from '../../data/dashboard';

export default function TopBar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const { dark, toggle } = useTheme();
  const { sidebarOpen, toggleSidebar, unreadCount, logout } = useApp();
  const location = useLocation();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPageTitle = () => {
    const paths: Record<string, string> = {
      '/': 'Private Overview',
      '/clients': 'Client Portfolio',
      '/matchmaking': 'Match Studio',
      '/insights': 'Relationship Intelligence',
      '/calendar': 'Calendar',
      '/notes': 'Private Notes',
      '/settings': 'Settings',
    };
    return paths[location.pathname] || 'The Date Crew';
  };

  return (
    <div
      className={`app-topbar fixed right-0 top-0 z-20 flex h-[72px] items-center justify-between border-b px-4 backdrop-blur-xl sm:px-6 lg:px-10 ${
        dark ? 'border-white/10 bg-[#11110f]/90' : 'border-black/10 bg-[#f4f0e8]/90'
      }`}
      data-collapsed={!sidebarOpen}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-5">
        <button
          onClick={toggleSidebar}
          className="icon-button flex-shrink-0"
          aria-label="Toggle navigation"
        >
          <Menu className="h-4 w-4" />
        </button>
        <div className="min-w-0">
          <p className="hidden text-[9px] font-bold uppercase tracking-[0.24em] text-gold-600 sm:block">
            The Date Crew
          </p>
          <h2 className={`truncate font-display text-xl font-semibold leading-none sm:text-2xl ${dark ? 'text-white' : 'text-charcoal'}`}>
            {getPageTitle()}
          </h2>
        </div>
      </div>

      <div className="hidden w-full max-w-xs items-center gap-3 border-b border-black/15 px-1 py-2 lg:flex dark:border-white/15">
        <Search className="h-4 w-4 text-gold-500" />
        <input
          type="search"
          placeholder="Search clients, notes, matches"
          className="w-full bg-transparent text-xs outline-none placeholder:text-gray-400"
        />
        <span className="flex items-center gap-1 text-[10px] text-gray-400">
          <Command className="h-3 w-3" />K
        </span>
      </div>

      <div className="ml-3 flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={toggle}
          className="icon-button"
          aria-label="Toggle color theme"
        >
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <div className="relative" ref={notificationRef}>
          <button 
            className="icon-button relative" 
            aria-label="Notifications"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute right-0.5 top-0.5 h-2 w-2 rounded-full border border-ivory bg-gold-500" />
            )}
          </button>
          
          {showNotifications && (
            <div className={`absolute right-0 mt-2 w-80 rounded-lg border shadow-xl ${dark ? 'border-white/10 bg-[#151513]' : 'border-black/10 bg-white'}`}>
              <div className={`flex items-center justify-between border-b p-4 ${dark ? 'border-white/10' : 'border-black/10'}`}>
                <h3 className="font-semibold">Notifications</h3>
                <span className="text-xs text-gold-500 cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {notifications.map((notif) => (
                  <div key={notif.id} className={`p-4 border-b last:border-0 ${dark ? 'border-white/5 hover:bg-white/5' : 'border-black/5 hover:bg-black/5'} ${!notif.read ? (dark ? 'bg-white/[0.02]' : 'bg-black/[0.02]') : ''}`}>
                    <p className="text-xs font-semibold mb-1">{notif.title}</p>
                    <p className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{notif.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={logout}
          className="icon-button hidden sm:inline-flex"
          aria-label="Log out"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
