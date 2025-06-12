import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [isCompressed, setIsCompressed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
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

  // Close mobile menu when clicking outside or on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMobileMenu();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

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

  // Mobile menu animation variants
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const mobileMenuItemVariants = {
    closed: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      x: 0,
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
      <div className="w-full px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between md:justify-center py-4 md:py-6">
          {/* Mobile Logo - Visible only on mobile */}
          <div className="md:hidden">
            <Link to="/" className="text-white font-bold text-lg">
              FLEET KINGS
            </Link>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <motion.div
            className="hidden md:flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-xl border border-white border-opacity-30 rounded-full px-6 lg:px-8 py-3 lg:py-4 shadow-2xl"
            variants={pillVariants}
            initial="expanded"
            animate={isCompressed ? 'compressed' : 'expanded'}
          >
            {/* Desktop Logo - Always visible and centered */}
            <motion.div
              className="text-white font-bold text-lg lg:text-xl whitespace-nowrap"
              variants={logoVariants}
            >
              FLEET KINGS
            </motion.div>

            {/* Desktop Navigation Content - Expands from center */}
            <motion.div
              className="overflow-hidden flex items-center"
              variants={contentVariants}
              initial="expanded"
              animate={isCompressed ? 'compressed' : 'expanded'}
            >
              {/* Desktop Navigation Links */}
              <motion.div
                className="flex items-center space-x-4 lg:space-x-6 text-white ml-6 lg:ml-8"
                variants={contentVariants}
              >
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.to}
                    variants={linkVariants}
                  >
                    <Link
                      to={item.to}
                      className={`hover:text-gray-300 transition-colors whitespace-nowrap text-sm lg:text-base ${
                        isActive(item.to) ? 'text-yellow-400' : ''
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Desktop Contact Button */}
              <motion.div
                className="ml-6 lg:ml-8 pl-6 lg:pl-8 border-l border-white border-opacity-30"
                variants={linkVariants}
              >
                <Link
                  to="/contact"
                  className="bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 text-white px-4 lg:px-6 py-2 rounded-full hover:bg-opacity-30 transition-all whitespace-nowrap text-sm lg:text-base"
                >
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Mobile Hamburger Menu Button */}
          <motion.button
            onClick={toggleMobileMenu}
            className="md:hidden mobile-menu-button bg-black bg-opacity-30 backdrop-blur-xl border border-white border-opacity-30 rounded-full p-3 text-white hover:bg-opacity-40 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle mobile menu"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="md:hidden fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />

              {/* Mobile Menu */}
              <motion.div
                className="md:hidden mobile-menu fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-black bg-opacity-90 backdrop-blur-xl border-l border-white border-opacity-30 z-50"
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Menu Header */}
                  <div className="flex items-center justify-between p-6 border-b border-white border-opacity-20">
                    <span className="text-white font-bold text-lg">FLEET KINGS</span>
                    <button
                      onClick={closeMobileMenu}
                      className="text-white hover:text-gray-300 transition-colors"
                      aria-label="Close mobile menu"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  {/* Mobile Menu Content */}
                  <div className="flex-1 flex flex-col justify-center px-6">
                    <motion.nav className="space-y-6">
                      {menuItems.map((item, index) => (
                        <motion.div
                          key={item.to}
                          variants={mobileMenuItemVariants}
                        >
                          <Link
                            to={item.to}
                            onClick={closeMobileMenu}
                            className={`block text-2xl font-medium transition-colors py-3 ${
                              isActive(item.to)
                                ? 'text-yellow-400'
                                : 'text-white hover:text-yellow-400'
                            }`}
                          >
                            {item.label}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.nav>

                    {/* Mobile Contact Button */}
                    <motion.div
                      className="mt-12"
                      variants={mobileMenuItemVariants}
                    >
                      <Link
                        to="/contact"
                        onClick={closeMobileMenu}
                        className="block w-full bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 text-white text-center px-6 py-4 rounded-2xl hover:bg-opacity-30 transition-all font-medium"
                      >
                        Contact Us
                      </Link>
                    </motion.div>
                  </div>

                  {/* Mobile Menu Footer */}
                  <div className="p-6 border-t border-white border-opacity-20">
                    <p className="text-gray-400 text-sm text-center">
                      Experience luxury automotive excellence
                    </p>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;