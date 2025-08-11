import { useCallback } from 'react';
import { useTransition } from '../contexts/TransitionContext';

export const useAdvancedTransition = () => {
  const { startTransition } = useTransition();

  const triggerTransition = useCallback((
    targetRoute: string,
    sourceElementSelector?: string,
    transitionType: 'expand' | 'fade' | 'slide' = 'expand'
  ) => {
    return (event: React.MouseEvent) => {
      event.preventDefault();
      
      // Find the source element for the transition
      let sourceElement: HTMLElement | null = null;
      
      if (sourceElementSelector) {
        sourceElement = document.querySelector(sourceElementSelector);
      } else {
        // Try to find the closest content panel (frosted glass container)
        const target = event.target as HTMLElement;
        sourceElement = target.closest('.bg-white\\/5') as HTMLElement ||
                       target.closest('[data-transition-source]') as HTMLElement ||
                       target.closest('.max-w-5xl') as HTMLElement;
      }
      
      if (sourceElement) {
        startTransition(sourceElement, targetRoute, transitionType);
      } else {
        // Fallback: use the clicked element's parent container
        const target = event.target as HTMLElement;
        const fallbackElement = target.closest('div') as HTMLElement;
        if (fallbackElement) {
          startTransition(fallbackElement, targetRoute, transitionType);
        }
      }
    };
  }, [startTransition]);

  return { triggerTransition };
};
