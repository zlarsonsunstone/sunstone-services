// Persona Calculation Engine
import { questions, personas, type UserAnswer, type Persona } from './questionnaire-data';

// Calculate persona based on total score
export function calculatePersona(answers: UserAnswer[]): Persona & { totalScore: number } {
  let totalScore = 0;
  
  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (!question) return;
    
    answer.selectedOptions.forEach(optionId => {
      const option = question.options.find(opt => opt.id === optionId);
      if (option) {
        totalScore += option.points;
      }
    });
  });
  
  // Find matching persona
  const matchedPersona = personas.find(
    p => totalScore >= p.minPoints && totalScore <= p.maxPoints
  ) || personas[0]; // Default to Brand New if no match
  
  return {
    ...matchedPersona,
    totalScore
  };
}

// Get total score from answers
export function getTotalScore(answers: UserAnswer[]): number {
  let totalScore = 0;
  
  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (!question) return;
    
    answer.selectedOptions.forEach(optionId => {
      const option = question.options.find(opt => opt.id === optionId);
      if (option) {
        totalScore += option.points;
      }
    });
  });
  
  return totalScore;
}
