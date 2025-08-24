import React, { useEffect, useRef } from 'react';

/**
 * WAVEFORM ANIMATION COMPONENT
 * Creates a single continuous waveform that transitions from chaotic noise (left) 
 * to clean signal (right), representing the "signal to noise" theme.
 */
const WaveformAnimation: React.FC = () => {
  // React refs for managing canvas and animation loop
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // CANVAS SETUP - Make canvas fill the entire screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = (timestamp: number) => {
      // Clear canvas for new frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 3D WAVEFORM PARAMETERS - Core settings for the 3D wave
      const centerY = canvas.height / 2;                           // Vertical center line
      const baseAmplitude = Math.min(canvas.height * 0.12, 100);   // TWEAK: Wave height (12% of screen or 100px max)
      const frequency = 0.015;                                     // TWEAK: Base wave frequency (lower = wider waves)
      const numLayers = 8;                                         // TWEAK: Number of 3D depth layers
      const depthSpacing = 15;                                     // TWEAK: Distance between depth layers
      const perspectiveStrength = 0.7;                            // TWEAK: How much layers shrink with depth (0-1)
      
      // 3D DEPTH LAYERS - Draw multiple layers from back to front
      for (let layer = numLayers - 1; layer >= 0; layer--) {
        // 3D PERSPECTIVE CALCULATIONS
        const depthFactor = 1 - (layer / numLayers) * perspectiveStrength;  // Shrink distant layers
        const zOffset = layer * depthSpacing;                               // Z-depth offset
        const layerCenterY = centerY + zOffset * 0.3;                      // Slight vertical offset for depth
        const layerAmplitude = baseAmplitude * depthFactor;                 // Smaller amplitude for distant layers
        const layerAlpha = 0.3 + (layer / numLayers) * 0.7;               // Fade distant layers
        
        // DRAWING SETUP for this layer
        ctx.beginPath();
        ctx.lineWidth = Math.max(1, 4 * depthFactor);  // Thinner lines for distant layers
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        let firstPoint = true;
        // 3D WAVEFORM LOOP - Draw each depth layer
        for (let x = 0; x <= canvas.width; x += 1) {
          // TRANSITION CALCULATION - Determine chaos vs signal level
          const transitionFactor = x / canvas.width;
          const easedTransition = 1 - Math.pow(1 - transitionFactor, 3);
          
          // 3D BASE WAVEFORM - Each layer has slight phase offset for depth
          const layerPhase = layer * 0.5;  // TWEAK: Phase offset between layers
          const flowSpeed = timestamp * 0.003;  // TWEAK: Left-to-right flow speed
          let y = layerCenterY + Math.sin(x * frequency - flowSpeed + layerPhase) * layerAmplitude;
          
          // CHAOS SYSTEM - Add complexity that decreases left to right
          const chaosLevel = 1 - easedTransition;
          
          if (chaosLevel > 0) {
            // 3D CHAOS COMPONENTS - Each layer has unique chaos pattern with flow
            y += Math.sin(x * frequency * 3 - flowSpeed * 1.2 + layerPhase) * layerAmplitude * 0.6 * chaosLevel;
            y += Math.sin(x * frequency * 7 - flowSpeed * 0.8 + layerPhase) * layerAmplitude * 0.4 * chaosLevel;
            y += Math.sin(x * frequency * 12 - flowSpeed * 1.5 + layerPhase) * layerAmplitude * 0.3 * chaosLevel;
            y += Math.sin(x * frequency * 20 - flowSpeed * 0.6 + layerPhase) * layerAmplitude * 0.2 * chaosLevel;
            
            // 3D RANDOM NOISE - Different noise per layer with flow
            const layerNoise = Math.sin(x * 0.1 + layer - flowSpeed * 0.5) * 0.5 + 0.5;
            y += (Math.random() - 0.5) * layerAmplitude * 0.8 * chaosLevel * layerNoise;
            
            // 3D HIGH-FREQUENCY JITTER with flow
            y += Math.sin(x * frequency * 50 - flowSpeed * 3.2 + layerPhase) * layerAmplitude * 0.15 * chaosLevel;
          }
          
          // 3D CLEAN SIGNAL HARMONICS with flow
          const cleanLevel = easedTransition;
          if (cleanLevel > 0) {
            y += Math.sin(x * frequency * 2 - flowSpeed + layerPhase) * layerAmplitude * 0.3 * cleanLevel;
            y += Math.sin(x * frequency * 0.5 - flowSpeed * 0.5 + layerPhase) * layerAmplitude * 0.2 * cleanLevel;
          }
          
          // 3D COLOR SYSTEM - Layers have depth-based color variation
          const r = Math.floor((239 * (1 - easedTransition) + 59 * easedTransition) * depthFactor);
          const g = Math.floor((68 * (1 - easedTransition) + 130 * easedTransition) * depthFactor);
          const b = Math.floor((68 * (1 - easedTransition) + 246 * easedTransition) * depthFactor);
          
          // Apply 3D color with depth-based transparency
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${layerAlpha})`;
          
          // 3D DRAWING - Build the continuous waveform path
          if (firstPoint) {
            ctx.moveTo(x, y);
            firstPoint = false;
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        // Draw this 3D layer
        ctx.stroke();
      }


      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default WaveformAnimation;
