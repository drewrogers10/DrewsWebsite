import React, { useEffect } from 'react';
import { useUniversalTransition } from '../hooks/useUniversalTransition';
import { ROUTE_CONFIG, ADVANCED_CONFIG } from '../config/TransitionConfig';

interface AutoTransitionConfig {
  /** CSS selectors for elements that should automatically get transitions */
  selectors: {
    /** Elements that should navigate to projects page */
    projects?: string[];
    /** Elements that should navigate to about page */
    about?: string[];
    /** Elements that should navigate to contact page */
    contact?: string[];
    /** Elements that should navigate to blog page */
    blog?: string[];
    /** Custom route mappings */
    custom?: Array<{ selector: string; route: string }>;
  };
  /** Whether to enable auto-enhancement */
  enabled?: boolean;
  /** Transition type to use */
  transitionType?: 'expand' | 'fade' | 'slide';
}

const defaultConfig: AutoTransitionConfig = {
  selectors: ROUTE_CONFIG.selectors,
  enabled: ADVANCED_CONFIG.autoEnhancement,
  transitionType: 'expand'
};

/**
 * Automatically enhances eligible elements with page transitions
 * This component should be placed at the root level of your app
 */
export const AutoTransitionEnhancer: React.FC<{ config?: Partial<AutoTransitionConfig> }> = ({ 
  config = {} 
}) => {
  const { createTransition } = useUniversalTransition();
  const finalConfig = { ...defaultConfig, ...config };

  useEffect(() => {
    if (!finalConfig.enabled) return;

    const enhancedElements = new Set<HTMLElement>();

    const enhanceElement = (element: HTMLElement, route: string) => {
      if (enhancedElements.has(element)) return;

      const originalOnClick = element.onclick;
      const transitionHandler = createTransition({
        route,
        type: finalConfig.transitionType,
        autoDetect: true
      });

      element.onclick = (event) => {
        // Prevent default navigation
        event.preventDefault();
        
        // Call original handler if it exists
        if (originalOnClick) {
          originalOnClick.call(element, event);
        }
        
        // Trigger transition
        transitionHandler(event as any);
      };

      // Mark as enhanced
      enhancedElements.add(element);
      element.setAttribute('data-transition-enhanced', 'true');
    };

    const enhanceElements = () => {
      // Projects
      finalConfig.selectors.projects?.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          enhanceElement(el as HTMLElement, '/projects');
        });
      });

      // About
      finalConfig.selectors.about?.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          enhanceElement(el as HTMLElement, '/about');
        });
      });

      // Contact
      finalConfig.selectors.contact?.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          enhanceElement(el as HTMLElement, '/contact');
        });
      });

      // Blog
      finalConfig.selectors.blog?.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          enhanceElement(el as HTMLElement, '/blog');
        });
      });

      // Custom routes
      finalConfig.selectors.custom?.forEach(({ selector, route }) => {
        document.querySelectorAll(selector).forEach(el => {
          enhanceElement(el as HTMLElement, route);
        });
      });
    };

    // Initial enhancement
    enhanceElements();

    // Set up mutation observer to handle dynamically added elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              // Re-enhance after new elements are added
              setTimeout(enhanceElements, 0);
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
      // Clean up enhanced elements
      enhancedElements.forEach(element => {
        element.removeAttribute('data-transition-enhanced');
        element.onclick = null;
      });
    };
  }, [createTransition, finalConfig]);

  return null; // This component doesn't render anything
};

/**
 * Higher-order component that automatically adds transitions to child elements
 */
export const withAutoTransitions = <P extends object>(
  Component: React.ComponentType<P>,
  config?: Partial<AutoTransitionConfig>
) => {
  return (props: P) => (
    <>
      <AutoTransitionEnhancer config={config} />
      <Component {...props} />
    </>
  );
};

/**
 * Hook for programmatically enhancing specific elements
 */
export const useAutoTransitionEnhancer = (config?: Partial<AutoTransitionConfig>) => {
  const { createTransition } = useUniversalTransition();

  const enhanceElement = (element: HTMLElement, route: string) => {
    const transitionHandler = createTransition({
      route,
      type: config?.transitionType || 'expand',
      autoDetect: true
    });

    const originalOnClick = element.onclick;
    element.onclick = (event) => {
      event.preventDefault();
      if (originalOnClick) originalOnClick.call(element, event);
      transitionHandler(event as any);
    };

    element.setAttribute('data-transition-enhanced', 'true');
  };

  return { enhanceElement };
};
