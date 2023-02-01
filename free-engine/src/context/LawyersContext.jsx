import React from 'react'
import { createLawyersStore } from '../stores/LawyersStore'
import { useLocalObservable } from 'mobx-react'

const LawyersContext = React.createContext(null)

export const LawyersProvider = ({children}) => {
  const LawyersStore = useLocalObservable(() => new createLawyersStore())

  return (   
    <LawyersContext.Provider value={LawyersStore}>
      {children}
    </LawyersContext.Provider>
  )
}

export const useLawyersStore = () => React.useContext(LawyersContext)
