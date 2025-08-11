import React from 'react';
import { useUniversalTransition, TransitionConfig } from '../hooks/useUniversalTransition';

interface TransitionWrapperProps {
  /** Child elements to wrap */
  children: React.ReactNode;
  /** Transition configuration */
  transition: TransitionConfig;
  /** Additional CSS classes */
  className?: string;
  /** Element type to render (default: 'div') */
  as?: keyof JSX.IntrinsicElements;
  /** Whether this element should be marked as a transition source */
  isTransitionSource?: boolean;
  /** Custom transition source identifier */
  transitionSourceId?: string;
}

/**
 * Universal transition wrapper that can make any element trigger page transitions
 * with automatic style matching and robust source detection
 */
const TransitionWrapper: React.FC<TransitionWrapperProps> = ({
  children,
  transition,
  className = '',
  as: Element = 'div',
  isTransitionSource = false,
  transitionSourceId
}) => {
  const { createTransition } = useUniversalTransition();
  const handleClick = createTransition(transition);

  const props: any = {
    className: className,
    onClick: handleClick,
    style: { cursor: 'pointer' }
  };

  // Add transition source attributes if specified
  if (isTransitionSource) {
    props['data-transition-source'] = transitionSourceId || 'default';
  }

  return React.createElement(Element, props, children);
};

export default TransitionWrapper;

// Convenience components for common use cases
export const TransitionButton: React.FC<Omit<TransitionWrapperProps, 'as'>> = (props) => (
  <TransitionWrapper {...props} as="button" />
);

export const TransitionLink: React.FC<Omit<TransitionWrapperProps, 'as'>> = (props) => (
  <TransitionWrapper {...props} as="a" />
);

export const TransitionCard: React.FC<TransitionWrapperProps> = (props) => (
  <TransitionWrapper {...props} isTransitionSource={true} />
);
