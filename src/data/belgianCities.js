// Belgian Cities Climate Action Data
// Data compiled from Covenant of Mayors, EU Mission Cities, and official city sustainability reports
// CDP data pending API access - cities marked with cdpScore: null

export const cityTypes = {
  CAPITAL: 'capital',
  MAJOR: 'major',
  REGIONAL: 'regional'
};

export const cities = [
  {
    id: 'brussels',
    name: 'Brussels Capital Region',
    type: cityTypes.CAPITAL,
    population: 1264392,
    area: 162, // km²
    region: 'Brussels-Capital',
    description: 'Capital of Belgium and the European Union',
    reportingYear: 2023,
    esgScore: 8.2,
    scores: {
      overall: 8.2,
      climate: 8.5,
      adaptation: 7.8,
      governance: 8.0,
      mobility: 8.5
    },
    emissions: {
      total: { value: null, unit: 'tCO2e', year: 2022 },
      perCapita: { value: 9.0, unit: 'tCO2e', year: 2022, note: 'Above EU average of 8 tCO2eq' },
      baseline: { value: null, unit: 'tCO2e', year: 2008 },
      reduction: null,
      sectors: {
        buildings: 65,
        transport: 28,
        waste: 4,
        other: 3
      }
    },
    targets: {
      reductionTarget: { value: 55, year: 2030, baseline: 2008 },
      netZeroTarget: 2050,
      renewableTarget: { value: 100, year: 2050 },
      carbonNeutralTarget: 2050
    },
    climate: {
      covenantOfMayors: true,
      commitmentYear: 2009,
      euMissionCity: false,
      c40Member: true, // Breathe Cities cohort, joined COP28
      cdpScore: null,
      seapSubmitted: true,
      secapSubmitted: true
    },
    initiatives: [
      { name: 'Brussels Air-Climate-Energy Plan', description: 'Integrated plan for air quality, climate, and energy', status: 'active' },
      { name: 'Low Emission Zone', description: 'Covers all 19 municipalities, saves €300M/year in healthcare', status: 'active' },
      { name: 'Breathe Cities (C40)', description: 'Member of C40 Breathe Cities cohort', status: 'active' },
      { name: 'Sustainable Mobility', description: '2/3 of residents use walking, cycling or public transit', status: 'active' }
    ],
    energy: {
      renewableElectricity: null,
      solarCapacity: 85000,
      buildingEfficiency: 'D',
      districtHeating: true
    },
    mobility: {
      publicTransportShare: 33,
      cyclingShare: 7,
      walkingShare: 27,
      evChargingPoints: 2500,
      lowEmissionZone: true, // Since 2018
      lezYear: 2018
    },
    greenInfrastructure: {
      greenSpacePerCapita: 22,
      treeCanopy: 21,
      protectedAreas: 14
    },
    adaptation: {
      heatActionPlan: true,
      floodRiskPlan: true,
      droughtPlan: true,
      climateVulnerabilityAssessment: true
    },
    governance: {
      climateOfficer: true,
      climateBudget: 450000000,
      citizenParticipation: true,
      climateCouncil: true
    },
    dataSource: 'Brussels Environment, Covenant of Mayors, C40 Cities',
    lastUpdated: '2024-06-01'
  },

  {
    id: 'antwerp',
    name: 'Antwerp',
    type: cityTypes.MAJOR,
    population: 545000,
    area: 204,
    region: 'Flanders',
    description: 'Belgium\'s second-largest city - major port with 10% of national emissions',
    reportingYear: 2023,
    esgScore: 7.8,
    scores: {
      overall: 7.8,
      climate: 8.0,
      adaptation: 7.5,
      governance: 7.8,
      mobility: 7.8
    },
    emissions: {
      total: { value: null, unit: 'tCO2e', year: 2022, note: 'Includes major industrial port emissions' },
      perCapita: { value: null, unit: 'tCO2e', year: 2022, note: 'Port accounts for 10% of Belgium total CO2' },
      baseline: { value: null, unit: 'tCO2e', year: 2005 },
      reduction: null,
      sectors: {
        buildings: 35,
        transport: 25,
        industry: 35, // Significant port industry
        waste: 5
      }
    },
    targets: {
      reductionTarget: { value: 55, year: 2030, baseline: null },
      netZeroTarget: 2050,
      renewableTarget: { value: 50, year: 2030 },
      carbonNeutralTarget: 2050
    },
    climate: {
      covenantOfMayors: true,
      commitmentYear: 2014,
      euMissionCity: false,
      c40Member: false,
      netZeroCities: true, // LINK Inclusive Climate Neutrality pilot
      cdpScore: null,
      seapSubmitted: true,
      secapSubmitted: true
    },
    initiatives: [
      { name: 'Climate Plan 2030', description: '50-55% CO2 reduction target, exceeding EU requirements', status: 'active' },
      { name: 'Port Net Zero Strategy', description: 'Port of Antwerp-Bruges decarbonization by 2050', status: 'active' },
      { name: 'Hydrogen Ecosystem', description: 'Green hydrogen production and distribution hub', status: 'in_progress' },
      { name: 'District Heating Networks', description: 'Industrial residual heat recovery systems', status: 'active' }
    ],
    energy: {
      renewableElectricity: 12,
      solarCapacity: 120000,
      buildingEfficiency: 'E',
      districtHeating: true
    },
    mobility: {
      publicTransportShare: 25,
      cyclingShare: 33,
      walkingShare: 20,
      evChargingPoints: 1800,
      lowEmissionZone: true,
      lezYear: 2017, // One of Belgium's first LEZs
      cyclingInvestment: 40000000 // €40M in port area cycle paths
    },
    greenInfrastructure: {
      greenSpacePerCapita: 18,
      treeCanopy: 15,
      protectedAreas: 8
    },
    adaptation: {
      heatActionPlan: true,
      floodRiskPlan: true,
      droughtPlan: true,
      climateVulnerabilityAssessment: true
    },
    governance: {
      climateOfficer: true,
      climateBudget: 280000000,
      citizenParticipation: true,
      climateCouncil: true
    },
    dataSource: 'City of Antwerp Climate Plan, Covenant of Mayors',
    lastUpdated: '2024-05-15'
  },

  {
    id: 'ghent',
    name: 'Ghent',
    type: cityTypes.MAJOR,
    population: 265086,
    area: 156.2,
    region: 'Flanders',
    description: 'Progressive university city with strong sustainability focus',
    reportingYear: 2023,
    esgScore: 8.5,
    scores: {
      overall: 8.5,
      climate: 8.8,
      adaptation: 8.2,
      governance: 8.5,
      mobility: 8.8
    },
    emissions: {
      total: { value: 850000, unit: 'tCO2e', year: 2022 },
      perCapita: { value: 3.2, unit: 'tCO2e', year: 2022 },
      baseline: { value: 1200000, unit: 'tCO2e', year: 2007 },
      reduction: 29,
      sectors: {
        buildings: 58,
        transport: 32,
        waste: 6,
        other: 4
      }
    },
    targets: {
      reductionTarget: { value: 40, year: 2030, baseline: 2007 },
      netZeroTarget: 2050,
      renewableTarget: { value: 30, year: 2030 },
      carbonNeutralTarget: 2050
    },
    climate: {
      covenantOfMayors: true,
      commitmentYear: 2009,
      euMissionCity: true,
      c40Member: false,
      cdpScore: null,
      seapSubmitted: true,
      secapSubmitted: true
    },
    initiatives: [
      { name: 'Climate Plan Ghent', description: '2020-2025 action plan with 80+ measures', status: 'active' },
      { name: 'Circulation Plan', description: 'Car-free city center', status: 'active' },
      { name: 'Ghent en Garde', description: 'Sustainable food strategy', status: 'active' },
      { name: 'Energy-Positive Districts', description: 'Net-zero neighborhood pilots', status: 'in_progress' }
    ],
    energy: {
      renewableElectricity: 18,
      solarCapacity: 95000,
      buildingEfficiency: 'D',
      districtHeating: true
    },
    mobility: {
      publicTransportShare: 22,
      cyclingShare: 35,
      walkingShare: 28,
      evChargingPoints: 1200,
      lowEmissionZone: true
    },
    greenInfrastructure: {
      greenSpacePerCapita: 28,
      treeCanopy: 22,
      protectedAreas: 12
    },
    adaptation: {
      heatActionPlan: true,
      floodRiskPlan: true,
      droughtPlan: true,
      climateVulnerabilityAssessment: true
    },
    governance: {
      climateOfficer: true,
      climateBudget: 180000000,
      citizenParticipation: true,
      climateCouncil: true
    },
    dataSource: 'City of Ghent Climate Plan 2020-2025, Covenant of Mayors',
    lastUpdated: '2024-04-20'
  },

  {
    id: 'liege',
    name: 'Liège',
    type: cityTypes.MAJOR,
    population: 197042,
    area: 69.4,
    region: 'Wallonia',
    description: 'Major Walloon economic and cultural center',
    reportingYear: 2023,
    esgScore: 7.2,
    scores: {
      overall: 7.2,
      climate: 7.0,
      adaptation: 7.2,
      governance: 7.5,
      mobility: 7.0
    },
    emissions: {
      total: { value: 750000, unit: 'tCO2e', year: 2022 },
      perCapita: { value: 3.8, unit: 'tCO2e', year: 2022 },
      baseline: { value: 950000, unit: 'tCO2e', year: 2006 },
      reduction: 21,
      sectors: {
        buildings: 62,
        transport: 28,
        waste: 6,
        other: 4
      }
    },
    targets: {
      reductionTarget: { value: 55, year: 2030, baseline: 2005 },
      netZeroTarget: 2050,
      renewableTarget: { value: 25, year: 2030 },
      carbonNeutralTarget: 2050
    },
    climate: {
      covenantOfMayors: true,
      commitmentYear: 2015,
      euMissionCity: false,
      c40Member: false,
      cdpScore: null,
      circularCitiesDeclaration: true,
      energyCities: true,
      seapSubmitted: true,
      secapSubmitted: true
    },
    initiatives: [
      { name: 'Liège Climate Plan', description: 'GHG reduction and territorial climate adaptation plan', status: 'active' },
      { name: 'Liège Declaration 2024', description: 'Climate adaptation declaration during Belgian EU Presidency', status: 'active' },
      { name: 'Smart Bin System', description: 'Smart waste management with mobile app', status: 'in_progress' },
      { name: 'Building Energy Renovation', description: 'Priority energy efficiency for municipal buildings', status: 'active' }
    ],
    energy: {
      renewableElectricity: 10,
      solarCapacity: 45000,
      buildingEfficiency: 'E',
      districtHeating: true
    },
    mobility: {
      publicTransportShare: 20,
      cyclingShare: 8,
      walkingShare: 25,
      evChargingPoints: 450,
      lowEmissionZone: false
    },
    greenInfrastructure: {
      greenSpacePerCapita: 20,
      treeCanopy: 18,
      protectedAreas: 6
    },
    adaptation: {
      heatActionPlan: true,
      floodRiskPlan: true,
      droughtPlan: false,
      climateVulnerabilityAssessment: true
    },
    governance: {
      climateOfficer: true,
      climateBudget: 95000000,
      citizenParticipation: true,
      climateCouncil: false
    },
    dataSource: 'City of Liège PAEDC, Covenant of Mayors',
    lastUpdated: '2024-03-10'
  },

  {
    id: 'bruges',
    name: 'Bruges',
    type: cityTypes.MAJOR,
    population: 119164,
    area: 138.4,
    region: 'Flanders',
    description: 'UNESCO World Heritage city - renewable energy leader in Flanders',
    reportingYear: 2023,
    esgScore: 7.6,
    scores: {
      overall: 7.6,
      climate: 7.5,
      adaptation: 7.8,
      governance: 7.5,
      mobility: 7.5
    },
    emissions: {
      total: { value: 420000, unit: 'tCO2e', year: 2022 },
      perCapita: { value: 3.5, unit: 'tCO2e', year: 2022 },
      baseline: { value: 580000, unit: 'tCO2e', year: 2011 },
      reduction: 28,
      sectors: {
        buildings: 60,
        transport: 30,
        waste: 5,
        other: 5
      }
    },
    targets: {
      reductionTarget: { value: 40, year: 2030, baseline: 2011 },
      netZeroTarget: 2050,
      renewableTarget: { value: 30, year: 2030 },
      carbonNeutralTarget: 2050
    },
    climate: {
      covenantOfMayors: true,
      commitmentYear: 2014,
      euMissionCity: false,
      c40Member: false,
      cdpScore: null,
      seapSubmitted: true,
      secapSubmitted: true
    },
    initiatives: [
      { name: 'Climate Action Plan 2030', description: 'Municipal climate strategy', status: 'active' },
      { name: 'Sustainable Tourism', description: 'Green tourism certification program', status: 'active' },
      { name: 'Heritage & Climate', description: 'Climate-proofing historic buildings', status: 'active' },
      { name: 'Blue-Green Network', description: 'Water and green space connectivity', status: 'in_progress' }
    ],
    energy: {
      renewableElectricity: 30, // 27-30%, leader in Flanders
      solarCapacity: 35000,
      buildingEfficiency: 'D',
      districtHeating: false
    },
    mobility: {
      publicTransportShare: 18,
      cyclingShare: 30,
      walkingShare: 25,
      evChargingPoints: 350,
      lowEmissionZone: true
    },
    greenInfrastructure: {
      greenSpacePerCapita: 32,
      treeCanopy: 20,
      protectedAreas: 18
    },
    adaptation: {
      heatActionPlan: true,
      floodRiskPlan: true,
      droughtPlan: true,
      climateVulnerabilityAssessment: true
    },
    governance: {
      climateOfficer: true,
      climateBudget: 45000000,
      citizenParticipation: true,
      climateCouncil: false
    },
    dataSource: 'City of Bruges Climate Plan, Covenant of Mayors',
    lastUpdated: '2024-04-01'
  },

  {
    id: 'leuven',
    name: 'Leuven',
    type: cityTypes.MAJOR,
    population: 100000,
    area: 57,
    region: 'Flanders',
    description: 'EU Mission 100 Climate-Neutral Cities member - most ambitious Belgian city',
    reportingYear: 2023,
    esgScore: 9.2,
    scores: {
      overall: 9.2,
      climate: 9.5,
      adaptation: 8.8,
      governance: 9.0,
      mobility: 9.0
    },
    emissions: {
      total: { value: 457000, unit: 'tCO2e', year: 2019 },
      target2030: { value: 79000, unit: 'tCO2e' },
      perCapita: { value: 4.6, unit: 'tCO2e', year: 2019 },
      baseline: { value: 457000, unit: 'tCO2e', year: 2019 },
      reduction: null,
      sectors: {
        buildings: 55,
        transport: 30,
        waste: 8,
        other: 7
      }
    },
    targets: {
      reductionTarget: { value: 80, year: 2030, baseline: 2019 }, // Most ambitious in Belgium
      netZeroTarget: 2050,
      renewableTarget: { value: 100, year: 2050 },
      carbonNeutralTarget: 2030 // By 2030 for EU Mission
    },
    climate: {
      covenantOfMayors: true,
      commitmentYear: 2012,
      euMissionCity: true, // Selected 2022 for EU Mission 100 Climate-Neutral Cities
      c40Member: false,
      cdpScore: null,
      seapSubmitted: true,
      secapSubmitted: true
    },
    initiatives: [
      { name: 'Climate City Contract', description: '1000-page plan with 87 breakthrough projects', status: 'active' },
      { name: 'Leuven 2030 Roadmap', description: 'Multi-stakeholder collaboration with KU Leuven', status: 'active' },
      { name: 'Smart Street Lighting', description: 'AI-controlled lighting achieving 30% noise reduction', status: 'active' },
      { name: 'Building Renovation Program', description: 'Energy efficiency focus for old and new buildings', status: 'active' }
    ],
    energy: {
      renewableElectricity: null,
      solarCapacity: 65000,
      buildingEfficiency: 'C',
      districtHeating: true
    },
    mobility: {
      publicTransportShare: 22,
      cyclingShare: 40,
      walkingShare: 25,
      evChargingPoints: 650,
      lowEmissionZone: true
    },
    greenInfrastructure: {
      greenSpacePerCapita: 35,
      treeCanopy: 25,
      protectedAreas: 15
    },
    adaptation: {
      heatActionPlan: true,
      floodRiskPlan: true,
      droughtPlan: true,
      climateVulnerabilityAssessment: true
    },
    governance: {
      climateOfficer: true,
      climateBudget: 1300000000, // €1.3B annual investment plan
      citizenParticipation: true,
      climateCouncil: true,
      additionalStaff: 88.5 // FTE required for climate neutrality
    },
    dataSource: 'Leuven 2030, EU Mission Cities, Climate City Contract',
    lastUpdated: '2024-05-01'
  },

  {
    id: 'namur',
    name: 'Namur',
    type: cityTypes.REGIONAL,
    population: 112188,
    area: 175.7,
    region: 'Wallonia',
    description: 'Capital of Wallonia, historic confluence city',
    reportingYear: 2023,
    esgScore: 7.0,
    scores: {
      overall: 7.0,
      climate: 6.8,
      adaptation: 7.2,
      governance: 7.2,
      mobility: 6.8
    },
    emissions: {
      total: { value: 380000, unit: 'tCO2e', year: 2022 },
      perCapita: { value: 3.4, unit: 'tCO2e', year: 2022 },
      baseline: { value: 480000, unit: 'tCO2e', year: 2006 },
      reduction: 21,
      sectors: {
        buildings: 58,
        transport: 32,
        waste: 6,
        other: 4
      }
    },
    targets: {
      reductionTarget: { value: 40, year: 2030, baseline: 2006 },
      netZeroTarget: 2050,
      renewableTarget: { value: 25, year: 2030 },
      carbonNeutralTarget: 2050
    },
    climate: {
      covenantOfMayors: true,
      commitmentYear: 2012,
      euMissionCity: false,
      c40Member: false,
      cdpScore: null,
      seapSubmitted: true,
      secapSubmitted: true
    },
    initiatives: [
      { name: 'PAEDC Namur', description: 'Sustainable energy and climate action plan', status: 'active' },
      { name: 'Smart City Namur', description: 'Digital sustainability services', status: 'active' },
      { name: 'Mobilité Namur', description: 'Sustainable transport plan', status: 'active' },
      { name: 'Green Districts', description: 'Eco-neighborhood development', status: 'in_progress' }
    ],
    energy: {
      renewableElectricity: 12,
      solarCapacity: 28000,
      buildingEfficiency: 'E',
      districtHeating: false
    },
    mobility: {
      publicTransportShare: 18,
      cyclingShare: 6,
      walkingShare: 22,
      evChargingPoints: 280,
      lowEmissionZone: false
    },
    greenInfrastructure: {
      greenSpacePerCapita: 45,
      treeCanopy: 28,
      protectedAreas: 22
    },
    adaptation: {
      heatActionPlan: true,
      floodRiskPlan: true,
      droughtPlan: false,
      climateVulnerabilityAssessment: true
    },
    governance: {
      climateOfficer: true,
      climateBudget: 42000000,
      citizenParticipation: true,
      climateCouncil: false
    },
    dataSource: 'City of Namur, Covenant of Mayors',
    lastUpdated: '2024-03-15'
  },

  {
    id: 'charleroi',
    name: 'Charleroi',
    type: cityTypes.MAJOR,
    population: 202267,
    area: 102.1,
    region: 'Wallonia',
    description: 'Industrial city undergoing green transition',
    reportingYear: 2023,
    esgScore: 6.5,
    scores: {
      overall: 6.5,
      climate: 6.2,
      adaptation: 6.8,
      governance: 6.8,
      mobility: 6.2
    },
    emissions: {
      total: { value: 920000, unit: 'tCO2e', year: 2022 },
      perCapita: { value: 4.5, unit: 'tCO2e', year: 2022 },
      baseline: { value: 1350000, unit: 'tCO2e', year: 2006 },
      reduction: 32,
      sectors: {
        buildings: 48,
        transport: 25,
        industry: 20,
        waste: 7
      }
    },
    targets: {
      reductionTarget: { value: 40, year: 2030, baseline: 2006 },
      netZeroTarget: 2050,
      renewableTarget: { value: 30, year: 2030 },
      carbonNeutralTarget: 2050
    },
    climate: {
      covenantOfMayors: true,
      commitmentYear: 2014,
      euMissionCity: false,
      c40Member: false,
      cdpScore: null,
      seapSubmitted: true,
      secapSubmitted: true
    },
    initiatives: [
      { name: 'Charleroi Metropole 2025', description: 'Urban regeneration program', status: 'active' },
      { name: 'Industrial Transition', description: 'Decarbonizing industrial zones', status: 'in_progress' },
      { name: 'Metro Extension', description: 'Light rail network expansion', status: 'in_progress' },
      { name: 'Brownfield Remediation', description: 'Contaminated land restoration', status: 'active' }
    ],
    energy: {
      renewableElectricity: 8,
      solarCapacity: 55000,
      buildingEfficiency: 'F',
      districtHeating: true
    },
    mobility: {
      publicTransportShare: 22,
      cyclingShare: 4,
      walkingShare: 18,
      evChargingPoints: 380,
      lowEmissionZone: false
    },
    greenInfrastructure: {
      greenSpacePerCapita: 15,
      treeCanopy: 12,
      protectedAreas: 5
    },
    adaptation: {
      heatActionPlan: true,
      floodRiskPlan: true,
      droughtPlan: false,
      climateVulnerabilityAssessment: true
    },
    governance: {
      climateOfficer: true,
      climateBudget: 75000000,
      citizenParticipation: true,
      climateCouncil: false
    },
    dataSource: 'City of Charleroi, Covenant of Mayors',
    lastUpdated: '2024-02-20'
  }
];

// Helper functions
export const getCitiesByRegion = (region) => cities.filter(c => c.region === region);
export const getCitiesByType = (type) => cities.filter(c => c.type === type);
export const getCityById = (id) => cities.find(c => c.id === id);
export const getEUMissionCities = () => cities.filter(c => c.climate.euMissionCity);
export const getCovenantSignatories = () => cities.filter(c => c.climate.covenantOfMayors);

// Calculate averages
export const calculateCityAverages = () => {
  const count = cities.length;
  return {
    population: cities.reduce((sum, c) => sum + c.population, 0) / count,
    esgScore: cities.reduce((sum, c) => sum + c.esgScore, 0) / count,
    emissionsPerCapita: cities.reduce((sum, c) => sum + (c.emissions.perCapita?.value || 0), 0) / count,
    emissionsReduction: cities.reduce((sum, c) => sum + (c.emissions.reduction || 0), 0) / count,
    cyclingShare: cities.reduce((sum, c) => sum + (c.mobility?.cyclingShare || 0), 0) / count,
    renewableElectricity: cities.reduce((sum, c) => sum + (c.energy?.renewableElectricity || 0), 0) / count,
    count
  };
};

// Get top performing cities
export const getTopCities = (dimension = 'overall', limit = 3) => {
  return cities
    .sort((a, b) => (b.scores[dimension] || 0) - (a.scores[dimension] || 0))
    .slice(0, limit);
};

// City comparison data for charts
export const getCityComparisonData = () => {
  return cities.map(city => ({
    name: city.name.replace(' Capital Region', ''),
    population: city.population,
    esgScore: city.esgScore * 10,
    emissionsPerCapita: city.emissions.perCapita?.value || 0,
    emissionsReduction: city.emissions.reduction || 0,
    cyclingShare: city.mobility?.cyclingShare || 0,
    renewableEnergy: city.energy?.renewableElectricity || 0,
    greenSpace: city.greenInfrastructure?.greenSpacePerCapita || 0,
    region: city.region
  }));
};
