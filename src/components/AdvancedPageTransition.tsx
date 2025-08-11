import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTransition } from '../contexts/TransitionContext';
import { getActiveTheme } from '../config/TransitionConfig';

interface ElementBounds {
  x: number;
  y: number;
  width: number;
  height: number;
  borderRadius: string;
  background: string;
  backdropFilter: string;
  border: string;
  boxShadow: string;
}

const AdvancedPageTransition: React.FC = () => {
  const { transitionState, completeTransition } = useTransition();
  const [elementBounds, setElementBounds] = useState<ElementBounds | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [sourceElement, setSourceElement] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();
  const animationRef = useRef<number>();
  const theme = getActiveTheme();

  useEffect(() => {
    if (transitionState.isTransitioning && transitionState.sourceElement) {
      const element = transitionState.sourceElement;
      
      // Capture the exact bounds and styles of the source element
      const rect = element.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(element);
      
      setElementBounds({
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
        borderRadius: computedStyle.borderRadius || theme.borderRadius.initial,
        background: theme.styleOverrides?.background || computedStyle.background || 'rgba(255, 255, 255, 0.05)',
        backdropFilter: theme.styleOverrides?.backdropFilter || computedStyle.backdropFilter || 'blur(12px)',
        border: theme.styleOverrides?.border || computedStyle.border || '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: theme.styleOverrides?.boxShadow || computedStyle.boxShadow || 'none'
      });
      
      setSourceElement(element);
      setIsAnimating(true);
      
      // Hide the source element to create seamless morphing effect
      const originalVisibility = element.style.visibility;
      const originalOpacity = element.style.opacity;
      element.style.visibility = 'hidden';
      element.style.opacity = '0';
      
      // Navigate after animation completes
      animationRef.current = setTimeout(() => {
        navigate(transitionState.targetRoute);
        setTimeout(() => {
          // Restore source element visibility
          element.style.visibility = originalVisibility;
          element.style.opacity = originalOpacity;
          
          setIsAnimating(false);
          setSourceElement(null);
          completeTransition();
        }, 100);
      }, theme.duration);
    }

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
      // Restore source element if component unmounts during transition
      if (sourceElement) {
        sourceElement.style.visibility = '';
        sourceElement.style.opacity = '';
      }
    };
  }, [transitionState, navigate, completeTransition, sourceElement]);

  if (!transitionState.isTransitioning || !elementBounds) {
    return null;
  }

  return (
    <AnimatePresence>
      {isAnimating && (
        <>
          {/* Main expanding overlay */}
          <motion.div
            initial={{
              position: 'fixed',
              left: elementBounds.x,
              top: elementBounds.y,
              width: elementBounds.width,
              height: elementBounds.height,
              borderRadius: elementBounds.borderRadius,
              zIndex: 9999,
            }}
            animate={{
              left: 0,
              top: 0,
              width: '100vw',
              height: '100vh',
              borderRadius: theme.borderRadius.final,
            }}
            transition={{
              duration: theme.duration / 1000,
              ease: theme.easing,
              borderRadius: { duration: theme.borderRadius.duration / 1000 }
            }}
            style={{
              background: elementBounds.background,
              backdropFilter: elementBounds.backdropFilter,
              border: elementBounds.border,
              boxShadow: elementBounds.boxShadow,
            }}
          />
          
          {/* Content fade overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="fixed inset-0 bg-blue-900/20 backdrop-blur-md z-9998"
          />
          
          {/* Morphing content preview */}
          <motion.div
            initial={{
              position: 'fixed',
              left: elementBounds.x + 20,
              top: elementBounds.y + 20,
              width: elementBounds.width - 40,
              height: 'auto',
              opacity: 0.8,
              zIndex: 10000,
            }}
            animate={{
              left: '50%',
              top: '50%',
              width: '80%',
              opacity: 1,
              x: '-50%',
              y: '-50%',
            }}
            transition={{
              delay: 0.4,
              duration: 0.8,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="text-white text-center"
          >
            <motion.h2
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold mb-4 text-white"
            >
              PROJECTS
            </motion.h2>
            <motion.p
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-xl text-white/90"
            >
              Exploring innovative solutions...
            </motion.p>
          </motion.div>
          
          {/* Particle effects for enhanced visual appeal */}
          {theme.particles.enabled && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="fixed inset-0 z-9999 pointer-events-none"
            >
              {[...Array(theme.particles.count)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: elementBounds.x + elementBounds.width / 2,
                  y: elementBounds.y + elementBounds.height / 2,
                  scale: 0,
                  opacity: 0
                }}
                animate={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: Math.random() * 0.5 + 0.5,
                  opacity: [0, 0.6, 0]
                }}
                transition={{
                  delay: 0.3 + i * 0.1,
                  duration: theme.particles.duration / 1000,
                  ease: "easeOut"
                }}
                className="absolute w-2 h-2 bg-blue-300/60 rounded-full"
              />
              ))}
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default AdvancedPageTransition;
