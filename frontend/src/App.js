import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';



// Components
import Header from './components/Header';
import Footer from './components/Footer';
import SocialSidebar from './components/SocialSidebar';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Join = lazy(() => import('./pages/Join'));
const QinSociety = lazy(() => import('./pages/QinSociety'));
const NYConcert = lazy(() => import('./pages/NYConcert'));
const NotFound = lazy(() => import('./pages/NotFound'));


// Loading component
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
  </div>
);

function App() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const appRef = useRef(null);
  const [theme, setTheme] = useState('light');

  // Handle language change
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
    
    // Animation for language change
    const flashElement = document.querySelector('.language-change-flash');
    if (flashElement) {
      gsap.fromTo(
        flashElement,
        { opacity: 0.8, scale: 1 },
        { opacity: 0, scale: 1.5, duration: 0.6, ease: 'power2.out' }
      );
    }
  };

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  useEffect(() => {
    // Apply theme to document element
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Toggle theme between light and dark
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Animation for theme change
    const flashElement = document.querySelector('.theme-change-flash');
    if (flashElement) {
      gsap.fromTo(
        flashElement,
        { opacity: 0.5, scale: 1 },
        { opacity: 0, scale: 1.5, duration: 0.6, ease: 'power2.out' }
      );
    }
  };

  return (
    <div className="app" ref={appRef}>
      <Header changeLanguage={changeLanguage} theme={theme} toggleTheme={toggleTheme} />
      <div className="language-change-flash"></div>
      <div className="theme-change-flash"></div>
      <SocialSidebar />
      
      <main>
        <AnimatePresence mode="wait">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/join" element={<Join />} />
              <Route path="/qin-society" element={<QinSociety />} />
              <Route path="/ny-concert" element={<NYConcert />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
}

export default App; 