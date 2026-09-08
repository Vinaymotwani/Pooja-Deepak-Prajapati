import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserContext from './context/UserContext'
import { BookingProvider } from './context/BookingContext'

const user = {
  name: 'Customer',
  email: 'customer@example.com'
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContext.Provider value={user}>
      <BookingProvider>
        <App />
      </BookingProvider>
    </UserContext.Provider>
  </StrictMode>,
)
