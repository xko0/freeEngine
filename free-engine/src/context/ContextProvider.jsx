import React, { useReducer } from 'react'
import { FreelancesProvider } from './FreelancesContext'
import { AccountantProvider } from './AccountantContext'
import { HotelCompaniesProvider } from './HotelCompaniesContext'
import { IndustrialSuppliersProvider } from './IndustrialSuppliersContext'
import { LawyersProvider } from './LawyersContext'
import { NumericServicesProvider } from './NumericServicesContext'
import { RailwaySectorProvider } from './RailwaySectorContext'
import { WorkersProvider } from './WorkersContext'

export const ContextProvider = ({ children }) => {
  return (
    <FreelancesProvider>
      <AccountantProvider>
        <HotelCompaniesProvider>
          <IndustrialSuppliersProvider>
            <LawyersProvider>
              <NumericServicesProvider>
                <RailwaySectorProvider>
                  <WorkersProvider>
                    {children}
                  </WorkersProvider>
                </RailwaySectorProvider>
              </NumericServicesProvider>
            </LawyersProvider>
          </IndustrialSuppliersProvider>
        </HotelCompaniesProvider>
      </AccountantProvider>
    </FreelancesProvider>
  )
}