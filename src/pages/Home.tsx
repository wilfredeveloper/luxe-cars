import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Award, CheckCircle } from 'lucide-react';
import { cars } from '../data/cars';
import CarCard from '../components/CarCard';
import heroBg from '../data/hero-bg.jpg';

const Home: React.FC = () => {
  const featuredCars = cars.filter(car => car.featured).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Hero Content - Centered */}
        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)] px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-white">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
                Ordinary Roads Need{' '}
                <span className="text-yellow-400">Extraordinary</span>{' '}
                Cars
              </h1>
              <p className="text-lg lg:text-xl text-gray-200 mb-4 max-w-2xl mx-auto">
                Rent a luxury car and experience the joy of high-performance.
              </p>
              <p className="text-lg lg:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                No limits, just speed and style. Own your dream ride today !
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/inventory"
                  className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors text-center"
                >
                  Buy Now
                </Link>
                <Link
                  to="/inventory"
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition-colors text-center"
                >
                  View Fleet
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dream Car Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                FIND YOUR DREAM CAR TODAY
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                At Elite Motors, we offer a wide selection of high-quality vehicles to suit every style and budget. Browse our inventory.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-lg">Quality Cars</div>
                    <div className="text-gray-600">Explore our collection of top-notch vehicles that combine luxury and performance.</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-lg">Exception Service</div>
                    <div className="text-gray-600">Experience our personalized approach to car buying and selling.</div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Link
                  to="/inventory"
                  className="bg-warm-blue-600 hover:bg-warm-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300"
                >
                  Sign Up
                </Link>
                <button className="text-gray-900 font-semibold hover:text-warm-blue-600 transition-colors">
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Content - Car Detail Card */}
            <div className="bg-gray-900 rounded-2xl p-8 text-white">
              <img
                src="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg"
                alt="Car Interior"
                className="w-full h-48 object-cover rounded-lg mb-6"
              />
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="w-10 h-10 bg-white rounded-full mx-auto mb-3 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-gray-900" />
                  </div>
                  <div className="text-sm text-gray-300">Quality Cars</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="w-10 h-10 bg-white rounded-full mx-auto mb-3 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-gray-900" />
                  </div>
                  <div className="text-sm text-gray-300">Champion Service</div>
                </div>
              </div>
              
              <Link
                to="/inventory"
                className="block w-full bg-warm-blue-600 hover:bg-warm-blue-700 text-center py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>



      {/* Pick Your Car Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-12">
              PICK YOUR CAR
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-10 w-10 text-gray-900" />
                </div>
                <div className="text-lg font-semibold text-gray-900">Easy Process</div>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-10 w-10 text-gray-900" />
                </div>
                <div className="text-lg font-semibold text-gray-900">Fast Approval</div>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-10 w-10 text-gray-900" />
                </div>
                <div className="text-lg font-semibold text-gray-900">Secure Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
              Why Choose Elite Motors
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We don't just sell cars – we curate exceptional automotive experiences for discerning clientele.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-warm-blue-100 text-warm-blue-600 rounded-full mb-6">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Exceptional Quality</h3>
              <p className="text-gray-600">
                Every vehicle in our collection undergoes rigorous inspection to ensure the highest standards of quality and performance.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-warm-blue-100 text-warm-blue-600 rounded-full mb-6">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Comprehensive Warranty</h3>
              <p className="text-gray-600">
                Our exclusive warranty programs provide peace of mind and protect your investment for years to come.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-warm-blue-100 text-warm-blue-600 rounded-full mb-6">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">White-Glove Service</h3>
              <p className="text-gray-600">
                From initial consultation to delivery, our dedicated team ensures a seamless and personalized experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
              Featured Collection
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our hand-selected vehicles that represent the pinnacle of automotive excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/inventory"
              className="inline-flex items-center space-x-2 bg-warm-blue-600 hover:bg-warm-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300"
            >
              <span>View Full Inventory</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif font-bold mb-6">
            Ready to Find Your Perfect Vehicle?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let our expert team help you discover the luxury vehicle that matches your lifestyle and preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-warm-blue-600 hover:bg-warm-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300"
            >
              Contact Our Specialists
            </Link>
            <a
              href="tel:+15551234567"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold transition-colors duration-300"
            >
              Call (555) 123-4567
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;