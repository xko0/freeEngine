import React from 'react'
import { createIndustrialSuppliersStore } from '../stores/IndustrialSuppliersStore'
import { useLocalObservable } from 'mobx-react'

const IndustrialSuppliersContext = React.createContext(null)

export const IndustrialSuppliersProvider = ({children}) => {
  const IndustrialSuppliersStore = useLocalObservable(() => new createIndustrialSuppliersStore())

  return (   
    <IndustrialSuppliersContext.Provider value={IndustrialSuppliersStore}>
      {children}
    </IndustrialSuppliersContext.Provider>
  )
}

export const useIndustrialSuppliersStore = () => React.useContext(IndustrialSuppliersContext)
