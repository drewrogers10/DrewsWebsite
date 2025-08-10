import React from 'react';

interface DynamicBackgroundFilterProps {
  scrollProgress: number; // 0-1
  className?: string;
}

/**
 * DYNAMIC BACKGROUND FILTER
 * Creates a smooth color transition overlay that responds to scroll position
 * Transitions from red chaos (0%) to blue signal (100%)
 */
const DynamicBackgroundFilter: React.FC<DynamicBackgroundFilterProps> = ({
  scrollProgress,
  className = ''
}) => {
  // Calculate color values based on scroll progress
  const getBackgroundStyle = (progress: number) => {
    // Ensure progress is between 0 and 1
    const clampedProgress = Math.max(0, Math.min(1, progress));
    
    // Define color stops for the transition
    // Red (chaos) -> Purple (filtering) -> Blue (organizing) -> Cyan (signal)
    let r, g, b;
    
    if (clampedProgress <= 0.33) {
      // Red to Purple transition (0% to 33%)
      const localProgress = clampedProgress / 0.33;
      r = Math.floor(220 - (localProgress * 80)); // 220 -> 140
      g = Math.floor(20 + (localProgress * 20));  // 20 -> 40
      b = Math.floor(20 + (localProgress * 80));  // 20 -> 100
    } else if (clampedProgress <= 0.66) {
      // Purple to Blue transition (33% to 66%)
      const localProgress = (clampedProgress - 0.33) / 0.33;
      r = Math.floor(140 - (localProgress * 80)); // 140 -> 60
      g = Math.floor(40 + (localProgress * 60));  // 40 -> 100
      b = Math.floor(100 + (localProgress * 80)); // 100 -> 180
    } else {
      // Blue to Cyan transition (66% to 100%)
      const localProgress = (clampedProgress - 0.66) / 0.34;
      r = Math.floor(60 - (localProgress * 40));  // 60 -> 20
      g = Math.floor(100 + (localProgress * 80)); // 100 -> 180
      b = Math.floor(180 + (localProgress * 60)); // 180 -> 240
    }
    
    // Create gradient background with dynamic colors
    const primaryColor = `rgb(${r}, ${g}, ${b})`;
    const secondaryColor = `rgb(${Math.floor(r * 0.8)}, ${Math.floor(g * 0.8)}, ${Math.floor(b * 0.8)})`;
    const tertiaryColor = `rgb(${Math.floor(r * 0.6)}, ${Math.floor(g * 0.6)}, ${Math.floor(b * 0.6)})`;
    
    return {
      background: `
        radial-gradient(circle at 20% 80%, ${primaryColor}22 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, ${secondaryColor}22 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, ${tertiaryColor}22 0%, transparent 50%),
        linear-gradient(135deg, ${primaryColor}15 0%, ${secondaryColor}10 50%, ${tertiaryColor}15 100%)
      `,
      transition: 'background 0.3s ease-out'
    };
  };

  // Calculate chaos-based opacity and blur effects
  const getChaosEffects = (progress: number) => {
    const chaosLevel = 1 - progress; // High chaos at start, low at end
    
    return {
      opacity: 0.7 + (chaosLevel * 0.3), // More opacity during chaos
      backdropFilter: `blur(${chaosLevel * 2}px) saturate(${1 + chaosLevel * 0.5})`,
      WebkitBackdropFilter: `blur(${chaosLevel * 2}px) saturate(${1 + chaosLevel * 0.5})`
    };
  };

  const backgroundStyle = getBackgroundStyle(scrollProgress);
  const chaosEffects = getChaosEffects(scrollProgress);

  return (
    <div
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{
        ...backgroundStyle,
        ...chaosEffects,
        zIndex: 0
      }}
    >
      {/* Additional noise texture overlay for chaos sections */}
      {scrollProgress < 0.5 && (
        <div
          className="absolute inset-0"
          style={{
            opacity: (1 - scrollProgress * 2) * 0.1,
            background: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 2px,
                rgba(255, 255, 255, 0.03) 2px,
                rgba(255, 255, 255, 0.03) 4px
              ),
              repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 2px,
                rgba(255, 255, 255, 0.02) 2px,
                rgba(255, 255, 255, 0.02) 4px
              )
            `,
            mixBlendMode: 'overlay'
          }}
        />
      )}
      
      {/* Signal clarity overlay for signal sections */}
      {scrollProgress > 0.5 && (
        <div
          className="absolute inset-0"
          style={{
            opacity: (scrollProgress - 0.5) * 2 * 0.1,
            background: `
              radial-gradient(circle at center, rgba(255, 255, 255, 0.05) 0%, transparent 70%)
            `,
            mixBlendMode: 'soft-light'
          }}
        />
      )}
    </div>
  );
};

export default DynamicBackgroundFilter;
