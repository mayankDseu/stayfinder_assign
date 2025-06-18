
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/listings');
        setListings(res.data);
      } catch (err) {
        console.error("Failed to fetch listings", err);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">Explore Listings</h1>
      <div className="listings-grid">
        {listings.map((listing) => (
          <Link
            to={`/listing/${listing._id}`}
            key={listing.id}
            className="listing-card"
          >
            <div className="listing-title">{listing.title}</div>
            <div className="listing-location">{listing.location}</div>
            <div className="listing-price">₹{listing.pricePerNight} /night</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
