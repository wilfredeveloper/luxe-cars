import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const location = useLocation();
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [isCompressed, setIsCompressed] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';

      if (direction !== scrollDirection && Math.abs(currentScrollY - lastScrollY) > 10) {
        setScrollDirection(direction);
      }

      setScrollY(currentScrollY);
      lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
    };

    const handleScroll = () => requestAnimationFrame(updateScrollDirection);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollDirection]);

  useEffect(() => {
    // Determine if navigation should be compressed
    const heroHeight = window.innerHeight; // Assuming hero is full viewport height
    const shouldCompress = scrollY > heroHeight * 0.8 && scrollDirection === 'down';
    setIsCompressed(shouldCompress);
  }, [scrollY, scrollDirection]);

  const navigationVariants = {
    expanded: {
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    compressed: {
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const logoVariants = {
    expanded: {
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    compressed: {
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const pillVariants = {
    expanded: {
      width: 'auto',
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    compressed: {
      width: 'auto',
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const contentVariants = {
    expanded: {
      opacity: 1,
      width: 'auto',
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    compressed: {
      opacity: 0,
      width: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const linkVariants = {
    expanded: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    compressed: {
      opacity: 0,
      x: -20,
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const menuItems = [
    { to: '/', label: 'Home' },
    { to: '/inventory', label: 'Fleet' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/contact', label: 'Locations' }
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-transparent"
      initial="expanded"
      animate={isCompressed ? 'compressed' : 'expanded'}
    >
      <div className="w-full px-6 lg:px-12">
        <div className="flex items-center justify-center py-6">
          {/* Single glassmorphic container with all navigation content */}
          <motion.div
            className="flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-xl border border-white border-opacity-30 rounded-full px-8 py-4 shadow-2xl"
            variants={pillVariants}
            initial="expanded"
            animate={isCompressed ? 'compressed' : 'expanded'}
          >
            {/* Logo - Always visible and centered */}
            <motion.div
              className="text-white font-bold text-xl whitespace-nowrap"
              variants={logoVariants}
            >
              FLEET KINGS
            </motion.div>

            {/* Navigation Content - Expands from center */}
            <motion.div
              className="overflow-hidden flex items-center"
              variants={contentVariants}
              initial="expanded"
              animate={isCompressed ? 'compressed' : 'expanded'}
            >
              {/* Navigation Links */}
              <motion.div
                className="flex items-center space-x-6 text-white ml-8"
                variants={contentVariants}
              >
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.to}
                    variants={linkVariants}
                  >
                    <Link
                      to={item.to}
                      className={`hover:text-gray-300 transition-colors whitespace-nowrap ${
                        isActive(item.to) ? 'text-yellow-400' : ''
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Contact Button */}
              <motion.div
                className="ml-8 pl-8 border-l border-white border-opacity-30"
                variants={linkVariants}
              >
                <Link
                  to="/contact"
                  className="bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 text-white px-6 py-2 rounded-full hover:bg-opacity-30 transition-all whitespace-nowrap"
                >
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile menu button - always visible */}
        <div className="md:hidden absolute right-6 top-1/2 transform -translate-y-1/2">
          <Link
            to="/contact"
            className="bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 text-white px-4 py-2 rounded-full hover:bg-opacity-30 transition-all"
          >
            Contact
          </Link>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;