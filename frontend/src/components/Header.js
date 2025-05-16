import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const ThemeToggleIcon = ({ theme }) => {
  return theme === 'light' ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  padding: 1.2rem 0;
  backdrop-filter: blur(10px);
  transition: background-color 0.3s ease, padding 0.3s ease;
  
  &.scrolled {
    background-color: rgba(255, 255, 255, 0.85);
    padding: 0.8rem 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }

  [data-theme="dark"] &.scrolled {
    background-color: rgba(12, 12, 12, 0.85);
  }
  
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    z-index: 101;
    
    img {
      height: 2.5rem;
      transition: height 0.3s ease;
    }
    
    h1 {
      font-size: 1.3rem;
      margin: 0;
      white-space: nowrap;
      font-weight: 600;
    }
  }

  nav {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .nav-links {
    display: flex;
    gap: 1.2rem;
    
    @media (max-width: 768px) {
      display: none;
    }
  }
  
  .nav-link {
    color: var(--text);
    font-weight: 500;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      display: block;
      margin-top: 2px;
      right: 0;
      background: var(--primary);
      transition: width 0.3s ease;
    }
    
    &:hover:after, &.active:after {
      width: 100%;
      left: 0;
      right: auto;
    }
  }

  .mobile-menu-btn {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    cursor: pointer;
    z-index: 101;
    
    span {
      display: block;
      width: 30px;
      height: 2px;
      margin-bottom: 5px;
      position: relative;
      background: var(--text);
      border-radius: 3px;
      z-index: 1;
      transform-origin: center;
      transition: transform 0.3s cubic-bezier(0.77, 0.2, 0.05, 1.0),
                  background 0.3s cubic-bezier(0.77, 0.2, 0.05, 1.0),
                  opacity 0.3s ease;
    }
    
    &.open span:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }
    
    &.open span:nth-child(2) {
      opacity: 0;
    }
    
    &.open span:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }
    
    @media (max-width: 768px) {
      display: flex;
    }
  }

  .mobile-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    background: var(--background);
    z-index: 100;
    padding: 2rem;
    
    a {
      font-size: 2rem;
      font-weight: 600;
      color: var(--text);
      position: relative;
      transition: color 0.3s ease;
      
      &:after {
        content: '';
        position: absolute;
        width: 0;
        height: 3px;
        display: block;
        margin-top: 5px;
        right: 0;
        background: var(--primary);
        transition: width 0.3s ease;
      }
      
      &:hover {
        color: var(--primary);
        
        &:after {
          width: 100%;
          left: 0;
          right: auto;
        }
      }
    }
  }

  .language-switch {
    position: relative;
    display: flex;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.04);
    border-radius: 24px;
    padding: 3px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    
    [data-theme="dark"] & {
      background-color: rgba(255, 255, 255, 0.07);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }
    
    &::before {
      content: '';
      position: absolute;
      width: 50%;
      height: calc(100% - 6px);
      border-radius: 20px;
      background: linear-gradient(45deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7));
      top: 3px;
      z-index: 0;
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
      
      [data-theme="dark"] & {
        background: linear-gradient(45deg, rgba(50,50,50,0.9), rgba(40,40,40,0.7));
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
      }
    }
    
    &.en::before {
      transform: translateX(0);
    }
    
    &.zh::before {
      transform: translateX(100%);
    }
    
    button {
      background: none;
      border: none;
      padding: 6px 10px;
      font-size: 0.85rem;
      letter-spacing: 0.3px;
      cursor: pointer;
      border-radius: 20px;
      color: var(--text-secondary);
      transition: all 0.3s ease;
      position: relative;
      z-index: 1;
      flex: 1;
      text-align: center;
      min-width: 35px;
      white-space: nowrap;
      display: flex;
      justify-content: center;
      align-items: center;
      
      &.active {
        font-weight: 600;
        color: var(--text);
        transform: scale(1.05);
      }
      
      &:hover:not(.active) {
        color: var(--text);
      }
      
      &:active {
        transform: scale(0.95);
      }
    }
    
    .divider {
      width: 1px;
      height: 1rem;
      background-color: rgba(0, 0, 0, 0.1);
      margin: 0 1px;
      z-index: 1;
      
      [data-theme="dark"] & {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  }

  .theme-toggle {
    margin-left: 5px;
    padding: 8px;
    background: none;
    border: none;
    color: var(--text);
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
      transform: rotate(15deg);
    }
    
    &:active {
      transform: scale(0.9);
    }
    
    [data-theme="dark"] &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    
    svg {
      transition: transform 0.5s ease;
    }
    
    &:hover svg {
      transform: rotate(30deg);
    }
  }
  
  .controls-group {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const Header = ({ changeLanguage, theme, toggleTheme }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);
  
  const navLinks = [
    { path: '/', label: 'home' },
    { path: '/about', label: 'about' },
    { path: '/events', label: 'events' },
    { path: '/join', label: 'join' }
  ];
  
  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        y: { stiffness: 1000 }
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        y: { stiffness: 1000, velocity: -100 }
      }
    }
  };
  
  const linkVariants = {
    closed: { y: 50, opacity: 0 },
    open: i => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        y: { stiffness: 1000, velocity: -100 }
      }
    })
  };
  
  return (
    <StyledHeader className={scrolled ? 'scrolled' : ''}>
      <div className="container">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="UTChinese Network Logo" />
          <h1>
            {i18n.language === 'en' ? 'UTChinese Network' : '多大中文'}
          </h1>
        </Link>
        
        <nav>
          <div className="nav-links">
            {navLinks.map(({ path, label }) => (
              <Link 
                key={path} 
                to={path} 
                className={`nav-link ${location.pathname === path ? 'active' : ''}`}
              >
                {t(`header.${label}`)}
              </Link>
            ))}
          </div>
          
          <div className="controls-group">
            <div className={`language-switch ${i18n.language}`}>
              <button 
                className={i18n.language === 'en' ? 'active' : ''} 
                onClick={() => changeLanguage('en')}
              >
                EN
              </button>
              <div className="divider"></div>
              <button 
                className={i18n.language === 'zh' ? 'active' : ''} 
                onClick={() => changeLanguage('zh')}
              >
                中文
              </button>
            </div>
            
            <button className="theme-toggle" onClick={toggleTheme} aria-label={theme === 'light' ? t('header.darkMode') : t('header.lightMode')}>
              <ThemeToggleIcon theme={theme} />
            </button>
          </div>
          
          <div 
            className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
      </div>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            {navLinks.map(({ path, label }, i) => (
              <motion.div
                key={path}
                custom={i}
                variants={linkVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <Link to={path}>
                  {t(`header.${label}`)}
                </Link>
              </motion.div>
            ))}
            
            <motion.div 
              className={`language-switch ${i18n.language}`}
              custom={navLinks.length}
              variants={linkVariants}
            >
              <button 
                className={i18n.language === 'en' ? 'active' : ''} 
                onClick={() => changeLanguage('en')}
              >
                EN
              </button>
              <div className="divider"></div>
              <button 
                className={i18n.language === 'zh' ? 'active' : ''} 
                onClick={() => changeLanguage('zh')}
              >
                中文
              </button>
            </motion.div>
            
            <motion.button 
              className="theme-toggle"
              custom={navLinks.length + 1}
              variants={linkVariants}
              onClick={toggleTheme}
            >
              {theme === 'light' ? t('header.darkMode') : t('header.lightMode')}
              <ThemeToggleIcon theme={theme} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </StyledHeader>
  );
};

export default Header; 