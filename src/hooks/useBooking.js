import { useContext } from 'react'
import BookingContext from '../context/BookingContext'

function useBooking() {
  const { bookings, addBooking, removeBooking } = useContext(BookingContext)

  const bookRoom = (roomName) => {
    addBooking(roomName)
  }

  return {
    bookings,
    bookRoom,
    removeBooking
  }
}

export default useBooking
