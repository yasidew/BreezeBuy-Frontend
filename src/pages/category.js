import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideNav from '../components/sidenav';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import '../styles/product.css';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editCategoryId, setEditCategoryId] = useState(null); // To track the editing category
  const [newCategoryName, setNewCategoryName] = useState(''); // Store the new name
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5030/api/category/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching categories');
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Handle the edit button click
  const handleEditClick = (categoryId, currentName) => {
    setEditCategoryId(categoryId); // Set the category to be edited
    setNewCategoryName(currentName); // Set the current name to the input field
  };

  // Handle the save button click
  const handleSaveClick = async (categoryId) => {
    try {
      const token = localStorage.getItem('token');

      // Send the new category name as a plain string in the body
      // await axios.put(
      //   `http://localhost:5030/api/category/${categoryId}/name`,
      //   //http://localhost:5030/api/category/67060428c63951bfadecd7cb/name
      //   { name: newCategoryName },  // Send the updated name directly as an object
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       'Content-Type': 'application/json', // Set content type as JSON
      //     },
      //   }
      // );

      await axios.put(
  `http://localhost:5030/api/category/${categoryId}/name`,
  newCategoryName,  // Send the updated name directly as a plain string
  {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // Set content type as JSON
    },
  }
);


      toast.success('Category name updated successfully!');

      // Update the category list after name change
      setCategories(categories.map((category) =>
        category.id === categoryId
          ? { ...category, name: newCategoryName }
          : category
      ));

      // Exit edit mode
      setEditCategoryId(null);
    } catch (err) {
      console.log(err.response?.data); // Log error details to see the server's response
      toast.error('Error updating category name');
    }
  };

  // Handle delete button click
  const handleDeleteClick = async (categoryId) => {
    try {
      const token = localStorage.getItem('token');

      // Make the delete request
      await axios.delete(`http://localhost:5030/api/category/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Category deleted successfully!');

      // Remove the deleted category from the state
      setCategories(categories.filter((category) => category.id !== categoryId));
    } catch (err) {
      console.log(err.response?.data); // Log error details
      toast.error('Error deleting category');
    }
  };

  // Handle cancel button click
  const handleCancelClick = () => {
    setEditCategoryId(null); // Exit edit mode without saving
  };

  // Handle category activation/deactivation
  const handleCategoryStatus = async (categoryId, action) => {
    try {
      const token = localStorage.getItem('token');
      
      // Corrected the template literal for URL
      const endpoint = 
        action === 'activate'
          ? `http://localhost:5030/api/category/${categoryId}/activate`
          : `http://localhost:5030/api/category/${categoryId}/deactivate`;

      await axios.put(endpoint, {}, {
        headers: {
          Authorization: `Bearer ${token}`,  // Corrected to use backticks
        },
      });

      // Show success message
      toast.success(`Category ${action === 'activate' ? 'activated' : 'deactivated'} successfully!`);

      // Update the category list after activation/deactivation
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === categoryId
            ? { ...category, isActive: action === 'activate' }
            : category
        )
      );

      // Hide the dropdown after activation/deactivation
      setSelectedCategoryId(null);

    } catch (err) {
      // Show error message
      toast.error(`Error ${action === 'activate' ? 'activating' : 'deactivating'} category`);
      console.error(`Error ${action === 'activate' ? 'activating' : 'deactivating'} category`, err);
    }
  };

  // Check for loading or error state before rendering content
  if (loading) {
    return <div className="text-center py-5">Loading categories...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-5 product-management-page">
      <SideNav />

      {/* Category Table */}
      <div className="table-responsive mt-4">
        <div className="product-management-header">
          <h1 className="title">Category Management</h1>
          <Link to="/category/add">
            <button className="btn btn-primary add-new-btn">+ Add New Category</button>
          </Link>
        </div>

        <h2>Categories</h2>
        <table className="table table-hover table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Category ID</th>
              <th>Category Name</th>
              <th>Number of Products</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>

                {/* Category Name with Edit Mode */}
                <td>
                  {editCategoryId === category.id ? (
                    <input
                      type="text"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      className="form-control"
                    />
                  ) : (
                    category.name
                  )}
                </td>

                <td>{category.products.length}</td>

                {/* Status */}
                <td>
                  {category.isActive ? 'Active' : 'Inactive'}
                  <button
                    className="btn btn-link"
                    onClick={() =>
                      setSelectedCategoryId(
                        selectedCategoryId === category.id ? null : category.id
                      )
                    }
                  >
                    ⬇
                  </button>
                  {selectedCategoryId === category.id && (
                    <div className="dropdown-menu show">
                      <button
                        className="dropdown-item"
                        onClick={() => handleCategoryStatus(category.id, 'activate')}
                        disabled={category.isActive}
                      >
                        Activate
                      </button>
                      <button
                        className="dropdown-item"
                        onClick={() => handleCategoryStatus(category.id, 'deactivate')}
                        disabled={!category.isActive}
                      >
                        Deactivate
                      </button>
                    </div>
                  )}
                </td>

                {/* Actions with Save/Cancel/Edit */}
                <td>
                  {editCategoryId === category.id ? (
                    <>
                      <button
                        className="btn btn-success btn-sm mx-1"
                        onClick={() => handleSaveClick(category.id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary btn-sm mx-1"
                        onClick={handleCancelClick}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-outline-primary btn-sm mx-1" onClick={() => handleEditClick(category.id, category.name)}>
                        <i className="fas fa-edit"></i> Edit
                      </button>
                      <button className="btn btn-outline-danger btn-sm mx-1" onClick={() => handleDeleteClick(category.id)}>
                        <i className="fas fa-trash-alt"></i> Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryList;
