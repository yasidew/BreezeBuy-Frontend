import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/manageinventory.css';
import { useNavigate, useParams } from 'react-router-dom';
import SideNav from "../components/sidenav";
import { toast } from 'react-toastify';

const AddVendor = () => {
    const [userDetails, setUserDetails] = useState(null); // To store user details from Auth/me
    const [vendorDetails, setVendorDetails] = useState({
        product: '',
        description: ''
    }); // To store vendor form inputs
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5030/Auth/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }

                const data = await response.json();
                setUserDetails(data); // Set user details in state
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserDetails();
    }, []);

    // Handle form input changes for vendor details
    const handleChange = (e) => {
        const { name, value } = e.target;
        setVendorDetails({
            ...vendorDetails,
            [name]: value
        });
    };

    // Handle form submission to add vendor
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');

            const newVendor = {
                name: userDetails.username,
                userId: userDetails.userId,
                product: vendorDetails.product,
                description: vendorDetails.description,
                averageRating: 0,
                comments:[]
            };

            // Send POST request to add vendor
            await axios.post('https://localhost:7260/api/Vendor', newVendor, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            toast.success('Add Vendor successfully!');
            // Navigate or show success message after vendor is added
            navigate('/vendor-dashboard'); // Redirect to the vendor list page
        } catch (error) {
            console.error('Error adding vendor:', error);
            toast.error("Error adding vedor")
        }
    };

    // Show loading message while fetching user details
    if (!userDetails) {
        return <div className="text-center py-5">Loading...</div>;
    }

    return (
        <div className="container manage-inventory-page">
            <SideNav />
            <h2 className="page-title">Add New Vendor</h2>
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
                    <button type="submit" className="btn btn-secondary back-btn">Add Vendor</button>
                    <button className="btn btn-secondary back-btn" onClick={() => navigate(-1)}>
                        Back
                    </button>
                </div>
            </form>
        </div>
    );

}

export default AddVendor