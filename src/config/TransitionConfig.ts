import { getGlassStyles } from './StyleConfig';

/**
 * Advanced Page Transition Configuration
 * 
 * This configuration now integrates with the centralized StyleConfig system
 * to ensure transitions dynamically match your website's current theme.
 */

export interface TransitionTheme {
  /** Animation duration in milliseconds */
  duration: number;
  /** CSS easing function */
  easing: number[];
  /** Border radius animation settings */
  borderRadius: {
    initial: string;
    final: string;
    duration: number;
  };
  /** Particle effects configuration */
  particles: {
    enabled: boolean;
    count: number;
    duration: number;
  };
  /** Style overrides (optional - will use StyleConfig if not provided) */
  styleOverrides?: {
    background?: string;
    backdropFilter?: string;
    border?: string;
    boxShadow?: string;
  };
}

/**
 * TRANSITION THEMES
 * These now reference the centralized StyleConfig for consistency
 */
export const TRANSITION_THEMES = {
  /** Matches the current website's frosted glass theme */
  frostedGlass: {
    duration: 1200,
    easing: [0.4, 0, 0.2, 1],
    borderRadius: {
      initial: '1rem',
      final: '0px',
      duration: 800,
    },
    particles: {
      enabled: true,
      count: 12,
      duration: 1500,
    },
    // No styleOverrides - will use StyleConfig glass.light
  } as TransitionTheme,

  /** Sharp, technical theme with hard edges */
  sharpEdges: {
    duration: 800,
    easing: [0.25, 0.46, 0.45, 0.94],
    borderRadius: {
      initial: '0px',
      final: '0px',
      duration: 0,
    },
    particles: {
      enabled: false,
      count: 0,
      duration: 0,
    },
    styleOverrides: {
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 0 20px 0 rgba(59, 130, 246, 0.2)',
    },
  } as TransitionTheme,

  /** Minimal, clean transitions */
  minimal: {
    duration: 600,
    easing: [0.4, 0, 0.6, 1],
    borderRadius: {
      initial: '0.5rem',
      final: '0px',
      duration: 400,
    },
    particles: {
      enabled: false,
      count: 0,
      duration: 0,
    },
    // No styleOverrides - will use StyleConfig
  } as TransitionTheme,

  /** Dramatic, enhanced effects */
  dramatic: {
    duration: 1800,
    easing: [0.68, -0.55, 0.265, 1.55],
    borderRadius: {
      initial: '2rem',
      final: '0px',
      duration: 1200,
    },
    particles: {
      enabled: true,
      count: 24,
      duration: 2000,
    },
    styleOverrides: {
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(24px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 20px 60px 0 rgba(31, 38, 135, 0.8)',
    },
  } as TransitionTheme,
} as const;

/**
 * ACTIVE THEME CONFIGURATION
 */
export type TransitionThemeName = keyof typeof TRANSITION_THEMES;

export const ACTIVE_TRANSITION_THEME: TransitionThemeName = 'frostedGlass';

/**
 * ROUTE CONFIGURATION
 */
export const ROUTE_CONFIG = {
  selectors: {
    projects: [
      'a[href*="/projects"]',
      'button[data-route="/projects"]',
      '[data-auto-transition="projects"]',
      '.project-card',
      '[data-transition-target="/projects"]'
    ],
    about: [
      'a[href*="/about"]',
      'button[data-route="/about"]',
      '[data-auto-transition="about"]',
      '[data-transition-target="/about"]'
    ],
    contact: [
      'a[href*="/contact"]',
      'button[data-route="/contact"]',
      '[data-auto-transition="contact"]',
      '[data-transition-target="/contact"]'
    ],
    blog: [
      'a[href*="/blog"]',
      'button[data-route="/blog"]',
      '[data-auto-transition="blog"]',
      '[data-transition-target="/blog"]'
    ],
    home: [
      'a[href="/"]',
      'a[href="/home"]',
      'button[data-route="/"]',
      '[data-auto-transition="home"]',
      '[data-transition-target="/"]'
    ]
  }
};

/**
 * ADVANCED CONFIGURATION
 */
export const ADVANCED_CONFIG = {
  /** Enable automatic enhancement of elements */
  autoEnhancement: true,
  /** Observe DOM mutations for dynamic content */
  observeMutations: true,
  /** Default source element selector for transitions */
  defaultSourceSelector: '[data-transition-source]',
  /** Fallback transition duration if theme not found */
  fallbackDuration: 1000,
  /** Debug mode for development */
  debug: false,
};

/**
 * Get the currently active transition theme with StyleConfig integration
 */
export const getActiveTheme = (): TransitionTheme => {
  const transitionTheme = TRANSITION_THEMES[ACTIVE_TRANSITION_THEME];
  
  // If no style overrides are provided, use the current StyleConfig glass effect
  if (!transitionTheme.styleOverrides) {
    // Respect current dark mode preference
    const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
    const glassStyles = getGlassStyles(isDark ? 'dark' : 'light');
    return {
      ...transitionTheme,
      styleOverrides: {
        background: glassStyles.background,
        backdropFilter: glassStyles.backdropFilter,
        border: glassStyles.border,
        boxShadow: glassStyles.boxShadow,
      },
    };
  }
  
  return transitionTheme;
};

/**
 * Get transition theme that matches the current StyleConfig theme
 */
export const getMatchingTransitionTheme = (): TransitionTheme => {
  // For now, return the active theme with dynamic style integration
  // This could be enhanced to automatically detect based on style characteristics
  return getActiveTheme();
};

/**
 * Create a custom transition theme that inherits from StyleConfig
 */
export const createCustomTransitionTheme = (
  baseTheme: TransitionThemeName,
  overrides: Partial<TransitionTheme>
): TransitionTheme => {
  const base = TRANSITION_THEMES[baseTheme];
  // Respect current dark mode preference
  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
  const glassStyles = getGlassStyles(isDark ? 'dark' : 'light');
  
  // Merge with StyleConfig if no styleOverrides in base theme
  const baseWithStyles = !base.styleOverrides ? {
    ...base,
    styleOverrides: {
      background: glassStyles.background,
      backdropFilter: glassStyles.backdropFilter,
      border: glassStyles.border,
      boxShadow: glassStyles.boxShadow,
    },
  } : base;
  
  return {
    ...baseWithStyles,
    ...overrides,
    styleOverrides: {
      ...baseWithStyles.styleOverrides,
      ...overrides.styleOverrides,
    },
  };
};
