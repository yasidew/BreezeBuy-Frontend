import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/manageinventory.css'; // Make sure the CSS is appropriate for your use case
import SideNav from "../components/sidenav"; // Import your sidebar component
import { toast } from 'react-toastify';

const UpdateProduct = () => {
    const [productDetails, setProductDetails] = useState({
        name: '',
        description: '',
        price: 0,
        quantity: 0,
        categoryId: ''
    }); // To store product details for update
    const { id } = useParams(); // Get product ID from URL
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch product details for the given ID
        const fetchProductDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:5030/api/product/${id}`, { // Use backticks for URL interpolation
                    headers: {
                        'Authorization': `Bearer ${token}` // Use backticks for the Authorization header
                    }
                });

                if (response.status === 200) {
                    setProductDetails(response.data); // Populate form with fetched product details
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [id]); // Fetch product details when component mounts

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductDetails({
            ...productDetails,
            [name]: value
        });
    };

    // Handle form submission to update product
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');

            // Send PUT request to update product
            await axios.put(`http://localhost:5030/api/product/${id}`, productDetails, { // Use backticks for URL
                headers: {
                    'Authorization': `Bearer ${token}` // Use backticks for Authorization header
                }
            });

            toast.success("Product Updated Successfully");
            navigate('/product'); // Adjust the navigation based on your app's structure
        } catch (error) {
            toast.error('Error updating product');
            console.error('Error updating product:', error);
        }
    };

    // Show loading message while fetching product details
    if (!productDetails) {
        return <div className="text-center py-5">Loading...</div>;
    }

    return (
        <div className="container manage-inventory-page">
            <SideNav />
            <h2 className="page-title">Update Product</h2>

            <form onSubmit={handleSubmit} className="inventory-form">
                <div className="form-group">
                    <label htmlFor="name">Product Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={productDetails.name}
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
                        value={productDetails.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        value={productDetails.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="quantity"
                        name="quantity"
                        value={productDetails.quantity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="categoryId">Category ID:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="categoryId"
                        name="categoryId"
                        value={productDetails.categoryId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="button-group">
                    <button type="submit" className="btn btn-secondary back-btn">Update Product</button>
                    <button className="btn btn-secondary back-btn" onClick={() => navigate(-1)}>
                        Back
                    </button>
                </div>
            </form>

        </div>
    );
};

export default UpdateProduct;
