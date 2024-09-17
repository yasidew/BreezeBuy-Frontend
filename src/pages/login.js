import React from 'react'
import '../styles/login.css'
import Navbar from '../components/navbar'

function login() {
  return (
    <div className="container">
      <div className="col-md-4">
        <div className="card">
          <h1 className="text-center">Login</h1>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" placeholder="Enter email" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Enter password" />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
            <a href="/register" className="btn btn-link w-100">Don't have an account? Register here.</a>
          </form>
        </div>
      </div>
    </div>
  )
}

export default login