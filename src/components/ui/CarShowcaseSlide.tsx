import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShowcaseCar, showcaseToCarIdMapping } from '../../data/showcaseCars';

interface CarShowcaseSlideProps {
  car: ShowcaseCar;
  isActive: boolean;
  direction: 'up' | 'down';
}

const CarShowcaseSlide: React.FC<CarShowcaseSlideProps> = ({ 
  car, 
  isActive, 
  direction 
}) => {
  // Animation variants for text content
  const textVariants = {
    hidden: {
      opacity: 0,
      y: direction === 'down' ? 50 : -50,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: direction === 'down' ? 30 : -30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const backgroundVariants = {
    hidden: {
      opacity: 0,
      scale: 1.1,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <div className={`absolute inset-0 w-full h-full ${isActive ? 'z-10' : 'z-0'} ${!isActive ? 'pointer-events-none' : ''}`}>
      {/* Background Image with Fade Animation */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        variants={backgroundVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
      >
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${car.backgroundImage})`,
          }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          {/* Ensure content doesn't overlap with controls */}
          <div className="max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl ml-12 sm:ml-16 md:ml-20 lg:ml-24 mr-8 sm:mr-12 md:mr-16 lg:mr-20">
            {/* Glassmorphic Text Container */}
            <motion.div
              className="bg-black bg-opacity-20 backdrop-blur-xl border border-white border-opacity-25 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 shadow-2xl my-4 sm:my-6 md:my-8"
              variants={textVariants}
              initial="hidden"
              animate={isActive ? "visible" : "hidden"}
            >
              {/* Category Badge */}
              <motion.div variants={itemVariants} className="mb-3 md:mb-4">
                <span className="bg-white bg-opacity-20 backdrop-blur-sm text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white border-opacity-30">
                  {car.category}
                </span>
              </motion.div>

              {/* Brand */}
              <motion.div variants={itemVariants} className="mb-1 md:mb-2">
                <p className="text-white text-sm sm:text-base md:text-lg font-medium tracking-wider uppercase opacity-80">
                  {car.brand}
                </p>
              </motion.div>

              {/* Car Name & Model */}
              <motion.div variants={itemVariants} className="mb-3 md:mb-4">
                <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-serif font-bold leading-tight">
                  {car.name}
                </h1>
                <p className="text-white text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl font-light mt-1 md:mt-2 opacity-90">
                  {car.model}
                </p>
              </motion.div>

              {/* Description */}
              <motion.div variants={itemVariants} className="mb-4 md:mb-6 lg:mb-8">
                <p className="text-white text-sm sm:text-base md:text-lg leading-relaxed opacity-90">
                  {car.description}
                </p>
              </motion.div>

              {/* Features List */}
              <motion.div variants={itemVariants} className="mb-4 md:mb-6 lg:mb-8">
                <h3 className="text-white text-lg sm:text-xl md:text-xl font-semibold mb-3 md:mb-4">
                  Featured Specifications
                </h3>
                <ul className="space-y-2 md:space-y-3">
                  {car.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      variants={itemVariants}
                      className="flex items-center text-white"
                    >
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full mr-3 md:mr-4 opacity-80 flex-shrink-0" />
                      <span className="text-sm sm:text-base md:text-lg opacity-90">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Price & CTA */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div>
                  <p className="text-white text-xs sm:text-sm uppercase tracking-wider opacity-70 mb-1">
                    Starting Price
                  </p>
                  <p className="text-white text-2xl sm:text-3xl md:text-3xl font-bold">
                    {car.price}
                  </p>
                </div>

                {/* CTA Button */}
                <Link
                  to={`/car/${showcaseToCarIdMapping[car.id]}`}
                  className="inline-block z-10"
                >
                  <motion.div
                    className="bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full hover:bg-opacity-30 transition-all duration-300 font-semibold text-sm sm:text-base cursor-pointer text-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore Details
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarShowcaseSlide;
