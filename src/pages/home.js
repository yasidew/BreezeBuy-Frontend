import React from 'react'
import '../styles/home.css'
import Navbar from '../components/navbar'
import SideNav from '../components/sidenav'
import Footer from '../components/footer'

function home() {
  return (
    <div>
      <div className="home-content">
        <SideNav />
        <div className="main-section">
          <div className="hero-section">
            <h1>Welcome to BreezeBuy Admin Portal</h1>
            <p>Efficiently manage products, inventory, vendors, and more.</p>
            <button className="get-started-btn">Get Started</button>
          </div>
          <div className="services-section">
            <h2>Key Services</h2>
            <div className="service-cards">
              <div className="home-card">Inventory Management</div>
              <div className="home-card">Product Management</div>
              <div className="home-card">Order Management</div>
              <div className="home-card">Vendor Management</div>
              <div className="home-card">User Management</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default home


// home