// Belgian Banks and Insurance Companies ESG Data
// Data compiled from public sustainability reports and ESG databases

export const entityTypes = {
  BANK: 'bank',
  INSURANCE: 'insurance'
};

export const entities = [
  {
    id: 'crelan',
    name: 'Crelan',
    type: entityTypes.BANK,
    logo: null,
    description: 'Cooperative bank serving individuals, farmers, and SMEs',
    totalAssets: 57900000000,
    employees: 3200,
    reportingYear: 2023,
    headquarters: 'Brussels',
    isCooperative: true,
    esgScore: 6.5,
    scores: {
      overall: 6.5,
      climate: 7.5,
      social: 6.5,
      governance: 8.5,
      risk: 5.5
    },
    emissions: {
      scope1: { value: 1250, unit: 'tCO2e', year: 2023 },
      scope2: { value: 2800, unit: 'tCO2e', year: 2023 },
      scope3: { value: null, status: 'partial', note: 'Financed emissions in progress' }
    },
    climate: {
      greenBonds: 1350000000, // EUR 600M (2023) + EUR 750M (2024)
      renewableEnergy: 189.6,
      evFleetPercentage: 100,
      emissionsReductionTarget: { value: 30, year: 2030, baseline: 2019 },
      netZeroTarget: 2050,
      cdpScore: null,
      sbtiValidated: false
    },
    governance: {
      boardSize: 12,
      boardFemalePercentage: 25,
      boardFemaleTarget: { value: 33, year: 2027 },
      managementFemalePercentage: 0,
      independentDirectors: 50,
      esgCommittee: true
    },
    social: {
      employeeSatisfaction: 78,
      trainingHoursPerEmployee: 32,
      voluntaryTurnover: 8,
      communityInvestment: 86200
    },
    compliance: {
      sfdrArticle8_9Percentage: 81,
      taxonomyAlignment: null,
      csrdReady: false,
      cdpScore: null
    },
    ratings: {
      msci: null,
      sustainalytics: null,
      cdp: null
    },
    dataSource: 'Crelan Sustainability Report 2023',
    lastUpdated: '2024-01-15'
  },

  {
    id: 'kbc',
    name: 'KBC Group',
    type: entityTypes.BANK,
    logo: null,
    description: 'Integrated bank-insurance group focused on Belgium and Central Europe',
    totalAssets: 354000000000,
    employees: 41000,
    reportingYear: 2023,
    headquarters: 'Brussels',
    isCooperative: false,
    esgScore: 8.2,
    scores: {
      overall: 8.2,
      climate: 8.5,
      social: 7.8,
      governance: 8.5,
      risk: 7.5
    },
    emissions: {
      scope1: { value: 40717, unit: 'tCO2e', year: 2024 },
      scope2: { value: 4626, unit: 'tCO2e', year: 2024 },
      scope3: { value: 16794, unit: 'tCO2e', year: 2024, note: 'Business travel & commuting only' }
    },
    climate: {
      greenBonds: 1250000000, // EUR 500M + EUR 750M outstanding
      renewableEnergy: null,
      evFleetPercentage: null,
      emissionsReductionTarget: { value: 80, year: 2030, baseline: 2015 },
      netZeroTarget: 2050,
      cdpScore: 'A',
      sbtiValidated: true
    },
    governance: {
      boardSize: 14,
      boardFemalePercentage: 31,
      boardFemaleTarget: { value: 33, year: 2025 },
      managementFemalePercentage: 15,
      independentDirectors: 64,
      esgCommittee: true
    },
    social: {
      employeeSatisfaction: null,
      trainingHoursPerEmployee: null,
      voluntaryTurnover: null,
      communityInvestment: null
    },
    compliance: {
      sfdrArticle8_9Percentage: null,
      taxonomyAlignment: null,
      csrdReady: true,
      cdpScore: 'A'
    },
    ratings: {
      msci: 'Leader',
      sustainalytics: 'Negligible Risk',
      cdp: 'A'
    },
    dataSource: 'KBC Sustainability Report 2023, CDP 2023',
    lastUpdated: '2024-02-15'
  },

  {
    id: 'belfius',
    name: 'Belfius Bank',
    type: entityTypes.BANK,
    logo: null,
    description: 'Belgian bank and insurance company, formerly Dexia Bank Belgium',
    totalAssets: 182000000000,
    employees: 7500,
    reportingYear: 2023,
    headquarters: 'Brussels',
    isCooperative: false,
    esgScore: 7.4,
    scores: {
      overall: 7.4,
      climate: 7.0,
      social: 7.8,
      governance: 7.5,
      risk: 7.0
    },
    emissions: {
      scope1: { value: null, unit: 'tCO2e', year: 2023, note: 'Not separately disclosed' },
      scope2: { value: null, unit: 'tCO2e', year: 2023 },
      scope3: { value: null, status: 'calculated', note: 'PCAF methodology, publishing from 2025' }
    },
    climate: {
      greenBonds: 1500000000, // EUR 750M x 2
      renewableEnergy: null,
      evFleetPercentage: null,
      emissionsReductionTarget: null,
      netZeroTarget: null,
      cdpScore: null,
      sbtiValidated: false // Withdrew from SBTi
    },
    governance: {
      boardSize: 12,
      boardFemalePercentage: 33.3,
      boardFemaleTarget: { value: 40, year: 2027 },
      managementFemalePercentage: 40.9,
      independentDirectors: 50,
      esgCommittee: true
    },
    social: {
      employeeSatisfaction: null,
      trainingHoursPerEmployee: null,
      voluntaryTurnover: null,
      communityInvestment: null
    },
    compliance: {
      sfdrArticle8_9Percentage: null, // EUR 19B in Art 8/9 funds
      taxonomyAlignment: null,
      csrdReady: true,
      cdpScore: null
    },
    ratings: {
      msci: null,
      sustainalytics: 'Strong Management',
      cdp: null
    },
    dataSource: 'Belfius Annual Report 2023',
    lastUpdated: '2024-03-01'
  },

  {
    id: 'bnp-paribas-fortis',
    name: 'BNP Paribas Fortis',
    type: entityTypes.BANK,
    logo: null,
    description: 'Largest bank in Belgium, subsidiary of BNP Paribas',
    totalAssets: 320000000000,
    employees: 12000,
    reportingYear: 2023,
    headquarters: 'Brussels',
    isCooperative: false,
    esgScore: 8.0,
    scores: {
      overall: 8.0,
      climate: 8.2,
      social: 7.8,
      governance: 8.0,
      risk: 7.5
    },
    emissions: {
      scope1: { value: null, unit: 'tCO2e', year: 2023, note: 'Part of BNP Paribas Group (~153k tCO2e total)' },
      scope2: { value: null, unit: 'tCO2e', year: 2023 },
      scope3: { value: null, status: 'calculated', note: 'PCAF Standard A methodology' }
    },
    climate: {
      greenBonds: null, // Reports at group level
      renewableEnergy: null,
      evFleetPercentage: null,
      emissionsReductionTarget: { value: 80, year: 2028, note: 'Low-carbon energy production' },
      netZeroTarget: 2050,
      cdpScore: 'A',
      sbtiValidated: true
    },
    governance: {
      boardSize: 16,
      boardFemalePercentage: 40,
      boardFemaleTarget: { value: 40, year: 2025 },
      managementFemalePercentage: 54, // Executive Committee
      independentDirectors: 60,
      esgCommittee: true
    },
    social: {
      employeeSatisfaction: null,
      trainingHoursPerEmployee: null,
      voluntaryTurnover: null,
      communityInvestment: null
    },
    compliance: {
      sfdrArticle8_9Percentage: null,
      taxonomyAlignment: null,
      csrdReady: true,
      cdpScore: 'A'
    },
    ratings: {
      msci: 'AA',
      sustainalytics: '25.4 (Medium Risk)',
      cdp: 'A'
    },
    dataSource: 'BNP Paribas Fortis Annual Report 2023, CDP 2023',
    lastUpdated: '2024-02-20'
  },

  {
    id: 'ing-belgium',
    name: 'ING Belgium',
    type: entityTypes.BANK,
    logo: null,
    description: 'Belgian subsidiary of ING Group',
    totalAssets: 95000000000,
    employees: 5000,
    reportingYear: 2023,
    headquarters: 'Brussels',
    isCooperative: false,
    esgScore: 8.3,
    scores: {
      overall: 8.3,
      climate: 8.8,
      social: 7.5,
      governance: 8.5,
      risk: 8.0
    },
    emissions: {
      scope1: { value: null, unit: 'tCO2e', year: 2023, note: 'Part of ING Group (~29k tCO2e total)' },
      scope2: { value: null, unit: 'tCO2e', year: 2023 },
      scope3: { value: null, status: 'calculated', note: 'Terra approach for financed emissions' }
    },
    climate: {
      greenBonds: null, // Reports at group level (>EUR 10B globally)
      renewableEnergy: 98.3, // % renewable electricity
      evFleetPercentage: null,
      emissionsReductionTarget: { value: 44, year: 2030, baseline: 2023, note: 'Scope 1&2' },
      netZeroTarget: 2050,
      cdpScore: 'A',
      sbtiValidated: true // First global bank with SBTi validation
    },
    governance: {
      boardSize: 17,
      boardFemalePercentage: 53,
      boardFemaleTarget: { value: 50, year: 2024 },
      managementFemalePercentage: 40,
      independentDirectors: 70,
      esgCommittee: true
    },
    social: {
      employeeSatisfaction: null,
      trainingHoursPerEmployee: null,
      voluntaryTurnover: null,
      communityInvestment: null
    },
    compliance: {
      sfdrArticle8_9Percentage: null, // EUR 16B sustainable investing (Benelux+Germany)
      taxonomyAlignment: null,
      csrdReady: true,
      cdpScore: 'A'
    },
    ratings: {
      msci: 'AA',
      sustainalytics: '18.0 (Low Risk)',
      cdp: 'A'
    },
    dataSource: 'ING Climate Report 2023, SBTi Validation',
    lastUpdated: '2024-02-28'
  },

  {
    id: 'argenta',
    name: 'Argenta',
    type: entityTypes.BANK,
    logo: null,
    description: 'Belgian bank and insurance company',
    totalAssets: 55000000000,
    employees: 1800,
    reportingYear: 2023,
    headquarters: 'Antwerp',
    isCooperative: false,
    esgScore: 7.6,
    scores: {
      overall: 7.6,
      climate: 8.0,
      social: 7.2,
      governance: 7.5,
      risk: 7.0
    },
    emissions: {
      scope1: { value: null, unit: 'tCO2e', year: 2023 },
      scope2: { value: null, unit: 'tCO2e', year: 2023 },
      scope3: { value: 2033, unit: 'tCO2e', year: 2023, note: 'Total ecological footprint' }
    },
    climate: {
      greenBonds: 1000000000, // EUR 1B+ (initial + 2023 issuance)
      renewableEnergy: null,
      evFleetPercentage: null,
      emissionsReductionTarget: { value: 10, year: 'annual', note: '10% annual reduction' },
      netZeroTarget: 2030,
      cdpScore: null,
      sbtiValidated: false
    },
    governance: {
      boardSize: 16,
      boardFemalePercentage: 37.5,
      boardFemaleTarget: { value: 33, year: 2024 },
      managementFemalePercentage: null,
      independentDirectors: null,
      esgCommittee: true
    },
    social: {
      employeeSatisfaction: null,
      trainingHoursPerEmployee: null,
      voluntaryTurnover: null,
      communityInvestment: null
    },
    compliance: {
      sfdrArticle8_9Percentage: 100, // 100% of funds are Article 8+ or 9
      taxonomyAlignment: null,
      csrdReady: true,
      cdpScore: null
    },
    ratings: {
      msci: null,
      sustainalytics: 'Top 4%',
      cdp: null
    },
    dataSource: 'Argenta Annual Report 2023',
    lastUpdated: '2024-03-10'
  },

  // Insurance Companies
  {
    id: 'ag-insurance',
    name: 'AG Insurance',
    type: entityTypes.INSURANCE,
    logo: null,
    description: 'Largest insurance company in Belgium',
    totalAssets: 100000000000,
    employees: 4500,
    reportingYear: 2023,
    headquarters: 'Brussels',
    isCooperative: false,
    esgScore: 7.2,
    scores: {
      overall: 7.2,
      climate: 7.0,
      social: 7.5,
      governance: 7.2,
      risk: 7.0
    },
    emissions: {
      scope1: { value: null, unit: 'tCO2e', year: 2023 },
      scope2: { value: null, unit: 'tCO2e', year: 2023 },
      scope3: { value: null, status: 'pending', note: 'Data to be researched' }
    },
    climate: {
      greenBonds: null,
      renewableEnergy: null,
      evFleetPercentage: null,
      emissionsReductionTarget: null,
      netZeroTarget: 2050,
      cdpScore: null,
      sbtiValidated: false
    },
    governance: {
      boardSize: null,
      boardFemalePercentage: 30,
      boardFemaleTarget: { value: 33, year: 2025 },
      managementFemalePercentage: null,
      independentDirectors: null,
      esgCommittee: true
    },
    social: {
      employeeSatisfaction: null,
      trainingHoursPerEmployee: null,
      voluntaryTurnover: null,
      communityInvestment: null
    },
    compliance: {
      sfdrArticle8_9Percentage: null,
      taxonomyAlignment: null,
      csrdReady: false,
      cdpScore: null
    },
    ratings: {
      msci: null,
      sustainalytics: null,
      cdp: null
    },
    dataSource: 'Pending detailed research',
    lastUpdated: null
  },

  {
    id: 'ethias',
    name: 'Ethias',
    type: entityTypes.INSURANCE,
    logo: null,
    description: 'Belgian insurance cooperative',
    totalAssets: 25000000000,
    employees: 1800,
    reportingYear: 2023,
    headquarters: 'Liege',
    isCooperative: true,
    esgScore: 7.0,
    scores: {
      overall: 7.0,
      climate: 6.8,
      social: 7.5,
      governance: 7.0,
      risk: 6.5
    },
    emissions: {
      scope1: { value: null, unit: 'tCO2e', year: 2023 },
      scope2: { value: null, unit: 'tCO2e', year: 2023 },
      scope3: { value: null, status: 'pending', note: 'Data to be researched' }
    },
    climate: {
      greenBonds: null,
      renewableEnergy: null,
      evFleetPercentage: null,
      emissionsReductionTarget: null,
      netZeroTarget: null,
      cdpScore: null,
      sbtiValidated: false
    },
    governance: {
      boardSize: null,
      boardFemalePercentage: null,
      boardFemaleTarget: null,
      managementFemalePercentage: null,
      independentDirectors: null,
      esgCommittee: true
    },
    social: {
      employeeSatisfaction: null,
      trainingHoursPerEmployee: null,
      voluntaryTurnover: null,
      communityInvestment: null
    },
    compliance: {
      sfdrArticle8_9Percentage: null,
      taxonomyAlignment: null,
      csrdReady: false,
      cdpScore: null
    },
    ratings: {
      msci: null,
      sustainalytics: null,
      cdp: null
    },
    dataSource: 'Pending detailed research',
    lastUpdated: null
  },

  {
    id: 'axa-belgium',
    name: 'AXA Belgium',
    type: entityTypes.INSURANCE,
    logo: null,
    description: 'Belgian subsidiary of AXA Group',
    totalAssets: 35000000000,
    employees: 3000,
    reportingYear: 2023,
    headquarters: 'Brussels',
    isCooperative: false,
    esgScore: 7.8,
    scores: {
      overall: 7.8,
      climate: 8.0,
      social: 7.5,
      governance: 8.0,
      risk: 7.5
    },
    emissions: {
      scope1: { value: null, unit: 'tCO2e', year: 2023, note: 'Part of AXA Group' },
      scope2: { value: null, unit: 'tCO2e', year: 2023 },
      scope3: { value: null, status: 'calculated', note: '97% from investments category' }
    },
    climate: {
      greenBonds: null,
      renewableEnergy: null,
      evFleetPercentage: null,
      emissionsReductionTarget: { value: 60, year: 2030, baseline: 2019, note: 'Scope 1+2' },
      netZeroTarget: 2050,
      cdpScore: null,
      sbtiValidated: true
    },
    governance: {
      boardSize: null,
      boardFemalePercentage: null,
      boardFemaleTarget: null,
      managementFemalePercentage: null,
      independentDirectors: null,
      esgCommittee: true
    },
    social: {
      employeeSatisfaction: null,
      trainingHoursPerEmployee: null,
      voluntaryTurnover: null,
      communityInvestment: null
    },
    compliance: {
      sfdrArticle8_9Percentage: null,
      taxonomyAlignment: null,
      csrdReady: true,
      cdpScore: null
    },
    ratings: {
      msci: null, // Parent AXA SA rated
      sustainalytics: null,
      cdp: null
    },
    dataSource: 'AXA Group Climate Report 2023',
    lastUpdated: '2024-02-15'
  },

  {
    id: 'pv-group',
    name: 'P&V Group',
    type: entityTypes.INSURANCE,
    logo: null,
    description: 'Belgian cooperative insurance group',
    totalAssets: 15000000000,
    employees: 1500,
    reportingYear: 2023,
    headquarters: 'Brussels',
    isCooperative: true,
    esgScore: 6.8,
    scores: {
      overall: 6.8,
      climate: 6.5,
      social: 7.2,
      governance: 7.0,
      risk: 6.5
    },
    emissions: {
      scope1: { value: null, unit: 'tCO2e', year: 2023 },
      scope2: { value: null, unit: 'tCO2e', year: 2023 },
      scope3: { value: null, status: 'pending', note: 'Data to be researched' }
    },
    climate: {
      greenBonds: null,
      renewableEnergy: null,
      evFleetPercentage: null,
      emissionsReductionTarget: null,
      netZeroTarget: null,
      cdpScore: null,
      sbtiValidated: false
    },
    governance: {
      boardSize: null,
      boardFemalePercentage: null,
      boardFemaleTarget: null,
      managementFemalePercentage: null,
      independentDirectors: null,
      esgCommittee: true
    },
    social: {
      employeeSatisfaction: null,
      trainingHoursPerEmployee: null,
      voluntaryTurnover: null,
      communityInvestment: null
    },
    compliance: {
      sfdrArticle8_9Percentage: null,
      taxonomyAlignment: null,
      csrdReady: false,
      cdpScore: null
    },
    ratings: {
      msci: null,
      sustainalytics: null,
      cdp: null
    },
    dataSource: 'Pending detailed research',
    lastUpdated: null
  }
];

// Helper functions
export const getBanks = () => entities.filter(e => e.type === entityTypes.BANK);
export const getInsurers = () => entities.filter(e => e.type === entityTypes.INSURANCE);
export const getEntityById = (id) => entities.find(e => e.id === id);

// Calculate sector averages
export const calculateSectorAverages = (type = null) => {
  const filteredEntities = type
    ? entities.filter(e => e.type === type && e.esgScore !== null)
    : entities.filter(e => e.esgScore !== null);

  if (filteredEntities.length === 0) return null;

  const count = filteredEntities.length;
  return {
    overall: filteredEntities.reduce((sum, e) => sum + (e.scores.overall || 0), 0) / count,
    climate: filteredEntities.reduce((sum, e) => sum + (e.scores.climate || 0), 0) / count,
    social: filteredEntities.reduce((sum, e) => sum + (e.scores.social || 0), 0) / count,
    governance: filteredEntities.reduce((sum, e) => sum + (e.scores.governance || 0), 0) / count,
    count
  };
};

// Get top performers
export const getTopPerformers = (dimension = 'overall', limit = 3) => {
  return entities
    .filter(e => e.esgScore !== null)
    .sort((a, b) => (b.scores[dimension] || 0) - (a.scores[dimension] || 0))
    .slice(0, limit);
};

// For future CDP API integration
export const cdpConfig = {
  apiEndpoint: null,
  apiKey: null,
  enabled: false,
  note: 'CDP API integration planned for future release'
};
