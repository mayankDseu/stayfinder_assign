import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/Layout.css';

const Layout = ({ children }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className="layout-wrapper">
      <header>
        <div className="header-container">
          <Link to="/" className="logo-link">StayFinder 🏠</Link>
          <nav>
            <Link to="/">Home</Link>

            {!token && (
              <>
                <Link to="/register">Register</Link>
                <Link to="/login" className="login-btn">Login</Link>
              </>
            )}

            {token && role === 'guest' && (
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            )}

            {token && role === 'host' && (
              <>
                <Link to="/create-listing">List Your Home</Link>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </>
            )}
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: '1120px', margin: '0 auto', padding: '16px' }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
