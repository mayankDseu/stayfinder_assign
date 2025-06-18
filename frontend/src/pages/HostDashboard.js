import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../pages/HostDashboard.css';

const HostDashboard = () => {
  const [listings, setListings] = useState([]);

  const fetchListings = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/listings/my-listings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setListings(res.data);
    } catch (err) {
      console.error("Error fetching host listings:", err);
    }
  };

  const deleteListing = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/listings/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchListings(); // refresh list
    } catch (err) {
      console.error("Error deleting listing:", err);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
  <div className="host-dashboard">
    <h2>Your Listings</h2>
    <Link to="/create-listing" className="create-button">+ Create New Listing</Link>

   <div className="listing-grid">
  {listings.map((listing) => (
    <div key={listing._id} className="listing-card">
      <img src={listing.images?.[0]} alt={listing.title} />
      <h4>{listing.title}</h4>
      <p>{listing.location}</p>
      <p>₹{listing.pricePerNight}/night</p>
      <div className="actions">
        <Link to={`/edit-listing/${listing._id}`} className="edit-btn">Edit</Link>
        <button className="delete-btn" onClick={() => deleteListing(listing._id)}>Delete</button>
      </div>
    </div>
  ))}
</div>

  </div>
);

};

export default HostDashboard;
