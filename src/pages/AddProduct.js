import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SideNav from "../components/sidenav"; // Import your SideNav component
import { toast } from 'react-toastify';

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [productDetails, setProductDetails] = useState({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    categoryId: ''
  });
  const navigate = useNavigate();

  // Fetch categories for the category dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5030/api/category', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({
      ...productDetails,
      [name]: value
    });
  };

  // Handle form submission to add new product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5030/api/product', productDetails, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      toast.success('Product added successfully!');
      navigate('/product'); // Redirect to product management page
    } catch (error) {
      toast.error('Error adding product');
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="container add-product-page">
      <SideNav />
      <h2 className="page-title">Add New Product</h2>
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
            className="form-control"
            id="description"
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
          <label htmlFor="categoryId">Category:</label>
          <select
            className="form-control"
            id="categoryId"
            name="categoryId"
            value={productDetails.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="button-group">
          <button type="submit" className="btn btn-primary">Add Product</button>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
