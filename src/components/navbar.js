import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/navbar.css'
import logobanner from  '../images/logo-banner.png'

function navbar() {
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
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default navbar