// export default OrderManagement;
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
        toast.success("Orders retrieved successfully!"); // Success notification
      })
      .catch((err) => {
        toast.error("Error retrieving orders"); // Error notification
        console.log("Error retrieving orders:", err);
      });
  }, []);

  // Handle deleting an order
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

  const handleDeliveryClick = (orderId) => {
    axios
      .put(`/api/order/deliver/${orderId}`) // Assuming you have an API endpoint to mark as delivered
      .then(() => {
        setOrders(
          orders.map((order) =>
            order.id === orderId ? { ...order, status: "delivered" } : order
          )
        );
        toast.success("Order marked as delivered!");
      })
      .catch((error) => {
        toast.error("Error marking order as delivered");
        console.log("Error updating order status:", error);
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
            {/* <Link to="/order/new">
              <button className="btn btn-primary add-new-btn">+ Add New Order</button>
            </Link> */}
          </div>

          <h2>Orders</h2>
          <table className="table table-hover table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Order Number</th>
                <th>Customer ID</th>
                <th>Status</th>
                <th>Total Payment</th>
                
                <th>Mark as Delivered</th> {/* New column for the checkbox */}
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
                      {/* Checkbox for changing status to delivered */}
                      {/* <input
                        type="checkbox"
                        disabled={order.status !== "purchased"}
                        onChange={() => handleDeliveryClick(order.id)}
                      /> */}

<input
                        type="checkbox"
                        checked={order.status === "delivered"} // Keeps checkbox checked if delivered
                        disabled={order.status === "delivered"} // Disable checkbox if already delivered
                        onChange={() => handleDeliveryClick(order.id)}
                      />
                    </td>
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
                  <td colSpan="6" className="text-center">No orders found.</td>
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
