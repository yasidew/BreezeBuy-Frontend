import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OrderForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState({
        orderNumber: '',
        customerId: '',
        items: [],
        status: 'pending',
        totalPayment: 0
    });

    useEffect(() => {
        if (id) {
            fetchOrder(id);
        }
    }, [id]);

    const fetchOrder = async (orderId) => {
        try {
            const response = await axios.get(`/api/order/${orderId}`);
            setOrder(response.data);
        } catch (error) {
            toast.error("Error fetching order");
            console.error('Error fetching order:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrder({ ...order, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`/api/order/${id}`, order);
                toast.success("Order updated successfully!");
            } else {
                await axios.post('/api/order', order);
                toast.success("Order created successfully!");
            }
            navigate('/order');
        } catch (error) {
            toast.error("Error saving order");
            console.error('Error saving order:', error);
        }
    };

    return (
        <div className="container">
            <h2>{id ? 'Edit Order' : 'Create Order'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Order Number</label>
                    <input
                        type="text"
                        className="form-control"
                        name="orderNumber"
                        value={order.orderNumber}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Customer ID</label>
                    <input
                        type="text"
                        className="form-control"
                        name="customerId"
                        value={order.customerId}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {id ? 'Update Order' : 'Create Order'}
                </button>
            </form>

            {/* Toast Container */}
            <ToastContainer />
        </div>
    );
}

export default OrderForm;
