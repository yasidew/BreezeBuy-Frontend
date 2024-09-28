import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css'
import logobanner from '../images/logo-banner.png';
import { toast } from 'react-toastify';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    toast.success('User Logout successfully!');
    navigate('/login');
  };

  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem('token') !== null;


  return (
    <nav className="navbar navbar-expand-lg navbar-blue bg-yellow">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">
            <img src={logobanner} alt="BreezeBuy" className='navbar-logo' />
          </Link>
        </div>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" onClick={handleLogout} to="#">Logout</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar