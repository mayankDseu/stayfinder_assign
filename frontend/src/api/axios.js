// src/utils/axios.js
import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:5000/api', // Backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});
