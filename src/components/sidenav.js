import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidenav.css';
import { jwtDecode } from 'jwt-decode';

function SideNav() {
  const [isOpen, setIsOpen] = useState(true);
  const [userRole, setUserRole] = useState('');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  console.log(userRole)

  useEffect(() => {
    // Assuming the JWT token is stored in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decode the token
        const role = decodedToken.role || decodedToken.roles; // Extract role or roles
        setUserRole(role);
      } catch (err) {
        console.error('Invalid token', err);
      }
    }
  }, []);

  return (
    <div>
      <button className="floating-btn" onClick={toggleSidebar}>
        {isOpen ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
      </button>
      <div className={`sidenav ${isOpen ? 'open' : 'closed'}`}>
        <br /><br />
        
        {/* Admin-specific links */}
        {userRole === 'Admin' && (
          <>
            <Link to="/admin">
              <i className="fas fa-user-plus"></i> {isOpen && <span>User List</span>}
            </Link>
            <Link to="/admin-assign">
              <i className="fas fa-user-cog"></i> {isOpen && <span>Assign Roles</span>}
            </Link>
          </>
        )}

        {/* Vendor-specific links */}
        {userRole === 'Vendor' && (
          <>
            <Link to="/vendor-dashboard">
              <i className="fas fa-tachometer-alt"></i> {isOpen && <span>Vendor Dashboard</span>}
            </Link>
            <Link to="/add-vendor-details">
              <i className="fas fa-pencil-alt"></i> {isOpen && <span>Add Vendor Details</span>}
            </Link>
          </>
        )}

        {/* Customer-specific links */}
        {userRole === 'Customer' && (
          <>
            <Link to="/customer-dashboard">
              <i className="fas fa-user"></i> {isOpen && <span>Customer Dashboard</span>}
            </Link>
            <Link to="/comment/:vendorId">
              <i className="fas fa-comment-alt"></i> {isOpen && <span>Give Feedback</span>}
            </Link>
          </>
        )}

        {userRole === 'CSR' && (
          <>
            <Link to="/csr-users-page">
              <i className="fas fa-user"></i> {isOpen && <span>CSR Dashboard</span>}
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default SideNav;
