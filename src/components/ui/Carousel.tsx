import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface CarouselProps {
  children: React.ReactNode[];
  autoScroll?: boolean;
  scrollSpeed?: number;
  pauseOnHover?: boolean;
  className?: string;
  gap?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  autoScroll = true,
  scrollSpeed = 50, // pixels per second
  pauseOnHover = true,
  className,
  gap = 48 // gap in pixels
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!autoScroll || (pauseOnHover && isHovered)) return;
    
    const animate = () => {
      if (!containerRef.current || !contentRef.current) return;
      
      const containerWidth = containerRef.current.offsetWidth;
      const contentWidth = contentRef.current.offsetWidth;
      const maxTranslate = -(contentWidth / 2); // Half because we duplicate content
      
      setTranslateX(prev => {
        const newTranslate = prev - scrollSpeed / 60; // 60fps
        return newTranslate <= maxTranslate ? 0 : newTranslate;
      });
    };
    
    const intervalId = setInterval(animate, 1000 / 60); // 60fps
    
    return () => clearInterval(intervalId);
  }, [autoScroll, scrollSpeed, isHovered, pauseOnHover]);
  
  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <div
        ref={containerRef}
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          ref={contentRef}
          className="flex"
          style={{
            transform: `translateX(${translateX}px)`,
            gap: `${gap}px`
          }}
          transition={{
            type: "tween",
            ease: "linear",
            duration: 0
          }}
        >
          {/* Original content */}
          {children.map((child, index) => (
            <div key={`original-${index}`} className="flex-shrink-0">
              {child}
            </div>
          ))}
          
          {/* Duplicated content for seamless loop */}
          {children.map((child, index) => (
            <div key={`duplicate-${index}`} className="flex-shrink-0">
              {child}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Carousel;
