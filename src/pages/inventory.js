/**
 * Inventory Component
 * This component displays the inventory items and allows searching, editing, and deleting items.
 * Author: [Yasitha Dewmin | IT21440922]
 */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import "../styles/inventory.css";
import SideNav from "../components/sidenav";

function Inventory() {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]); // State for low stock items
  const [loading, setLoading] = useState(true); // State for loading
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term

  // Fetch all inventory items
  useEffect(() => {
    fetchInventoryItems();
  }, []);

  // Function to fetch inventory items
  const fetchInventoryItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5030/api/inventory/");
      setInventoryItems(res.data);
    } catch (err) {
      console.error("Error retrieving data", err);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle search
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      // If search term is empty, fetch all items
      fetchInventoryItems();
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5030/api/inventory/search`,
        {
          params: { searchTerm },
        }
      );
      setInventoryItems(res.data);
    } catch (err) {
      console.error("Error during search", err);
      toast.error("Failed to perform search.");
    }
  };

  // Fetch low stock items
  useEffect(() => {
    axios
      .get("http://localhost:5030/api/inventory/low-stock")
      .then((res) => {
        setLowStockItems(res.data);
      })
      .catch((err) => {
        console.error("Error retrieving low stock items", err);
      });
  }, []);

  // Handle delete item
  const handleDeleteClick = (productId) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-confirm-dialog">
            <h2 className="dialog-title">Delete Confirmation</h2>
            <p className="dialog-message">
              Are you sure you want to delete this item?
            </p>
            <div className="dialog-buttons">
              <button
                className="btn-confirm"
                onClick={() => {
                  axios
                    .delete(`http://localhost:5030/api/inventory/${productId}`)
                    .then((res) => {
                      setInventoryItems(
                        inventoryItems.filter((item) => item.id !== productId)
                      );
                      setLowStockItems(
                        lowStockItems.filter((item) => item.id !== productId)
                      );
                      toast.success("Inventory deleted successfully!");
                    })
                    .catch((error) => {
                      console.error("Error when deleting item", error);
                      toast.error("Cannot Delete Due to Pending Orders.");
                    });
                  onClose();
                }}
              >
                Yes
              </button>
              <button className="btn-cancel" onClick={onClose}>
                No
              </button>
            </div>
          </div>
        );
      },
    });
  };

  return (
    <div className="container mt-5 inventory-page">
      <SideNav />
      <div className="inventory-header">
        <h1 className="inventory-title">Inventory Management</h1>
      </div>
        <div className="inventory-header-2">
          <Link to="/inventory/add">
            <button className="btn btn-primary add-new-btn">
              + Add New Item
            </button>
          </Link>
        </div>
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          className="form-control"
          placeholder="Search inventory"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary ml-2" onClick={handleSearch}>
          Search
        </button>
      </div>

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          {/* All Inventory Items Table */}
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Quantity Available</th>
                  <th>Reorder Level</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventoryItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.productId}</td>
                    <td>{item.productName}</td>
                    <td>{item.quantityAvailable}</td>
                    <td>{item.reoderLevel}</td>
                    <td>
                      <Link to={`/inventory/edit/${item.id}`}>
                        <button className="btn btn-outline-primary btn-sm mx-1">
                          <i className="fas fa-edit"></i> Edit
                        </button>
                      </Link>
                      <button
                        className="btn btn-outline-danger btn-sm mx-1"
                        onClick={() => handleDeleteClick(item.id)}
                      >
                        <i className="fas fa-trash"></i> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Low Stock Items Section */}
          <div className="low-stock-section mt-4">
            <h2>Low Stock Items</h2>
            {lowStockItems.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-hover table-bordered">
                  <thead className="thead-light">
                    <tr>
                      <th>Product ID</th>
                      <th>Product Name</th>
                      <th>Quantity Available</th>
                      <th>Reorder Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lowStockItems.map((item) => (
                      <tr key={item.id}>
                        <td>{item.productId}</td>
                        <td>{item.productName}</td>
                        <td>{item.quantityAvailable}</td>
                        <td>{item.reoderLevel}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No items are currently low in stock.</p>
            )}
          </div>
        </>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
}

export default Inventory;
