import React from 'react';
import { Car, Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Car className="h-8 w-8 text-warm-blue-500" />
              <span className="text-2xl font-serif font-semibold">Elite Motors</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Experience the pinnacle of luxury automotive excellence. We specialize in the finest 
              European luxury vehicles, offering unparalleled service and expertise.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>123 Luxury Avenue, Beverly Hills, CA 90210</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="h-4 w-4" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4" />
                <span>info@elitemotors.com</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-warm-blue-400 transition-colors">Home</a></li>
              <li><a href="/inventory" className="text-gray-300 hover:text-warm-blue-400 transition-colors">Inventory</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-warm-blue-400 transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-300 hover:text-warm-blue-400 transition-colors">Financing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-warm-blue-400 transition-colors">Trade-In</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Hours</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Mon-Fri: 9AM-7PM</span>
              </div>
              <div className="ml-6">Saturday: 9AM-6PM</div>
              <div className="ml-6">Sunday: 11AM-5PM</div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Elite Motors. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;