import { useState } from 'react'

function useBooking() {
  const [bookingMessage, setBookingMessage] = useState('')

  const bookRoom = (roomName) => {
    setBookingMessage(`Booking initiated for ${roomName}!`)
  }

  return {
    bookingMessage,
    bookRoom
  }
}

export default useBooking
