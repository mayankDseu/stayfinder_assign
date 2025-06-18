import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ListingDetail from './pages/ListingDetail';
import Register from './pages/Register';
import Login from './pages/Login';
import HostDashboard from './pages/HostDashboard';

import RoleProtectedRoute from './components/RoleProtectedRoute';
import Layout from './components/Layout';
import CreateListing from './pages/CreateListing';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/listing/:id" element={<Layout><ListingDetail /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        
        {/* Host-only route for dashboard */}
        <Route
          path="/host/dashboard"
          element={
            <RoleProtectedRoute role="host">
            
                <Layout><HostDashboard /></Layout>
              
            </RoleProtectedRoute>
          }
        />

        {/* Host-only route for create listing */}
        <Route
  path="/create-listing"
  element={
    <RoleProtectedRoute role="host">
      <Layout>
        <CreateListing />
      </Layout>
    </RoleProtectedRoute>
  }
/>
      </Routes>
    </Router>
  );
};

export default App;
