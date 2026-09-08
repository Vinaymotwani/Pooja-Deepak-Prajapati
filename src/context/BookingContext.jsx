import { createContext, useState } from 'react'

const BookingContext = createContext()

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([])

  const addBooking = (hotelName) => {
    const newBooking = {
      id: Date.now(),
      hotelName: hotelName
    }

    setBookings((previousBookings) => [
      ...previousBookings,
      newBooking
    ])
  }

  const removeBooking = (id) => {
    setBookings((previousBookings) =>
      previousBookings.filter(
        (booking) => booking.id !== id
      )
    )
  }

  return (
    <BookingContext.Provider
      value={{
        bookings,
        addBooking,
        removeBooking
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export default BookingContext
