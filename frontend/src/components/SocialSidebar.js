import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaWeixin, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { SiXiaohongshu } from 'react-icons/si';

const SidebarContainer = styled(motion.div)`
  position: fixed;
  right: 2rem;
  bottom: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &::after {
    content: '';
    width: 1px;
    height: 90px;
    background-color: rgba(230, 57, 70, 0.6);
    margin-top: 15px;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const IconLink = styled(motion.a)`
  background: linear-gradient(135deg, #ff3e5f, #e63946);
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(230, 57, 70, 0.3);
  
  &:hover {
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 4px 15px rgba(230, 57, 70, 0.5);
    background: linear-gradient(135deg, #e63946, #ff3e5f);
  }
`;

const socialVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 1,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 10 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24
    }
  }
};

const SocialSidebar = () => {
  return (
    <SidebarContainer
      initial="hidden"
      animate="visible"
      variants={socialVariants}
    >
      <IconLink 
        href="https://www.instagram.com/utchinesenetwork/" 
        target="_blank"
        rel="noopener noreferrer"
        variants={itemVariants}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaInstagram />
      </IconLink>
      
      <IconLink 
        href="https://www.linkedin.com/company/utchinese-magazine/" 
        target="_blank"
        rel="noopener noreferrer"
        variants={itemVariants}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaLinkedinIn />
      </IconLink>
      
      <IconLink 
        href="https://www.xiaohongshu.com/user/profile/60f77b270000000001004627" 
        target="_blank"
        rel="noopener noreferrer"
        variants={itemVariants}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.95 }}
      >
        <SiXiaohongshu />
      </IconLink>
      
      <IconLink 
        variants={itemVariants}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => alert('微信公众号：搜索"多大中文"')}
      >
        <FaWeixin />
      </IconLink>
    </SidebarContainer>
  );
};

export default SocialSidebar; 