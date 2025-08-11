import { useCallback } from 'react';
import { useTransition } from '../contexts/TransitionContext';

export interface TransitionConfig {
  /** Target route to navigate to */
  route: string;
  /** Animation type */
  type?: 'expand' | 'fade' | 'slide';
  /** Duration in milliseconds */
  duration?: number;
  /** Custom selector for source element (optional) */
  sourceSelector?: string;
  /** Whether to auto-detect the closest styled container */
  autoDetect?: boolean;
}

export const useUniversalTransition = () => {
  const { startTransition } = useTransition();

  /**
   * Creates a transition handler that can be used with any clickable element
   * @param config - Transition configuration
   * @returns Click handler function
   */
  const createTransition = useCallback((config: TransitionConfig) => {
    return (event: React.MouseEvent) => {
      event.preventDefault();
      
      let sourceElement: HTMLElement | null = null;
      const target = event.target as HTMLElement;
      
      // Priority 1: Use custom selector if provided
      if (config.sourceSelector) {
        sourceElement = document.querySelector(config.sourceSelector);
      }
      
      // Priority 2: Auto-detect styled containers (default behavior)
      if (!sourceElement && (config.autoDetect !== false)) {
        // Look for common styled containers in order of preference
        sourceElement = target.closest('[data-transition-source]') as HTMLElement ||
                       target.closest('.bg-white\\/5') as HTMLElement ||
                       target.closest('.backdrop-blur-md') as HTMLElement ||
                       target.closest('.rounded-2xl') as HTMLElement ||
                       target.closest('.max-w-5xl') as HTMLElement ||
                       target.closest('.border') as HTMLElement ||
                       target.closest('section') as HTMLElement ||
                       target.closest('div') as HTMLElement;
      }
      
      // Priority 3: Fallback to clicked element's parent
      if (!sourceElement) {
        sourceElement = target.parentElement as HTMLElement;
      }
      
      if (sourceElement) {
        startTransition(sourceElement, config.route, config.type || 'expand');
      }
    };
  }, [startTransition]);

  /**
   * Quick transition creator for common use cases
   */
  const transitionTo = useCallback((route: string, sourceSelector?: string) => {
    return createTransition({
      route,
      sourceSelector,
      type: 'expand',
      autoDetect: true
    });
  }, [createTransition]);

  return {
    createTransition,
    transitionTo
  };
};
