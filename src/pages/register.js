import React from 'react'
import '../styles/register.css'

function register() {
  return (
    <div className="container">
      <div className="col-md-4">
        <div className="card">
          <h1 className="text-center">Register</h1>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label><span className="text-danger">*</span>
              <input type="text" className="form-control" id="name" placeholder="Enter name" required/>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label><span className="text-danger">*</span>
              <input type="email" className="form-control" id="email" placeholder="Enter email" required/>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label><span className="text-danger">*</span>
              <input type="password" className="form-control" id="password" placeholder="Enter password" required/>
            </div>
            <div className='mb-3'>
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label><span className="text-danger">*</span>
                <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm password" required/>
            </div>
            <button type="submit" className="btn btn-primary w-100">Register</button>
            <a href="/login" className="btn btn-link w-100">Already have an account? Log in here.</a>
          </form>
        </div>
      </div>
    </div>
  )
}

export default register