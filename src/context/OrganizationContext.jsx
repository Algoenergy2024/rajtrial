import React, { createContext, useContext, useState } from 'react'
import { entities, getEntityById, entityTypes } from '../data/belgianEntities'
import { europeanCities, getCityById, europeanCountries } from '../data/europeanCities'
import { ukCitiesFull as ukCities, getUKCityById } from '../data/ukCitiesFull'

export const CATEGORIES = {
  BELGIAN_BANKS: 'belgian_banks',
  BELGIAN_INSURANCE: 'belgian_insurance',
  EUROPEAN_CITIES: 'european_cities',
  UK_CITIES: 'uk_cities'
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
    if (category === CATEGORIES.EUROPEAN_CITIES) {
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
    europeanCountries,
    selectedCountry,
    setSelectedCountry,
    isCity: category === CATEGORIES.EUROPEAN_CITIES || category === CATEGORIES.UK_CITIES,
    isUKCity: category === CATEGORIES.UK_CITIES,
    isEuropeanCity: category === CATEGORIES.EUROPEAN_CITIES,
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
