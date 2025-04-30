import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledFooter = styled.footer`
  padding: 4rem 0;
  background: var(--background-alt);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, 
      rgba(0, 0, 0, 0), 
      rgba(224, 43, 32, 0.3), 
      rgba(0, 0, 0, 0)
    );
  }
  
  .footer-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2.5rem;
  }
  
  .footer-logo {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    
    img {
      height: 3rem;
    }
    
    h3 {
      font-size: 1.5rem;
      margin: 0;
    }
  }
  
  .footer-section {
    h4 {
      margin-bottom: 1.2rem;
      font-size: 1.2rem;
      position: relative;
      display: inline-block;
      
      &:after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 40px;
        height: 2px;
        background: var(--primary);
      }
    }
    
    .footer-links {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      
      a {
        color: var(--text);
        transition: color 0.3s ease, transform 0.3s ease;
        display: inline-block;
        position: relative;
        
        &:hover {
          color: var(--primary);
          transform: translateX(5px);
        }
      }
    }
    
    .social-links {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
      
      a {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: var(--secondary-light);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--background);
        transition: all 0.3s ease;
        
        &:hover {
          background: var(--primary);
          transform: translateY(-3px);
        }
      }
    }
  }
  
  .footer-bottom {
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    text-align: center;
    font-size: 0.9rem;
    color: var(--text-light);
  }
  
  .address {
    margin-bottom: 1rem;
    line-height: 1.6;
  }
  
  @media (max-width: 768px) {
    .footer-container {
      grid-template-columns: 1fr;
    }
  }
`;

const Footer = () => {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  const footerAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };
  
  return (
    <StyledFooter>
      <div className="container">
        <div className="footer-container">
          <motion.div 
            className="footer-section"
            variants={footerAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <div className="footer-logo">
              <img src="/logo.png" alt="UTChinese Network Logo" />
              <h3>{i18n.language === 'en' ? 'UTChinese Network' : '多大中文'}</h3>
            </div>
            <p className="address">
              {t('contact.address')}
            </p>
            <p>{t('contact.email')}: utchinese.network@studentorg.utoronto.ca</p>
          </motion.div>
          
          <motion.div 
            className="footer-section"
            variants={footerAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
          >
            <h4>{t('header.about')}</h4>
            <div className="footer-links">
              <a href="/about">{t('about.title')}</a>
              <a href="/events">{t('header.events')}</a>
              <a href="/join">{t('header.join')}</a>
            </div>
          </motion.div>
          
          <motion.div 
            className="footer-section"
            variants={footerAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
          >
            <h4>{t('contact.title')}</h4>
            <div className="footer-links">
              <a href="https://www.xiaohongshu.com/user/profile/60f77b270000000001004627" target="_blank" rel="noopener noreferrer">
                {t('contact.xiaohongshu')}
              </a>
              <a href="https://www.instagram.com/utchinesenetwork/" target="_blank" rel="noopener noreferrer">
                {t('contact.instagram')}
              </a>
              <a href="https://www.linkedin.com/company/utchinese-magazine/" target="_blank" rel="noopener noreferrer">
                {t('contact.linkedin')}
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                {t('contact.wechat')}
              </a>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="footer-bottom"
          variants={footerAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={3}
        >
          <p>&copy; {currentYear} UTChinese Network. All rights reserved.</p>
        </motion.div>
      </div>
    </StyledFooter>
  );
};

export default Footer; 