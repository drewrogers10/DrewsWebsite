import { useState, useEffect } from 'react';

interface MobileDetectionResult {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
  isTouchDevice: boolean;
}

export const useMobileDetection = (): MobileDetectionResult => {
  const [detection, setDetection] = useState<MobileDetectionResult>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    screenWidth: 1024,
    isTouchDevice: false
  });

  useEffect(() => {
    const updateDetection = () => {
      const width = window.innerWidth;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Breakpoints: mobile < 768px, tablet 768-1024px, desktop > 1024px
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;

      setDetection({
        isMobile,
        isTablet,
        isDesktop,
        screenWidth: width,
        isTouchDevice
      });
    };

    // Initial detection
    updateDetection();

    // Listen for resize events
    window.addEventListener('resize', updateDetection);
    
    // Listen for orientation changes on mobile
    window.addEventListener('orientationchange', () => {
      // Small delay to ensure dimensions are updated
      setTimeout(updateDetection, 100);
    });

    return () => {
      window.removeEventListener('resize', updateDetection);
      window.removeEventListener('orientationchange', updateDetection);
    };
  }, []);

  return detection;
};

// Utility hook for common mobile checks
export const useIsMobile = (): boolean => {
  const { isMobile } = useMobileDetection();
  return isMobile;
};

// Utility hook for touch device detection
export const useIsTouchDevice = (): boolean => {
  const { isTouchDevice } = useMobileDetection();
  return isTouchDevice;
};
