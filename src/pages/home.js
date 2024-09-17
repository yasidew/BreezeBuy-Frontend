import React from 'react'
import '../styles/home.css'
import Navbar from '../components/navbar'
import SideNav from '../components/sidenav'
import Footer from '../components/footer'

function home() {
  return (
    <div>
      {/* <Navbar /> */}
      <div className="home-content">
        <SideNav />
        <div className="main-section">
          <div className="hero-section">
            <h1>Welcome to BreezeBuy</h1>
            <p>Your one-stop shop for everything!</p>
            <button className="shop-now-btn">Shop Now</button>
          </div>
          <div className="featured-section">
            <h2>Featured Products</h2>
            <div className="product-cards">
              <div className="home-card">Product 1</div>
              <div className="home-card">Product 2</div>
              <div className="home-card">Product 3</div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default home