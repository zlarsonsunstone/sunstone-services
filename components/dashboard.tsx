'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, TrendingUp, FileText } from 'lucide-react';
import Image from 'next/image';
import Script from 'next/script';
import Header from './header';
import ServiceCard from './service-card';
import DetailSlider from './detail-slider';

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
  phase?: string;
}

interface Phase {
  id: string;
  name: string;
  description: string;
  order: number;
  services: Service[];
  targetAudience?: string;
}

interface Bundle {
  id: string;
  name: string;
  price: string;
  description: string;
  services: string[];
}

interface GuidanceScenario {
  situation: string;
  recommendation: string;
  phase: string;
}

interface Guidance {
  title: string;
  scenarios: GuidanceScenario[];
}

interface Section {
  id: string;
  name: string;
  description: string;
  comingSoon: boolean;
  phases: Phase[];
  bundles?: Bundle[];
  guidance?: Guidance;
}

interface DashboardData {
  sections: Section[];
}

interface DashboardProps {
  data: DashboardData;
}

export default function Dashboard({ data }: DashboardProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState<string>('federal-contracting');
  const [selectedPhaseId, setSelectedPhaseId] = useState<string | null>(null);

  const handleViewDetails = (service: Service) => {
    setSelectedService(service);
    setIsSliderOpen(true);
  };

  const handleCloseSlider = () => {
    setIsSliderOpen(false);
    setTimeout(() => setSelectedService(null), 300);
  };

  const handleSectionChange = (sectionId: string) => {
    setSelectedSectionId(sectionId);
    setSelectedPhaseId(null); // Reset phase selection when changing sections
  };

  const handlePhaseSelect = (phaseId: string | null) => {
    setSelectedPhaseId(phaseId);
  };

  if (!data || !data.sections) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No services data available</p>
      </div>
    );
  }

  const selectedSection = data.sections.find(s => s.id === selectedSectionId);

  // Define target audiences for each phase
  const phaseAudiences: Record<string, string> = {
    'phase1': 'New federal market entrants needing proper registration',
    'phase2': 'Companies evaluating market entry or competitive positioning',
    'phase3': 'Organizations building federal stakeholder relationships',
    'phase4': 'Firms selecting vehicles and evaluating opportunities',
    'phase5': 'Companies scaling their federal BD operations',
    'phase6': 'Teams responding to specific RFPs and proposals',
    'phase7': 'Contractors with awarded work needing disciplined post-award administration',
    'grant-discovery': 'Nonprofits, universities, local governments, and mission-driven businesses new to systematic grant pursuit',
    'grant-application': 'Organizations pursuing specific, high-stakes grant opportunities',
    'grant-management': 'Grant recipients who lack structured management processes',
    'grant-renewal': 'Grant recipients preparing for audits, renewals, or continuation applications'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="relative">
        {/* Main Content - Shifts left when slider is open */}
        <motion.div
          animate={{
            marginRight: isSliderOpen ? '640px' : '0px',
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="transition-all duration-300"
        >
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-[#f39200] text-white pt-32 pb-24">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[url('/images/federal-contracting-hero.jpg')] bg-cover bg-center"></div>
            </div>
            <div className="container mx-auto px-6 relative z-10">
              <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-center">
                {/* Left 2/3: Content */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="lg:col-span-2"
                >
                  {/* Intelligence Division Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex mb-8"
                  >
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
                      <div className="w-2 h-2 bg-[#f39200] rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold tracking-wide">Federal Market and Data Analytics Division</span>
                    </div>
                  </motion.div>

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                    <span className="block mb-2">Intelligence-Grade</span>
                    <span className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Federal Market Analytics</span>
                  </h1>
                  
                  <p className="text-lg md:text-xl text-gray-200 mb-6 leading-relaxed">
                    Powered by <span className="font-bold text-white">FEDINT</span> <span className="text-gray-400 text-base">(Federal Intelligence)</span>—transforming federal acquisition data into strategic advantage
                  </p>

                  <p className="text-base md:text-lg text-gray-300 mb-12">
                    Comprehensive advisory services across Federal Contracting, Mergers & Acquisitions, and Grant Development
                  </p>

                  {/* Stats Bar */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10"
                    >
                      <div className="text-2xl md:text-3xl font-bold text-white mb-1">15+</div>
                      <div className="text-xs md:text-sm text-gray-300">Years Contract Data</div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10"
                    >
                      <div className="text-2xl md:text-3xl font-bold text-white mb-1">$2T+</div>
                      <div className="text-xs md:text-sm text-gray-300">Awards Analyzed</div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10"
                    >
                      <div className="text-2xl md:text-3xl font-bold text-white mb-1">500+</div>
                      <div className="text-xs md:text-sm text-gray-300">Agencies Tracked</div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10"
                    >
                      <div className="text-2xl md:text-3xl font-bold text-white mb-1">24/7</div>
                      <div className="text-xs md:text-sm text-gray-300">Market Monitoring</div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Right 1/3: Wistia Video */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="lg:col-span-1"
                >
                  <div className="relative rounded-xl overflow-hidden shadow-2xl border-2 border-white/20">
                    <div className="wistia_responsive_padding" style={{ padding: '177.78% 0 0 0', position: 'relative' }}>
                      <div className="wistia_responsive_wrapper" style={{ height: '100%', left: 0, position: 'absolute', top: 0, width: '100%' }}>
                        <div className="wistia_embed wistia_async_8xipwv2cwx endVideoBehavior=reset seo=true videoFoam=true" style={{ height: '100%', position: 'relative', width: '100%' }}>
                          <div className="wistia_swatch" style={{ height: '100%', left: 0, opacity: 0, overflow: 'hidden', position: 'absolute', top: 0, transition: 'opacity 200ms', width: '100%' }}>
                            <img src="https://fast.wistia.com/embed/medias/8xipwv2cwx/swatch" style={{ filter: 'blur(5px)', height: '100%', objectFit: 'contain', width: '100%' }} alt="" aria-hidden="true" onLoad={(e) => { if (e.currentTarget.parentElement) e.currentTarget.parentElement.style.opacity = '1'; }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* FEDINT Intelligence Capabilities Section */}
          <section className="py-16 px-6 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#f39200]/10 border border-[#f39200]/20 rounded-full mb-4">
                    <div className="w-2 h-2 bg-[#f39200] rounded-full"></div>
                    <span className="text-sm font-semibold text-[#f39200]">FEDINT Platform</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    Federal Intelligence Infrastructure
                  </h2>
                  <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                    Systematic federal acquisition data collection, competitive analysis, and strategic intelligence synthesis
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {/* Capability 1 */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-[#f39200]/20"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-[#f39200] to-[#7a1124] rounded-lg flex items-center justify-center mb-4 shadow-md">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Award Data Intelligence</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      Real-time tracking of federal contract awards across all agencies, vehicles, and NAICS codes. Historical analysis revealing spend patterns, incumbent positioning, and emerging opportunities.
                    </p>
                  </motion.div>

                  {/* Capability 2 */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-[#f39200]/20"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-[#f39200] to-[#7a1124] rounded-lg flex items-center justify-center mb-4 shadow-md">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Competitive Intelligence</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      Systematic competitor tracking including contract portfolios, vehicle holdings, teaming patterns, and strategic positioning. Vulnerability analysis and market share monitoring.
                    </p>
                  </motion.div>

                  {/* Capability 3 */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-[#f39200]/20"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-[#f39200] to-[#7a1124] rounded-lg flex items-center justify-center mb-4 shadow-md">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Stakeholder Mapping</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      Proprietary databases of Contracting Officers, Program Managers, and decision-makers. Relationship mapping, procurement pattern analysis, and buyer persona development.
                    </p>
                  </motion.div>
                </div>

                {/* Intelligence Process */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="mt-12 p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl"
                >
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">Intelligence-Driven Advisory Process</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-[#f39200] rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-lg md:text-xl shadow-lg">1</div>
                      <div className="text-xs md:text-sm font-semibold text-gray-200">Data Acquisition</div>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-[#f39200] rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-lg md:text-xl shadow-lg">2</div>
                      <div className="text-xs md:text-sm font-semibold text-gray-200">Pattern Recognition</div>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-[#f39200] rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-lg md:text-xl shadow-lg">3</div>
                      <div className="text-xs md:text-sm font-semibold text-gray-200">Competitive Analysis</div>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-[#f39200] rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-lg md:text-xl shadow-lg">4</div>
                      <div className="text-xs md:text-sm font-semibold text-gray-200">Strategic Synthesis</div>
                    </div>
                    <div className="text-center col-span-2 md:col-span-1">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-[#f39200] rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-lg md:text-xl shadow-lg">5</div>
                      <div className="text-xs md:text-sm font-semibold text-gray-200">Actionable Intelligence</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Three Horizontal Section Tabs */}
          <section className="py-8 bg-gray-100">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 rounded-xl overflow-hidden shadow-lg">
                {data.sections.map((section) => {
                  const isSelected = section.id === selectedSectionId;
                  const isBurgundyBg = section.id === 'federal-contracting' || section.id === 'grant-support';
                  const bgColor = isSelected 
                    ? (isBurgundyBg ? 'bg-[#f39200]' : 'bg-white')
                    : 'bg-gray-300';
                  const textColor = isSelected
                    ? (isBurgundyBg ? 'text-white' : 'text-[#f39200]')
                    : 'text-gray-500';
                  const borderColor = isSelected ? 'border-[#f39200]' : 'border-transparent';

                  return (
                    <button
                      key={section.id}
                      onClick={() => handleSectionChange(section.id)}
                      disabled={section.comingSoon}
                      className={`
                        relative p-8 transition-all duration-300 border-4 ${borderColor}
                        ${bgColor} ${textColor}
                        ${section.comingSoon ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:scale-105'}
                        ${isSelected ? 'shadow-2xl' : 'hover:shadow-xl'}
                      `}
                    >
                      <div className="text-center">
                        {section.id === 'federal-contracting' && <FileText className="w-12 h-12 mx-auto mb-4" />}
                        {section.id === 'mergers-acquisitions' && <TrendingUp className="w-12 h-12 mx-auto mb-4" />}
                        {section.id === 'grant-support' && <Users className="w-12 h-12 mx-auto mb-4" />}
                        
                        <h3 className="text-xl md:text-2xl font-bold mb-2">
                          {section.name}
                        </h3>
                        <p className={`text-sm ${isSelected ? (isBurgundyBg ? 'text-gray-100' : 'text-gray-700') : 'text-gray-600'}`}>
                          {section.description}
                        </p>
                        
                        {section.comingSoon && (
                          <span className="inline-block mt-3 px-3 py-1 bg-gray-700 text-white text-xs font-medium rounded-full">
                            Coming Soon
                          </span>
                        )}
                        
                        {!section.comingSoon && !isSelected && (
                          <div className="mt-3 text-xs font-medium">
                            Click to explore →
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Two-Column Vertical Steps Journey - DESKTOP */}
          {selectedSection && !selectedSection.comingSoon && (
            <section className="py-12 bg-white">
              <div className="container mx-auto px-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                    {selectedSection.id === 'federal-contracting' && 'Federal Contracting Client Journey'}
                    {selectedSection.id === 'mergers-acquisitions' && 'M&A Lifecycle Journey'}
                    {selectedSection.id === 'grant-support' && 'Grant Management Lifecycle'}
                  </h2>

                  {/* Desktop: Two-Column Vertical Layout */}
                  <div className="hidden md:block space-y-6">
                    {selectedSection.phases.map((phase, index) => {
                      const isPhaseSelected = phase.id === selectedPhaseId;
                      const stepNumber = index + 1;
                      
                      // Map phase order to icon
                      const stepIcons = [
                        '/images/step-1-foundation.png',
                        '/images/step-2-market-intelligence.png',
                        '/images/step-3-relationship.png',
                        '/images/step-4-vehicle-opportunity.png',
                        '/images/step-5-organization.png',
                        '/images/step-6-proposal.png',
                        '/images/step-7-contract-management-v2.png'
                      ];

                      return (
                        <div key={phase.id}>
                          {/* Two-Column Step Card */}
                          <motion.button
                            onClick={() => handlePhaseSelect(isPhaseSelected ? null : phase.id)}
                            whileHover={{ scale: 1.01 }}
                            className={`
                              w-full grid grid-cols-12 gap-6 p-6 rounded-xl text-left transition-all duration-300
                              ${isPhaseSelected 
                                ? 'bg-[#f39200] text-white shadow-2xl ring-4 ring-[#f39200] ring-opacity-50' 
                                : 'bg-gray-50 text-gray-900 hover:bg-gray-100 border-2 border-gray-200 hover:border-[#f39200]'
                              }
                            `}
                          >
                            {/* Left Column: Step Number + Icon + Title */}
                            <div className="col-span-4 flex items-center space-x-4">
                              <div className={`
                                flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold
                                ${isPhaseSelected ? 'bg-white text-[#f39200]' : 'bg-[#f39200] text-white'}
                              `}>
                                {stepNumber}
                              </div>
                              
                              <div className="flex-shrink-0 w-12 h-12 relative">
                                <Image
                                  src={stepIcons[index]}
                                  alt={`Step ${stepNumber} Icon`}
                                  fill
                                  className={`object-contain ${isPhaseSelected ? 'invert brightness-0' : ''}`}
                                />
                              </div>
                              
                              <h3 className="text-xl font-bold">
                                {phase.name}
                              </h3>
                            </div>

                            {/* Right Column: Description */}
                            <div className="col-span-8 flex flex-col justify-center">
                              <p className={`text-sm mb-3 ${isPhaseSelected ? 'text-gray-100' : 'text-gray-600'}`}>
                                {phase.description}
                              </p>
                              
                              <div className={`text-xs ${isPhaseSelected ? 'text-gray-200' : 'text-gray-500'}`}>
                                <span className="font-semibold">Who this is for:</span>{' '}
                                {phaseAudiences[phase.id] || 'Federal market participants'}
                              </div>
                              
                              <div className="mt-3 flex items-center justify-between">
                                <span className={`
                                  px-3 py-1 rounded-full text-xs font-bold
                                  ${isPhaseSelected ? 'bg-white text-[#f39200]' : 'bg-[#f39200] text-white'}
                                `}>
                                  {phase.services.length} {phase.services.length === 1 ? 'service' : 'services'}
                                </span>
                                
                                <span className={`text-xs font-medium ${isPhaseSelected ? 'text-white' : 'text-[#f39200]'}`}>
                                  {isPhaseSelected ? 'Click to collapse ▲' : 'Click to explore services ▼'}
                                </span>
                              </div>
                            </div>
                          </motion.button>

                          {/* Expanded Services for this Step */}
                          <AnimatePresence>
                            {isPhaseSelected && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
                                  {phase.services.map((service) => (
                                    <ServiceCard
                                      key={service.id}
                                      service={service}
                                      onViewDetails={() => handleViewDetails(service)}
                                    />
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>

                  {/* Mobile: Single-Column Vertical Layout */}
                  <div className="md:hidden space-y-6">
                    {selectedSection.phases.map((phase, index) => {
                      const isPhaseSelected = phase.id === selectedPhaseId;
                      const stepNumber = index + 1;
                      
                      const stepIcons = [
                        '/images/step-1-foundation.png',
                        '/images/step-2-market-intelligence.png',
                        '/images/step-3-relationship.png',
                        '/images/step-4-vehicle-opportunity.png',
                        '/images/step-5-organization.png',
                        '/images/step-6-proposal.png',
                        '/images/step-7-contract-management-v2.png'
                      ];

                      return (
                        <div key={phase.id}>
                          <motion.button
                            onClick={() => handlePhaseSelect(isPhaseSelected ? null : phase.id)}
                            whileHover={{ scale: 1.01 }}
                            className={`
                              w-full p-6 rounded-xl text-left transition-all duration-300
                              ${isPhaseSelected 
                                ? 'bg-[#f39200] text-white shadow-2xl ring-4 ring-[#f39200] ring-opacity-50' 
                                : 'bg-gray-50 text-gray-900 hover:bg-gray-100 border-2 border-gray-200 hover:border-[#f39200]'
                              }
                            `}
                          >
                            <div className="flex items-center space-x-4 mb-4">
                              <div className={`
                                flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold
                                ${isPhaseSelected ? 'bg-white text-[#f39200]' : 'bg-[#f39200] text-white'}
                              `}>
                                {stepNumber}
                              </div>
                              
                              <div className="flex-shrink-0 w-10 h-10 relative">
                                <Image
                                  src={stepIcons[index]}
                                  alt={`Step ${stepNumber} Icon`}
                                  fill
                                  className={`object-contain ${isPhaseSelected ? 'invert brightness-0' : ''}`}
                                />
                              </div>
                              
                              <h3 className="text-lg font-bold flex-1">
                                {phase.name}
                              </h3>
                              
                              <span className={`
                                px-2 py-1 rounded-full text-xs font-bold
                                ${isPhaseSelected ? 'bg-white text-[#f39200]' : 'bg-[#f39200] text-white'}
                              `}>
                                {phase.services.length}
                              </span>
                            </div>
                            
                            <p className={`text-sm mb-3 ${isPhaseSelected ? 'text-gray-100' : 'text-gray-600'}`}>
                              {phase.description}
                            </p>
                            
                            <div className={`text-xs ${isPhaseSelected ? 'text-gray-200' : 'text-gray-500'}`}>
                              <span className="font-semibold">Who this is for:</span>{' '}
                              {phaseAudiences[phase.id] || 'Federal market participants'}
                            </div>
                            
                            <div className={`mt-3 text-xs font-medium text-center ${isPhaseSelected ? 'text-white' : 'text-[#f39200]'}`}>
                              {isPhaseSelected ? 'Tap to collapse ▲' : 'Tap to explore services ▼'}
                            </div>
                          </motion.button>

                          <AnimatePresence>
                            {isPhaseSelected && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="mt-4 space-y-4">
                                  {phase.services.map((service) => (
                                    <ServiceCard
                                      key={service.id}
                                      service={service}
                                      onViewDetails={() => handleViewDetails(service)}
                                    />
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            </section>
          )}

          {/* M&A Bundles Section */}
          {selectedSection && selectedSection.id === 'mergers-acquisitions' && !selectedSection.comingSoon && selectedSection.bundles && (
            <section className="py-16 bg-gradient-to-b from-white to-gray-50">
              <div className="container mx-auto px-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="max-w-7xl mx-auto"
                >
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#f39200]/10 border border-[#f39200]/20 rounded-full mb-4">
                      <div className="w-2 h-2 bg-[#f39200] rounded-full"></div>
                      <span className="text-sm font-semibold text-[#f39200]">Recommended Packages</span>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                      Service Bundles & Pathways
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                      Pre-configured service combinations designed for common M&A journey stages
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selectedSection.bundles.map((bundle, index) => (
                      <motion.div
                        key={bundle.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl hover:border-[#f39200]/30 transition-all duration-300"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-xl font-bold text-gray-900 flex-1">
                            {bundle.name}
                          </h3>
                          <div className="text-[#f39200] font-bold text-lg whitespace-nowrap ml-3">
                            {bundle.price}
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                          {bundle.description}
                        </p>
                        
                        <div className="border-t border-gray-200 pt-4">
                          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                            Included Services:
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {bundle.services.map((serviceCode: string) => (
                              <span
                                key={serviceCode}
                                className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#f39200]/10 text-[#f39200] text-xs font-medium"
                              >
                                {serviceCode}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>
          )}

          {/* M&A Guidance Section */}
          {selectedSection && selectedSection.id === 'mergers-acquisitions' && !selectedSection.comingSoon && selectedSection.guidance && (
            <section className="py-16 bg-white">
              <div className="container mx-auto px-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="max-w-4xl mx-auto"
                >
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      {selectedSection.guidance.title}
                    </h2>
                    <p className="text-gray-600">
                      Not sure which phase or service to start with? Find your situation below.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {selectedSection.guidance.scenarios.map((scenario, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-gray-50 rounded-lg p-6 border-l-4 border-[#f39200] hover:bg-gray-100 transition-colors duration-200"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 bg-[#f39200] rounded-full flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-900 font-semibold mb-2">
                              "{scenario.situation}"
                            </p>
                            <p className="text-gray-700 text-sm">
                              <span className="font-medium text-[#f39200]">Start here:</span> {scenario.recommendation}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-12 text-center">
                    <p className="text-gray-600 mb-4">
                      Still not sure? We can help you figure out where you are and what makes sense next.
                    </p>
                    <button
                      onClick={() => {
                        const modal = document.querySelector('[data-contact-modal]');
                        if (modal) {
                          (modal as HTMLElement).click();
                        }
                      }}
                      className="inline-flex items-center px-6 py-3 bg-[#f39200] text-white font-semibold rounded-lg hover:bg-[#7a1124] transition-colors duration-200"
                    >
                      Contact Us for Guidance
                    </button>
                  </div>
                </motion.div>
              </div>
            </section>
          )}

          {/* Coming Soon Message for M&A and Grant sections */}
          {selectedSection && selectedSection.comingSoon && (
            <section className="py-20 bg-white">
              <div className="container mx-auto px-6">
                <div className="max-w-2xl mx-auto text-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    {selectedSection.id === 'mergers-acquisitions' && <TrendingUp className="w-12 h-12 text-[#f39200]" />}
                    {selectedSection.id === 'grant-support' && <Users className="w-12 h-12 text-[#f39200]" />}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {selectedSection.name}
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    {selectedSection.description}
                  </p>
                  <div className="bg-gray-50 rounded-lg p-8">
                    <p className="text-gray-700 mb-4">
                      We're expanding our advisory services to include {selectedSection.name.toLowerCase()}. 
                      These services will follow the same curriculum-based approach, providing comprehensive 
                      support from strategy through execution.
                    </p>
                    <p className="text-[#f39200] font-semibold">
                      Contact us to learn more about our upcoming offerings in this area.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}
        </motion.div>

        {/* Detail Slider */}
        {selectedService && isSliderOpen && (
          <DetailSlider
            service={selectedService}
            onClose={handleCloseSlider}
          />
        )}
      </div>

      {/* Wistia Video Scripts */}
      <Script 
        src="https://fast.wistia.com/embed/medias/8xipwv2cwx.jsonp" 
        strategy="lazyOnload"
      />
      <Script 
        src="https://fast.wistia.com/assets/external/E-v1.js" 
        strategy="lazyOnload"
      />
    </div>
  );
}
