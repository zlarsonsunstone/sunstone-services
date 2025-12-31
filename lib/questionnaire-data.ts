// Persona-Based Scoring Questionnaire

export interface Question {
  id: string;
  text: string;
  type: 'single' | 'multiple';
  options: QuestionOption[];
}

export interface QuestionOption {
  id: string;
  text: string;
  subtext?: string;
  points: number;
}

export interface UserAnswer {
  questionId: string;
  selectedOptions: string[];
}

export interface ServiceLineItem {
  name: string;
  retailPrice: number;
  packagePrice: number;
}

export interface PersonaPackage {
  packageName: string;
  services: ServiceLineItem[];
  retailTotal: number;
  packageTotal: number;
  discountPercentage: number;
}

export interface Persona {
  id: string;
  name: string;
  description: string;
  minPoints: number;
  maxPoints: number;
  characteristics: string[];
  keyInsights: string[];
  package: PersonaPackage;
}

// 6 Personas based on federal market maturity
export const personas: Persona[] = [
  {
    id: 'brand-new',
    name: 'Brand New',
    description: 'No federal experience, little to no understanding of how the market works.',
    minPoints: 10,
    maxPoints: 20,
    characteristics: [
      '0 federal contracts',
      'No SAM.gov registration or recently started',
      'Minimal knowledge of federal processes',
      'No established relationships with agencies',
      'Limited or no federal-specific collateral'
    ],
    keyInsights: [
      'Research must come FIRST before any registrations',
      'Need foundational education on federal market dynamics',
      'Focus on eligibility and market intelligence before BD activities',
      'Avoid premature registration without research-driven strategy'
    ],
    package: {
      packageName: 'Steptoe Federal Launch Package',
      services: [
        { name: 'Federal Registration Suite', retailPrice: 10000, packagePrice: 7500 },
        { name: 'Capability Statement & Collateral', retailPrice: 15000, packagePrice: 11250 },
        { name: 'Federal Market Range Analysis', retailPrice: 35000, packagePrice: 26250 },
        { name: 'Agency Prioritization Report', retailPrice: 60000, packagePrice: 45000 }
      ],
      retailTotal: 120000,
      packageTotal: 90000,
      discountPercentage: 25
    }
  },
  {
    id: 'new-ish',
    name: 'New-ish',
    description: 'Registered 1 year or less, has done some things (usually SAM.gov), no plan, no real knowledge of how system works or strategic insights.',
    minPoints: 21,
    maxPoints: 40,
    characteristics: [
      'Registered ≤1 year',
      'Completed SAM.gov (maybe SBA/DSBS)',
      'Little to no federal revenue yet',
      'No strategic market research completed',
      'Capability statement may exist but not research-driven'
    ],
    keyInsights: [
      'Foundation Audit needed to validate existing registrations',
      'Market research critical before optimizing profiles',
      'Likely has code/keyword misalignment',
      'Email domain and profile completeness need review'
    ],
    package: {
      packageName: 'Steptoe Foundation Optimization Package',
      services: [
        { name: 'Fed Foundation Audit', retailPrice: 7500, packagePrice: 5625 },
        { name: 'Capability Statement & Collateral', retailPrice: 15000, packagePrice: 11250 },
        { name: 'Federal Market Range Analysis', retailPrice: 35000, packagePrice: 26250 },
        { name: 'Agency Prioritization Report', retailPrice: 60000, packagePrice: 45000 }
      ],
      retailTotal: 117500,
      packageTotal: 88125,
      discountPercentage: 25
    }
  },
  {
    id: 'frustrated',
    name: 'Frustrated',
    description: 'Registered more than a year. Either (a) has not dedicated any real time or resources, (b) has tried a few things, failed and is down on the opp, or (c) is overwhelmed and paralyzed.',
    minPoints: 41,
    maxPoints: 60,
    characteristics: [
      'Registered >1 year',
      'Minimal wins or no wins despite activity',
      'Tried some BD efforts without success',
      'May feel overwhelmed by federal complexity',
      'Lacks clear strategy or consistent execution'
    ],
    keyInsights: [
      'Needs diagnostic to understand why efforts are not working',
      'Research likely incomplete or not actionable',
      'May need relationship strategy overhaul',
      'Foundation elements probably need optimization post-research'
    ],
    package: {
      packageName: 'Package Coming Soon',
      services: [
        { name: 'Service Package', retailPrice: 0, packagePrice: 0 }
      ],
      retailTotal: 0,
      packageTotal: 0,
      discountPercentage: 25
    }
  },
  {
    id: 'semi-successful',
    name: 'Semi-Successful',
    description: 'Had a win or two, has no idea how to replicate, scale or diversify.',
    minPoints: 61,
    maxPoints: 80,
    characteristics: [
      '1-3 federal contracts',
      'Some federal revenue ($100K-$2M)',
      'Wins were somewhat accidental or relationship-driven',
      'No repeatable capture/BD process',
      'Limited agency or vehicle diversification'
    ],
    keyInsights: [
      'Needs systematic approach to replicate success',
      'Pipeline development and forecast discipline required',
      'Opportunity to expand into adjacent agencies',
      'May benefit from vehicle strategy (GSA, GWACs, IDIQs)'
    ],
    package: {
      packageName: 'Package Coming Soon',
      services: [
        { name: 'Service Package', retailPrice: 0, packagePrice: 0 }
      ],
      retailTotal: 0,
      packageTotal: 0,
      discountPercentage: 25
    }
  },
  {
    id: 'successful',
    name: 'Successful',
    description: 'Established track record in the government, although perhaps limited to one or a couple of agencies, but overall understands how to play in the market and is ready to take the next step.',
    minPoints: 81,
    maxPoints: 100,
    characteristics: [
      '$2M-$20M annual federal revenue',
      'Multiple contracts across 2-4 agencies',
      'Understands federal BD fundamentals',
      'Has in-house BD resources',
      'Ready to scale or diversify'
    ],
    keyInsights: [
      'Focus on optimization and portfolio strategy',
      'Contract management/compliance becomes critical',
      'Agency diversification or market expansion opportunities',
      'May consider M&A positioning or strategic partnerships'
    ],
    package: {
      packageName: 'Package Coming Soon',
      services: [
        { name: 'Service Package', retailPrice: 0, packagePrice: 0 }
      ],
      retailTotal: 0,
      packageTotal: 0,
      discountPercentage: 25
    }
  },
  {
    id: 'ultra-successful',
    name: 'Ultra-Successful',
    description: 'Significant federal work, has very specific and targeted areas of support they are willing to pay a premium for high-quality assistance. Usually has their own fed bd and capture teams, so they need an outside specialist to help with specific initiative. High likelihood this is a prime candidate for full lobbying.',
    minPoints: 101,
    maxPoints: 200,
    characteristics: [
      '$20M+ annual federal revenue',
      'Established federal BD/capture team',
      'Multiple agencies, vehicles, and contract types',
      'Sophisticated understanding of federal market',
      'Seeking specialized/premium support for specific initiatives'
    ],
    keyInsights: [
      'Needs high-value specialists, not generalists',
      'May be acquisition-ready or seeking strategic exit',
      'Lobbying and legislative strategy may be relevant',
      'Contract portfolio optimization and risk management critical'
    ],
    package: {
      packageName: 'Package Coming Soon',
      services: [
        { name: 'Service Package', retailPrice: 0, packagePrice: 0 }
      ],
      retailTotal: 0,
      packageTotal: 0,
      discountPercentage: 25
    }
  }
];

// 15 Strategic Questions with Point-Based Scoring
export const questions: Question[] = [
  {
    id: 'q1',
    text: 'What best describes your current federal contracting status?',
    type: 'single',
    options: [
      {
        id: 'not_registered',
        text: 'Not yet registered (no SAM.gov, CAGE, or UEI)',
        subtext: 'Have not started federal registrations',
        points: 0
      },
      {
        id: 'recently_registered',
        text: 'Recently registered (≤6 months)',
        subtext: 'Active SAM.gov, minimal activity',
        points: 5
      },
      {
        id: 'registered_1yr',
        text: 'Registered 6-12 months',
        subtext: 'Some exploration, no wins yet',
        points: 8
      },
      {
        id: 'registered_plus',
        text: 'Registered 1-3 years',
        subtext: '0-2 contracts',
        points: 12
      },
      {
        id: 'established',
        text: 'Established contractor (3-5 years)',
        subtext: '3-10 contracts',
        points: 18
      },
      {
        id: 'mature',
        text: 'Mature contractor (5+ years)',
        subtext: '10+ contracts, significant portfolio',
        points: 25
      }
    ]
  },
  {
    id: 'q2',
    text: 'What is your total annual federal revenue?',
    type: 'single',
    options: [
      {
        id: 'zero',
        text: '$0',
        subtext: 'No federal contracts yet',
        points: 0
      },
      {
        id: 'under_250k',
        text: 'Under $250K',
        subtext: 'First contract or very small wins',
        points: 5
      },
      {
        id: '250k_1m',
        text: '$250K - $1M',
        subtext: 'Early-stage revenue',
        points: 10
      },
      {
        id: '1m_5m',
        text: '$1M - $5M',
        subtext: 'Growing federal presence',
        points: 15
      },
      {
        id: '5m_20m',
        text: '$5M - $20M',
        subtext: 'Established federal business',
        points: 20
      },
      {
        id: 'over_20m',
        text: 'Over $20M',
        subtext: 'Significant federal contractor',
        points: 30
      }
    ]
  },
  {
    id: 'q3',
    text: 'How many federal contracts do you currently hold or have completed in the last 3 years?',
    type: 'single',
    options: [
      {
        id: 'zero',
        text: '0 contracts',
        points: 0
      },
      {
        id: 'one_two',
        text: '1-2 contracts',
        points: 8
      },
      {
        id: 'three_five',
        text: '3-5 contracts',
        points: 12
      },
      {
        id: 'six_ten',
        text: '6-10 contracts',
        points: 18
      },
      {
        id: 'over_ten',
        text: '10+ contracts',
        points: 25
      }
    ]
  },
  {
    id: 'q4',
    text: 'Have you completed any market research to identify your target federal opportunities?',
    type: 'single',
    options: [
      {
        id: 'no_research',
        text: 'No - have not started research',
        subtext: 'No data-driven insights yet',
        points: 0
      },
      {
        id: 'informal_research',
        text: 'Informal research only',
        subtext: 'Google searches, website browsing',
        points: 2
      },
      {
        id: 'some_research',
        text: 'Some basic research completed',
        subtext: 'USASpending queries, basic spend analysis',
        points: 5
      },
      {
        id: 'comprehensive_research',
        text: 'Comprehensive market research completed',
        subtext: 'Professional analysis, validated insights',
        points: 10
      },
      {
        id: 'ongoing_research',
        text: 'Ongoing intelligence and research capability',
        subtext: 'In-house or recurring professional support',
        points: 15
      }
    ]
  },
  {
    id: 'q5',
    text: 'What federal registrations and profiles have you completed?',
    type: 'multiple',
    options: [
      {
        id: 'none',
        text: 'None - not started',
        points: 0
      },
      {
        id: 'sam_only',
        text: 'SAM.gov registration only',
        points: 3
      },
      {
        id: 'sam_sba',
        text: 'SAM.gov + SBA/DSBS profile',
        points: 5
      },
      {
        id: 'gsa_schedule',
        text: 'GSA Schedule',
        points: 10
      },
      {
        id: 'gwac_idiq',
        text: 'GWAC or IDIQ vehicle',
        points: 12
      },
      {
        id: 'multiple_vehicles',
        text: 'Multiple contract vehicles (GSA + others)',
        points: 15
      }
    ]
  },
  {
    id: 'q6',
    text: 'Do you have federal-specific marketing collateral?',
    type: 'multiple',
    options: [
      {
        id: 'none',
        text: 'No federal collateral',
        points: 0
      },
      {
        id: 'basic_cape',
        text: 'Basic capability statement',
        subtext: 'DIY or generic template',
        points: 2
      },
      {
        id: 'professional_cape',
        text: 'Professional capability statement',
        subtext: 'Research-driven, well-designed',
        points: 5
      },
      {
        id: 'video',
        text: 'Video content',
        points: 5
      },
      {
        id: 'case_studies',
        text: 'Past performance case studies',
        points: 5
      },
      {
        id: 'full_suite',
        text: 'Full federal marketing suite',
        subtext: 'Cape, videos, case studies, leave-behinds',
        points: 10
      }
    ]
  },
  {
    id: 'q7',
    text: 'How would you describe your federal market knowledge?',
    type: 'single',
    options: [
      {
        id: 'minimal',
        text: 'Minimal - just exploring',
        subtext: 'Do not know where to start',
        points: 0
      },
      {
        id: 'basic',
        text: 'Basic understanding',
        subtext: 'Know about SAM.gov, have heard of set-asides',
        points: 3
      },
      {
        id: 'intermediate',
        text: 'Intermediate knowledge',
        subtext: 'Understand procurement basics, have target agencies',
        points: 8
      },
      {
        id: 'advanced',
        text: 'Advanced understanding',
        subtext: 'Know vehicles, procurement strategies, timing',
        points: 12
      },
      {
        id: 'expert',
        text: 'Expert-level knowledge',
        subtext: 'Deep market intelligence, insider understanding',
        points: 18
      }
    ]
  },
  {
    id: 'q8',
    text: 'What is your PRIMARY goal? (Select one)',
    type: 'single',
    options: [
      {
        id: 'first_contract',
        text: 'Win my first federal contract',
        points: 0
      },
      {
        id: 'grow_pipeline',
        text: 'Grow my pipeline and win more contracts',
        points: 0
      },
      {
        id: 'optimize',
        text: 'Optimize my current portfolio',
        points: 0
      },
      {
        id: 'diversify',
        text: 'Diversify into new agencies or contract types',
        points: 0
      },
      {
        id: 'ma_prep',
        text: 'Prepare for M&A or strategic exit',
        points: 0
      }
    ]
  },
  {
    id: 'q9',
    text: 'What is your BIGGEST challenge right now? (Select up to 2)',
    type: 'multiple',
    options: [
      {
        id: 'no_knowledge',
        text: 'Do not know how federal market works',
        points: 0
      },
      {
        id: 'no_relationships',
        text: 'No federal relationships or CO access',
        points: 0
      },
      {
        id: 'thin_pipeline',
        text: 'Thin pipeline - hard to forecast',
        points: 0
      },
      {
        id: 'losing_bids',
        text: 'Losing bids to competitors',
        points: 0
      },
      {
        id: 'compliance',
        text: 'Contract management/compliance burden',
        points: 0
      },
      {
        id: 'scale',
        text: 'Do not know how to scale or replicate wins',
        points: 0
      }
    ]
  },
  {
    id: 'q10',
    text: 'How many federal agencies do you actively target or work with?',
    type: 'single',
    options: [
      {
        id: 'none',
        text: '0 - still identifying targets',
        points: 0
      },
      {
        id: 'one',
        text: '1 agency',
        points: 5
      },
      {
        id: 'two_three',
        text: '2-3 agencies',
        points: 10
      },
      {
        id: 'four_six',
        text: '4-6 agencies',
        points: 15
      },
      {
        id: 'over_six',
        text: '7+ agencies',
        points: 20
      }
    ]
  },
  {
    id: 'q11',
    text: 'Do you have a dedicated federal BD team?',
    type: 'single',
    options: [
      {
        id: 'no_team',
        text: 'No - founder/owner handles everything',
        points: 0
      },
      {
        id: 'part_time',
        text: 'Part-time person (1 person, <20 hrs/week)',
        points: 3
      },
      {
        id: 'one_fte',
        text: '1 full-time BD person',
        points: 8
      },
      {
        id: 'small_team',
        text: '2-3 person BD team',
        points: 12
      },
      {
        id: 'full_team',
        text: 'Full BD/capture team (4+ people)',
        points: 18
      }
    ]
  },
  {
    id: 'q12',
    text: 'How would you describe your win rate on federal proposals?',
    type: 'single',
    options: [
      {
        id: 'no_bids',
        text: 'Have not submitted proposals yet',
        points: 0
      },
      {
        id: 'low',
        text: 'Low (0-15% win rate)',
        points: 2
      },
      {
        id: 'fair',
        text: 'Fair (15-30% win rate)',
        points: 8
      },
      {
        id: 'good',
        text: 'Good (30-50% win rate)',
        points: 12
      },
      {
        id: 'excellent',
        text: 'Excellent (50%+ win rate)',
        points: 18
      }
    ]
  },
  {
    id: 'q13',
    text: 'What is your annual federal BD/capture budget?',
    type: 'single',
    options: [
      {
        id: 'under_50k',
        text: 'Under $50K',
        subtext: 'Minimal investment capacity',
        points: 0
      },
      {
        id: '50k_150k',
        text: '$50K - $150K',
        subtext: 'Early-stage investment',
        points: 5
      },
      {
        id: '150k_300k',
        text: '$150K - $300K',
        subtext: 'Growing investment',
        points: 10
      },
      {
        id: '300k_500k',
        text: '$300K - $500K',
        subtext: 'Established budget',
        points: 15
      },
      {
        id: 'over_500k',
        text: 'Over $500K',
        subtext: 'Significant investment capacity',
        points: 20
      }
    ]
  },
  {
    id: 'q14',
    text: 'How far out can you forecast your federal pipeline?',
    type: 'single',
    options: [
      {
        id: 'no_pipeline',
        text: 'No pipeline tracking',
        points: 0
      },
      {
        id: 'reactive',
        text: 'Reactive - respond to posted RFPs only',
        points: 3
      },
      {
        id: '3_6_months',
        text: '3-6 months visibility',
        points: 8
      },
      {
        id: '6_12_months',
        text: '6-12 months visibility',
        points: 12
      },
      {
        id: 'over_12_months',
        text: '12+ months visibility with early capture',
        points: 18
      }
    ]
  },
  {
    id: 'q15',
    text: 'Which of the following have you completed? (Select all that apply)',
    type: 'multiple',
    options: [
      {
        id: 'none_above',
        text: 'None of the above',
        points: 0
      },
      {
        id: 'market_research',
        text: 'Professional market research',
        points: 5
      },
      {
        id: 'agency_mapping',
        text: 'Agency prioritization and buyer mapping',
        points: 5
      },
      {
        id: 'co_database',
        text: 'Contracting Officer database',
        points: 5
      },
      {
        id: 'competitor_intel',
        text: 'Competitor intelligence analysis',
        points: 5
      },
      {
        id: 'pipeline_tool',
        text: 'Formal pipeline management system',
        points: 5
      },
      {
        id: 'cpars',
        text: 'CPARS/past performance strategy',
        points: 5
      }
    ]
  }
];

// Calculate persona based on total score
export function calculatePersona(answers: UserAnswer[]): Persona {
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
  
  const matchedPersona = personas.find(
    p => totalScore >= p.minPoints && totalScore <= p.maxPoints
  );
  
  return matchedPersona || personas[0];
}

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
