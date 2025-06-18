import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const BookingPage = () => {
  const { id } = useParams(); 
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState('');

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/api/bookings`, {
        listingId: id,
        checkIn,
        checkOut,
        guests,
      });
      setMessage('✅ Booking successful!');
    } catch (error) {
      console.error('Booking failed', error);
      setMessage('❌ Booking failed. Try again.');
    }
  };

  return (
    <div className="booking-container">
      <h2>Book Your Stay</h2>
      <form onSubmit={handleBooking} className="booking-form">
        <label>
          Check-in Date:
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            required
          />
        </label>
        <label>
          Check-out Date:
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            required
          />
        </label>
        <label>
          Number of Guests:
          <input
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            min="1"
            required
          />
        </label>
        <button type="submit">Confirm Booking</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default BookingPage;
