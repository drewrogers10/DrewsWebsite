import React, { useEffect, useRef } from 'react';

// Particle interface - defines the properties of each animated particle
interface Particle {
  x: number;           // Current X position
  y: number;           // Current Y position
  targetX: number;     // Where the particle is moving towards (X)
  targetY: number;     // Where the particle is moving towards (Y)
  originalX: number;   // Starting X position (for returning to chaos)
  originalY: number;   // Starting Y position (for returning to chaos)
  opacity: number;     // Transparency level (0-1)
  size: number;        // Radius of the particle
  phase: 'noise' | 'organizing' | 'signal' | 'returning'; // Current animation phase
}

const SignalToNoiseAnimation: React.FC = () => {
  // React refs for managing canvas and animation
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);

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

    // PARTICLE INITIALIZATION - Create random particles across the screen
    const initParticles = () => {
      const particles: Particle[] = [];
      // TWEAK: Adjust particle count (150 max, or 1 per 8000 pixels)
      const numParticles = Math.min(150, Math.floor((canvas.width * canvas.height) / 8000));
      
      for (let i = 0; i < numParticles; i++) {
        // Start each particle at a random position
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        
        particles.push({
          x,                                    // Current position
          y,
          originalX: x,                        // Remember starting position
          originalY: y,
          targetX: x,                          // Initially target same position
          targetY: y,
          opacity: Math.random() * 0.6 + 0.2,  // TWEAK: Random opacity (0.2-0.8)
          size: Math.random() * 3 + 1,         // TWEAK: Random size (1-4 pixels)
          phase: 'noise'                       // Start in noise phase
        });
      }
      
      particlesRef.current = particles;
    };

    initParticles();

    // ANIMATION TIMING - Define the 4-phase cycle durations
    // TWEAK: Adjust these values to change how long each phase lasts
    const CYCLE_DURATION = 8000;   // Total cycle time (8 seconds)
    const NOISE_DURATION = 2000;    // Phase 1: Chaotic noise (2s)
    const ORGANIZE_DURATION = 2000; // Phase 2: Organizing into grid (2s)
    const SIGNAL_DURATION = 2000;   // Phase 3: Clean organized signal (2s)
    const RETURN_DURATION = 2000;   // Phase 4: Return to chaos (2s)

    const animate = (timestamp: number) => {
      timeRef.current = timestamp;
      const cycleTime = timestamp % CYCLE_DURATION;
      
      // Clear the canvas for the new frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // PHASE CALCULATION - Determine which phase we're in and progress (0-1)
      let currentPhase: 'noise' | 'organizing' | 'signal' | 'returning';
      let phaseProgress: number; // 0 at start of phase, 1 at end of phase
      
      if (cycleTime < NOISE_DURATION) {
        // PHASE 1: Chaotic noise - particles move randomly
        currentPhase = 'noise';
        phaseProgress = cycleTime / NOISE_DURATION;
      } else if (cycleTime < NOISE_DURATION + ORGANIZE_DURATION) {
        // PHASE 2: Organizing - particles move toward grid positions
        currentPhase = 'organizing';
        phaseProgress = (cycleTime - NOISE_DURATION) / ORGANIZE_DURATION;
      } else if (cycleTime < NOISE_DURATION + ORGANIZE_DURATION + SIGNAL_DURATION) {
        // PHASE 3: Signal - particles in organized grid with subtle movement
        currentPhase = 'signal';
        phaseProgress = (cycleTime - NOISE_DURATION - ORGANIZE_DURATION) / SIGNAL_DURATION;
      } else {
        // PHASE 4: Returning - particles return to original chaotic positions
        currentPhase = 'returning';
        phaseProgress = (cycleTime - NOISE_DURATION - ORGANIZE_DURATION - SIGNAL_DURATION) / RETURN_DURATION;
      }

      // PARTICLE BEHAVIOR - Update each particle based on current phase
      particlesRef.current.forEach((particle, index) => {
        
        if (currentPhase === 'noise') {
          // PHASE 1: NOISE - Random chaotic movement around original position
          // TWEAK: Adjust movement range (50) and speed (0.001, 0.0015)
          particle.targetX = particle.originalX + (Math.sin(timestamp * 0.001 + index) * 50);
          particle.targetY = particle.originalY + (Math.cos(timestamp * 0.0015 + index) * 50);
          // TWEAK: Opacity range (0.3 base + 0.3 variation) and flicker speed (0.005)
          particle.opacity = 0.3 + Math.sin(timestamp * 0.005 + index) * 0.3;
          
        } else if (currentPhase === 'organizing') {
          // PHASE 2: ORGANIZING - Move particles toward grid positions
          // TWEAK: Grid size determines how far apart organized particles are
          const gridSize = 80;
          const cols = Math.floor(canvas.width / gridSize);
          const rows = Math.floor(canvas.height / gridSize);
          const gridIndex = index % (cols * rows);
          const gridX = (gridIndex % cols) * gridSize + gridSize / 2;
          const gridY = Math.floor(gridIndex / cols) * gridSize + gridSize / 2;
          
          // TWEAK: Easing function controls how smoothly particles organize
          const easeProgress = 1 - Math.pow(1 - phaseProgress, 3); // Ease out cubic
          particle.targetX = particle.originalX + (gridX - particle.originalX) * easeProgress;
          particle.targetY = particle.originalY + (gridY - particle.originalY) * easeProgress;
          // TWEAK: Opacity increases as particles organize (0.4 to 0.8)
          particle.opacity = 0.4 + phaseProgress * 0.4;
          
        } else if (currentPhase === 'signal') {
          // PHASE 3: SIGNAL - Organized grid with subtle pulsing movement
          const gridSize = 80; // Same grid as organizing phase
          const cols = Math.floor(canvas.width / gridSize);
          const rows = Math.floor(canvas.height / gridSize);
          const gridIndex = index % (cols * rows);
          const gridX = (gridIndex % cols) * gridSize + gridSize / 2;
          const gridY = Math.floor(gridIndex / cols) * gridSize + gridSize / 2;
          
          // TWEAK: Subtle movement range (5) and speed (0.002) for organized pulse
          particle.targetX = gridX + Math.sin(timestamp * 0.002 + index * 0.1) * 5;
          particle.targetY = gridY + Math.cos(timestamp * 0.002 + index * 0.1) * 5;
          // TWEAK: High opacity with gentle pulsing (0.8 base + 0.2 variation)
          particle.opacity = 0.8 + Math.sin(timestamp * 0.003 + index * 0.2) * 0.2;
          
        } else { // returning
          // PHASE 4: RETURNING - Move back to original chaotic positions
          const easeProgress = 1 - Math.pow(1 - phaseProgress, 3);
          const gridSize = 80;
          const cols = Math.floor(canvas.width / gridSize);
          const rows = Math.floor(canvas.height / gridSize);
          const gridIndex = index % (cols * rows);
          const gridX = (gridIndex % cols) * gridSize + gridSize / 2;
          const gridY = Math.floor(gridIndex / cols) * gridSize + gridSize / 2;
          
          // Interpolate from grid position back to original position
          particle.targetX = gridX + (particle.originalX - gridX) * easeProgress;
          particle.targetY = gridY + (particle.originalY - gridY) * easeProgress;
          // TWEAK: Opacity fades as particles return to chaos (0.8 to 0.3)
          particle.opacity = 0.8 - phaseProgress * 0.5;
        }

        // PARTICLE MOVEMENT - Smooth interpolation toward target position
        // TWEAK: Movement speed (0.05 = 5% of distance per frame)
        const speed = 0.05;
        particle.x += (particle.targetX - particle.x) * speed;
        particle.y += (particle.targetY - particle.y) * speed;

        // PARTICLE RENDERING - Draw each particle with phase-based styling
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, particle.opacity));
        
        // COLOR SYSTEM - Different colors for each phase
        let color = '#6b7280'; // Default grey (shouldn't be used)
        
        if (currentPhase === 'noise') {
          // TWEAK: Noise phase color (red)
          color = '#ef4444'; // Bright red for chaotic noise
          
        } else if (currentPhase === 'organizing') {
          // TWEAK: Transition colors - interpolate from red to blue
          const mixRatio = phaseProgress;
          const r = Math.floor(239 * (1 - mixRatio) + 59 * mixRatio);   // Red to blue
          const g = Math.floor(68 * (1 - mixRatio) + 130 * mixRatio);   // Component
          const b = Math.floor(68 * (1 - mixRatio) + 246 * mixRatio);   // Values
          color = `rgb(${r}, ${g}, ${b})`;
          
        } else if (currentPhase === 'signal') {
          // TWEAK: Signal phase color (blue)
          color = '#3b82f6'; // Clean blue for organized signal
          
        } else {
          // TWEAK: Returning phase - blue back to red
          const r = Math.floor(59 + (239 - 59) * phaseProgress);
          const g = Math.floor(130 + (68 - 130) * phaseProgress);
          const b = Math.floor(246 + (68 - 246) * phaseProgress);
          color = `rgb(${r}, ${g}, ${b})`;
        }

        // Draw the main particle circle
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // GLOW EFFECT - Add extra glow during signal phase
        if (currentPhase === 'signal') {
          // TWEAK: Glow intensity (shadowBlur) and inner glow size (0.5)
          ctx.shadowBlur = 10;
          ctx.shadowColor = color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();
      });

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
      className="absolute inset-0 pointer-events-none opacity-30"
      style={{ zIndex: 1 }}
    />
  );
};

export default SignalToNoiseAnimation;
