import React, { useEffect, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import styled from 'styled-components';

const CursorWrapper = styled.div`
  pointer-events: none;
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const MainCursor = styled(animated.div)`
  position: absolute;
  width: 12px;
  height: 12px;
  background-color: var(--primary, #e62b18);
  border-radius: 50%;
  pointer-events: none;
  transform-origin: center;
  z-index: 9999;
  mix-blend-mode: difference;
`;

const FollowerCursor = styled(animated.div)`
  position: absolute;
  width: 40px;
  height: 40px;
  border: 1px solid var(--primary, #e62b18);
  border-radius: 50%;
  pointer-events: none;
  transform-origin: center;
  z-index: 9998;
`;

const CustomCursor = ({ position, isHovering }) => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  // Spring animation for the main cursor
  const cursorSpring = useSpring({
    transform: `translate3d(${position.x - 6}px, ${position.y - 6}px, 0) scale(${isHovering ? 1.2 : 1})`,
    config: { mass: 0.2, tension: 400, friction: 20 }
  });

  // Spring animation for the follower cursor
  const followerSpring = useSpring({
    transform: `translate3d(${position.x - 20}px, ${position.y - 20}px, 0) scale(${isHovering ? 1.8 : 1})`,
    opacity: isHovering ? 0.8 : 0.6,
    config: { mass: 0.5, tension: 200, friction: 30 }
  });

  // Hide default cursor when component mounts
  useEffect(() => {
    document.body.style.cursor = 'none';

    // Check if we're on a mobile device
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    if (isMobile) {
      // Show regular cursor on mobile
      document.body.style.cursor = 'auto';
      
      if (cursorRef.current) cursorRef.current.style.display = 'none';
      if (followerRef.current) followerRef.current.style.display = 'none';
    }

    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <CursorWrapper>
      <MainCursor
        ref={cursorRef}
        style={cursorSpring}
      />
      <FollowerCursor
        ref={followerRef}
        style={followerSpring}
      />
    </CursorWrapper>
  );
};

export default CustomCursor; 