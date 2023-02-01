import React from 'react'
import { createNumericServicesStore } from '../stores/NumericServicesStore'
import { useLocalObservable } from 'mobx-react'

const NumericServicesContext = React.createContext(null)

export const NumericServicesProvider = ({children}) => {
  const NumericServicesStore = useLocalObservable(() => new createNumericServicesStore())

  return (   
    <NumericServicesContext.Provider value={NumericServicesStore}>
      {children}
    </NumericServicesContext.Provider>
  )
}

export const useNumericServicesStore = () => React.useContext(NumericServicesContext)
