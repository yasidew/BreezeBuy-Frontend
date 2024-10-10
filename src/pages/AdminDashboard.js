/*
 * AdminDashboard.js
 * Author: [Dayananda I.H.M.B.L. | IT21307058]
 * This is page all users and in this page delete all users  
 */


import React, { useEffect, useState, } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SideNav from "../components/sidenav";
import '../styles/inventory.css';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize] = useState(5);

    // fetch all users
    useEffect(() => {
        const fetchUsers = async (page) => {
            try {
                const response = await axios.get('/Role/get-users', {

                    params: {
                        page: page,
                        pageSize: pageSize
                    }
                });
                setUsers(response.data.users);
                setTotalPages(response.data.totalPages);
            } catch (err) {
                setError('Failed to fetch users');
            }
        };

        fetchUsers(currentPage);
    }, [currentPage, pageSize]);

    const handleCreateVendor = () => {
        navigate('/create-vendor');
    };

    const handleAssignRole = (username) => {
        navigate('/admin-assign', { state: { username } });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // function handle delete user
    const handleDeleteUser = async (username) => {
        try {
            await axios.delete(`/Role/delete-customer/${username}`);

            toast.success(`${username} User deleted successfully!`);
            setUsers(users.filter(user => user.username !== username)); // Update the users list
        } catch (err) {
            alert('Failed to delete user');
        }
    };

    return (
        <>
            <div className="container inventory-page">
                <SideNav />
                <div className="inventory-header" style={{padding: "10px"}}>
                    <h1 className="inventory-title">BreezeBuy User List</h1>
                    <button className="btn btn-primary add-new-btn" onClick={handleCreateVendor}>+ Add New User</button>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {users.length > 0 ? (
                    <div style={{padding: "10px", marginTop:"100px"}}>
                        <div>
                            <table className="table table-hover table-bordered">
                                <thead className="thead-dark">
                                    <tr>
                                        <th style={{ padding: '20px' }}>Username</th>
                                        <th style={{ padding: '20px' }}>Email</th>
                                        <th style={{ padding: '20px' }}>Roles</th>
                                        <th style={{ padding: '20px' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                        <tr key={index}>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{user.roles.join(', ')}</td>
                                            <td>
                                                {/* Only show the Assign Role button if the user is not an Admin */}
                                                {!user.roles.includes('Admin') && (
                                                    <button onClick={() => handleAssignRole(user.username)} className="btn btn-outline-primary btn-sm mx-1">
                                                        Assign Role
                                                    </button>
                                                )}
                                                {/* Only show the delete button for customers and vendors */}
                                                {(user.roles.includes('Customer') || user.roles.includes('Vendor') || user.roles.includes('CSR')) && (
                                                    <button onClick={() => handleDeleteUser(user.username)} className="btn btn-outline-primary btn-sm mx-1">
                                                        Delete
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
        </>
    );
};

export default AdminDashboard;