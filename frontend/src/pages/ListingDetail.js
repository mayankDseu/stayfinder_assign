import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ListingDetail.css'; 

const ListingDetail = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/listings/${id}`)
      .then(res => setListing(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5000/api/bookings`, {
        listingId: id,
        checkIn,
        checkOut
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage('✅ Booking confirmed!');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.message || 'Booking failed'}`);
    }
  };

  if (!listing) return <p>Loading...</p>;

  return (
    <div className="listing-container">
      <div className="listing-card">
        <img src={listing.images?.[0]} alt="Property" className="listing-image" />
        <div className="listing-details">
          <h2>{listing.title}</h2>
          <p>{listing.description}</p>
          <p><strong>Location:</strong> {listing.location}</p>
          <p><strong>Price per Night:</strong> ₹{listing.pricePerNight}</p>
        </div>
      </div>

      <div className="booking-form">
        <h3>📅 Book this stay</h3>
        <form onSubmit={handleBooking}>
          <label>
            Check-In: <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} required />
          </label>
          <label>
            Check-Out: <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} required />
          </label>
          <button type="submit">Book Now</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default ListingDetail;
