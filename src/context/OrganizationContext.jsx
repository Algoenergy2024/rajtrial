import React, { createContext, useContext, useState } from 'react'
import { entities, getEntityById } from '../data/belgianEntities'

const OrganizationContext = createContext()

export function OrganizationProvider({ children }) {
  const [selectedOrgId, setSelectedOrgId] = useState('crelan')

  const selectedOrg = getEntityById(selectedOrgId) || entities[0]

  const value = {
    selectedOrgId,
    setSelectedOrgId,
    selectedOrg,
    allOrganizations: entities
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
