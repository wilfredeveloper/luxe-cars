import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, Heart, Share2, Calendar, Gauge, Fuel, Users } from 'lucide-react';
import { cars } from '../data/cars';

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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/inventory" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Inventory</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-red-600 transition-colors">
                <Heart className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
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
            <div className="aspect-w-16 aspect-h-10 bg-gray-200 rounded-lg overflow-hidden mb-4">
              <img
                src={car.images[selectedImage]}
                alt={`${car.brand} ${car.name}`}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {car.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-w-16 aspect-h-10 bg-gray-200 rounded-lg overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-warm-blue-500' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`${car.brand} ${car.name} view ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Vehicle Information */}
          <div>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-warm-blue-600 uppercase tracking-wide">
                  {car.brand}
                </span>
                <span className="text-sm text-gray-500">{car.year}</span>
              </div>
              <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
                {car.name}
              </h1>
              <p className="text-gray-600 text-lg mb-6">
                {car.description}
              </p>
              <div className="text-4xl font-bold text-gray-900 mb-8">
                ${car.price.toLocaleString()}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Gauge className="h-5 w-5 text-warm-blue-600" />
                  <span className="font-medium text-gray-900">Performance</span>
                </div>
                <div className="text-sm text-gray-600">
                  <div>{car.specs.horsepower}</div>
                  <div>{car.specs.acceleration}</div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Fuel className="h-5 w-5 text-warm-blue-600" />
                  <span className="font-medium text-gray-900">Efficiency</span>
                </div>
                <div className="text-sm text-gray-600">
                  <div>{car.specs.fuelEconomy}</div>
                  <div>{car.specs.transmission}</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 mb-8">
              <button
                onClick={() => setShowInquiryForm(true)}
                className="w-full bg-warm-blue-600 hover:bg-warm-blue-700 text-white px-6 py-4 rounded-lg font-semibold transition-colors duration-300"
              >
                Inquire About This Vehicle
              </button>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="tel:+15551234567"
                  className="flex items-center justify-center space-x-2 border-2 border-gray-300 text-gray-700 hover:border-warm-blue-600 hover:text-warm-blue-600 px-4 py-3 rounded-lg font-medium transition-colors duration-300"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call Now</span>
                </a>
                <button className="flex items-center justify-center space-x-2 border-2 border-gray-300 text-gray-700 hover:border-warm-blue-600 hover:text-warm-blue-600 px-4 py-3 rounded-lg font-medium transition-colors duration-300">
                  <Calendar className="h-4 w-4" />
                  <span>Test Drive</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-16">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">Specifications</h2>
          <div className="bg-gray-50 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Engine & Performance</h3>
                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Engine</dt>
                    <dd className="font-medium text-gray-900">{car.specs.engine}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Horsepower</dt>
                    <dd className="font-medium text-gray-900">{car.specs.horsepower}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">0-60 mph</dt>
                    <dd className="font-medium text-gray-900">{car.specs.acceleration}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Top Speed</dt>
                    <dd className="font-medium text-gray-900">{car.specs.topSpeed}</dd>
                  </div>
                </dl>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Drivetrain & Features</h3>
                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Transmission</dt>
                    <dd className="font-medium text-gray-900">{car.specs.transmission}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Drivetrain</dt>
                    <dd className="font-medium text-gray-900">{car.specs.drivetrain}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Fuel Economy</dt>
                    <dd className="font-medium text-gray-900">{car.specs.fuelEconomy}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Seating</dt>
                    <dd className="font-medium text-gray-900">{car.specs.seating}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">Premium Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {car.features.map((feature, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-warm-blue-600 rounded-full"></div>
                  <span className="text-gray-900 font-medium">{feature}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inquiry Form Modal */}
      {showInquiryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
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