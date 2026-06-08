import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { useApp } from '../../hooks/useApp';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import BottomNav from './BottomNav';

export default function AppLayout() {
  const { dark } = useTheme();
  const { sidebarOpen, toggleSidebar } = useApp();

  return (
    <div className={dark ? 'dark' : ''}>
      <div className={`min-h-screen ${dark ? 'bg-[#11110f] text-white' : 'bg-ivory text-charcoal'}`}>
        <Sidebar />
        <TopBar />

        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-black/65 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
          />
        )}

        <motion.main
          className="app-main min-h-screen"
          data-collapsed={!sidebarOpen}
        >
          <div className="mx-auto max-w-[1500px] px-4 pb-24 sm:px-6 lg:px-10 md:pb-10">
            <Outlet />
          </div>
        </motion.main>
        <BottomNav />
      </div>
    </div>
  );
}
