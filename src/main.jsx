import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserContext from './context/UserContext'

const user = {
  name: 'Customer',
  role: 'Customer'
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContext.Provider value={user}>
      <App />
    </UserContext.Provider>
  </StrictMode>
)
