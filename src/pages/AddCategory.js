import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SideNav from '../components/sidenav'; // Import your SideNav component
import { toast } from 'react-toastify';

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Handle input change for the category name
  const handleInputChange = (e) => {
    setCategoryName(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set the submitting state to true to disable the button

    try {
      const token = localStorage.getItem('token');
      
      // Send POST request to create new category
      await axios.post(
        'http://localhost:5030/api/category',
        { name: categoryName }, // Pass the category name as the payload
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      toast.success('Category added successfully!');
      setIsSubmitting(false); // Re-enable the button after success
      navigate('/category'); // Navigate to the categories page after adding
    } catch (error) {
      toast.error('Error adding category');
      console.error('Error adding category:', error);
      setIsSubmitting(false); // Re-enable the button after error
    }
  };

  return (
    <div className="container add-category-page">
      <SideNav />
      <h2 className="page-title">Add New Category</h2>

      <form onSubmit={handleSubmit} className="category-form">
        <div className="form-group">
          <label htmlFor="categoryName">Category Name:</label>
          <input
            type="text"
            className="form-control"
            id="categoryName"
            value={categoryName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="button-group">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Category'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
