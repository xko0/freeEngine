import React from 'react'
import { createAccountantStore } from '../stores/AccountantStore'
import { useLocalObservable } from 'mobx-react'

const AccountantContext = React.createContext(null)

export const AccountantProvider = ({children}) => {
  const AccountantStore = useLocalObservable(() => new createAccountantStore())

  return (   
    <AccountantContext.Provider value={AccountantStore}>
      {children}
    </AccountantContext.Provider>
  )
}

export const useAccountantStore = () => React.useContext(AccountantContext)
