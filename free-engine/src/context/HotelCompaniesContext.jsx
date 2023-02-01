import React from 'react'
import { createHotelCompaniesStore } from '../stores/HotelCompaniesStore'
import { useLocalObservable } from 'mobx-react'

const HotelCompaniesContext = React.createContext(null)

export const HotelCompaniesProvider = ({children}) => {
  const HotelCompaniesStore = useLocalObservable(() => new createHotelCompaniesStore())

  return (   
    <HotelCompaniesContext.Provider value={HotelCompaniesStore}>
      {children}
    </HotelCompaniesContext.Provider>
  )
}

export const useHotelCompaniesStore = () => React.useContext(HotelCompaniesContext)
