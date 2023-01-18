import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { FreelancesProvider } from './context/FreelancesContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FreelancesProvider>
      <App />
    </FreelancesProvider>
  </React.StrictMode>,
)
