import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../styles/manageinventory.css';
import SideNav from "../components/sidenav";

function ManageInventory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [quantityAvailable, setQuantityAvailable] = useState("");
  const [reoderLevel, setReorderLevel] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5030/api/inventory/${id}`)
        .then((res) => {
          const item = res.data;
          setProductId(item.productId);
          setProductName(item.productName);
          setQuantityAvailable(item.quantityAvailable);
          setReorderLevel(item.reoderLevel);
        })
        .catch((error) => {
          console.log("error when retrieving data", error);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const inventoryData = {
      productId,
      productName,
      quantityAvailable: parseInt(quantityAvailable),
      reoderLevel: parseInt(reoderLevel),
    };

    if (id) {
      axios.put(`http://localhost:5030/api/inventory/${id}`, inventoryData)
        .then((res) => {
          console.log("Item updated successfully", res.data);
          navigate("/inventory");

        })
        .catch((error) => {
          console.log("error when updating data", error);
        });
    }
    else {
      axios.post(`http://localhost:5030/api/inventory/`, inventoryData)
        .then((res) => {
          console.log("Item added successfully", res.data);
          navigate("/inventory");
        })
        .catch((error) => {
          console.log("error when adding item", error);
        });
    }
  };

  return (
    <div className="container manage-inventory-page">
      <SideNav />
      <h1 className="page-title">{id ? "Edit Inventory Item" : "Add New Inventory Item"}</h1>
      <form onSubmit={handleSubmit} className="inventory-form">
        <div className="form-group">
          <label>Product ID</label>
          <input type="text" className="form-control" value={productId} onChange={(e) => setProductId(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Product Name</label>
          <input type="text" className="form-control" value={productName} onChange={(e) => setProductName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Quantity Available</label>
          <input type="number" className="form-control" value={quantityAvailable} onChange={(e) => setQuantityAvailable(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Reorder Level</label>
          <input type="number" className="form-control" value={reoderLevel} onChange={(e) => setReorderLevel(e.target.value)} required />
        </div>
        <div className="button-group">
          <button type="submit" className="btn btn-primary submit-btn">
            {id ? "Update Item" : "Add Item"}
          </button>
          <button className="btn btn-secondary back-btn" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </form>
    </div>
  )
}

export default ManageInventory;
