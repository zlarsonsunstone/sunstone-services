'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Award, TrendingUp, Lightbulb, MessageCircle } from 'lucide-react';
import { type UserAnswer, type Persona } from '@/lib/questionnaire-data';
import { calculatePersona } from '@/lib/recommendation-engine';
import ContactModal from './contact-modal';

interface PersonaResultsProps {
  answers: UserAnswer[];
  onRestart: () => void;
}

export default function PersonaResults({ answers, onRestart }: PersonaResultsProps) {
  const [persona, setPersona] = useState<(Persona & { totalScore: number }) | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const result = calculatePersona(answers);
    setPersona(result);
  }, [answers]);

  if (!persona) return null;

  // Color scheme based on persona
  const getPersonaColor = () => {
    switch (persona.id) {
      case 'brand-new':
        return 'from-blue-600 to-blue-800';
      case 'new-ish':
        return 'from-indigo-600 to-indigo-800';
      case 'frustrated':
        return 'from-orange-600 to-orange-800';
      case 'semi-successful':
        return 'from-purple-600 to-purple-800';
      case 'successful':
        return 'from-green-600 to-green-800';
      case 'ultra-successful':
        return 'from-amber-600 to-amber-900';
      default:
        return 'from-gray-600 to-gray-800';
    }
  };

  const getPersonaIcon = () => {
    switch (persona.id) {
      case 'brand-new':
      case 'new-ish':
        return Lightbulb;
      case 'frustrated':
        return TrendingUp;
      case 'semi-successful':
      case 'successful':
        return Award;
      case 'ultra-successful':
        return Award;
      default:
        return Lightbulb;
    }
  };

  const Icon = getPersonaIcon();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Federal Market Profile
          </h1>
          <p className="text-xl text-gray-600">
            Based on your responses, here's where you stand
          </p>
        </motion.div>

        {/* Persona Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8"
        >
          {/* Persona Header */}
          <div className={`bg-gradient-to-r ${getPersonaColor()} text-white p-8 md:p-12`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                  <Icon className="h-12 w-12 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">{persona.name}</h2>
                  <p className="text-lg opacity-90">Score: {persona.totalScore} points</p>
                </div>
              </div>
            </div>
            <p className="text-xl leading-relaxed">{persona.description}</p>
          </div>

          {/* Persona Content */}
          <div className="p-8 md:p-12">
            {/* Characteristics */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Award className="h-6 w-6 mr-2 text-[#f39200]" />
                Your Characteristics
              </h3>
              <ul className="space-y-3">
                {persona.characteristics.map((characteristic, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#f39200]/10 flex items-center justify-center mr-3 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-[#f39200]" />
                    </div>
                    <span className="text-gray-700 text-lg">{characteristic}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Key Insights */}
            <div className="bg-amber-50 rounded-xl p-6 border-2 border-amber-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Lightbulb className="h-6 w-6 mr-2 text-amber-600" />
                Key Insights & Recommendations
              </h3>
              <ul className="space-y-3">
                {persona.keyInsights.map((insight, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-amber-600/10 flex items-center justify-center mr-3 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-amber-600" />
                    </div>
                    <span className="text-gray-800 text-lg font-medium">{insight}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Critical Reminder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-8"
        >
          <h3 className="text-xl font-bold text-red-900 mb-3 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Critical: Research-First Approach
          </h3>
          <p className="text-red-800 text-lg leading-relaxed">
            Regardless of your persona, our first default is <strong>ALWAYS research</strong>. We never recommend SAM.gov registration, capability statements, or GSA Schedule applications without completing appropriate market research first. <strong>Data drives decisions.</strong>
          </p>
        </motion.div>

        {/* Pricing Package - 3 Column Layout */}
        {persona.package.retailTotal > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8"
          >
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 text-center">
              <h2 className="text-3xl font-bold mb-2">Your Recommended Package</h2>
              <p className="text-gray-300">Tailored services based on your federal market position</p>
            </div>

            {/* 3 Column Grid */}
            <div className="grid md:grid-cols-3 gap-0">
            {/* Column 1: RETAIL */}
            <div className="p-6 bg-gray-50 border-r border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">RETAIL</h3>
              <div className="space-y-4">
                {persona.package.services.map((service, index) => (
                  <div key={index} className="pb-3 border-b border-gray-300 last:border-0">
                    <p className="text-sm text-gray-700 mb-1">{service.name}</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ${service.retailPrice.toLocaleString()}
                    </p>
                  </div>
                ))}
                <div className="pt-4 mt-4 border-t-2 border-gray-400">
                  <p className="text-2xl font-bold text-gray-900">
                    ${persona.package.retailTotal.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Column 2: PACKAGE BUNDLE */}
            <div className="p-6 bg-[#f39200] text-white relative">
              <div className="absolute top-2 right-2 bg-white text-[#f39200] px-3 py-1 rounded-full text-xs font-bold">
                SAVE {persona.package.discountPercentage}%
              </div>
              <h3 className="text-xl font-bold mb-4 text-center uppercase">{persona.package.packageName}</h3>
              <div className="space-y-4">
                {persona.package.services.map((service, index) => (
                  <div key={index} className="pb-3 border-b border-white/30 last:border-0">
                    <p className="text-sm mb-1 opacity-90">{service.name}</p>
                    <p className="text-lg font-semibold">
                      ${service.packagePrice.toLocaleString()}
                    </p>
                  </div>
                ))}
                <div className="pt-4 mt-4 border-t-2 border-white/50">
                  <p className="text-2xl font-bold">
                    ${persona.package.packageTotal.toLocaleString()}
                  </p>
                  <p className="text-sm mt-1 opacity-75">
                    (${(persona.package.retailTotal - persona.package.packageTotal).toLocaleString()} savings)
                  </p>
                </div>
              </div>
            </div>

            {/* Column 3: SUNSTONE CONSULTING CLIENT */}
            <div className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 border-l border-amber-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">SUNSTONE CONSULTING CLIENT</h3>
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="bg-white rounded-full p-6 mb-4 shadow-lg">
                  <Award className="h-16 w-16 text-[#f39200]" />
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-2">100% INCLUDED</p>
                <p className="text-lg font-semibold text-amber-800 mb-4">Month 1</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  All services in this package are included at no additional cost for Sunstone consulting clients during their first month.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8 p-12 text-center"
          >
            <div className="max-w-2xl mx-auto">
              <div className="bg-amber-50 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Lightbulb className="h-12 w-12 text-amber-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Package Coming Soon</h2>
              <p className="text-lg text-gray-600 mb-6">
                We're currently developing a tailored service package for your persona. Contact us to discuss your specific needs and receive a custom recommendation.
              </p>
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="inline-flex items-center justify-center space-x-2 bg-[#f39200] hover:bg-[#7d1124] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Discuss My Needs</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="flex items-center justify-center space-x-2 bg-[#f39200] hover:bg-[#7d1124] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <MessageCircle className="h-5 w-5" />
            <span>Discuss My Profile</span>
          </button>
          <button
            onClick={onRestart}
            className="flex items-center justify-center space-x-2 bg-white hover:bg-gray-50 text-gray-800 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-gray-200"
          >
            <RotateCcw className="h-5 w-5" />
            <span>Retake Assessment</span>
          </button>
        </motion.div>

        {/* Score Range Reference */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mt-12 bg-white rounded-xl p-6 shadow-lg relative"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Persona Score Ranges</h3>
          
          {/* Arrow Indicator - Desktop & Tablet */}
          <div className="hidden md:block relative mb-6">
            <div className="relative h-20 flex items-start justify-center">
              {/* Position arrow based on persona */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="absolute"
                style={{
                  left: 
                    persona.id === 'brand-new' ? '8.33%' :
                    persona.id === 'new-ish' ? '25%' :
                    persona.id === 'frustrated' ? '41.66%' :
                    persona.id === 'semi-successful' ? '58.33%' :
                    persona.id === 'successful' ? '75%' :
                    '91.66%', // ultra-successful
                  transform: 'translateX(-50%)',
                }}
              >
                {/* Score Badge */}
                <div className={`bg-gradient-to-r ${getPersonaColor()} text-white px-4 py-2 rounded-full shadow-lg mb-2 whitespace-nowrap`}>
                  <p className="text-sm font-bold">Your Score: {persona.totalScore} pts</p>
                </div>
                {/* Arrow */}
                <svg width="40" height="40" viewBox="0 0 40 40" className="mx-auto">
                  <path
                    d="M20 5 L20 30 M20 30 L15 25 M20 30 L25 25"
                    stroke="#f39200"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </motion.div>
            </div>
          </div>

          {/* Mobile Arrow Indicator */}
          <div className="block md:hidden mb-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className={`bg-gradient-to-r ${getPersonaColor()} text-white px-4 py-3 rounded-lg shadow-lg text-center`}
            >
              <p className="text-sm font-bold flex items-center justify-center">
                <span className="mr-2">👇</span>
                Your Score: {persona.totalScore} pts
                <span className="ml-2">👇</span>
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            <div className={`p-3 rounded-lg transition-all duration-300 ${persona.id === 'brand-new' ? 'bg-blue-100 ring-4 ring-blue-500 scale-105' : 'bg-blue-50'}`}>
              <p className="text-sm font-semibold text-blue-900">Brand New</p>
              <p className="text-xs text-blue-700">10-20 pts</p>
            </div>
            <div className={`p-3 rounded-lg transition-all duration-300 ${persona.id === 'new-ish' ? 'bg-indigo-100 ring-4 ring-indigo-500 scale-105' : 'bg-indigo-50'}`}>
              <p className="text-sm font-semibold text-indigo-900">New-ish</p>
              <p className="text-xs text-indigo-700">21-40 pts</p>
            </div>
            <div className={`p-3 rounded-lg transition-all duration-300 ${persona.id === 'frustrated' ? 'bg-orange-100 ring-4 ring-orange-500 scale-105' : 'bg-orange-50'}`}>
              <p className="text-sm font-semibold text-orange-900">Frustrated</p>
              <p className="text-xs text-orange-700">41-60 pts</p>
            </div>
            <div className={`p-3 rounded-lg transition-all duration-300 ${persona.id === 'semi-successful' ? 'bg-purple-100 ring-4 ring-purple-500 scale-105' : 'bg-purple-50'}`}>
              <p className="text-sm font-semibold text-purple-900">Semi-Successful</p>
              <p className="text-xs text-purple-700">61-80 pts</p>
            </div>
            <div className={`p-3 rounded-lg transition-all duration-300 ${persona.id === 'successful' ? 'bg-green-100 ring-4 ring-green-500 scale-105' : 'bg-green-50'}`}>
              <p className="text-sm font-semibold text-green-900">Successful</p>
              <p className="text-xs text-green-700">81-100 pts</p>
            </div>
            <div className={`p-3 rounded-lg transition-all duration-300 ${persona.id === 'ultra-successful' ? 'bg-amber-100 ring-4 ring-amber-500 scale-105' : 'bg-amber-50'}`}>
              <p className="text-sm font-semibold text-amber-900">Ultra-Successful</p>
              <p className="text-xs text-amber-700">101+ pts</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
