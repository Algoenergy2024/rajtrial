import React, { createContext, useContext, useState } from 'react'
import { entities, getEntityById, entityTypes } from '../data/belgianEntities'
import { euCitiesFull as allEuropeanCities, getEUCityById as getCityById, euCountriesFull as allEuropeanCountries } from '../data/euCitiesFull'
import { ukCitiesFull as allUKCities, getUKCityById } from '../data/ukCitiesFull'
import { chinaCitiesFull as allChinaCities, getChinaCityById, chinaCountriesFull as allChinaCountries } from '../data/chinaCitiesFull'

// UKWW region countries (reported through UK CDP but not in Europe)
const UKWW_COUNTRIES = [
  'South Africa', 'Ethiopia', 'Turkiye', 'Pakistan', 'Israel',
  'Senegal', 'Ghana', 'Jordan', 'Kenya', "Cote d'Ivoire"
]

// Sort UK cities alphabetically
const ukCities = [...allUKCities].sort((a, b) => a.name.localeCompare(b.name))

// Sort China cities alphabetically
const chinaCities = [...allChinaCities].sort((a, b) => a.name.localeCompare(b.name))
const chinaCountries = [...allChinaCountries].sort()

// Separate UKWW cities from European cities
const ukwwCities = [...allEuropeanCities]
  .filter(c => UKWW_COUNTRIES.includes(c.country))
  .sort((a, b) => a.name.localeCompare(b.name))

// Sort European cities alphabetically (exclude UKWW countries)
const europeanCities = [...allEuropeanCities]
  .filter(c => !UKWW_COUNTRIES.includes(c.country))
  .sort((a, b) => a.name.localeCompare(b.name))

const europeanCountries = [...allEuropeanCountries]
  .filter(c => !UKWW_COUNTRIES.includes(c))
  .sort((a, b) => a.localeCompare(b))

const ukwwCountries = [...new Set(ukwwCities.map(c => c.country))].sort()

export const CATEGORIES = {
  BELGIAN_BANKS: 'belgian_banks',
  BELGIAN_INSURANCE: 'belgian_insurance',
  EUROPEAN_CITIES: 'european_cities',
  UK_CITIES: 'uk_cities',
  UKWW_CITIES: 'ukww_cities',
  CHINA_CITIES: 'china_cities'
}

const OrganizationContext = createContext()

export function OrganizationProvider({ children }) {
  const [category, setCategory] = useState(CATEGORIES.BELGIAN_BANKS)
  const [selectedId, setSelectedId] = useState('crelan')
  const [selectedCountry, setSelectedCountry] = useState('all')

  // Get all items for current category
  const getEntitiesForCategory = () => {
    switch (category) {
      case CATEGORIES.BELGIAN_BANKS:
        return entities.filter(e => e?.type === entityTypes.BANK) || []
      case CATEGORIES.BELGIAN_INSURANCE:
        return entities.filter(e => e?.type === entityTypes.INSURANCE) || []
      case CATEGORIES.EUROPEAN_CITIES:
        if (selectedCountry === 'all') return europeanCities || []
        return europeanCities.filter(c => c?.country === selectedCountry) || []
      case CATEGORIES.UK_CITIES:
        return ukCities || []
      case CATEGORIES.UKWW_CITIES:
        if (selectedCountry === 'all') return ukwwCities || []
        return ukwwCities.filter(c => c?.country === selectedCountry) || []
      case CATEGORIES.CHINA_CITIES:
        if (selectedCountry === 'all') return chinaCities || []
        return chinaCities.filter(c => c?.country === selectedCountry) || []
      default:
        return entities || []
    }
  }

  const currentEntities = getEntitiesForCategory()

  // Get selected entity based on category
  const getSelectedEntity = () => {
    if (category === CATEGORIES.UK_CITIES) {
      const city = getUKCityById(selectedId)
      if (city) return city
      return currentEntities[0] || { id: 'default', name: 'No UK cities available' }
    }
    if (category === CATEGORIES.CHINA_CITIES) {
      const city = getChinaCityById(selectedId)
      if (city) return city
      return currentEntities[0] || { id: 'default', name: 'No China cities available' }
    }
    if (category === CATEGORIES.EUROPEAN_CITIES || category === CATEGORIES.UKWW_CITIES) {
      const city = getCityById(selectedId)
      if (city) return city
      return currentEntities[0] || { id: 'default', name: 'No cities available' }
    }
    const entity = getEntityById(selectedId)
    if (entity) return entity
    return currentEntities[0] || { id: 'default', name: 'No entities available' }
  }

  const selectedEntity = getSelectedEntity()

  // When category changes, select first item in that category
  const changeCategory = (newCategory) => {
    setCategory(newCategory)
    setSelectedCountry('all')
    if (newCategory === CATEGORIES.BELGIAN_BANKS) {
      const banks = entities.filter(e => e.type === entityTypes.BANK)
      setSelectedId(banks[0]?.id || 'crelan')
    } else if (newCategory === CATEGORIES.BELGIAN_INSURANCE) {
      const insurers = entities.filter(e => e.type === entityTypes.INSURANCE)
      setSelectedId(insurers[0]?.id || 'ag-insurance')
    } else if (newCategory === CATEGORIES.EUROPEAN_CITIES) {
      setSelectedId(europeanCities[0]?.id || '3422')
    } else if (newCategory === CATEGORIES.UK_CITIES) {
      setSelectedId(ukCities[0]?.id || '3422')
    } else if (newCategory === CATEGORIES.UKWW_CITIES) {
      setSelectedId(ukwwCities[0]?.id || '3422')
    } else if (newCategory === CATEGORIES.CHINA_CITIES) {
      setSelectedId(chinaCities[0]?.id || '3422')
    }
  }

  const value = {
    category,
    setCategory: changeCategory,
    selectedId,
    setSelectedId,
    selectedEntity,
    currentEntities,
    allBanks: entities.filter(e => e.type === entityTypes.BANK),
    allInsurers: entities.filter(e => e.type === entityTypes.INSURANCE),
    allCities: europeanCities,
    allUKCities: ukCities,
    allUKWWCities: ukwwCities,
    allChinaCities: chinaCities,
    europeanCountries,
    ukwwCountries,
    chinaCountries,
    selectedCountry,
    setSelectedCountry,
    isCity: category === CATEGORIES.EUROPEAN_CITIES || category === CATEGORIES.UK_CITIES || category === CATEGORIES.UKWW_CITIES || category === CATEGORIES.CHINA_CITIES,
    isUKCity: category === CATEGORIES.UK_CITIES,
    isEuropeanCity: category === CATEGORIES.EUROPEAN_CITIES,
    isUKWWCity: category === CATEGORIES.UKWW_CITIES,
    isChinaCity: category === CATEGORIES.CHINA_CITIES,
    isBank: category === CATEGORIES.BELGIAN_BANKS,
    isInsurance: category === CATEGORIES.BELGIAN_INSURANCE
  }

  return (
    <OrganizationContext.Provider value={value}>
      {children}
    </OrganizationContext.Provider>
  )
}

export function useOrganization() {
  const context = useContext(OrganizationContext)
  if (!context) {
    throw new Error('useOrganization must be used within OrganizationProvider')
  }
  return context
}
