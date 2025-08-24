import { useEffect, useRef, useState, useCallback } from 'react';

export interface ScrollSection {
  id: string;
  title: string;
  chaosLevel: number; // 0 = pure signal, 1 = pure noise
  colorTheme: 'noise' | 'transition' | 'signal' | 'pure';
}

export const useVerticalScroll = (sections: ScrollSection[]) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0); // 0-1 across all sections
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // Calculate scroll progress and current section
  const updateScrollState = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollTop = container.scrollTop;
    const maxScroll = container.scrollHeight - container.clientHeight;
    const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
    
    setScrollProgress(Math.min(Math.max(progress, 0), 1));

    // Calculate current section based on scroll position
    const sectionHeight = container.clientHeight;
    const sectionIndex = Math.floor(scrollTop / sectionHeight);
    setCurrentSection(Math.min(Math.max(sectionIndex, 0), sections.length - 1));
  }, [sections.length]);

  // Smooth scroll to specific section
  const scrollToSection = useCallback((sectionIndex: number) => {
    const container = containerRef.current;
    if (!container) return;

    const sectionHeight = container.clientHeight;
    const targetScroll = sectionIndex * sectionHeight;

    container.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  }, []);

  // Handle scroll events
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollTimeout: number;

    const handleScroll = () => {
      setIsScrolling(true);
      updateScrollState();

      // Clear existing timeout
      clearTimeout(scrollTimeout);
      
      // Set scrolling to false after scroll ends
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial state calculation
    updateScrollState();

    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [updateScrollState]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      updateScrollState();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateScrollState]);

  // Get current section data
  const getCurrentSection = () => sections[currentSection] || sections[0];

  // Get chaos level based on continuous scroll progress (0-1)
  const getChaosLevel = () => {
    // Calculate chaos level based on overall scroll progress
    // scrollProgress goes from 0 (start) to 1 (end)
    // chaos level should go from 1 (max chaos) to 0 (pure signal)
    const chaosLevel = Math.max(0, Math.min(1, 1 - scrollProgress));
    return chaosLevel;
  };

  return {
    containerRef,
    scrollProgress,
    currentSection,
    isScrolling,
    scrollToSection,
    getCurrentSection,
    getChaosLevel,
    sections
  };
};
