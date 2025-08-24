import React, { useRef, useEffect } from 'react';

interface ScrollDrivenWaveformProps {
  chaosLevel: number; // 0-1, where 1 is maximum chaos
  scrollProgress: number; // 0-1, current scroll position
  isScrolling?: boolean;
  className?: string;
}

/**
 * SCROLL-DRIVEN WAVEFORM ANIMATION
 * Single-line waveform that responds to horizontal scroll position
 * Chaos level decreases as user scrolls from left (noise) to right (signal)
 */
const ScrollDrivenWaveform: React.FC<ScrollDrivenWaveformProps> = ({
  chaosLevel,
  scrollProgress,
  isScrolling = false,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // CANVAS SETUP
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let isAnimating = true;

    const animate = (timestamp: number) => {
      if (!isAnimating) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // DYNAMIC PARAMETERS based on scroll
      const centerY = canvas.height / 2;
      const baseAmplitude = Math.min(canvas.height * 0.2, 150);
      const frequency = 0.015 + (chaosLevel * 0.01);
      
      // SCROLL-RESPONSIVE FLOW SPEED
      const baseFlowSpeed = timestamp * 0.002;
      const scrollInfluence = scrollProgress * 0.002;
      const scrollVelocityBoost = isScrolling ? 0.003 : 0;
      const flowSpeed = baseFlowSpeed + scrollInfluence + scrollVelocityBoost;
      
      // SINGLE WAVEFORM LINE
      ctx.beginPath();
      ctx.lineWidth = 3 + (chaosLevel * 2);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      let firstPoint = true;
      
      for (let x = 0; x <= canvas.width; x += 2) {
        const transitionFactor = x / canvas.width;
        let y = centerY + Math.sin(x * frequency - flowSpeed) * baseAmplitude;
        
        // CHAOS SYSTEM - intensity based on chaosLevel
        if (chaosLevel > 0) {
          // Multiple overlapping sine waves for chaos
          y += Math.sin(x * frequency * 3.5 - flowSpeed * 1.3) * baseAmplitude * 0.7 * chaosLevel;
          y += Math.sin(x * frequency * 8 - flowSpeed * 0.9) * baseAmplitude * 0.5 * chaosLevel;
          y += Math.sin(x * frequency * 15 - flowSpeed * 1.6) * baseAmplitude * 0.4 * chaosLevel;
          y += Math.sin(x * frequency * 25 - flowSpeed * 0.7) * baseAmplitude * 0.3 * chaosLevel;
          
          // Random noise component
          const noiseIntensity = Math.sin(x * 0.05 - flowSpeed * 0.3) * 0.5 + 0.5;
          y += (Math.random() - 0.5) * baseAmplitude * 0.6 * chaosLevel * noiseIntensity;
          
          // High-frequency jitter
          y += Math.sin(x * frequency * 40 - flowSpeed * 2.8) * baseAmplitude * 0.2 * chaosLevel;
        }
        
        // SIGNAL ENHANCEMENT - cleaner waves as chaos decreases
        const signalLevel = 1 - chaosLevel;
        if (signalLevel > 0) {
          y += Math.sin(x * frequency * 2 - flowSpeed) * baseAmplitude * 0.3 * signalLevel;
          y += Math.sin(x * frequency * 0.5 - flowSpeed * 0.5) * baseAmplitude * 0.2 * signalLevel;
        }
        
        // COLOR TRANSITION based on horizontal position and chaos
        const easedTransition = 1 - Math.pow(1 - transitionFactor, 3);
        const r = Math.floor(239 * (1 - easedTransition) + 59 * easedTransition);
        const g = Math.floor(68 * (1 - easedTransition) + 130 * easedTransition);
        const b = Math.floor(68 * (1 - easedTransition) + 246 * easedTransition);
        
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.8)`;
        
        if (firstPoint) {
          ctx.moveTo(x, y);
          firstPoint = false;
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
      

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      isAnimating = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [chaosLevel, scrollProgress, isScrolling]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    />
  );
};

export default ScrollDrivenWaveform;
