import React from 'react';

interface VerticalScrollContainerProps {
  children: React.ReactNode;
  containerRef: React.RefObject<HTMLDivElement>;
  className?: string;
}

const VerticalScrollContainer: React.FC<VerticalScrollContainerProps> = ({
  children,
  containerRef,
  className = ''
}) => {
  return (
    <div
      ref={containerRef}
      className={`
        vertical-scroll-container
        h-screen w-full overflow-y-auto overflow-x-hidden
        scroll-smooth
        ${className}
      `}
      style={{
        scrollSnapType: 'y mandatory',
        scrollBehavior: 'smooth'
      }}
    >
      {children}
    </div>
  );
};

interface ScrollSectionProps {
  children: React.ReactNode;
  id: string;
  className?: string;
}

export const ScrollSection: React.FC<ScrollSectionProps> = ({
  children,
  id,
  className = ''
}) => {
  return (
    <section
      id={id}
      className={`
        scroll-section
        min-h-screen w-full
        flex flex-col justify-center items-center
        relative overflow-hidden
        bg-gray-900/30
        ${className}
      `}
      style={{
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always'
      }}
    >
      <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-10">
        {children}
      </div>
    </section>
  );
};

export default VerticalScrollContainer;
