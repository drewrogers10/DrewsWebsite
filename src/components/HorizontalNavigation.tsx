import React from 'react';
import { motion } from 'framer-motion';
import { ScrollSection } from '../hooks/useHorizontalScroll';

interface HorizontalNavigationProps {
  sections: ScrollSection[];
  currentSection: number;
  scrollProgress: number;
  onSectionClick: (index: number) => void;
  className?: string;
}

const HorizontalNavigation: React.FC<HorizontalNavigationProps> = ({
  sections,
  currentSection,
  scrollProgress,
  onSectionClick,
  className = ''
}) => {
  return (
    <div className={`fixed right-8 top-1/2 -translate-y-1/2 z-50 ${className}`}>
      {/* Progress Bar */}
      <div className="mb-6 w-1 h-32 bg-white/20 rounded-full overflow-hidden">
        <motion.div
          className="w-full bg-gradient-to-b from-red-400 via-purple-400 to-blue-400 rounded-full"
          initial={{ height: '0%' }}
          animate={{ height: `${scrollProgress * 100}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      {/* Section Dots */}
      <div className="flex flex-col space-y-4">
        {sections.map((section, index) => {
          const isActive = currentSection === index;
          const chaosLevel = section.chaosLevel;
          
          // Color based on chaos level
          const getColor = () => {
            if (chaosLevel > 0.8) return 'bg-red-400';
            if (chaosLevel > 0.5) return 'bg-purple-400';
            if (chaosLevel > 0.2) return 'bg-blue-400';
            return 'bg-cyan-400';
          };

          return (
            <motion.button
              key={section.id}
              onClick={() => onSectionClick(index)}
              className={`
                relative w-4 h-4 rounded-full border-2 border-white/40
                transition-all duration-300 hover:scale-125
                ${isActive ? getColor() : 'bg-white/20'}
              `}
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to ${section.title} section`}
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-white"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              
              {/* Tooltip */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-black/80 text-white px-3 py-1 rounded text-sm font-medium whitespace-nowrap">
                  {section.title}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Scroll Hint */}
      <motion.div
        className="mt-6 text-white/60 text-xs text-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: scrollProgress > 0.1 ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center space-y-1">
          <span>Scroll</span>
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HorizontalNavigation;
