import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

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
`;

const Header = ({ changeLanguage }) => {
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
          
          <div className="language-switch">
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
              className="language-switch"
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
          </motion.div>
        )}
      </AnimatePresence>
    </StyledHeader>
  );
};

export default Header; 