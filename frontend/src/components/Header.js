import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { FiUser, FiLogIn, FiLogOut, FiSettings, FiUsers } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import UnifiedLoginModal from './UnifiedLoginModal';

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
    flex-wrap: wrap;
    gap: 1rem;
    
    @media (max-width: 1024px) {
      gap: 0.5rem;
    }
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
    gap: 1.5rem;
    flex: 1;
    justify-content: flex-end;
    
    @media (max-width: 1024px) {
      gap: 0.8rem;
    }
  }

  .nav-links {
    display: flex;
    gap: 1.2rem;
    
    @media (max-width: 1024px) {
      gap: 0.8rem;
    }
    
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
    
    .mobile-login-button {
      background: linear-gradient(135deg, var(--primary), var(--accent));
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 12px;
      font-size: 1.2rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      min-width: 200px;
      justify-content: center;
      
      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 25px rgba(224, 43, 32, 0.3);
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
    gap: 0.5rem;
  }

  .auth-section {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-left: 0.5rem;
    
    @media (max-width: 1024px) {
      gap: 0.5rem;
      margin-left: 0.25rem;
    }
    
    @media (max-width: 768px) {
      display: none;
    }
  }

  .login-button {
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    font-size: 0.85rem;
    white-space: nowrap;
    background: linear-gradient(135deg, var(--primary), var(--accent));
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(224, 43, 32, 0.3);
    }
    
    span {
      font-size: inherit;
      font-weight: inherit;
    }
  }

  .user-menu {
    position: relative;
    
    .user-button {
      background: rgba(224, 43, 32, 0.1);
      color: var(--primary);
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 500;
      font-size: 0.9rem;
      
      &:hover {
        background: rgba(224, 43, 32, 0.2);
      }
    }
    
    .dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      margin-top: 0.5rem;
      background: white;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
      border: 1px solid rgba(224, 43, 32, 0.1);
      min-width: 200px;
      overflow: hidden;
      z-index: 1000;
      
      [data-theme="dark"] & {
        background: var(--background-secondary);
        border-color: rgba(255, 255, 255, 0.1);
      }
      
      .dropdown-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
        color: var(--text);
        cursor: pointer;
        transition: all 0.3s ease;
        border: none;
        background: none;
        width: 100%;
        text-align: left;
        font-size: 0.9rem;
        
        &:hover {
          background: rgba(224, 43, 32, 0.05);
          color: var(--primary);
        }
        
        &.danger {
          color: #ef4444;
          
          &:hover {
            background: rgba(239, 68, 68, 0.05);
          }
        }
      }
    }
  }
`;

const Header = ({ changeLanguage, theme, toggleTheme }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    isAuthenticated,
    user,
    hasPermission,
    logout
  } = useAuth();
  
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
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

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('.user-menu')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu]);
  
  const navLinks = [
    { path: '/', label: t('header.home') },
    { path: '/about', label: t('header.about') },
    { path: '/team', label: t('header.team') },
    { path: '/events', label: t('header.events') },
    { path: '/join', label: t('header.join') }
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

  const handleLoginSuccess = (response) => {
    setShowLoginModal(false);
    
    // 根据用户权限进行适当的跳转
    if (response.user.hasProfile) {
      navigate('/staff/profile');
    } else if (hasPermission('accessAdmin')) {
      navigate('/admin/events');
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };
  
  return (
    <StyledHeader className={scrolled ? 'scrolled' : ''}>
      <div className="container">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="UTChinese Network Logo" />
          <h1>
            UTChinese Network
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
                {label}
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
            
            <button className="theme-toggle" onClick={toggleTheme} aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
              <ThemeToggleIcon theme={theme} />
            </button>
          </div>

          <div className="auth-section">
            {isAuthenticated ? (
              <div className="user-menu">
                <button 
                  className="user-button"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <FiUser />
                  {user?.username || 'User'}
                </button>
                
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      className="dropdown"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {hasPermission('manageEvents') && (
                        <button 
                          className="dropdown-item"
                          onClick={() => {
                            navigate('/admin/events');
                            setShowUserMenu(false);
                          }}
                        >
                          <FiSettings />
                          {t('header.eventManagement')}
                        </button>
                      )}
                      
                      {(hasPermission('manageStaff') || hasPermission('reviewProfiles')) && (
                        <button 
                          className="dropdown-item"
                          onClick={() => {
                            navigate('/admin/staff');
                            setShowUserMenu(false);
                          }}
                        >
                          <FiUsers />
                          {t('header.staffManagement')}
                        </button>
                      )}
                      
                      <button 
                        className="dropdown-item"
                        onClick={() => {
                          navigate('/staff/profile');
                          setShowUserMenu(false);
                        }}
                      >
                        <FiUser />
                        {t('header.myProfile')}
                      </button>
                      
                      <button 
                        className="dropdown-item danger"
                        onClick={handleLogout}
                      >
                        <FiLogOut />
                        {t('header.logout')}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button 
                className="login-button unified-login"
                onClick={() => setShowLoginModal(true)}
              >
                <FiLogIn />
                <span>{t('header.login')}</span>
              </button>
            )}
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
                  {label}
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
            
            {/* Mobile Login/User Menu */}
            {isAuthenticated ? (
              <motion.div
                className="mobile-user-section"
                custom={navLinks.length + 2}
                variants={linkVariants}
                                 style={{
                   display: 'flex',
                   flexDirection: 'column',
                   gap: '1rem',
                   padding: '1rem',
                   background: 'var(--card-bg, rgba(224, 43, 32, 0.05))',
                   borderRadius: '15px',
                   border: '1px solid rgba(224, 43, 32, 0.1)',
                   boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                 }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: 'var(--primary)'
                }}>
                  <FiUser />
                  {user?.username || 'User'}
                </div>
                
                {hasPermission('manageEvents') && (
                  <Link 
                    to="/admin/events"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '1rem',
                      color: 'var(--text)',
                      textDecoration: 'none'
                    }}
                  >
                    <FiSettings />
                    {t('header.eventManagement')}
                  </Link>
                )}
                
                {(hasPermission('manageStaff') || hasPermission('reviewProfiles')) && (
                  <Link 
                    to="/admin/staff"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '1rem',
                      color: 'var(--text)',
                      textDecoration: 'none'
                    }}
                  >
                    <FiUsers />
                    {t('header.staffManagement')}
                  </Link>
                )}
                
                <Link 
                  to="/staff/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '1rem',
                    color: 'var(--text)',
                    textDecoration: 'none'
                  }}
                >
                  <FiUser />
                  {t('header.myProfile')}
                </Link>
                
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '1rem',
                    color: '#dc2626',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.5rem 0',
                    textAlign: 'left'
                  }}
                >
                  <FiLogOut />
                  {t('header.logout')}
                </button>
              </motion.div>
            ) : (
              <motion.button
                className="mobile-login-button"
                custom={navLinks.length + 2}
                variants={linkVariants}
                onClick={() => {
                  setShowLoginModal(true);
                  setMobileMenuOpen(false);
                }}
              >
                <FiLogIn />
                {t('header.login')}
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <UnifiedLoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
      />
    </StyledHeader>
  );
};

export default Header; 