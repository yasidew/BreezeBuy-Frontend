import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';
import logobanner from '../images/logo-banner.png';


function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const userResponse = await fetch('/Auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user details');
        }

        const userData = await userResponse.json();
        setUser(userData);
      } catch (err) {
        setError('Error fetching user data.');
      }
    };

    fetchUser();
  }, []);

  const handleUserProfileClick = (event) => {
    event.preventDefault();
    // Navigate to user profile page
    navigate('/user-profile');
  };

  const isLoggedIn = localStorage.getItem('token') !== null;

  return (
    <nav className="navbar navbar-expand-lg navbar-blue bg-yellow">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">
            <img src={logobanner} alt="BreezeBuy" className="navbar-logo" />
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

            {isLoggedIn && user && (
              <li className="nav-item d-flex align-items-center">
                <span
                  className="nav-link"
                  onClick={handleUserProfileClick}  // Navigate to profile on click
                  style={{ cursor: 'pointer' }}   // Make it look clickable
                >
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
                    alt="User"
                    className="rounded-circle"
                    style={{ width: '30px', height: '30px', objectFit: 'cover', marginRight: '8px' }}
                  />
                  {user.username}
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

// {isLoggedIn && (
//   <>
//     <li className="nav-item">
//       <Link className="nav-link" to="/create-vendor">Create Vendor</Link>
//     </li>
//     <li className="nav-item">
//       <Link className="nav-link" to="/admin-assign">Assign Roles</Link>
//     </li>
//     <li className="nav-item">
//       <Link className="nav-link" to="/product">Products</Link>
//     </li>
//     <li className="nav-item">
//       <Link className="nav-link" to="/order">Orders</Link> {/* New Orders Link */}
//     </li>
   
//   </>
// )}