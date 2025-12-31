
'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowRight, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Service {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  price: string;
  priceOptions?: Array<{ tier: string; price: string; description?: string }>;
  image: string;
  description: string;
  whatsIncluded: string[];
}

interface ServiceCardProps {
  service: Service;
  onViewDetails: () => void;
}

export default function ServiceCard({ service, onViewDetails }: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!service) {
    return null;
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="service-card bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 h-full flex flex-col"
    >
      {/* Service Image */}
      <div className="relative h-96 bg-gray-100 overflow-hidden">
        <Image
          src={service.image ?? '/images/federal-contracting-hero.jpg'}
          alt={service.name ?? 'Service'}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
        
        {/* FMR Badge and Price - Top */}
        <div className="absolute top-4 left-4 right-4">
          <div className="flex items-center justify-between">
            <span className="text-white text-sm font-semibold bg-[#f39200] px-3 py-1 rounded-full" style={{ color: '#ffffff', backgroundColor: '#f39200' }}>
              {service.shortName ?? 'Service'}
            </span>
            <div className="flex items-center space-x-1 text-white bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
              <DollarSign size={16} />
              <span className="font-bold text-sm">{service.price ?? 'Contact'}</span>
            </div>
          </div>
        </div>

        {/* Service Title and Tagline - On Image - WHITE TEXT */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <h3 
            className="text-2xl font-bold mb-2 leading-tight drop-shadow-2xl" 
            style={{ color: 'rgb(255, 255, 255)' }}
          >
            {service.name ?? 'Service Name'}
          </h3>
          <p 
            className="font-medium text-base drop-shadow-lg" 
            style={{ color: 'rgb(255, 255, 255)', opacity: 0.9 }}
          >
            {service.tagline ?? ''}
          </p>
        </div>
      </div>

      {/* Service Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Description in white section below image */}
        <p className="text-gray-600 mb-4 leading-relaxed service-card-description text-sm">
          {service.description ?? ''}
        </p>

        {/* What's Included Expandable Section */}
        <div className="mb-4 flex-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-left font-semibold text-gray-900 hover:text-[#f39200] transition-colors py-2 border-t border-gray-200 group"
            style={{ color: '#111827' }}
          >
            <span className="flex items-center space-x-2" style={{ color: '#111827' }}>
              <span style={{ color: '#111827' }}>What's Included</span>
            </span>
            {isExpanded ? (
              <ChevronUp size={20} className="text-[#f39200] group-hover:translate-y-[-2px] transition-transform" />
            ) : (
              <ChevronDown size={20} className="text-[#f39200] group-hover:translate-y-[2px] transition-transform" />
            )}
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  {service.whatsIncluded?.map?.((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-[#f39200] mt-1 flex-shrink-0">•</span>
                      <span>{item ?? ''}</span>
                    </li>
                  )) ?? <li className="text-gray-500">No items available</li>}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* View Details Button */}
        <button
          onClick={onViewDetails}
          className="w-full btn-steptoe flex items-center justify-center space-x-2 group"
          style={{ color: '#ffffff', backgroundColor: '#f39200' }}
        >
          <span style={{ color: '#ffffff' }}>View Full Details</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" style={{ color: '#ffffff' }} />
        </button>
      </div>
    </motion.div>
  );
}
