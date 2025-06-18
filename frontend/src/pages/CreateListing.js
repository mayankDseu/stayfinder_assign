import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateListing = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    pricePerNight: '',
    location: '',
    images: [''],
    availableDates: [] 
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'images') {
      setFormData(prev => ({ ...prev, images: [value] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token');

      console.log('Sending data:', formData);

      await axios.post(
        'http://localhost:5000/api/listings',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      navigate('/host/dashboard');
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to create listing.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Create a New Listing</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />

        <label>Price per night:</label>
        <input
          type="number"
          name="pricePerNight"
          value={formData.pricePerNight}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />

        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />

        <label>Image URL:</label>
        <input
          type="text"
          name="images"
          value={formData.images[0]}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />

        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none' }}>
          Create Listing
        </button>
      </form>
    </div>
  );
};

export default CreateListing;
