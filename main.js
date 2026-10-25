import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('searchForm')
  const bookButtons = document.querySelectorAll('.book-btn')

  // Interactive booking search listener
  searchForm?.addEventListener('submit', (e) => {
    e.preventDefault()
    const hotel = document.getElementById('hotelSelect').value
    const checkIn = document.getElementById('checkIn').value
    const checkOut = document.getElementById('checkOut').value

    alert(`Searching availability for:\nHotel: ${hotel}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}`)
  })

  // Quick booking button click listeners
  bookButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const roomName = e.target.getAttribute('data-room')
      alert(`Booking initiated for ${roomName}!`)
    })
  })
})
