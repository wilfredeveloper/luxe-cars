import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { FeaturedCar } from '../../data/featuredCars';

interface FeaturedCardProps {
  car: FeaturedCar;
  className?: string;
  index?: number;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({ car, className, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "bg-white bg-opacity-15 backdrop-blur-xl border border-white border-opacity-25 rounded-3xl p-8 shadow-2xl hover:bg-opacity-25 hover:scale-105 transition-all duration-500 w-96 group flex-shrink-0",
        className
      )}
    >
      <div className="relative overflow-hidden rounded-2xl mb-6">
        <img
          src={car.image}
          alt={car.title}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-white bg-opacity-20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border border-white border-opacity-30">
            {car.category}
          </span>
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-2xl font-bold text-white">{car.title}</h3>
        <p className="text-xl text-yellow-400 font-semibold">{car.price}</p>
        <p className="text-base text-gray-200 leading-relaxed">{car.description}</p>
      </div>
      
      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
    </motion.div>
  );
};

export default FeaturedCard;
