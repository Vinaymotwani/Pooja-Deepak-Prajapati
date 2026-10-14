
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/UserContext'
import { BookingProvider } from './context/BookingContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <BookingProvider>
        <App />
      </BookingProvider>
    </UserProvider>
  </StrictMode>,
)
