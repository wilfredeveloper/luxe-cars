import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {  
  Gauge, 
  Zap, 
  Settings, 
  Cog, 
  Users, 
  Fuel,
  ChevronRight,
  Award,
  Shield,
  Star
} from 'lucide-react';
import { Car } from '../../data/cars';

interface PremiumSpecificationsProps {
  car: Car;
  className?: string;
}

const PremiumSpecifications: React.FC<PremiumSpecificationsProps> = ({ 
  car, 
  className = "" 
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('performance');
  const [hoveredSpec, setHoveredSpec] = useState<string | null>(null);

  const specCategories = {
    performance: {
      title: 'Performance',
      icon: Gauge,
      color: 'from-red-500 to-orange-500',
      bgColor: 'from-red-50 to-orange-50',
      specs: [
        { 
          key: 'engine', 
          label: 'Engine', 
          value: car.specs.engine,
          icon: Award,
          description: 'Precision-engineered powerplant'
        },
        { 
          key: 'horsepower', 
          label: 'Power Output', 
          value: car.specs.horsepower,
          icon: Zap,
          description: 'Maximum horsepower delivery'
        },
        { 
          key: 'acceleration', 
          label: 'Acceleration', 
          value: car.specs.acceleration,
          icon: Gauge,
          description: 'Lightning-fast sprint capability'
        },
        { 
          key: 'topSpeed', 
          label: 'Top Speed', 
          value: car.specs.topSpeed,
          icon: Award,
          description: 'Maximum velocity achievement'
        }
      ]
    },
    drivetrain: {
      title: 'Drivetrain',
      icon: Settings,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      specs: [
        { 
          key: 'transmission', 
          label: 'Transmission', 
          value: car.specs.transmission,
          icon: Cog,
          description: 'Advanced gear management system'
        },
        { 
          key: 'drivetrain', 
          label: 'Drive System', 
          value: car.specs.drivetrain,
          icon: Settings,
          description: 'Optimal power distribution'
        },
        { 
          key: 'fuelEconomy', 
          label: 'Efficiency', 
          value: car.specs.fuelEconomy,
          icon: Fuel,
          description: 'Fuel consumption optimization'
        },
        { 
          key: 'seating', 
          label: 'Capacity', 
          value: car.specs.seating,
          icon: Users,
          description: 'Luxurious passenger accommodation'
        }
      ]
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className={`${className}`}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="bg-gradient-to-br from-gray-50 to-gray-100 backdrop-blur-xl border border-gray-200 border-opacity-50 rounded-3xl p-8 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
              Technical Specifications
            </h2>
            <p className="text-gray-600">
              Precision engineering meets luxury craftsmanship
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-gray-400" />
            <Star className="w-6 h-6 text-yellow-500" />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex space-x-4 mb-8">
          {Object.entries(specCategories).map(([key, category]) => {
            const IconComponent = category.icon;
            return (
              <motion.button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all duration-300 ${
                  activeCategory === key
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : 'bg-white bg-opacity-50 text-gray-700 hover:bg-opacity-80'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <IconComponent className="w-5 h-5" />
                <span className="font-semibold">{category.title}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Specifications Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className={`bg-gradient-to-br ${specCategories[activeCategory as keyof typeof specCategories].bgColor} rounded-2xl p-6`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {specCategories[activeCategory as keyof typeof specCategories].specs.map((spec, index) => {
                const IconComponent = spec.icon;
                return (
                  <motion.div
                    key={spec.key}
                    variants={itemVariants}
                    className="relative group"
                    onMouseEnter={() => setHoveredSpec(spec.key)}
                    onMouseLeave={() => setHoveredSpec(null)}
                  >
                    <div className="bg-white bg-opacity-60 backdrop-blur-sm border border-white border-opacity-50 rounded-xl p-6 hover:bg-opacity-80 transition-all duration-300 cursor-pointer">
                      {/* Icon and Label */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${specCategories[activeCategory as keyof typeof specCategories].color} bg-opacity-20`}>
                            <IconComponent className="w-5 h-5 text-gray-700" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{spec.label}</h4>
                            <p className="text-sm text-gray-600">{spec.description}</p>
                          </div>
                        </div>
                        <ChevronRight 
                          className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                            hoveredSpec === spec.key ? 'transform rotate-90' : ''
                          }`} 
                        />
                      </div>

                      {/* Value */}
                      <div className="text-right">
                        <motion.div 
                          className="text-xl font-bold text-gray-900"
                          animate={{ 
                            scale: hoveredSpec === spec.key ? 1.05 : 1 
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {spec.value}
                        </motion.div>
                      </div>

                      {/* Hover Effect */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${specCategories[activeCategory as keyof typeof specCategories].color} opacity-0 rounded-xl`}
                        animate={{ 
                          opacity: hoveredSpec === spec.key ? 0.1 : 0 
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>

                    {/* Animated Border */}
                    <motion.div
                      className={`absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r ${specCategories[activeCategory as keyof typeof specCategories].color} opacity-0`}
                      animate={{ 
                        opacity: hoveredSpec === spec.key ? 0.3 : 0 
                      }}
                      transition={{ duration: 0.3 }}
                      style={{ 
                        background: hoveredSpec === spec.key 
                          ? `linear-gradient(white, white) padding-box, linear-gradient(45deg, transparent, transparent) border-box` 
                          : undefined 
                      }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Premium Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg">
            <Award className="w-5 h-5" />
            <span className="font-semibold">Premium Engineering Excellence</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PremiumSpecifications;
