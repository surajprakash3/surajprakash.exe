import { useEffect } from 'react';
import { useOutlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { trackPageView } from '../services/analyticsService';

const Layout = () => {
  const location = useLocation();

  // Track page views for analytics
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow pt-16 selection:bg-accent-200 selection:text-accent-900 dark:selection:bg-accent-800 dark:selection:text-accent-50 relative overflow-x-hidden">
        <div className="w-full h-full min-h-screen">
          {useOutlet()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
