import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import SocialSidebar from './components/SocialSidebar';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Join from './pages/Join';
import NotFound from './pages/NotFound';

function App() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const appRef = useRef(null);

  // Handle cursor movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Set up global hover detection for interactive elements
  useEffect(() => {
    if (!appRef.current) return;

    const interactiveElements = appRef.current.querySelectorAll('a, button, .interactive');
    
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [location]);

  // Handle language change
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
    
    // Animation for language change
    gsap.fromTo(
      '.language-change-flash',
      { opacity: 0.8, scale: 1 },
      { opacity: 0, scale: 1.5, duration: 0.6, ease: 'power2.out' }
    );
  };

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className="app" ref={appRef}>
      <Header changeLanguage={changeLanguage} />
      <div className="language-change-flash"></div>
      <CustomCursor position={cursorPosition} isHovering={isHovering} />
      <SocialSidebar />
      
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/join" element={<Join />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
}

export default App; 