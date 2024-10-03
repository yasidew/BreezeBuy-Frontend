import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'
import { toast } from 'react-toastify';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5030/Auth/login', {
        username,
        password,
      });

      const { token } = response.data;
      localStorage.setItem('token', token); // Store token in localStorage
      const userRole = getUserRole(token); // Extract role from token

      if (userRole.includes('Admin')) {
        toast.success(`${username} Login Successfully!!`)
        navigate('/admin');
      } else if (userRole.includes('Customer')) {
        toast.success(`${username} Login Successfully!!`)
        navigate('/customer-dashboard');
      } else if(userRole.includes('Vendor')){
        toast.success(`${username} Login Successfully!!`)
        navigate('/vendor-dashboard');
      }
    } catch (error) {
      setError('Invalid login credentials');
    }
  };

  // Decode token to get the role
  const getUserRole = (token) => {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  };

  return (
    <div className="container">
      <div className="col-md-4">
        <div className="card">
          <h1 className="text-center">Login</h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">User Name</label>
              <input type="text" className="form-control" id="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required placeholder="Enter user name" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" value={password}
                onChange={(e) => setPassword(e.target.value)}
                required placeholder="Enter password" />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
            <a href="/register" className="btn btn-link w-100">Don't have an account? Register here.</a>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login