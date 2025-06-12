import React, { useState } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import { cars } from '../data/cars';
import CarCard from '../components/CarCard';

const Inventory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const brands = [...new Set(cars.map(car => car.brand))];

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.model.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBrand = brandFilter === '' || car.brand === brandFilter;
    
    const matchesPrice = priceFilter === '' || 
                        (priceFilter === 'under-150k' && car.price < 150000) ||
                        (priceFilter === '150k-250k' && car.price >= 150000 && car.price < 250000) ||
                        (priceFilter === 'over-250k' && car.price >= 250000);
    
    return matchesSearch && matchesBrand && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Luxury Vehicle Inventory
          </h1>
          <p className="text-xl text-gray-600">
            Discover our curated collection of the world's finest automobiles
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search vehicles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-blue-500 focus:border-transparent"
            >
              <option value="">All Brands</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
            
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-blue-500 focus:border-transparent"
            >
              <option value="">All Prices</option>
              <option value="under-150k">Under $150,000</option>
              <option value="150k-250k">$150,000 - $250,000</option>
              <option value="over-250k">Over $250,000</option>
            </select>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-warm-blue-100 text-warm-blue-600' : 'bg-gray-100 text-gray-600'}`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-warm-blue-100 text-warm-blue-600' : 'bg-gray-100 text-gray-600'}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{filteredCars.length} vehicles found</span>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filters applied: {[searchTerm, brandFilter, priceFilter].filter(Boolean).length}</span>
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredCars.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚗</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No vehicles found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
            : 'space-y-6'
          }>
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;