import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  Shield, 
  Headphones, 
  Smartphone, 
  Wind, 
  Sun, 
  Car, 
  Zap,
  Crown,
  Sparkles
} from 'lucide-react';

interface PremiumFeaturesProps {
  features: string[];
  className?: string;
}

const PremiumFeatures: React.FC<PremiumFeaturesProps> = ({ 
  features, 
  className = "" 
}) => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  // Map features to icons and categories
  const getFeatureIcon = (feature: string) => {
    const lowerFeature = feature.toLowerCase();
    
    if (lowerFeature.includes('audio') || lowerFeature.includes('sound') || lowerFeature.includes('naim') || lowerFeature.includes('burmester')) {
      return { icon: Headphones, color: 'from-purple-500 to-pink-500', category: 'Audio' };
    }
    if (lowerFeature.includes('leather') || lowerFeature.includes('seat') || lowerFeature.includes('massage')) {
      return { icon: Crown, color: 'from-amber-500 to-orange-500', category: 'Comfort' };
    }
    if (lowerFeature.includes('cruise') || lowerFeature.includes('adaptive') || lowerFeature.includes('control')) {
      return { icon: Shield, color: 'from-blue-500 to-cyan-500', category: 'Safety' };
    }
    if (lowerFeature.includes('sunroof') || lowerFeature.includes('panoramic')) {
      return { icon: Sun, color: 'from-yellow-500 to-orange-500', category: 'Comfort' };
    }
    if (lowerFeature.includes('heated') || lowerFeature.includes('ventilated') || lowerFeature.includes('climate')) {
      return { icon: Wind, color: 'from-green-500 to-teal-500', category: 'Climate' };
    }
    if (lowerFeature.includes('display') || lowerFeature.includes('infotainment') || lowerFeature.includes('mbux')) {
      return { icon: Smartphone, color: 'from-indigo-500 to-purple-500', category: 'Technology' };
    }
    if (lowerFeature.includes('suspension') || lowerFeature.includes('ride') || lowerFeature.includes('dynamic')) {
      return { icon: Car, color: 'from-red-500 to-pink-500', category: 'Performance' };
    }
    if (lowerFeature.includes('led') || lowerFeature.includes('light') || lowerFeature.includes('matrix')) {
      return { icon: Zap, color: 'from-yellow-400 to-yellow-600', category: 'Lighting' };
    }
    
    // Default
    return { icon: Sparkles, color: 'from-gray-500 to-gray-700', category: 'Premium' };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <div className={className}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl font-serif font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Premium Features
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover the exceptional amenities that define luxury automotive excellence
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {features.map((feature, index) => {
            const featureData = getFeatureIcon(feature);
            const IconComponent = featureData.icon;
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="relative bg-white bg-opacity-60 backdrop-blur-xl border border-white border-opacity-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden">
                  {/* Background Gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${featureData.color} opacity-0 transition-opacity duration-500`}
                    animate={{ 
                      opacity: hoveredFeature === index ? 0.1 : 0 
                    }}
                  />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon and Category */}
                    <div className="flex items-center justify-between mb-4">
                      <motion.div
                        className={`p-3 rounded-xl bg-gradient-to-r ${featureData.color} bg-opacity-20 backdrop-blur-sm`}
                        animate={{ 
                          scale: hoveredFeature === index ? 1.1 : 1,
                          rotate: hoveredFeature === index ? 5 : 0
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <IconComponent className="w-6 h-6 text-gray-700" />
                      </motion.div>
                      
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${featureData.color} text-white opacity-80`}>
                        {featureData.category}
                      </span>
                    </div>

                    {/* Feature Text */}
                    <motion.h3 
                      className="text-lg font-semibold text-gray-900 leading-tight"
                      animate={{ 
                        y: hoveredFeature === index ? -2 : 0 
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {feature}
                    </motion.h3>

                    {/* Premium Indicator */}
                    <motion.div
                      className="flex items-center mt-3 space-x-1"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: hoveredFeature === index ? 1 : 0.6 
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {[...Array(5)].map((_, starIndex) => (
                        <motion.div
                          key={starIndex}
                          initial={{ scale: 0 }}
                          animate={{ 
                            scale: hoveredFeature === index ? 1 : 0.8 
                          }}
                          transition={{ 
                            duration: 0.2, 
                            delay: starIndex * 0.05 
                          }}
                        >
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>

                  {/* Hover Border Effect */}
                  <motion.div
                    className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r ${featureData.color} opacity-0`}
                    animate={{ 
                      opacity: hoveredFeature === index ? 0.4 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: hoveredFeature === index 
                        ? `linear-gradient(white, white) padding-box, linear-gradient(45deg, ${featureData.color.split(' ')[1]}, ${featureData.color.split(' ')[3]}) border-box`
                        : undefined
                    }}
                  />

                  {/* Sparkle Effect */}
                  <AnimatePresence>
                    {hoveredFeature === index && (
                      <motion.div
                        className="absolute top-2 right-2"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Floating Animation */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{ 
                    y: hoveredFeature === index ? -2 : 0 
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-4 rounded-full shadow-lg">
            <Crown className="w-5 h-5" />
            <span className="font-semibold">Luxury Redefined</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PremiumFeatures;
