'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { questions, type UserAnswer } from '@/lib/questionnaire-data';

interface QuestionnaireProps {
  onComplete: (answers: UserAnswer[]) => void;
}

export default function Questionnaire({ onComplete }: QuestionnaireProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleOptionSelect = (optionId: string) => {
    if (currentQuestion.type === 'single') {
      setSelectedOptions([optionId]);
    } else {
      // Multiple selection
      if (selectedOptions.includes(optionId)) {
        setSelectedOptions(selectedOptions.filter(id => id !== optionId));
      } else {
        // Limit to 3 for multiple choice
        const maxSelections = currentQuestion.text.includes('up to 3') ? 3 : 
                             currentQuestion.text.includes('up to 2') ? 2 : 100;
        if (selectedOptions.length < maxSelections) {
          setSelectedOptions([...selectedOptions, optionId]);
        }
      }
    }
  };

  const handleNext = () => {
    if (selectedOptions.length === 0) return;

    // Save answer
    const newAnswers = [
      ...answers.filter(a => a.questionId !== currentQuestion.id),
      { questionId: currentQuestion.id, selectedOptions }
    ];
    setAnswers(newAnswers);

    if (currentStep === questions.length - 1) {
      // Complete questionnaire
      onComplete(newAnswers);
    } else {
      // Move to next question
      setCurrentStep(currentStep + 1);
      
      // Load previous answer if going back
      const nextQuestion = questions[currentStep + 1];
      const previousAnswer = newAnswers.find(a => a.questionId === nextQuestion.id);
      setSelectedOptions(previousAnswer?.selectedOptions || []);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      
      // Load previous answer
      const previousQuestion = questions[currentStep - 1];
      const previousAnswer = answers.find(a => a.questionId === previousQuestion.id);
      setSelectedOptions(previousAnswer?.selectedOptions || []);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Question {currentStep + 1} of {questions.length}
          </span>
          <span className="text-sm font-medium text-[#f39200]">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#f39200]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-6"
        >
          {/* Question Text */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {currentQuestion.text}
          </h2>
          
          {currentQuestion.type === 'multiple' && (
            <p className="text-sm text-gray-500 mb-6">
              {currentQuestion.text.includes('up to 3') ? 'Select up to 3 options' :
               currentQuestion.text.includes('up to 2') ? 'Select up to 2 options' :
               'Select all that apply'}
            </p>
          )}

          {/* Options */}
          <div className="space-y-3 mt-6">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedOptions.includes(option.id);
              
              return (
                <motion.button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  className={`w-full text-left p-5 rounded-lg border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-[#f39200] bg-[#f39200] bg-opacity-5 shadow-md'
                      : 'border-gray-200 hover:border-[#f39200] hover:shadow-sm'
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            isSelected
                              ? 'border-[#f39200] bg-[#f39200]'
                              : 'border-gray-300'
                          }`}
                        >
                          {isSelected && (
                            <CheckCircle className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {option.text}
                          </p>
                          {option.subtext && (
                            <p className="text-sm text-gray-500 mt-1">
                              {option.subtext}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
            currentStep === 0
              ? 'opacity-0 pointer-events-none'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <button
          onClick={handleNext}
          disabled={selectedOptions.length === 0}
          className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all ${
            selectedOptions.length === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[#f39200] hover:bg-[#7a1124] text-white shadow-md hover:shadow-lg'
          }`}
        >
          {currentStep === questions.length - 1 ? 'See My Recommendations' : 'Next Question'}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
