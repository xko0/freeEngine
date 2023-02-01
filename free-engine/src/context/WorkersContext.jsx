import React from 'react'
import { createWorkersStore } from '../stores/WorkersStore'
import { useLocalObservable } from 'mobx-react'

const WorkersContext = React.createContext(null)

export const WorkersProvider = ({children}) => {
  const WorkersStore = useLocalObservable(() => new createWorkersStore())

  return (   
    <WorkersContext.Provider value={WorkersStore}>
      {children}
    </WorkersContext.Provider>
  )
}

export const useWorkersStore = () => React.useContext(WorkersContext)
