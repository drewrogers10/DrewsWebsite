import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  StyleTokens, 
  ThemeName, 
  AVAILABLE_THEMES, 
  ACTIVE_THEME, 
  getComponentStyles,
  getGlassStyles,
  generateCSSCustomProperties
} from '../config/StyleConfig';

interface StyleContextType {
  /** Current theme tokens */
  theme: StyleTokens;
  /** Current theme name */
  currentTheme: ThemeName;
  /** Switch to a different theme */
  setTheme: (themeName: ThemeName) => void;
  /** Get component-specific styles */
  getComponent: (component: keyof StyleTokens['components']) => StyleTokens['components'][typeof component];
  /** Get glass effect styles */
  getGlass: (intensity?: keyof StyleTokens['glass']) => StyleTokens['glass'][keyof StyleTokens['glass']];
  /** Available theme names */
  availableThemes: ThemeName[];
}

const StyleContext = createContext<StyleContextType | undefined>(undefined);

interface StyleProviderProps {
  children: React.ReactNode;
  /** Optional initial theme override */
  initialTheme?: ThemeName;
}

export const StyleProvider: React.FC<StyleProviderProps> = ({ 
  children, 
  initialTheme = ACTIVE_THEME 
}) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(initialTheme);
  const [theme, setTheme] = useState<StyleTokens>(AVAILABLE_THEMES[initialTheme]);

  // Update theme when currentTheme changes
  useEffect(() => {
    setTheme(AVAILABLE_THEMES[currentTheme]);
  }, [currentTheme]);

  // Inject CSS custom properties into the document
  useEffect(() => {
    const properties = generateCSSCustomProperties();
    const root = document.documentElement;
    
    Object.entries(properties).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    // Cleanup function to remove properties if needed
    return () => {
      Object.keys(properties).forEach(property => {
        root.style.removeProperty(property);
      });
    };
  }, [theme]);

  const contextValue: StyleContextType = {
    theme,
    currentTheme,
    setTheme: setCurrentTheme,
    getComponent: getComponentStyles,
    getGlass: getGlassStyles,
    availableThemes: Object.keys(AVAILABLE_THEMES) as ThemeName[],
  };

  return (
    <StyleContext.Provider value={contextValue}>
      {children}
    </StyleContext.Provider>
  );
};

/**
 * Hook to access the style context
 */
export const useStyle = (): StyleContextType => {
  const context = useContext(StyleContext);
  if (context === undefined) {
    throw new Error('useStyle must be used within a StyleProvider');
  }
  return context;
};

/**
 * Hook to get component-specific styles
 */
export const useComponentStyles = (component: keyof StyleTokens['components']) => {
  const { getComponent } = useStyle();
  return getComponent(component);
};

/**
 * Hook to get glass effect styles
 */
export const useGlassStyles = (intensity: keyof StyleTokens['glass'] = 'light') => {
  const { getGlass } = useStyle();
  return getGlass(intensity);
};

/**
 * Hook to get theme colors
 */
export const useColors = () => {
  const { theme } = useStyle();
  return theme.colors;
};

/**
 * Hook to get spacing values
 */
export const useSpacing = () => {
  const { theme } = useStyle();
  return theme.spacing;
};

/**
 * Hook to get border radius values
 */
export const useBorderRadius = () => {
  const { theme } = useStyle();
  return theme.borderRadius;
};

/**
 * Hook to get typography values
 */
export const useTypography = () => {
  const { theme } = useStyle();
  return theme.typography;
};

/**
 * Hook to get animation values
 */
export const useAnimation = () => {
  const { theme } = useStyle();
  return theme.animation;
};

/**
 * Higher-order component to provide style context
 */
export const withStyles = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & { initialTheme?: ThemeName }> => {
  return ({ initialTheme, ...props }) => (
    <StyleProvider initialTheme={initialTheme}>
      <Component {...(props as P)} />
    </StyleProvider>
  );
};
