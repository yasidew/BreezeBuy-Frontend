import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/register.css'

const Register = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [role, setRole] = useState('Customer');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('https://localhost:7260/Auth/register', {
        username,
        email,
        password
      });

      await axios.post('https://localhost:7260/Role/assign-role', {
        username,
        role,
      });

      if (response.status === 200) {
        // On successful registration, redirect to login or another page
        navigate('/login');
      }
    } catch (err) {
      // Handle error responses
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="col-md-4">
        <div className="card">
          <h1 className="text-center">Register</h1>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">User Name</label><span className="text-danger">*</span>
              <input type="text" className="form-control" value={username}
                onChange={(e) => setUsername(e.target.value)}
                required placeholder="Enter user name" />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label><span className="text-danger">*</span>
              <input type="email" className="form-control" value={email}
                onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label><span className="text-danger">*</span>
              <input type="password" className="form-control" value={password}
                onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required />
            </div>
            <div className='mb-3'>
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label><span className="text-danger">*</span>
              <input type="password" className="form-control" value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" required />
            </div>
            <button type="submit" className="btn btn-primary w-100">Register</button>
            <a href="/login" className="btn btn-link w-100">Already have an account? Log in here.</a>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register