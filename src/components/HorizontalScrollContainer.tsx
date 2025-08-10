import React from 'react';

interface HorizontalScrollContainerProps {
  children: React.ReactNode;
  containerRef: React.RefObject<HTMLDivElement>;
  className?: string;
}

const HorizontalScrollContainer: React.FC<HorizontalScrollContainerProps> = ({
  children,
  containerRef,
  className = ''
}) => {
  return (
    <div
      ref={containerRef}
      className={`
        horizontal-scroll-container
        h-screen w-full overflow-x-auto overflow-y-hidden
        scroll-smooth scrollbar-hide
        ${className}
      `}
      style={{
        scrollSnapType: 'x mandatory',
        scrollBehavior: 'smooth',
        scrollPaddingLeft: '0px'
      }}
    >
      <div className="flex h-full">
        {children}
      </div>
      
      {/* Custom scrollbar styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .horizontal-scroll-container {
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* Internet Explorer 10+ */
          }
          
          .horizontal-scroll-container::-webkit-scrollbar {
            display: none; /* WebKit */
          }
        `
      }} />
    </div>
  );
};

interface ScrollSectionProps {
  children: React.ReactNode;
  id: string;
  className?: string;
  chaosLevel: number;
}

export const ScrollSection: React.FC<ScrollSectionProps> = ({
  children,
  id,
  className = '',
  chaosLevel
}) => {
  // Use neutral background to let dynamic filter show through
  const getBackgroundGradient = () => {
    // Neutral dark background that allows the dynamic color filter to show through
    return 'bg-gray-900/20 dark:bg-gray-900/30';
  };

  return (
    <section
      id={id}
      className={`
        scroll-section
        min-w-full h-full flex-shrink-0
        flex flex-col justify-center items-center
        relative overflow-hidden
        ${getBackgroundGradient()}
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

export default HorizontalScrollContainer;
