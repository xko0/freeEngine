import React from 'react'
import { createRailwaySectorStore } from '../stores/RailwaySectorStore'
import { useLocalObservable } from 'mobx-react'

const RailwaySectorContext = React.createContext(null)

export const RailwaySectorProvider = ({children}) => {
  const RailwaySectorStore = useLocalObservable(() => new createRailwaySectorStore())

  return (   
    <RailwaySectorContext.Provider value={RailwaySectorStore}>
      {children}
    </RailwaySectorContext.Provider>
  )
}

export const useRailwaySectorStore = () => React.useContext(RailwaySectorContext)
