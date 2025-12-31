
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle, TrendingUp, Target, Briefcase, DollarSign } from 'lucide-react';
import Image from 'next/image';
import ContactModal from './contact-modal';

interface Service {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  price: string;
  priceOptions?: Array<{ tier: string; price: string; description?: string; effort?: string }>;
  image: string;
  description: string;
  whatsIncluded: string[];
  features: Array<{ title: string; description: string }>;
  whenValuable: string[];
  approach: string;
  investment: string;
}

interface DetailSliderProps {
  service: Service;
  onClose: () => void;
}

export default function DetailSlider({ service, onClose }: DetailSliderProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    // Prevent body scroll when slider is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!service) {
    return null;
  }

  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Slider Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-0 right-0 h-full w-full md:w-[640px] bg-white shadow-2xl z-50 overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
          <div className="p-6 flex items-start justify-between">
            <div className="flex-1 pr-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
                {service.name ?? 'Service Details'}
              </h2>
              <p className="text-[#f39200] font-semibold text-lg">
                {service.tagline ?? ''}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
              aria-label="Close details"
            >
              <X size={24} className="text-gray-700" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="detail-content p-6 space-y-8">
          {/* Hero Image */}
          <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={service.image ?? '/images/federal-contracting-hero.jpg'}
              alt={service.name ?? 'Service'}
              fill
              className="object-cover"
              sizes="640px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>

          {/* Pricing */}
          <div className="bg-gradient-to-br from-[#f39200] to-[#7a1124] rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center space-x-2 mb-3">
              <DollarSign size={24} />
              <h3 className="text-xl font-bold">Investment</h3>
            </div>
            {service.priceOptions && service.priceOptions.length > 0 ? (
              <div className="space-y-3">
                {service.priceOptions.map((option, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-bold text-lg">{option.tier ?? ''}</div>
                      <div className="text-2xl font-bold">{option.price ?? ''}</div>
                    </div>
                    {option.description && (
                      <p className="text-sm text-white/90">{option.description}</p>
                    )}
                    {option.effort && (
                      <p className="text-xs text-white/70 mt-1">{option.effort}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-3xl font-bold">{service.price ?? 'Contact for pricing'}</div>
            )}
            <p className="text-sm text-white/80 mt-3">{service.investment ?? ''}</p>
          </div>

          {/* Overview */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center space-x-2">
              <Briefcase size={20} className="text-[#f39200]" />
              <span>Overview</span>
            </h3>
            <p className="text-gray-700 leading-relaxed">{service.description ?? ''}</p>
          </div>

          {/* What's Included */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <CheckCircle size={20} className="text-[#f39200]" />
              <span>What's Included</span>
            </h3>
            <ul className="space-y-3">
              {service.whatsIncluded?.map?.((item, index) => (
                <li key={index} className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <CheckCircle size={18} className="text-[#f39200] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item ?? ''}</span>
                </li>
              )) ?? <li className="text-gray-500">No items available</li>}
            </ul>
          </div>

          {/* Key Features & Benefits */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <TrendingUp size={20} className="text-[#f39200]" />
              <span>Key Features & Benefits</span>
            </h3>
            <div className="space-y-4">
              {service.features?.map?.((feature, index) => (
                <div key={index} className="border-l-4 border-[#f39200] pl-4 py-2">
                  <h4 className="font-bold text-gray-900 mb-1">{feature.title ?? ''}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description ?? ''}</p>
                </div>
              )) ?? <p className="text-gray-500">No features available</p>}
            </div>
          </div>

          {/* When This Is Most Valuable */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <Target size={20} className="text-[#f39200]" />
              <span>When This Service Is Most Valuable</span>
            </h3>
            <ul className="space-y-3">
              {service.whenValuable?.map?.((item, index) => (
                <li key={index} className="flex items-start space-x-3 bg-[#f39200]/5 p-4 rounded-lg">
                  <span className="text-[#f39200] font-bold mt-0.5 flex-shrink-0">→</span>
                  <span className="text-gray-700">{item ?? ''}</span>
                </li>
              )) ?? <li className="text-gray-500">No information available</li>}
            </ul>
          </div>

          {/* Our Approach */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Our Approach</h3>
            <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-200">
              {service.approach ?? ''}
            </p>
          </div>

          {/* CTA */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 -mx-6 -mb-6">
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="w-full btn-steptoe text-lg py-4"
            >
              Request This Service
            </button>
            <p className="text-center text-sm text-gray-500 mt-3">
              Contact our team to discuss your specific needs
            </p>
          </div>
        </div>
      </motion.div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </>
  );
}
