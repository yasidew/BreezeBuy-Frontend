import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/order.css";
import SideNav from "../components/sidenav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function OrderManagement() {
  const [orders, setOrders] = useState([]);

  // Fetch all orders
  useEffect(() => {
    axios
      .get("/api/order")
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        toast.error("Error retrieving orders");
        console.log("Error retrieving orders:", err);
      });
  }, []);

  const handleDeleteClick = (orderId) => {
    axios
      .delete(`/api/order/${orderId}`)
      .then(() => {
        setOrders(orders.filter((order) => order.id !== orderId));
        toast.success("Order deleted successfully!"); // Show success toast
      })
      .catch((error) => {
        toast.error("Error deleting order"); // Show error toast
        console.log("Error deleting order:", error);
      });
  };

  return (
    <div className="page-wrapper">
      <SideNav />

      {/* Order Management Section */}
      <div className="container mt-5 order-management-page">
        <div className="table-responsive mt-4">
          <div className="order-management-header">
            <h1 className="title">Order Management</h1>
            <Link to="/order/new">
              <button className="btn btn-primary add-new-btn">+ Add New Order</button>
            </Link>
          </div>

          <h2>Orders</h2>
          <table className="table table-hover table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Order Number</th>
                <th>Customer ID</th>
                <th>Status</th>
                <th>Total Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.orderNumber}</td>
                    <td>{order.customerId || "N/A"}</td>
                    <td>{order.status}</td>
                    <td>{order.totalPayment}</td>
                    <td>
                      <Link to={`/order/edit/${order.id}`}>
                        <button className="btn btn-outline-primary btn-sm mx-1">
                          <i className="fas fa-edit"></i> Edit
                        </button>
                      </Link>
                      <button
                        className="btn btn-outline-danger btn-sm mx-1"
                        onClick={() => handleDeleteClick(order.id)}
                      >
                        <i className="fas fa-trash"></i> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default OrderManagement;
