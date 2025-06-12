import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { showcaseCars } from '../data/showcaseCars';
import CarShowcaseSlide from './ui/CarShowcaseSlide';

interface FullScreenCarShowcaseProps {
  onComplete?: () => void;
}

const FullScreenCarShowcase: React.FC<FullScreenCarShowcaseProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hasCompletedShowcase, setHasCompletedShowcase] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLElement>(null);

  const goToSlide = (index: number, direction: 'up' | 'down' = 'down') => {
    if (index >= 0 && index < showcaseCars.length && index !== currentSlide && !isTransitioning) {
      setIsTransitioning(true);
      setScrollDirection(direction);
      setCurrentSlide(index);

      // Check if user has viewed all cars
      if (index === showcaseCars.length - 1 && !hasCompletedShowcase) {
        setHasCompletedShowcase(true);
      }

      setTimeout(() => {
        setIsTransitioning(false);
      }, 800);
    }
  };

  const nextSlide = () => {
    const nextIndex = currentSlide + 1;
    if (nextIndex < showcaseCars.length) {
      goToSlide(nextIndex, 'down');
    } else if (isAutoPlaying) {
      goToSlide(0, 'down'); // Loop back to start
    }
  };

  const prevSlide = () => {
    const prevIndex = currentSlide - 1;
    if (prevIndex >= 0) {
      goToSlide(prevIndex, 'up');
    } else {
      goToSlide(showcaseCars.length - 1, 'up'); // Loop to end
    }
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && !isTransitioning) {
      autoPlayRef.current = setTimeout(() => {
        nextSlide();
      }, 5000); // Change slide every 5 seconds
    }

    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [currentSlide, isAutoPlaying, isTransitioning]);

  // Pause auto-play when user hovers over the section
  const handleMouseEnter = () => {
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
    }
  };

  const handleMouseLeave = () => {
    // Resume auto-play if it was enabled
    if (isAutoPlaying && !isTransitioning) {
      autoPlayRef.current = setTimeout(() => {
        nextSlide();
      }, 5000);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[600px] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Car Showcase Slides */}
      <AnimatePresence mode="wait">
        {showcaseCars.map((car, index) => (
          <CarShowcaseSlide
            key={car.id}
            car={car}
            isActive={index === currentSlide}
            direction={scrollDirection}
          />
        ))}
      </AnimatePresence>

      {/* Navigation Controls - Left Side */}
      <div className="absolute left-2 sm:left-4 md:left-6 lg:left-8 top-1/2 transform -translate-y-1/2 z-20 flex flex-col space-y-2 sm:space-y-3 md:space-y-4">
        {/* Ensure controls don't overlap with content on small screens */}
        {/* Previous Button */}
        <motion.button
          onClick={prevSlide}
          disabled={isTransitioning}
          className="bg-black bg-opacity-20 backdrop-blur-xl border border-white border-opacity-25 rounded-full p-2 sm:p-3 md:p-4 text-white hover:bg-opacity-30 transition-all duration-300 disabled:opacity-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft size={16} className="sm:hidden" />
          <ChevronLeft size={20} className="hidden sm:block md:hidden" />
          <ChevronLeft size={24} className="hidden md:block" />
        </motion.button>

        {/* Auto-play Toggle */}
        <motion.button
          onClick={toggleAutoPlay}
          className="bg-black bg-opacity-20 backdrop-blur-xl border border-white border-opacity-25 rounded-full p-2 sm:p-3 md:p-4 text-white hover:bg-opacity-30 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isAutoPlaying ? (
            <>
              <Pause size={14} className="sm:hidden" />
              <Pause size={16} className="hidden sm:block md:hidden" />
              <Pause size={20} className="hidden md:block" />
            </>
          ) : (
            <>
              <Play size={14} className="sm:hidden" />
              <Play size={16} className="hidden sm:block md:hidden" />
              <Play size={20} className="hidden md:block" />
            </>
          )}
        </motion.button>

        {/* Next Button */}
        <motion.button
          onClick={nextSlide}
          disabled={isTransitioning}
          className="bg-black bg-opacity-20 backdrop-blur-xl border border-white border-opacity-25 rounded-full p-2 sm:p-3 md:p-4 text-white hover:bg-opacity-30 transition-all duration-300 disabled:opacity-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight size={16} className="sm:hidden" />
          <ChevronRight size={20} className="hidden sm:block md:hidden" />
          <ChevronRight size={24} className="hidden md:block" />
        </motion.button>
      </div>

      {/* Navigation Indicators - Right Side */}
      <div className="absolute right-2 sm:right-4 md:right-6 lg:right-8 top-1/2 transform -translate-y-1/2 z-20">
        <div className="flex flex-col space-y-2 sm:space-y-3 md:space-y-4">
          {showcaseCars.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index, index > currentSlide ? 'down' : 'up')}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full border-2 border-white transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white scale-125'
                  : 'bg-transparent hover:bg-white hover:bg-opacity-50'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              disabled={isTransitioning}
            />
          ))}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="bg-black bg-opacity-20 backdrop-blur-xl border border-white border-opacity-25 rounded-full px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3">
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 text-white">
            <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
              {currentSlide + 1} / {showcaseCars.length}
            </span>
            <div className="w-16 sm:w-24 md:w-32 h-1 bg-white bg-opacity-30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: `${((currentSlide + 1) / showcaseCars.length) * 100}%`
                }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Auto-play Progress Ring */}
      {isAutoPlaying && (
        <div className="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8 z-20">
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-white text-opacity-20"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <motion.path
                className="text-white"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 5, ease: "linear", repeat: Infinity }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      )}

      {/* Completion Indicator */}
      <AnimatePresence>
        {hasCompletedShowcase && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-4 sm:top-6 md:top-8 left-4 sm:left-6 md:left-8 z-20 bg-green-500 bg-opacity-20 backdrop-blur-xl border border-green-400 border-opacity-50 rounded-full px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3"
          >
            <div className="flex items-center space-x-2 text-green-400">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-medium whitespace-nowrap">All Cars Viewed</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Hint */}
      <AnimatePresence>
        {currentSlide === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 2, duration: 0.6 }}
            className="absolute bottom-16 sm:bottom-18 md:bottom-20 left-2 sm:left-4 md:left-8 z-20 bg-black bg-opacity-20 backdrop-blur-xl border border-white border-opacity-25 rounded-full px-3 sm:px-4 py-1.5 sm:py-2"
          >
            <div className="flex items-center space-x-1.5 sm:space-x-2 text-white text-xs sm:text-sm">
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronRight size={12} className="sm:hidden" />
                <ChevronRight size={16} className="hidden sm:block" />
              </motion.div>
              <span className="whitespace-nowrap">Use controls to navigate</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FullScreenCarShowcase;
