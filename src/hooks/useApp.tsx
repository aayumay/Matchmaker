import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from 'react';
import type { Profile, Match, Notification } from '../types';
import { profiles } from '../data/profiles';
import { notifications as notifData } from '../data/dashboard';
import { findMatchesForProfile } from '../utils/matching';

interface AppContextType {
  profiles: Profile[];
  matches: Match[];
  notifications: Notification[];
  isLoggedIn: boolean;
  sidebarOpen: boolean;
  currentMatchmaker: {
    name: string;
    email: string;
    photo: string;
    role: string;
  };
  unreadCount: number;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, photo?: string) => void;
  logout: () => void;
  toggleSidebar: () => void;
  getProfile: (id: string) => Profile | undefined;
  getMatchesForProfile: (id: string) => Match[];
  sendMatch: (matchId: string) => void;
  markNotificationRead: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>(notifData);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentMatchmaker, setCurrentMatchmaker] = useState({
    name: 'Priya Sharma',
    email: 'priya@thedatecrew.com',
    photo: '',
    role: 'Senior Matchmaker'
  });
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(
    () => typeof window === 'undefined' || window.innerWidth >= 768
  );
  const matchesFetched = useRef<Set<string>>(new Set());

  useEffect(() => {
    const authStatus = localStorage.getItem('dc-auth');
    if (authStatus === 'true') {
      setIsLoggedIn(true);
      const savedData = localStorage.getItem('dc-matchmaker');
      if (savedData) {
        try {
          setCurrentMatchmaker(JSON.parse(savedData));
        } catch (e) {
          // fallback to default
        }
      }
    }
  }, []);

  const login = useCallback((email: string, password: string) => {
    void email;
    void password;
    setIsLoggedIn(true);
    localStorage.setItem('dc-auth', 'true');
    // Read from local storage if exists
    const savedData = localStorage.getItem('dc-matchmaker');
    if (savedData) {
      try {
        setCurrentMatchmaker(JSON.parse(savedData));
      } catch (e) { }
    }
  }, []);

  const register = useCallback((name: string, email: string, photo?: string) => {
    const newData = { name, email, photo: photo || '', role: 'Matchmaker' };
    setCurrentMatchmaker(newData);
    localStorage.setItem('dc-matchmaker', JSON.stringify(newData));
    setIsLoggedIn(true);
    localStorage.setItem('dc-auth', 'true');
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    localStorage.removeItem('dc-auth');
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const getProfile = useCallback(
    (id: string): Profile | undefined => {
      return profiles.find((p) => p.id === id);
    },
    []
  );

  const getMatchesForProfile = useCallback(
    (id: string): Match[] => {
      const existing = matches.filter(
        (m) => m.profileA === id || m.profileB === id
      );
      if (existing.length > 0) return existing;

      if (matchesFetched.current.has(id)) return matches.filter(
        (m) => m.profileA === id || m.profileB === id
      );

      const profile = profiles.find((p) => p.id === id);
      if (!profile) return [];

      const newMatches = findMatchesForProfile(profile, profiles, 10);
      matchesFetched.current.add(id);
      setMatches((prev) => [...prev, ...newMatches]);
      return newMatches;
    },
    [matches]
  );

  const sendMatch = useCallback((matchId: string) => {
    setMatches((prev) =>
      prev.map((m) =>
        m.id === matchId
          ? { ...m, status: 'Sent' as const, sentDate: new Date().toISOString() }
          : m
      )
    );
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        profiles, matches, notifications,
        isLoggedIn, sidebarOpen, currentMatchmaker, unreadCount,
        login, register, logout, toggleSidebar,
        getProfile, getMatchesForProfile, sendMatch, markNotificationRead,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
