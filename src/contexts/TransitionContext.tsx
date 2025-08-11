import React, { createContext, useContext, useState, useCallback } from 'react';

interface TransitionState {
  isTransitioning: boolean;
  sourceElement: HTMLElement | null;
  targetRoute: string;
  transitionType: 'expand' | 'fade' | 'slide';
}

interface TransitionContextType {
  transitionState: TransitionState;
  startTransition: (element: HTMLElement, route: string, type?: 'expand' | 'fade' | 'slide') => void;
  completeTransition: () => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export const TransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transitionState, setTransitionState] = useState<TransitionState>({
    isTransitioning: false,
    sourceElement: null,
    targetRoute: '',
    transitionType: 'expand'
  });

  const startTransition = useCallback((element: HTMLElement, route: string, type: 'expand' | 'fade' | 'slide' = 'expand') => {
    setTransitionState({
      isTransitioning: true,
      sourceElement: element,
      targetRoute: route,
      transitionType: type
    });
  }, []);

  const completeTransition = useCallback(() => {
    setTransitionState({
      isTransitioning: false,
      sourceElement: null,
      targetRoute: '',
      transitionType: 'expand'
    });
  }, []);

  return (
    <TransitionContext.Provider value={{ transitionState, startTransition, completeTransition }}>
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (context === undefined) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
};
