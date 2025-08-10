import React, { useEffect, useRef } from 'react';

interface ScrollDrivenWaveformProps {
  chaosLevel: number; // 0-1, where 1 = maximum chaos (noise), 0 = pure signal
  scrollProgress: number; // 0-1 across all sections
  isScrolling?: boolean;
  className?: string;
}

/**
 * SCROLL-DRIVEN WAVEFORM ANIMATION
 * Enhanced version of WaveformAnimation that responds to horizontal scroll position
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
      const baseAmplitude = Math.min(canvas.height * 0.15, 120); // Slightly larger for impact
      const frequency = 0.012 + (chaosLevel * 0.008); // More chaotic frequency in noise sections
      const numLayers = Math.floor(6 + (chaosLevel * 4)); // More layers = more chaos
      const depthSpacing = 12 + (chaosLevel * 8);
      const perspectiveStrength = 0.6 + (chaosLevel * 0.3);
      
      // SCROLL-RESPONSIVE FLOW SPEED with enhanced real-time response
      const baseFlowSpeed = timestamp * 0.002;
      const scrollInfluence = scrollProgress * 0.002; // Always apply scroll influence
      const scrollVelocityBoost = isScrolling ? 0.003 : 0; // Extra boost when actively scrolling
      const flowSpeed = baseFlowSpeed + scrollInfluence + scrollVelocityBoost;
      
      // 3D DEPTH LAYERS
      for (let layer = numLayers - 1; layer >= 0; layer--) {
        const depthFactor = 1 - (layer / numLayers) * perspectiveStrength;
        const zOffset = layer * depthSpacing;
        const layerCenterY = centerY + zOffset * 0.4;
        const layerAmplitude = baseAmplitude * depthFactor * (0.8 + chaosLevel * 0.4);
        const layerAlpha = (0.2 + (layer / numLayers) * 0.8) * (0.7 + chaosLevel * 0.3);
        
        ctx.beginPath();
        ctx.lineWidth = Math.max(1, (3 + chaosLevel * 2) * depthFactor);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        let firstPoint = true;
        
        // WAVEFORM GENERATION
        for (let x = 0; x <= canvas.width; x += 1) {
          // BASE WAVEFORM with layer phase offset
          const layerPhase = layer * 0.7;
          let y = layerCenterY + Math.sin(x * frequency - flowSpeed + layerPhase) * layerAmplitude;
          
          // CHAOS SYSTEM - intensity based on chaosLevel
          if (chaosLevel > 0) {
            // Multiple frequency chaos components
            y += Math.sin(x * frequency * 3.5 - flowSpeed * 1.3 + layerPhase) * layerAmplitude * 0.7 * chaosLevel;
            y += Math.sin(x * frequency * 8 - flowSpeed * 0.9 + layerPhase) * layerAmplitude * 0.5 * chaosLevel;
            y += Math.sin(x * frequency * 15 - flowSpeed * 1.6 + layerPhase) * layerAmplitude * 0.4 * chaosLevel;
            y += Math.sin(x * frequency * 25 - flowSpeed * 0.7 + layerPhase) * layerAmplitude * 0.3 * chaosLevel;
            
            // Random noise with layer variation
            const layerNoise = Math.sin(x * 0.08 + layer - flowSpeed * 0.6) * 0.5 + 0.5;
            y += (Math.random() - 0.5) * layerAmplitude * 0.9 * chaosLevel * layerNoise;
            
            // High-frequency jitter
            y += Math.sin(x * frequency * 60 - flowSpeed * 4 + layerPhase) * layerAmplitude * 0.2 * chaosLevel;
          }
          
          // SIGNAL HARMONICS - clean components that emerge as chaos decreases
          const signalLevel = 1 - chaosLevel;
          if (signalLevel > 0) {
            y += Math.sin(x * frequency * 2 - flowSpeed + layerPhase) * layerAmplitude * 0.4 * signalLevel;
            y += Math.sin(x * frequency * 0.5 - flowSpeed * 0.5 + layerPhase) * layerAmplitude * 0.25 * signalLevel;
            y += Math.sin(x * frequency * 4 - flowSpeed * 0.8 + layerPhase) * layerAmplitude * 0.15 * signalLevel;
          }
          
          // DYNAMIC COLOR SYSTEM based on chaos level
          const noiseColor = { r: 239, g: 68, b: 68 }; // Red
          const signalColor = { r: 59, g: 130, b: 246 }; // Blue
          
          const r = Math.floor((noiseColor.r * chaosLevel + signalColor.r * (1 - chaosLevel)) * depthFactor);
          const g = Math.floor((noiseColor.g * chaosLevel + signalColor.g * (1 - chaosLevel)) * depthFactor);
          const b = Math.floor((noiseColor.b * chaosLevel + signalColor.b * (1 - chaosLevel)) * depthFactor);
          
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${layerAlpha})`;
          
          // Build path
          if (firstPoint) {
            ctx.moveTo(x, y);
            firstPoint = false;
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.stroke();
      }

      // DYNAMIC LABELS based on chaos level
      ctx.font = `bold ${16 + chaosLevel * 6}px Inter, sans-serif`;
      
      // Left side - intensity based on chaos
      if (chaosLevel > 0.5) {
        ctx.textAlign = 'left';
        ctx.fillStyle = `rgba(239, 68, 68, ${0.6 + chaosLevel * 0.4})`;
        ctx.fillText('NOISE', 40, centerY - baseAmplitude - 40);
      }
      
      // Right side - clarity based on signal strength
      if (chaosLevel < 0.5) {
        ctx.textAlign = 'right';
        ctx.fillStyle = `rgba(59, 130, 246, ${0.6 + (1 - chaosLevel) * 0.4})`;
        ctx.fillText('SIGNAL', canvas.width - 40, centerY - baseAmplitude - 40);
      }

      // Center transition label
      if (chaosLevel > 0.3 && chaosLevel < 0.7) {
        ctx.textAlign = 'center';
        ctx.fillStyle = `rgba(147, 51, 234, ${0.8})`;
        ctx.fillText('FILTERING', canvas.width / 2, centerY - baseAmplitude - 40);
      }

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
