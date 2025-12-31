
'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ContactModal from './contact-modal';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactClick = () => {
    setIsContactModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md'
            : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center h-20">
            {/* Logo - Left aligned */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-3"
            >
              <Image
                src="/images/sunstone-logo.png"
                alt="Sunstone Advisory Group"
                width={200}
                height={60}
                className="h-12 w-auto"
                priority
              />
            </motion.div>

            {/* Desktop Navigation - Left aligned with logo */}
            <nav className="hidden md:flex items-center space-x-8 ml-12">
              <a
                href="/"
                className="text-gray-700 hover:text-[#f39200] font-medium transition-colors duration-200"
              >
                Home
              </a>
              <a
                href="/#services"
                className="text-gray-700 hover:text-[#f39200] font-medium transition-colors duration-200"
              >
                Services
              </a>
              <a
                href="/service-finder"
                className="text-gray-700 hover:text-[#f39200] font-medium transition-colors duration-200"
              >
                Find My Services
              </a>
              <button 
                onClick={handleContactClick}
                className="btn-steptoe"
              >
                Contact Us
              </button>
            </nav>

            {/* Mobile Menu Button - Push to right */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-[#f39200] transition-colors ml-auto"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-t border-gray-200"
            >
              <div className="container mx-auto px-6 py-4 space-y-4">
                <a
                  href="/"
                  className="block text-gray-700 hover:text-[#f39200] font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </a>
                <a
                  href="/#services"
                  className="block text-gray-700 hover:text-[#f39200] font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Services
                </a>
                <a
                  href="/service-finder"
                  className="block text-gray-700 hover:text-[#f39200] font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Find My Services
                </a>
                <button 
                  onClick={handleContactClick}
                  className="w-full btn-steptoe"
                >
                  Contact Us
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </>
  );
}
