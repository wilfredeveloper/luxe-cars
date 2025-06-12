import React from 'react';
import { Link } from 'react-router-dom';
import { Car } from '../data/cars';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <Link to={`/car/${car.id}`}>
        <div className="aspect-w-16 aspect-h-9 bg-gray-200 overflow-hidden">
          <img
            src={car.images[0]}
            alt={`${car.brand} ${car.name}`}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-warm-blue-600 uppercase tracking-wide">
              {car.brand}
            </span>
            <span className="text-sm text-gray-500">{car.year}</span>
          </div>
          <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2 group-hover:text-warm-blue-600 transition-colors">
            {car.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{car.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">
              ${car.price.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">
              {car.specs.horsepower} • {car.specs.acceleration}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CarCard;