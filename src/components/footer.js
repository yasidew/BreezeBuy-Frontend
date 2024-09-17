import React from 'react'
import '../styles/footer.css'

function footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col">
            <h5>BreezeBuy</h5>
            <p>Your one-stop shop for everything.</p>
          </div>
          <div className="col">
            <h5>Quick Links</h5>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/terms">Terms & Conditions</a></li>
            </ul>
          </div>
          <div className="col">
            <h5>Contact</h5>
            <p>Email: support@breezebuy.com</p>
            <p>Phone: +1 234 567 890</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 BreezeBuy. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default footer