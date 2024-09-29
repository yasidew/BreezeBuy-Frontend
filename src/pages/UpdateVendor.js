import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/manageinventory.css';
import SideNav from "../components/sidenav";
import { toast } from 'react-toastify';

const UpdateVendor = () => {
    const [vendorDetails, setVendorDetails] = useState({
        product: '',
        description: ''
    }); // To store vendor details for update
    const { id } = useParams(); // Get vendor ID from URL
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch vendor details for the given ID
        const fetchVendorDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`https://localhost:7260/api/Vendor/v1/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    setVendorDetails(response.data); // Populate form with fetched vendor details
                }
            } catch (error) {
                console.error('Error fetching vendor details:', error);
            }
        };

        fetchVendorDetails();
    }, [id]); // Fetch vendor details when component mounts

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setVendorDetails({
            ...vendorDetails,
            [name]: value
        });
    };

    // Handle form submission to update vendor
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');

            // Send PUT request to update vendor
            await axios.put(`https://localhost:7260/api/Vendor/${id}`, vendorDetails, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            toast.success("Vendor Details Updated Succeesfully")
            navigate('/vendor-dashboard');
        } catch (error) {
            toast.error('Error updating vendor')
            console.error('Error updating vendor:', error);
        }
    };

    // Show loading message while fetching vendor details
    if (!vendorDetails) {
        return <div className="text-center py-5">Loading...</div>;
    }

    return (
        <div className="container manage-inventory-page">
            <SideNav />
            <h2 className="page-title">Update Vendor</h2>
            <form onSubmit={handleSubmit} className="inventory-form">
                <div className="form-group">
                    <label htmlFor="product">Product:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="product"
                        name="product"
                        value={vendorDetails.product}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        className="form-control"
                        name="description"
                        value={vendorDetails.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="button-group">
                    <button type="submit" className="btn btn-secondary back-btn">Update Vendor</button>
                    <button className="btn btn-secondary back-btn" onClick={() => navigate(-1)}>
                        Back
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateVendor;