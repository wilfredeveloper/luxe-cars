import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, Heart, Share2, Calendar } from 'lucide-react';
import { cars } from '../data/cars';
import { formatPrice } from '../lib/utils';
import InteractiveSpeedometer from '../components/ui/InteractiveSpeedometer';
import InteractiveFuelEfficiency from '../components/ui/InteractiveFuelEfficiency';
import PremiumSpecifications from '../components/ui/PremiumSpecifications';
import PremiumFeatures from '../components/ui/PremiumFeatures';

const CarDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  
  const car = cars.find(c => c.id === parseInt(id || '0'));
  
  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Vehicle Not Found</h1>
          <Link to="/inventory" className="text-warm-blue-600 hover:text-warm-blue-700">
            Return to Inventory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <div className="bg-white bg-opacity-80 backdrop-blur-xl border-b border-gray-200 border-opacity-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/inventory" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-300">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-medium">Back to Inventory</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-3 text-gray-600 hover:text-red-600 transition-colors duration-300 bg-white bg-opacity-50 backdrop-blur-sm rounded-full hover:bg-opacity-80">
                <Heart className="h-5 w-5" />
              </button>
              <button className="p-3 text-gray-600 hover:text-gray-900 transition-colors duration-300 bg-white bg-opacity-50 backdrop-blur-sm rounded-full hover:bg-opacity-80">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="relative bg-white bg-opacity-60 backdrop-blur-xl border border-white border-opacity-50 rounded-3xl p-4 shadow-2xl mb-6">
              <div className="aspect-w-16 aspect-h-10 bg-gray-200 rounded-2xl overflow-hidden">
                <img
                  src={car.images[selectedImage]}
                  alt={`${car.brand} ${car.name}`}
                  className="w-full h-96 object-cover transition-all duration-500"
                />
              </div>
              {/* Image overlay with car info */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-black bg-opacity-40 backdrop-blur-sm text-white p-4 rounded-xl">
                  <h3 className="text-lg font-semibold">{car.brand} {car.name}</h3>
                  <p className="text-sm opacity-90">{car.year} • {car.model}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {car.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative bg-white bg-opacity-60 backdrop-blur-xl border border-white border-opacity-50 rounded-2xl p-2 shadow-lg transition-all duration-300 hover:shadow-xl ${
                    selectedImage === index
                      ? 'ring-2 ring-warm-blue-500 bg-opacity-80'
                      : 'hover:bg-opacity-80'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${car.brand} ${car.name} view ${index + 1}`}
                    className="w-full h-24 object-cover rounded-xl"
                  />
                  {selectedImage === index && (
                    <div className="absolute inset-0 bg-warm-blue-500 bg-opacity-20 rounded-2xl" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Vehicle Information */}
          <div>
            <div className="bg-white bg-opacity-60 backdrop-blur-xl border border-white border-opacity-50 rounded-3xl p-8 shadow-2xl mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-gradient-to-r from-warm-blue-500 to-warm-blue-600 text-white text-sm font-semibold uppercase tracking-wide px-4 py-2 rounded-full">
                  {car.brand}
                </span>
                <span className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">{car.year}</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                {car.name}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {car.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {formatPrice(car.price)}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 mb-1">Starting Price</p>
                  <p className="text-sm text-green-600 font-medium">Premium Financing Available</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-6 mb-8">
              <button
                onClick={() => setShowInquiryForm(true)}
                className="w-full bg-gradient-to-r from-warm-blue-600 to-warm-blue-700 hover:from-warm-blue-700 hover:to-warm-blue-800 text-white px-8 py-5 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                Inquire About This Vehicle
              </button>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="tel:+15551234567"
                  className="flex items-center justify-center space-x-2 bg-white bg-opacity-60 backdrop-blur-xl border border-white border-opacity-50 text-gray-700 hover:bg-opacity-80 px-6 py-4 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Phone className="h-5 w-5" />
                  <span>Call Now</span>
                </a>
                <button className="flex items-center justify-center space-x-2 bg-white bg-opacity-60 backdrop-blur-xl border border-white border-opacity-50 text-gray-700 hover:bg-opacity-80 px-6 py-4 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <Calendar className="h-5 w-5" />
                  <span>Test Drive</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Specifications */}
        <div className="mt-16">
          <PremiumSpecifications car={car} />
        </div>

        {/* Premium Features */}
        <div className="mt-16">
          <PremiumFeatures features={car.features} />
        </div>
      </div>

      {/* Inquiry Form Modal */}
      {showInquiryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white bg-opacity-90 backdrop-blur-xl border border-white border-opacity-50 rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
              Inquire About {car.brand} {car.name}
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-blue-500 focus:border-transparent"
                  placeholder="I'm interested in learning more about this vehicle..."
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-warm-blue-600 hover:bg-warm-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
                >
                  Send Inquiry
                </button>
                <button
                  type="button"
                  onClick={() => setShowInquiryForm(false)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 hover:border-gray-400 px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetail;