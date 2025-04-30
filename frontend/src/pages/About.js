import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StyledAbout = styled.div`
  .page-header {
    height: 70vh;
    background: linear-gradient(135deg, rgba(224, 43, 32, 0.05) 0%, rgba(252, 185, 0, 0.1) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
    overflow: hidden;
    padding-top: 5rem;
    
    .header-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      
      &:after {
        content: '';
        position: absolute;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: var(--primary);
        opacity: 0.05;
        top: 10%;
        right: -100px;
        filter: blur(50px);
      }
      
      &:before {
        content: '';
        position: absolute;
        width: 400px;
        height: 400px;
        border-radius: 50%;
        background: var(--accent);
        opacity: 0.05;
        bottom: -100px;
        left: -100px;
        filter: blur(60px);
      }
    }
    
    .header-content {
      position: relative;
      z-index: 1;
      max-width: 900px;
      padding: 0 2rem;
    }
    
    h1 {
      font-size: clamp(3rem, 8vw, 5rem);
      margin-bottom: 1.5rem;
      position: relative;
      display: inline-block;
      
      &:after {
        content: '';
        position: absolute;
        bottom: -0.3rem;
        left: 50%;
        transform: translateX(-50%);
        width: 100px;
        height: 5px;
        background: var(--primary);
        border-radius: 2px;
      }
    }
    
    p {
      font-size: clamp(1.2rem, 3vw, 1.6rem);
      color: var(--text-light);
      max-width: 800px;
      margin: 0 auto;
    }
  }
  
  .story-section {
    padding: 8rem 0;
    position: relative;
    
    .container {
      max-width: 1000px;
    }
  }
  
  .story-timeline {
    position: relative;
    padding: 3rem 0;
    
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 2px;
      height: 100%;
      background: rgba(224, 43, 32, 0.1);
      z-index: 0;
    }
  }
  
  .timeline-item {
    display: flex;
    margin-bottom: 5rem;
    position: relative;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    &:nth-child(odd) {
      justify-content: flex-start;
      
      .timeline-content {
        margin-left: 2rem;
        
        &:before {
          left: -0.75rem;
        }
      }
    }
    
    &:nth-child(even) {
      justify-content: flex-end;
      
      .timeline-content {
        margin-right: 2rem;
        text-align: right;
        
        &:before {
          right: -0.75rem;
        }
      }
    }
    
    .timeline-dot {
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--primary);
      z-index: 1;
    }
    
    .timeline-content {
      width: 45%;
      padding: 2rem;
      background: var(--background);
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
      position: relative;
      
      &:before {
        content: '';
        position: absolute;
        top: 0.75rem;
        width: 20px;
        height: 20px;
        background: var(--background);
        transform: rotate(45deg);
      }
      
      h3 {
        margin-bottom: 1rem;
        color: var(--primary);
        font-size: 1.4rem;
      }
      
      p {
        margin-bottom: 0;
        color: var(--text-light);
      }
    }
    
    @media (max-width: 768px) {
      flex-direction: column;
      margin-bottom: 3rem;
      
      .timeline-dot {
        left: 0;
        top: 0.75rem;
      }
      
      &:before {
        left: 9px;
      }
      
      &:nth-child(odd), &:nth-child(even) {
        justify-content: flex-start;
        
        .timeline-content {
          width: 100%;
          margin-left: 2rem;
          margin-right: 0;
          text-align: left;
          
          &:before {
            left: -0.75rem;
            right: auto;
          }
        }
      }
    }
  }
  
  .quote-section {
    padding: 8rem 0;
    background: var(--background-alt);
    text-align: center;
    position: relative;
    overflow: hidden;
    
    &:before, &:after {
      content: '"';
      position: absolute;
      font-family: var(--font-display);
      font-size: 20rem;
      opacity: 0.03;
      color: var(--primary);
    }
    
    &:before {
      top: -5rem;
      left: 2rem;
    }
    
    &:after {
      bottom: -12rem;
      right: 2rem;
      transform: rotate(180deg);
    }
    
    .container {
      position: relative;
      z-index: 1;
      max-width: 900px;
    }
    
    .quote {
      font-size: clamp(1.5rem, 3vw, 2rem);
      line-height: 1.6;
      font-weight: 500;
      color: var(--text);
      margin-bottom: 2rem;
      font-style: italic;
    }
    
    .author {
      display: inline-block;
      font-size: 1.2rem;
      color: var(--primary);
      position: relative;
      
      &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: -4rem;
        width: 3rem;
        height: 2px;
        background: var(--primary);
        opacity: 0.3;
      }
      
      &:after {
        content: '';
        position: absolute;
        top: 50%;
        right: -4rem;
        width: 3rem;
        height: 2px;
        background: var(--primary);
        opacity: 0.3;
      }
    }
  }
  
  .values-section {
    padding: 8rem 0;
    
    .section-heading {
      text-align: center;
      margin-bottom: 4rem;
      
      h2 {
        font-size: clamp(2rem, 4vw, 3rem);
        margin-bottom: 1rem;
      }
      
      p {
        max-width: 600px;
        margin: 0 auto;
        color: var(--text-light);
      }
    }
    
    .values-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
    
    .value-card {
      padding: 2rem;
      border-radius: 10px;
      background: var(--background);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
      text-align: center;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      
      &:hover {
        transform: translateY(-10px);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
      }
      
      .value-icon {
        width: 80px;
        height: 80px;
        margin: 0 auto 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(224, 43, 32, 0.1);
        border-radius: 50%;
        color: var(--primary);
        font-size: 2rem;
      }
      
      h3 {
        margin-bottom: 1rem;
        font-size: 1.4rem;
      }
      
      p {
        color: var(--text-light);
        margin-bottom: 0;
      }
    }
  }
`;

const AboutPage = () => {
  const { t } = useTranslation();
  const sectionRefs = useRef([]);
  
  useEffect(() => {
    // Scroll animations
    sectionRefs.current.forEach((section) => {
      if (!section) return;
      
      gsap.fromTo(
        section.querySelectorAll('.animated-element'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
    
    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        { 
          opacity: 0,
          x: index % 2 === 0 ? -50 : 50
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'top 60%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }, []);
  
  const stories = [
    { title: t('about.story1'), content: t('about.story1') },
    { title: t('about.story2'), content: t('about.story2') },
    { title: t('about.story3'), content: t('about.story3') },
    { title: t('about.story4'), content: t('about.story4') },
    { title: t('about.story5'), content: t('about.story5') }
  ];
  
  const values = [
    {
      title: "Cultural Exchange",
      description: "Fostering mutual understanding between Chinese and Western cultures.",
      icon: "🌏"
    },
    {
      title: "Commitment",
      description: "Dedicated to excellence in everything we do.",
      icon: "🔥"
    },
    {
      title: "Innovation",
      description: "Constantly exploring new ideas and approaches.",
      icon: "💡"
    }
  ];
  
  return (
    <StyledAbout>
      {/* Header Section */}
      <section className="page-header">
        <div className="header-bg"></div>
        <div className="header-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t('about.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('about.story1')}
          </motion.p>
        </div>
      </section>
      
      {/* Story Timeline Section */}
      <section 
        className="story-section"
        ref={el => sectionRefs.current[0] = el}
      >
        <div className="container">
          <div className="story-timeline">
            {stories.map((story, index) => (
              <div className="timeline-item" key={index}>
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h3>Chapter {index + 1}</h3>
                  <p>{story.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Quote Section */}
      <section 
        className="quote-section"
        ref={el => sectionRefs.current[1] = el}
      >
        <div className="container">
          <div className="quote animated-element">
            "We're not a prestigious club - just a group of perfectionists who never compromise on the things we love."
          </div>
          <div className="author animated-element">UTChinese Network</div>
        </div>
      </section>
      
      {/* Values Section */}
      <section 
        className="values-section"
        ref={el => sectionRefs.current[2] = el}
      >
        <div className="container">
          <div className="section-heading">
            <h2 className="animated-element">Our Values</h2>
            <p className="animated-element">The core principles that drive everything we do at UTChinese Network.</p>
          </div>
          
          <div className="values-grid">
            {values.map((value, index) => (
              <div className="value-card animated-element" key={index}>
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </StyledAbout>
  );
};

export default AboutPage; 