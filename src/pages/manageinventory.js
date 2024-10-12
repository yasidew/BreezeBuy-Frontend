/**
 * ManageInventory Component
 * This component is used to manage the inventory items.
 * It allows adding new items and editing existing items.
 * Author: [Yasitha Dewmin | IT21440922]
 */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/manageinventory.css";
import SideNav from "../components/sidenav";

function ManageInventory() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State variables for form fields
  const [itemId, setItemId] = useState("");
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [quantityAvailable, setQuantityAvailable] = useState("");
  const [reoderLevel, setReorderLevel] = useState("");
  const [items, setItems] = useState([]);

   // Fetch items and item details if editing
  useEffect(() => {
    axios
      .get("https://pasindu99-001-site1.etempurl.com/api/inventory/items")
      .then((res) => setItems(res.data))
      .catch((error) => console.log("Error fetching items", error));

    if (id) {
      axios
        .get(`https://pasindu99-001-site1.etempurl.com/api/inventory/${id}`)
        .then((res) => {
          const item = res.data;
          setItemId(item.details.itemId);
          setProductId(item.productId);
          setProductName(item.productName);
          setQuantityAvailable(item.quantityAvailable);
          setReorderLevel(item.reoderLevel);
        })
        .catch((error) => console.log("Error retrieving data", error));
    }
  }, [id]);

   // Handle form submission
  const handleSubmit = (e) => { // Add e as parameter
    e.preventDefault();
    const inventoryData = {
      itemId,
      productId,
      productName,
      quantityAvailable: parseInt(quantityAvailable),
      reoderLevel: parseInt(reoderLevel),
    };

    const request = id
      ? axios.put(`https://pasindu99-001-site1.etempurl.com/api/inventory/${id}`, inventoryData)
      : axios.post("https://pasindu99-001-site1.etempurl.com/api/inventory/", inventoryData);

    request
      .then((res) => {
        const message = id ? "Item updated successfully!" : "Item added successfully!";
        toast.success(message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => { // Delay navigation by 1 second to allow toast to display
          navigate("/inventory");
        }, 2000); // Delay navigation by 1 second to allow toast to display
      })
      .catch((error) => {
        toast.error("Error saving data", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        console.log("Error saving data", error);
      });
  };

  return (
    <div className="container manage-inventory-page">
      <SideNav />
      <ToastContainer />
      <h1 className="page-title">{id ? "Edit Inventory Item" : "Add New Inventory Item"}</h1>
      <form onSubmit={handleSubmit} className="inventory-form">
        <div className="form-group">
          <label>Select Item</label>
          <select
            className="form-control"
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
            required
          >
            <option value="">Select an item</option>
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Product ID</label>
          <input
            type="text"
            className="form-control"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            className="form-control"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Quantity Available</label>
          <input
            type="number"
            className="form-control"
            value={quantityAvailable}
            onChange={(e) => setQuantityAvailable(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Reorder Level</label>
          <input
            type="number"
            className="form-control"
            value={reoderLevel}
            onChange={(e) => setReorderLevel(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit" className="btn btn-primary submit-btn">
            {id ? "Update Item" : "Add Item"}
          </button>
          <button
            type="button" // Change to type="button" to prevent form submission
            className="btn btn-secondary back-btn"
            onClick={() => navigate(-1)} // Navigate back to previous page
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default ManageInventory;


// http://localhost:5030/api/inventory/${id}