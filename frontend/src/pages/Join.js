import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StyledJoin = styled.div`
  .join-header {
    min-height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: var(--gradient-2);
    color: white;
    padding: 8rem 0 6rem;
    overflow: hidden;
    
    .floating-shapes {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      
      .shape {
        position: absolute;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 20%;
        animation: float 15s infinite linear;
      }
      
      .shape:nth-child(1) {
        width: 150px;
        height: 150px;
        top: 10%;
        left: 10%;
        animation-delay: 0s;
        animation-duration: 25s;
      }
      
      .shape:nth-child(2) {
        width: 100px;
        height: 100px;
        top: 20%;
        right: 20%;
        animation-delay: -5s;
        animation-duration: 20s;
      }
      
      .shape:nth-child(3) {
        width: 200px;
        height: 200px;
        bottom: 15%;
        left: 15%;
        animation-delay: -10s;
        animation-duration: 30s;
      }
      
      .shape:nth-child(4) {
        width: 80px;
        height: 80px;
        bottom: 10%;
        right: 10%;
        animation-delay: -15s;
        animation-duration: 18s;
      }
    }
    
    @keyframes float {
      0% {
        transform: translate(0, 0) rotate(0deg);
      }
      25% {
        transform: translate(10%, 10%) rotate(90deg);
      }
      50% {
        transform: translate(5%, 20%) rotate(180deg);
      }
      75% {
        transform: translate(-10%, 10%) rotate(270deg);
      }
      100% {
        transform: translate(0, 0) rotate(360deg);
      }
    }
    
    .container {
      position: relative;
      z-index: 2;
      text-align: center;
      max-width: 1000px;
    }
    
    h1 {
      font-size: clamp(2.5rem, 8vw, 5rem);
      margin-bottom: 1.5rem;
      line-height: 1.2;
      text-wrap: balance;
      
      @media (max-width: 768px) and (min-width: 481px) {
        line-height: 1.15;
      }
      @media (max-width: 480px) {
        font-size: clamp(2rem, 10vw, 3rem);
        line-height: 1.2;
      }
    }
    
    p {
      font-size: clamp(1.1rem, 3vw, 1.5rem);
      margin-bottom: 2.5rem;
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
      opacity: 0.9;
    }
    
    .button {
      background: white;
      color: var(--primary);
      font-weight: 600;
      padding: 1rem 2.5rem;
      font-size: 1.1rem;
      
      &:hover {
        background: var(--accent);
        color: var(--primary-dark);
      }
    }
  }
  
  .groups-section {
    padding: 8rem 0;
    position: relative;
    
    .section-heading {
      text-align: center;
      margin-bottom: 5rem;
      
      h2 {
        font-size: clamp(2rem, 4vw, 3rem);
        margin-bottom: 1rem;
      }
      
      p {
        max-width: 800px;
        margin: 0 auto 2rem;
        color: var(--text-light);
        font-size: 1.1rem;
      }
    }
  }
  
  .tab-navigation {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 3rem;
    
    .tab-button {
      padding: 0.8rem 1.5rem;
      background: var(--background-alt);
      border: none;
      border-radius: var(--border-radius);
      font-size: 1rem;
      font-weight: 500;
      color: var(--text);
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: var(--primary);
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.3s ease;
      }
      
      &:hover {
        background: var(--background);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        
        &:after {
          transform: scaleX(0.3);
          transform-origin: left;
        }
      }
      
      &.active {
        background: var(--background);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        
        &:after {
          transform: scaleX(1);
          transform-origin: left;
        }
      }
    }
  }
  
  .group-content {
    opacity: 0;
    height: 0;
    overflow: hidden;
    transition: opacity 0.5s ease;
    
    &.active {
      opacity: 1;
      height: auto;
      overflow: visible;
    }
  }
  
  .group-card {
    background: var(--background);
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    margin-bottom: 3rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    
    @media (max-width: 992px) {
      grid-template-columns: 1fr;
    }
    
    .group-image {
      height: 100%;
      min-height: 400px;
      background-size: cover;
      background-position: center;
      position: relative;
      
      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
      }
      
      @media (max-width: 992px) {
        min-height: 300px;
      }
    }
    
    .group-details {
      padding: 3rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      
      h3 {
        font-size: 1.8rem;
        margin-bottom: 1.2rem;
        color: var(--primary);
      }
      
      p {
        margin-bottom: 1.5rem;
        color: var(--text-light);
      }
      
      ul {
        list-style-type: none;
        padding: 0;
        margin-bottom: 2rem;
        
        li {
          margin-bottom: 0.8rem;
          padding-left: 1.5rem;
          position: relative;
          
          &:before {
            content: '•';
            color: var(--primary);
            position: absolute;
            left: 0;
            font-size: 1.5rem;
            line-height: 1;
          }
        }
      }
    }
  }
  
  .subgroup-card {
    background: var(--background);
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    margin-bottom: 2rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    }
    
    .subgroup-header {
      padding: 1.5rem;
      background: var(--primary);
      color: white;
      
      h4 {
        margin: 0;
        font-size: 1.4rem;
      }
    }
    
    .subgroup-content {
      padding: 1.5rem;
      
      p {
        color: var(--text-light);
        margin-bottom: 1.5rem;
      }
    }
  }
  
  .join-cta {
    padding: 8rem 0;
    background: var(--background-alt);
    text-align: center;
    
    h2 {
      font-size: clamp(2rem, 4vw, 3rem);
      margin-bottom: 1.5rem;
    }
    
    p {
      max-width: 700px;
      margin: 0 auto 2.5rem;
      color: var(--text-light);
      font-size: 1.1rem;
    }
    
    .form-container {
      max-width: 800px;
      margin: 0 auto;
      background: var(--background);
      border-radius: 10px;
      padding: 2.5rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);

      .google-form-container {
        text-align: center;
        
        h3 {
          font-size: 1.6rem;
          margin-bottom: 1rem;
          color: var(--primary);
        }
        
        p {
          margin-bottom: 1.5rem;
        }
        
        .google-form-button {
          display: inline-block;
          margin-bottom: 2rem;
          padding: 1rem 2rem;
          font-weight: 600;
          transition: all 0.3s ease;
          
          &:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(224, 43, 32, 0.2);
          }
        }
        
        .iframe-container {
          position: relative;
          overflow: hidden;
          padding-top: 20px;
          
          iframe {
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            border-radius: 5px;
          }
        }
      }
    }
  }
`;

const JoinPage = () => {
  const { t } = useTranslation();
  const sectionRefs = useRef([]);
  const groupsSectionRef = useRef(null);
  const [activeGroup, setActiveGroup] = useState('arts');
  const { hash } = window.location;
  
  useEffect(() => {
    // 处理URL锚点，设置活动选项卡
    if (hash) {
      const groupId = hash.replace('#', '');
      if (['arts', 'career', 'operation', 'support'].includes(groupId)) {
        setActiveGroup(groupId);
        
        // 确保在元素渲染后滚动
        const checkAndScroll = () => {
          const groupsSection = groupsSectionRef.current;
          if (groupsSection) {
            groupsSection.scrollIntoView({ behavior: 'smooth' });
          } else {
            setTimeout(checkAndScroll, 100);
          }
        };
        checkAndScroll();
      }
    }
  }, [hash]);
  
  // 仅在组件加载时设置一次性的ScrollTrigger动画（标题和按钮）
  useEffect(() => {
    const headingElements = document.querySelectorAll('.groups-section .section-heading .animated-element, .groups-section .tab-navigation.animated-element');
    if (headingElements.length > 0) {
      gsap.fromTo(
        headingElements,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: groupsSectionRef.current, // 使用ref作为触发器
            start: 'top 85%', // 调整触发点
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }, []); // 空依赖数组，确保只运行一次
  
  // 仅处理活动选项卡内容区域的动画
  useEffect(() => {
    const playActiveGroupAnimations = () => {
      const activeElements = document.querySelectorAll(`#${activeGroup} .group-card.animated-element, #${activeGroup} .subgroup-card.animated-element`);
      
      if (activeElements.length === 0) return;

      // 先重置
      gsap.set(activeElements, { y: 50, opacity: 0 });
      
      // 应用动画
      gsap.fromTo(
        activeElements,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          // 不需要ScrollTrigger，因为我们希望它在选项卡激活时立即播放
        }
      );
    };

    // 等待DOM更新和可能的CSS过渡完成
    setTimeout(playActiveGroupAnimations, 50);

  }, [activeGroup]); // 依赖activeGroup，选项卡切换时触发
  
  const groups = [
    {
      id: 'arts',
      title: t('groups.arts.title'),
      description: t('groups.arts.description'),
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      requirements: [
        t('join.arts.req1'),
        t('join.arts.req2'),
        t('join.arts.req3')
      ]
    },
    {
      id: 'career',
      title: t('groups.career.title'),
      description: t('groups.career.description'),
      image: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      requirements: [
        t('join.career.req1'),
        t('join.career.req2'),
        t('join.career.req3'),
        t('join.career.req4'),
        t('join.career.req5')
      ],
      subgroups: [
        {
          title: t('join.career.subgroup1.title'),
          description: t('join.career.subgroup1.description')
        },
        {
          title: t('join.career.subgroup2.title'),
          description: t('join.career.subgroup2.description')
        },
        {
          title: t('join.career.subgroup3.title'),
          description: t('join.career.subgroup3.description')
        }
      ]
    },
    {
      id: 'operation',
      title: t('groups.operation.title'),
      description: t('groups.operation.description'),
      image: 'https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      requirements: [
        t('join.operation.req1'),
        t('join.operation.req2'),
        t('join.operation.req3')
      ],
      subgroups: [
        {
          title: t('join.operation.subgroup1.title'),
          description: t('join.operation.subgroup1.description')
        },
        {
          title: t('join.operation.subgroup2.title'),
          description: t('join.operation.subgroup2.description')
        },
        {
          title: t('join.operation.subgroup3.title'),
          description: t('join.operation.subgroup3.description')
        }
      ]
    },
    {
      id: 'support',
      title: t('groups.support.title'),
      description: t('groups.support.description'),
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      requirements: [
        t('join.support.req1'),
        t('join.support.req2'),
        t('join.support.req3'),
        t('join.support.req4')
      ],
      subgroups: [
        {
          title: t('join.support.subgroup1.title'),
          description: t('join.support.subgroup1.description')
        },
        {
          title: t('join.support.subgroup2.title'),
          description: t('join.support.subgroup2.description')
        }
      ]
    }
  ];
  
  return (
    <StyledJoin>
      {/* Header Section */}
      <section className="join-header">
        <div className="floating-shapes">
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
        
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t('join.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('join.intro')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSd3q_33MfwIt0BLxrI4uUgeN1y397OuVtv80FSXjhus9wavfQ/viewform" 
              target="_blank"
              rel="noopener noreferrer"
              className="button"
            >
              {t('join.form.openForm')}
            </a>
          </motion.div>
        </div>
      </section>
      
      {/* Groups Section */}
      <section 
        className="groups-section"
        ref={groupsSectionRef}
      >
        <div className="container">
          <div className="section-heading">
            <h2 className="animated-element">{t('groups.overview.title')}</h2>
            <p className="animated-element">
              {t('groups.overview.description')}
            </p>
            <p className="animated-element" style={{ marginTop: '1rem' }}>
              {t('join.requirements')}
            </p>
          </div>
          
          <div className="tab-navigation animated-element">
            {groups.map(group => (
              <button
                key={group.id}
                className={`tab-button ${activeGroup === group.id ? 'active' : ''}`}
                onClick={() => setActiveGroup(group.id)}
              >
                {group.title}
              </button>
            ))}
          </div>
          
          {groups.map(group => (
            <div 
              key={group.id}
              id={group.id}
              className={`group-content ${activeGroup === group.id ? 'active' : ''}`}
            >
              <div className="group-card animated-element">
                <div 
                  className="group-image" 
                  style={{ backgroundImage: `url(${group.image})` }}
                ></div>
                <div className="group-details">
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                  
                  <h4>{t('join.welcomeMembers')}</h4>
                  <ul>
                    {group.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {group.subgroups && (
                <div className="subgroups">
                  {group.subgroups.map((subgroup, index) => (
                    <div className="subgroup-card animated-element" key={index}>
                      <div className="subgroup-header">
                        <h4>{subgroup.title}</h4>
                      </div>
                      <div className="subgroup-content">
                        <p>{subgroup.description}</p>
                        <a 
                          href="https://docs.google.com/forms/d/e/1FAIpQLSd3q_33MfwIt0BLxrI4uUgeN1y397OuVtv80FSXjhus9wavfQ/viewform" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="button secondary"
                        >
                          {t('join.form.openForm')}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      
      {/* Join CTA Section */}
      <section 
        id="join-form"
        className="join-cta"
      >
        <div className="container">
          <h2 className="animated-element">Join Our Team</h2>
          <p className="animated-element">
            {t('join.requirements')}
          </p>
          
          <div className="form-container animated-element">
            <div className="google-form-container">
              <h3>{t('join.form.title')}</h3>
              <p>{t('join.form.description')}</p>
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSd3q_33MfwIt0BLxrI4uUgeN1y397OuVtv80FSXjhus9wavfQ/viewform" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="button google-form-button"
              >
                {t('join.form.openForm')}
              </a>
              <div className="iframe-container">
                <iframe 
                  src="https://docs.google.com/forms/d/e/1FAIpQLSd3q_33MfwIt0BLxrI4uUgeN1y397OuVtv80FSXjhus9wavfQ/viewform?embedded=true" 
                  width="100%" 
                  height="600" 
                  frameBorder="0" 
                  marginHeight="0" 
                  marginWidth="0"
                  title="UTChinese Application Form"
                >
                  Loading…
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </StyledJoin>
  );
};

export default JoinPage; 