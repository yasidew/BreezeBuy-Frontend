/*
 * CSRUserPage.js
 * Author: [Dayananda I.H.M.B.L. | IT21307058]
 * This is CSRUserPage. this page can activate deactivate user rol
 */

import React, { useEffect, useState, } from 'react';
import axios from 'axios';
import SideNav from "../components/sidenav";
import '../styles/inventory.css';
import { toast } from 'react-toastify';

const CSRUserPage = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize] = useState(10);

    useEffect(() => {
        const fetchUsers = async (page) => {
            try {
                const response = await axios.get('/Role/get-users', {
                    params: {
                        page: page,
                        pageSize: 10
                    }
                });

                // Only keep users with "Customer" role 
                const customers = response.data.users.filter(user =>
                    user.roles.includes("Customer")
                );

                setUsers(customers);
                setTotalPages(response.data.totalPages);
            } catch (err) {
                setError('Failed to fetch users');
            }
        };

        fetchUsers(currentPage);
    }, [currentPage, pageSize]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleActivateUser = async (customerId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put('/Auth/activateCustomerAccount', {
                customerId: customerId
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            toast.success(response.data.message);
        } catch (err) {
            alert('Failed to activate user');
        }
    };

    return (
        <div className="container inventory-page">
            <SideNav />
            <div className="inventory-header">
                <h1 className="inventory-title" style={{padding: "10px"}}>BreezeBuy Customer List</h1>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {users.length > 0 ? (
                <div style={{padding: "10px", marginTop:"100px"}}>
                    <div >
                        <table className="table table-hover table-bordered">
                            <thead className="thead-dark">
                                <tr>
                                    {/* <th style={{ padding: '20px' }}>ID</th> */}
                                    <th style={{ padding: '20px' }}>Username</th>
                                    <th style={{ padding: '20px' }}>Email</th>
                                    <th style={{ padding: '20px' }}>Roles</th>
                                    <th style={{ padding: '20px' }}>Status</th>
                                    <th style={{ padding: '20px' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users
                                    .map((user, index) => (
                                        <tr key={index}>
                                            {/* <td>{user.id}</td> */}
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{user.roles.join(', ')}</td>
                                            <td>{user.status}</td>
                                            <td>
                                                {user.status === 'deactivated' && (
                                                    <button
                                                        onClick={() => handleActivateUser(user.id)}
                                                        className="btn btn-outline-primary btn-sm mx-1"
                                                    >
                                                        Activate
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="pagination d-flex justify-content-center mt-3">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="btn btn-secondary mx-1"
                        >
                            Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={`btn mx-1 ${index + 1 === currentPage ? 'btn-primary' : 'btn-secondary'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="btn btn-secondary mx-1"
                        >
                            Next
                        </button>
                    </div>
                </div>
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
};

export default CSRUserPage;