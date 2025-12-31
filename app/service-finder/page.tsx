'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Users } from 'lucide-react';
import Questionnaire from '@/components/questionnaire';
import PersonaResults from '@/components/persona-results';
import Header from '@/components/header';
import { type UserAnswer } from '@/lib/questionnaire-data';

export default function ServiceFinderPage() {
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);

  const handleQuestionnaireComplete = (answers: UserAnswer[]) => {
    setUserAnswers(answers);
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setShowResults(false);
    setUserAnswers([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-32 pb-16 px-6">
        {!showResults ? (
          <div>
            {/* Hero Section */}
            <div className="max-w-4xl mx-auto text-center mb-12">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                Find Your Perfect Service Package
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-600 mb-8"
              >
                Answer 15 strategic questions and receive personalized federal contracting service recommendations tailored to your goals, budget, and timeline.
              </motion.p>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid md:grid-cols-3 gap-6 mb-12"
              >
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="w-12 h-12 bg-[#9d162e] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-[#9d162e]" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Personalized Recommendations</h3>
                  <p className="text-sm text-gray-600">
                    Get service packages matched to your company stage, goals, and challenges
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="w-12 h-12 bg-[#9d162e] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-[#9d162e]" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Smart Budget Alignment</h3>
                  <p className="text-sm text-gray-600">
                    See packages that fit your budget with transparent pricing and ROI expectations
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="w-12 h-12 bg-[#9d162e] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-[#9d162e]" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Fully Customizable</h3>
                  <p className="text-sm text-gray-600">
                    Add or remove services to create your perfect combination
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Questionnaire */}
            <Questionnaire onComplete={handleQuestionnaireComplete} />
          </div>
        ) : (
          <PersonaResults answers={userAnswers} onRestart={handleRestart} />
        )}
      </div>
    </div>
  );
}
