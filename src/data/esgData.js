// ESG Data Models based on Crelan Sustainability Analysis

export const companyProfile = {
  name: "Crelan Group",
  sector: "Financial Services - Cooperative Banking",
  totalAssets: 57900000000, // €57.9B
  totalLending: 6350000000, // €6.35B
  employees: 3200,
  shareholders: 284000,
  reportingYear: 2023,
  csrdStartYear: 2024
};

export const impactDimensions = [
  {
    id: 'governance',
    name: 'Governance Integration',
    score: 8.5,
    assessment: 'Strong',
    color: '#10B981',
    evidence: [
      'ESG Office embedded in Cooperative Bank Office since Sept 2023',
      'Dedicated Chief Cooperative Bank Officer and ESG Manager',
      'Direct CEO reporting line',
      'Clear accountability structures'
    ],
    metrics: {
      boardDiversity: {
        current: 25,
        target: 33,
        targetYear: 2027,
        unit: '%',
        label: 'Female Board Representation'
      },
      managementDiversity: {
        current: 0,
        target: 25,
        targetYear: 2027,
        unit: '%',
        label: 'Female Management Committee'
      },
      esgCommittees: 3,
      reportingFrequency: 'Quarterly'
    }
  },
  {
    id: 'climate',
    name: 'Climate Action',
    score: 7.5,
    assessment: 'Moderate-Strong',
    color: '#3B82F6',
    evidence: [
      '€600M green bond issuance',
      '100% electric car policy from Oct 2023',
      '468 solar panels installed (189.6kW capacity)',
      '18% electricity reduction in Berchem facility'
    ],
    metrics: {
      greenBonds: {
        value: 600000000,
        unit: '€',
        label: 'Green Bond Issuance'
      },
      solarCapacity: {
        value: 189.6,
        unit: 'kW',
        label: 'Solar Panel Capacity'
      },
      electricityReduction: {
        value: 18,
        unit: '%',
        label: 'Electricity Reduction'
      },
      electricVehiclePolicy: {
        value: 100,
        unit: '%',
        label: 'EV Policy Compliance'
      }
    }
  },
  {
    id: 'social',
    name: 'Social Impact',
    score: 6.5,
    assessment: 'Moderate',
    color: '#8B5CF6',
    evidence: [
      '€86,200 distributed via Crelan Foundation (27 projects)',
      '2 university chairs for sustainable agriculture',
      '8th consecutive Top Employer certification',
      'Employee development programs'
    ],
    metrics: {
      foundationDistribution: {
        value: 86200,
        unit: '€',
        label: 'Foundation Grants'
      },
      projectsSupported: {
        value: 27,
        unit: '',
        label: 'Community Projects'
      },
      universityChairs: {
        value: 2,
        unit: '',
        label: 'University Chairs'
      },
      topEmployerYears: {
        value: 8,
        unit: 'years',
        label: 'Top Employer Streak'
      }
    }
  },
  {
    id: 'customer',
    name: 'Customer Influence',
    score: 6.0,
    assessment: 'Moderate',
    color: '#F59E0B',
    evidence: [
      '€5.8M ECO Renovation Loans',
      '>81% of fund production in Article 8/9 SFDR funds',
      'Green lending incentives active',
      'Sustainable product portfolio growth'
    ],
    metrics: {
      ecoLoans: {
        value: 5800000,
        unit: '€',
        label: 'ECO Renovation Loans'
      },
      sfdrCompliance: {
        value: 81,
        unit: '%',
        label: 'SFDR Art 8/9 Funds'
      },
      housingLendingShare: {
        value: 72.5,
        unit: '%',
        label: 'Housing/Consumption Lending'
      }
    }
  },
  {
    id: 'risk',
    name: 'Risk Management',
    score: 5.5,
    assessment: 'Emerging',
    color: '#6366F1',
    evidence: [
      'First climate/environmental risk materiality assessment in 2023',
      'Quantitative + qualitative approach implemented',
      'ECB compliance achieved',
      'Framework established but early stage'
    ],
    metrics: {
      riskAssessmentComplete: true,
      ecbCompliant: true,
      scenarioAnalysis: 'In Progress',
      scope3Coverage: 'Limited'
    }
  }
];

export const overallImpactScore = {
  score: 6.5,
  maxScore: 10,
  trend: 'improving',
  previousScore: 5.8,
  assessment: 'Transitioning from compliance-oriented to impact-driven'
};

export const criticalGaps = [
  {
    id: 'scope3',
    title: 'Limited Scope 3 Data',
    description: 'Customer-financed emissions (Scope 3) lack detailed quantification while operational emissions (Scope 1&2) are measured.',
    severity: 'high',
    category: 'Environmental'
  },
  {
    id: 'csrd',
    title: 'Early-Stage CSRD Preparation',
    description: 'CSRD reporting starts in 2024 for 2024 data – currently preparing but no historical CSRD-compliant data available.',
    severity: 'medium',
    category: 'Compliance'
  },
  {
    id: 'concentration',
    title: 'Concentration Risk',
    description: '72.5% of lending goes to individual housing/consumption vs. sustainable transition projects.',
    severity: 'medium',
    category: 'Portfolio'
  },
  {
    id: 'diversity',
    title: 'Diversity Targets Lagging',
    description: 'Current 25% female Board representation vs. 33% 2027 target; 100% male Management Committee.',
    severity: 'high',
    category: 'Governance'
  }
];

export const emissionsData = {
  scope1: {
    current: 1250,
    previous: 1420,
    unit: 'tCO2e',
    label: 'Scope 1 - Direct Emissions',
    sources: ['Company vehicles', 'Natural gas heating', 'Refrigerants']
  },
  scope2: {
    current: 2800,
    previous: 3410,
    unit: 'tCO2e',
    label: 'Scope 2 - Indirect Energy',
    sources: ['Purchased electricity', 'District heating']
  },
  scope3: {
    estimated: 'Not fully quantified',
    categories: [
      { name: 'Financed emissions', status: 'In progress' },
      { name: 'Business travel', status: 'Measured' },
      { name: 'Employee commuting', status: 'Estimated' },
      { name: 'Supply chain', status: 'Not measured' }
    ]
  }
};

export const timelineData = [
  { year: 2020, score: 4.5, scope1: 1800, scope2: 4200 },
  { year: 2021, score: 5.2, scope1: 1650, scope2: 3850 },
  { year: 2022, score: 5.8, scope1: 1420, scope2: 3410 },
  { year: 2023, score: 6.5, scope1: 1250, scope2: 2800 },
  { year: 2024, score: 7.2, scope1: 1100, scope2: 2400, projected: true },
  { year: 2025, score: 7.8, scope1: 950, scope2: 2000, projected: true }
];

export const csrdRequirements = [
  {
    id: 'e1',
    code: 'E1',
    name: 'Climate Change',
    status: 'in_progress',
    completion: 65,
    topics: ['GHG emissions', 'Climate risks', 'Energy consumption', 'Transition plan']
  },
  {
    id: 'e2',
    code: 'E2',
    name: 'Pollution',
    status: 'not_started',
    completion: 15,
    topics: ['Air pollution', 'Water pollution', 'Soil pollution', 'Substances of concern']
  },
  {
    id: 'e3',
    code: 'E3',
    name: 'Water & Marine Resources',
    status: 'not_started',
    completion: 10,
    topics: ['Water consumption', 'Water discharge', 'Marine resources']
  },
  {
    id: 'e4',
    code: 'E4',
    name: 'Biodiversity & Ecosystems',
    status: 'not_started',
    completion: 5,
    topics: ['Impact on biodiversity', 'Land use', 'Ecosystem services']
  },
  {
    id: 'e5',
    code: 'E5',
    name: 'Circular Economy',
    status: 'in_progress',
    completion: 30,
    topics: ['Resource inflows', 'Resource outflows', 'Waste']
  },
  {
    id: 's1',
    code: 'S1',
    name: 'Own Workforce',
    status: 'completed',
    completion: 85,
    topics: ['Working conditions', 'Equal treatment', 'Training', 'Health & safety']
  },
  {
    id: 's2',
    code: 'S2',
    name: 'Workers in Value Chain',
    status: 'in_progress',
    completion: 25,
    topics: ['Working conditions', 'Equal treatment', 'Other work-related rights']
  },
  {
    id: 's3',
    code: 'S3',
    name: 'Affected Communities',
    status: 'in_progress',
    completion: 40,
    topics: ['Community impacts', 'Indigenous peoples', 'Civil & political rights']
  },
  {
    id: 's4',
    code: 'S4',
    name: 'Consumers & End-users',
    status: 'in_progress',
    completion: 55,
    topics: ['Information-related impacts', 'Personal safety', 'Social inclusion']
  },
  {
    id: 'g1',
    code: 'G1',
    name: 'Business Conduct',
    status: 'completed',
    completion: 90,
    topics: ['Corporate culture', 'Supplier relationships', 'Corruption prevention', 'Political engagement']
  }
];

export const aiAutomationFeatures = [
  {
    id: 'data_collection',
    name: 'Automated Data Collection',
    description: 'Multi-source data fabric integrating ERP, HR systems, supplier databases, IoT meters',
    currentState: 'Manual data gathering from 3 entities',
    benefit: '90% reduction in manual collection time',
    status: 'available',
    phase: 'Foundation'
  },
  {
    id: 'materiality',
    name: 'Double Materiality Assessment',
    description: 'AI-powered gap analysis against ESRS requirements with continuous updates',
    currentState: 'Annual manual assessment',
    benefit: 'Continuous compliance monitoring',
    status: 'available',
    phase: 'Enhancement'
  },
  {
    id: 'risk_analytics',
    name: 'Predictive Risk Analytics',
    description: 'Geospatial ML models analyzing climate risks, stress testing',
    currentState: 'Static 2023 risk assessment',
    benefit: 'Probability-weighted loss projections',
    status: 'available',
    phase: 'Enhancement'
  },
  {
    id: 'nlp_reporting',
    name: 'NLP Report Generation',
    description: 'Auto-draft ESRS-compliant narratives with XBRL tagging',
    currentState: 'Manual report drafting',
    benefit: 'Audit-ready accuracy, faster turnaround',
    status: 'available',
    phase: 'Enhancement'
  },
  {
    id: 'stakeholder',
    name: 'Stakeholder Engagement AI',
    description: 'Sentiment analysis of 284,000 shareholder inputs',
    currentState: 'Limited feedback processing',
    benefit: 'Representative feedback loops',
    status: 'coming_soon',
    phase: 'Optimization'
  },
  {
    id: 'portfolio',
    name: 'Portfolio ESG Analytics',
    description: 'Real-time ESG scoring using alternative data, controversy monitoring',
    currentState: 'Periodic manual review',
    benefit: 'Impact attribution per euro invested',
    status: 'coming_soon',
    phase: 'Optimization'
  }
];

export const implementationRoadmap = [
  {
    phase: 'Foundation',
    timeline: 'Q1-Q2 2024',
    actions: [
      'Deploy data integration platform',
      'Automate Scope 1&2 tracking',
      'Establish CSRD data architecture'
    ],
    status: 'in_progress'
  },
  {
    phase: 'Enhancement',
    timeline: 'Q3-Q4 2024',
    actions: [
      'Implement predictive risk models',
      'Launch NLP-assisted report drafting',
      'Automate double materiality process'
    ],
    status: 'planned'
  },
  {
    phase: 'Optimization',
    timeline: '2025',
    actions: [
      'Full Scope 3 automation',
      'Real-time portfolio ESG analytics',
      'AI-powered stakeholder engagement'
    ],
    status: 'planned'
  }
];

export const expectedOutcomes = [
  {
    metric: 'Efficiency',
    description: 'Reduce reporting time from ~1,000 hours to <100 hours annually',
    icon: 'Clock'
  },
  {
    metric: 'Accuracy',
    description: 'Eliminate manual transcription errors; improve audit pass rates',
    icon: 'CheckCircle'
  },
  {
    metric: 'Strategic Value',
    description: 'Shift from backward-looking compliance to forward-looking intelligence',
    icon: 'TrendingUp'
  },
  {
    metric: 'Competitive Advantage',
    description: 'Enhanced green product development through customer preference analytics',
    icon: 'Award'
  }
];
