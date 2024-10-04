import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../styles/inventory.css';
import SideNav from "../components/sidenav";

function Inventory() {
  const [inventoryItems, setInventoryItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5030/api/inventory/")
      .then((res) => {
        console.log(res.data);
        setInventoryItems(res.data);
      })
      .catch((err) => {
        console.log("error when retreiving data", err);
      });
  }, []);

  const handleDeleteClick = (productId) => {
    axios.delete(`http://localhost:5030/api/inventory/${productId}`)
    .then((res) => {
      setInventoryItems(inventoryItems.filter((item) => item.productId !== productId))
    })
    .catch((error) => {
      console.log("error when deleting item", error)
    })
  }
  return (
   
    <div className="container mt-5 inventory-page">
     <SideNav />
      <div className="inventory-header">
        <h1 className="inventory-title">Inventory Management</h1>
        <Link to= "/inventory/add">
        <button className="btn btn-primary add-new-btn">+ Add New Item</button>
        </Link>
      </div>
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
                  <button className="btn btn-outline-danger btn-sm mx-1" onClick={() => handleDeleteClick(item.productId)}>
                    <i className="fas fa-trash"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
);
}

export default Inventory;
