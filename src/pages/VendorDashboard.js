import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VendorDashboard = () => {
  const [userDetails, setUserDetails] = useState(null);  
  const [vendorDetails, setVendorDetails] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const userResponse = await fetch('https://localhost:7260/Auth/me', {
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
        const vendorResponse = await axios.get(`https://localhost:7260/api/Vendor/${userData.userId}`, {
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
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Dashboard</h2>
        </div>
        <div className="card-body">
          {/* User Profile Section */}
          <h3>User Profile</h3>
          <p><strong>Username:</strong> {userDetails.username}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Roles:</strong> {userDetails.roles.join(', ')}</p>

          {/* Divider */}
          <hr />

          {/* Vendor Details Section */}
          <h5>Product Details</h5>
          {vendorDetails ? (
            <div>
              <p><strong>Product:</strong> {vendorDetails.product}</p>
              <p><strong>Description:</strong> {vendorDetails.description}</p>
              <button
                className="btn btn-primary"
                onClick={() => navigate(`/update-vendor/${vendorDetails.id}`)}
              >
                Update Vendor Details
              </button>
            </div>
          ) : (
            <div>
              <p>No vendor details found.</p>
              <button
                className="btn btn-success"
                onClick={() => navigate("/add-vendor-details")}
              >
                Add Vendor Details
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VendorDashboard;