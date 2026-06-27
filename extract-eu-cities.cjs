const XLSX = require('xlsx');
const fs = require('fs');
const workbook = XLSX.readFile('/root/.claude/uploads/265915bf-c3b8-506c-a9e4-e68064615ea7/78d16890-2025_Full_Cities_Public_Data_Separated_by_Question.xlsx');

const summary = XLSX.utils.sheet_to_json(workbook.Sheets['Summary']);

// Get EU cities (excl UK)
const euCitySummaries = summary.filter(row => {
  const region = row['cdp_region'] || '';
  const country = row['discloser_country_or_area'] || '';
  // Include Europe region, exclude UK completely
  return (region === 'Europe' || region === 'UKWW') &&
         !country.includes('United Kingdom');
});

const euCityIds = new Set(euCitySummaries.map(c => String(c.cdp_disclosing_org_number)));
console.log('Processing', euCityIds.size, 'EU cities...');

// Build base city objects
const cities = {};
euCitySummaries.forEach(row => {
  const id = String(row.cdp_disclosing_org_number);
  if (!cities[id]) {
    cities[id] = {
      id: id,
      cdpNumber: row.cdp_disclosing_org_number,
      name: row.disclosing_organization,
      orgType: row.disclosing_org_type,
      cdpRegion: row.cdp_region,
      country: row.discloser_country_or_area
    };
  }
});

// Helper to clean column names - remove col#_ prefix and common metadata
function cleanRow(row) {
  const cleaned = {};
  const skipKeys = [
    'cdp_disclosing_org_number', 'disclosing_organization',
    'disclosure_cycle', 'cdp_requesting_org_number', 'requesting_organization',
    'disclosing_org_type', 'cdp_region', 'discloser_country_or_area',
    'public_status', 'question_number', 'question_text'
  ];

  for (const [key, value] of Object.entries(row)) {
    if (skipKeys.includes(key)) continue;

    // Remove col#_ prefix (e.g., col1_Climate -> Climate)
    let cleanKey = key.replace(/^col\d+_/, '');
    cleaned[cleanKey] = value;
  }
  return cleaned;
}

// Helper to process a sheet and add data to cities
function processSheet(sheetName, dataKey) {
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) return;

  const rows = XLSX.utils.sheet_to_json(sheet);
  rows.forEach(row => {
    const id = String(row.cdp_disclosing_org_number);
    if (euCityIds.has(id) && cities[id]) {
      if (!cities[id][dataKey]) {
        cities[id][dataKey] = [];
      }
      cities[id][dataKey].push(cleanRow(row));
    }
  });
}

// Process all question sheets
const sheets = workbook.SheetNames.filter(s => s.startsWith('Q'));
sheets.forEach(sheet => {
  const key = sheet.toLowerCase().replace(/\./g, '_');
  processSheet(sheet, key);
  process.stdout.write('.');
});

console.log('\nProcessed', sheets.length, 'sheets');

// Add profile object for each city (from q1_2 data) to match UK structure
Object.values(cities).forEach(city => {
  if (city.q1_2 && city.q1_2[0]) {
    const q = city.q1_2[0];
    city.profile = {
      adminBoundary: q['Administrative boundary of reporting government'],
      nextHighestGovt: q['Next highest level of government'],
      nextLowestGovt: q['Next lowest level of government'],
      areaKm2: parseFloat(q['Area of the jurisdiction boundary (in square km)']) || null,
      ecosystemPercentage: q['Percentage range of jurisdiction area that is natural or modified terrestrial, freshwater, coastal and/or marine ecosystem'],
      population: parseInt(q['Current (or most recent) population size']) || null,
      populationYear: parseInt(q['Population year']) || null,
      projectedPopulation: parseFloat(q['Projected population size']) || null,
      projectedYear: parseInt(q['Projected population year']) || null,
      currency: q['Select the currency used for all financial information reported throughout your response'],
      crfLevel: q['Select which Common Reporting Framework level you are reporting to^']
    };
  }
});

// Count cities with data
const citiesWithData = Object.values(cities).filter(c => Object.keys(c).length > 6);
console.log('Cities with Q data:', citiesWithData.length);

// Generate JS file
const citiesArray = Object.values(cities).sort((a,b) => a.name.localeCompare(b.name));

let output = `// European Cities Full CDP Data (Q1-Q11)
// Auto-generated from CDP 2025 Full Cities Public Data
// Excludes United Kingdom

export const euCitiesFull = ${JSON.stringify(citiesArray, null, 2)};

export const getEUCityById = (id) => euCitiesFull.find(c => c.id === id || c.id === String(id));

export const euCountriesFull = [...new Set(euCitiesFull.map(c => c.country))].sort();
`;

fs.writeFileSync('/home/user/rajtrial/src/data/euCitiesFull.js', output);
console.log('\nWrote euCitiesFull.js');
console.log('File size:', (fs.statSync('/home/user/rajtrial/src/data/euCitiesFull.js').size / 1024 / 1024).toFixed(2), 'MB');
