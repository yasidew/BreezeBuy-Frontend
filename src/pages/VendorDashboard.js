import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SideNav from '../components/sidenav';
import '../styles/VendorDashboard.css';

const VendorDashboard = () => {
  const [userDetails, setUserDetails] = useState(null);  
  const [vendorDetails, setVendorDetails] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
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
        setUserDetails(userData);

        // Fetch vendor details for the logged-in user
        const vendorResponse = await axios.get(`/api/Vendor/${userData.userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (vendorResponse.data) {
          setVendorDetails(vendorResponse.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserDetails();
  }, []);

  if (!userDetails) {
    return <div className="text-center py-5">Loading...</div>;
  }

  return (
    <div className="dashboard-container mt-5">
      <SideNav />
      <div className="card shadow-lg p-4 w-75 mx-auto">
        <div className="card-header bg-primary text-white text-center">
          <h2 className="card-title mb-0">Vendor Details</h2>
        </div>
        <div className="card-body d-flex flex-column align-items-center justify-content-center">
          <div className="user-section mb-4 text-center">
            <h3 className="text-primary">Vendor Profile Details</h3>
            <div className="user-details">
              <p>
                <strong>Username:</strong> {userDetails.username}
              </p>
              <p>
                <strong>Email:</strong> {userDetails.email}
              </p>
              <p>
                <strong>Roles:</strong> {userDetails.roles.join(', ')}
              </p>
            </div>
          </div>

          <hr />

          <div className="vendor-section mt-4 text-center">
            <h3 className="text-primary">Product Details</h3>
            {vendorDetails ? (
              <div className="vendor-details">
                <p>
                  <strong>Product:</strong> {vendorDetails.product}
                </p>
                <p>
                  <strong>Description:</strong> {vendorDetails.description}
                </p>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => navigate(`/update-vendor/${vendorDetails.id}`)}
                >
                  Update Vendor Details
                </button>
              </div>
            ) : (
              <div className="no-vendor">
                <p className="text-muted">No vendor details found.</p>
                <button
                  className="btn btn-outline-success"
                  onClick={() => navigate('/add-vendor-details')}
                >
                  Add Vendor Details
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorDashboard;