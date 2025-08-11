/**
 * Centralized Style Configuration System
 * 
 * This is the SINGLE SOURCE OF TRUTH for all visual styling across the website.
 * Modify values here to instantly update the entire site's appearance.
 */

export interface StyleTokens {
  /** Color palette */
  colors: {
    primary: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    secondary: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    accent: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    neutral: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      950: string;
    };
    semantic: {
      success: string;
      warning: string;
      error: string;
      info: string;
    };
  };

  /** Glass morphism effects */
  glass: {
    light: {
      background: string;
      backdropFilter: string;
      border: string;
      boxShadow: string;
    };
    medium: {
      background: string;
      backdropFilter: string;
      border: string;
      boxShadow: string;
    };
    heavy: {
      background: string;
      backdropFilter: string;
      border: string;
      boxShadow: string;
    };
    dark: {
      background: string;
      backdropFilter: string;
      border: string;
      boxShadow: string;
    };
  };

  /** Border radius values */
  borderRadius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    full: string;
  };

  /** Spacing scale */
  spacing: {
    px: string;
    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    8: string;
    10: string;
    12: string;
    16: string;
    20: string;
    24: string;
    32: string;
    40: string;
    48: string;
    56: string;
    64: string;
  };

  /** Typography scale */
  typography: {
    fontFamily: {
      sans: string[];
      serif: string[];
      mono: string[];
    };
    fontSize: {
      xs: { size: string; lineHeight: string };
      sm: { size: string; lineHeight: string };
      base: { size: string; lineHeight: string };
      lg: { size: string; lineHeight: string };
      xl: { size: string; lineHeight: string };
      '2xl': { size: string; lineHeight: string };
      '3xl': { size: string; lineHeight: string };
      '4xl': { size: string; lineHeight: string };
      '5xl': { size: string; lineHeight: string };
      '6xl': { size: string; lineHeight: string };
      '7xl': { size: string; lineHeight: string };
      '8xl': { size: string; lineHeight: string };
      '9xl': { size: string; lineHeight: string };
    };
    fontWeight: {
      thin: string;
      extralight: string;
      light: string;
      normal: string;
      medium: string;
      semibold: string;
      bold: string;
      extrabold: string;
      black: string;
    };
  };

  /** Animation and transition values */
  animation: {
    duration: {
      fast: string;
      normal: string;
      slow: string;
      slower: string;
    };
    easing: {
      linear: string;
      easeIn: string;
      easeOut: string;
      easeInOut: string;
      spring: string;
      bounce: string;
    };
  };

  /** Component-specific styles */
  components: {
    card: {
      background: string;
      border: string;
      borderRadius: string;
      boxShadow: string;
      backdropFilter: string;
    };
    button: {
      primary: {
        background: string;
        color: string;
        border: string;
        borderRadius: string;
        boxShadow: string;
      };
      secondary: {
        background: string;
        color: string;
        border: string;
        borderRadius: string;
        boxShadow: string;
      };
      ghost: {
        background: string;
        color: string;
        border: string;
        borderRadius: string;
        boxShadow: string;
      };
    };
    input: {
      background: string;
      border: string;
      borderRadius: string;
      color: string;
      placeholder: string;
    };
    navbar: {
      background: string;
      backdropFilter: string;
      border: string;
      boxShadow: string;
    };
    footer: {
      background: string;
      color: string;
      border: string;
    };
  };
}

/**
 * THEME DEFINITIONS
 */

/** Current Signal-to-Noise Theme (your existing design) */
export const SIGNAL_NOISE_THEME: StyleTokens = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    accent: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b',
    },
    neutral: {
      50: '#fafafa',
      100: '#f4f4f5',
      200: '#e4e4e7',
      300: '#d4d4d8',
      400: '#a1a1aa',
      500: '#71717a',
      600: '#52525b',
      700: '#3f3f46',
      800: '#27272a',
      900: '#18181b',
      950: '#09090b',
    },
    semantic: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
  },

  glass: {
    light: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    },
    medium: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.5)',
    },
    heavy: {
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.6)',
    },
    dark: {
      background: 'rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
    },
  },

  borderRadius: {
    none: '0px',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },

  spacing: {
    px: '1px',
    0: '0px',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
    40: '10rem',
    48: '12rem',
    56: '14rem',
    64: '16rem',
  },

  typography: {
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      serif: ['ui-serif', 'Georgia', 'Cambria', 'serif'],
      mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
    },
    fontSize: {
      xs: { size: '0.75rem', lineHeight: '1rem' },
      sm: { size: '0.875rem', lineHeight: '1.25rem' },
      base: { size: '1rem', lineHeight: '1.5rem' },
      lg: { size: '1.125rem', lineHeight: '1.75rem' },
      xl: { size: '1.25rem', lineHeight: '1.75rem' },
      '2xl': { size: '1.5rem', lineHeight: '2rem' },
      '3xl': { size: '1.875rem', lineHeight: '2.25rem' },
      '4xl': { size: '2.25rem', lineHeight: '2.5rem' },
      '5xl': { size: '3rem', lineHeight: '1' },
      '6xl': { size: '3.75rem', lineHeight: '1' },
      '7xl': { size: '4.5rem', lineHeight: '1' },
      '8xl': { size: '6rem', lineHeight: '1' },
      '9xl': { size: '8rem', lineHeight: '1' },
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
  },

  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slower: '1000ms',
    },
    easing: {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      bounce: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
    },
  },

  components: {
    card: {
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '1rem',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      backdropFilter: 'blur(12px)',
    },
    button: {
      primary: {
        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        color: '#ffffff',
        border: 'none',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.39)',
      },
      secondary: {
        background: 'rgba(255, 255, 255, 0.1)',
        color: '#ffffff',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 14px 0 rgba(255, 255, 255, 0.1)',
      },
      ghost: {
        background: 'transparent',
        color: '#ffffff',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '0.5rem',
        boxShadow: 'none',
      },
    },
    input: {
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '0.5rem',
      color: '#ffffff',
      placeholder: 'rgba(255, 255, 255, 0.6)',
    },
    navbar: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    },
    footer: {
      background: '#18181b',
      color: '#ffffff',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
  },
};

/** Alternative Sharp/Technical Theme */
export const SHARP_TECH_THEME: StyleTokens = {
  ...SIGNAL_NOISE_THEME,
  borderRadius: {
    none: '0px',
    sm: '0px',
    md: '0px',
    lg: '0px',
    xl: '0px',
    '2xl': '0px',
    '3xl': '0px',
    full: '0px',
  },
  glass: {
    light: {
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 0 20px 0 rgba(59, 130, 246, 0.2)',
    },
    medium: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 0 30px 0 rgba(59, 130, 246, 0.3)',
    },
    heavy: {
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.4)',
      boxShadow: '0 0 40px 0 rgba(59, 130, 246, 0.4)',
    },
    dark: {
      background: 'rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.5)',
    },
  },
  components: {
    ...SIGNAL_NOISE_THEME.components,
    card: {
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '0px',
      boxShadow: '0 0 20px 0 rgba(59, 130, 246, 0.2)',
      backdropFilter: 'blur(8px)',
    },
    button: {
      primary: {
        background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)',
        color: '#ffffff',
        border: '1px solid rgba(59, 130, 246, 0.5)',
        borderRadius: '0px',
        boxShadow: '0 0 20px 0 rgba(59, 130, 246, 0.5)',
      },
      secondary: {
        background: 'rgba(255, 255, 255, 0.05)',
        color: '#ffffff',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '0px',
        boxShadow: '0 0 15px 0 rgba(255, 255, 255, 0.1)',
      },
      ghost: {
        background: 'transparent',
        color: '#ffffff',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '0px',
        boxShadow: 'none',
      },
    },
  },
};

/**
 * ACTIVE THEME CONFIGURATION
 * 
 * Change this to switch themes instantly across the entire website!
 */
export const AVAILABLE_THEMES = {
  signalNoise: SIGNAL_NOISE_THEME,
  sharpTech: SHARP_TECH_THEME,
} as const;

export type ThemeName = keyof typeof AVAILABLE_THEMES;

export const ACTIVE_THEME: ThemeName = 'signalNoise';

/**
 * Get the currently active theme
 */
export const getActiveStyleTheme = (): StyleTokens => {
  return AVAILABLE_THEMES[ACTIVE_THEME];
};

/**
 * Get a specific component's styles
 */
export const getComponentStyles = (component: keyof StyleTokens['components']): StyleTokens['components'][typeof component] => {
  return getActiveStyleTheme().components[component];
};

/**
 * Get glass effect styles by intensity
 */
export const getGlassStyles = (intensity: keyof StyleTokens['glass'] = 'light'): StyleTokens['glass'][typeof intensity] => {
  return getActiveStyleTheme().glass[intensity];
};

/**
 * Generate CSS custom properties for the active theme
 */
export const generateCSSCustomProperties = (): Record<string, string> => {
  const theme = getActiveStyleTheme();
  const properties: Record<string, string> = {};

  // Colors
  Object.entries(theme.colors.primary).forEach(([key, value]) => {
    properties[`--color-primary-${key}`] = value;
  });
  Object.entries(theme.colors.secondary).forEach(([key, value]) => {
    properties[`--color-secondary-${key}`] = value;
  });
  Object.entries(theme.colors.accent).forEach(([key, value]) => {
    properties[`--color-accent-${key}`] = value;
  });
  Object.entries(theme.colors.neutral).forEach(([key, value]) => {
    properties[`--color-neutral-${key}`] = value;
  });

  // Spacing
  Object.entries(theme.spacing).forEach(([key, value]) => {
    properties[`--spacing-${key}`] = value;
  });

  // Border radius
  Object.entries(theme.borderRadius).forEach(([key, value]) => {
    properties[`--radius-${key}`] = value;
  });

  // Glass effects
  Object.entries(theme.glass).forEach(([intensity, styles]) => {
    properties[`--glass-${intensity}-bg`] = styles.background;
    properties[`--glass-${intensity}-backdrop`] = styles.backdropFilter;
    properties[`--glass-${intensity}-border`] = styles.border;
    properties[`--glass-${intensity}-shadow`] = styles.boxShadow;
  });

  return properties;
};
