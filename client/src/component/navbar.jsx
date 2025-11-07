import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Task Manager</h2>
      <div>
        {isAuthenticated ? (
          <>
            <Link to="/" style={styles.link}>Dashboard</Link>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

// Basic inline styles (replace with CSS or Tailwind if you prefer)
const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#2c3e50',
    color: '#ecf0f1'
  },
  logo: {
    margin: 0,
  },
  link: {
    marginRight: '1rem',
    textDecoration: 'none',
    color: '#ecf0f1',
    fontWeight: 'bold'
  },
  button: {
    padding: '0.3rem 0.6rem',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#e74c3c',
    border: 'none',
    color: '#fff',
    borderRadius: '4px'
  }
};

export default Navbar;
