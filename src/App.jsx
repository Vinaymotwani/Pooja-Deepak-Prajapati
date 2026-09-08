import { useState, useEffect, useContext } from 'react'
import './App.css'
import UserContext from './context/UserContext'
import useBooking from './hooks/useBooking'

function App() {
  const user = useContext(UserContext)
  const [hotel, setHotel] = useState('all')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')

  const [message, setMessage] = useState('')

  // useEffect runs when the application loads
  useEffect(() => {
    console.log('Hotel Room Booking System loaded')

    setMessage('Hotel rooms are ready for booking.')
  }, [])

  const searchAvailability = (e) => {
    e.preventDefault()

    alert(
      `Searching availability for:\nHotel: ${hotel}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}`
    )
  }

  const { bookingMessage, bookRoom, bookings, removeBooking } = useBooking()

  return (
    <div className="bg-slate-100 text-gray-800 font-sans antialiased min-h-screen flex flex-col">

      <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <div className="flex items-center space-x-2">
            <span className="text-2xl font-black text-blue-600 tracking-wider">
              ULHASNAGAR STAYS
            </span>
          </div>

          <div className="hidden md:flex space-x-8 font-semibold text-gray-600">
            <a href="#" className="text-blue-600 hover:text-blue-800 transition">
              Home
            </a>

            <a href="#hotels" className="hover:text-blue-600 transition">
              Hotels
            </a>

            <a href="#about" className="hover:text-blue-600 transition">
              About Us
            </a>

            <a href="#contact" className="hover:text-blue-600 transition">
              Contact
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-sm font-semibold text-blue-600 hover:text-blue-800">
              Login
            </button>

            <button className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow transition">
              Register
            </button>
          </div>

        </nav>
      </header>

      <main className="flex-grow">

        <section className="hero-bg text-white py-24 px-6 text-center relative">

          <div className="max-w-4xl mx-auto">

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-md">
              Book Top Hotels in Ulhasnagar
            </h1>

            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
              Compare luxury stays, view direct Google Maps locations, and reserve room availability effortlessly.
            </p>

          </div>

          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-6 text-gray-800 -mb-36 relative z-10 border border-gray-100">

            <form
              onSubmit={searchAvailability}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
            >

              <div className="text-left">

                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Select Hotel
                </label>

                <select
                  value={hotel}
                  onChange={(e) => setHotel(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="all">All Hotels</option>
                  <option value="mayur">Hotel Mayur</option>
                  <option value="jawahar">Hotel Jawahar</option>
                  <option value="sapphire">Hotel Sapphire Inn</option>
                  <option value="skygrand">Hotel Sky Grand Stays</option>
                  <option value="falcon">Hotel Falcon</option>
                  <option value="royal">Hotel Royal Inn</option>
                  <option value="praveen">Hotel Praveen International</option>
                </select>

              </div>

              <div className="text-left">

                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Check-In
                </label>

                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />

              </div>

              <div className="text-left">

                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Check-Out
                </label>

                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />

              </div>

              <div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition duration-200"
                >
                  Search Availability
                </button>

              </div>

            </form>

          </div>

        </section>

        <section id="hotels" className="max-w-7xl mx-auto px-6 pt-48 pb-16">

          <div className="mb-10 text-center">

            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Featured Hotels in Ulhasnagar
            </h2>

            <p className="text-gray-500 mt-2">
              Select a hotel to reserve rooms or view its exact location on Google Maps
            </p>

            {message && (
              <p className="text-green-600 font-semibold mt-3">
                {message}
              </p>
            )}

          </div>

          {bookings.length > 0 && (
            <div className="mb-6 bg-blue-100 text-blue-700 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-2">
                Current Bookings: {bookings.length}
              </h3>

              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex justify-between items-center bg-white p-3 rounded-lg mb-2"
                >
                  <span className="font-semibold">
                    {booking.hotelName}
                  </span>

                  <button
                    onClick={() => removeBooking(booking.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
          {bookingMessage && (
            <div className="mb-6 text-center bg-green-100 text-green-700 p-4 rounded-lg font-semibold">
              {bookingMessage}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <HotelCard
              image="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80"
              name="Hotel Mayur"
              price="?2,500"
              description="Comfortable stays with AC rooms, free Wi-Fi, and top-tier hospitality in Ulhasnagar."
              location="Hotel+Mayur+Ulhasnagar"
              onBook={bookRoom}
            />

            <HotelCard
              image="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80"
              name="Hotel Jawahar"
              price="?3,000"
              description="Centrally located hotel with modern amenities, room service, and fine dining options."
              location="Hotel+Jawahar+Ulhasnagar"
              onBook={bookRoom}
            />

            <HotelCard
              image="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80"
              name="Hotel Sapphire Inn"
              price="?2,800"
              description="Premium accommodation featuring comfortable suites and quick access to transit hubs."
              location="Hotel+Sapphire+Inn+Ulhasnagar"
              onBook={bookRoom}
            />

          </div>

        </section>

      </main>

      <footer className="bg-slate-900 text-gray-400 py-8 px-6 text-center border-t border-slate-800">
        <p className="text-sm">
          Ã‚Â© 2026 Ulhasnagar Hotel Booking System. Built for FSD Experiment 1.
        </p>
      </footer>

    </div>
  )
}

function HotelCard({ image, name, price, description, location, onBook }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 transition hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between">

      <img
        src={image}
        alt={name}
        className="h-48 w-full object-cover"
      />

      <div className="p-6">

        <div className="flex justify-between items-center mb-3">

          <span className="text-xs font-bold px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">
            Available
          </span>

          <span className="text-xl font-black text-blue-600">
            {price}
            <span className="text-xs text-gray-500 font-normal">
              /night
            </span>
          </span>

        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {name}
        </h3>

        <p className="text-sm text-gray-600 mb-4">
          {description}
        </p>

        <a
          href={`https://www.google.com/maps/search/?api=1&query=${location}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-800 mb-4 bg-blue-50 px-3 py-1.5 rounded-md"
        >
          ?? {name} - Location
        </a>

      </div>

      <div className="p-6 pt-0 flex items-center justify-between text-xs text-gray-500 mt-auto border-t pt-4">

        <span>Ulhasnagar</span>

        <button
          onClick={() => onBook(name)}
          className="book-btn bg-slate-900 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition"
        >
          Book Now
        </button>

      </div>

    </div>
  )
}

export default App

