import React, { useEffect, useState, } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import SideNav from "../components/sidenav";
import '../styles/inventory.css';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://localhost:7260/Role/get-users');
                setUsers(response.data);
            } catch (err) {
                setError('Failed to fetch users');
            }
        };

        fetchUsers();
    }, []);

    const handleCreateVendor = () => {
        // Navigate to AssignRole and pass the username via state
        navigate('/create-vendor');
    };

    const handleAssignRole = (username) => {
        // Navigate to AssignRole and pass the username via state
        navigate('/admin-assign', { state: { username } });
    };

    const handleDeleteUser = async (username) => {
        try {
            await axios.delete(`https://localhost:7260/Role/delete-customer/${username}`);
            toast.success(`${username} User deleted successfully!`);
            setUsers(users.filter(user => user.username !== username)); // Update the users list
        } catch (err) {
            alert('Failed to delete user');
        }
    };

    return (
        <div className="container mt-5 inventory-page">
            <SideNav />
            <div className="inventory-header">
                <h1 className="inventory-title">User List</h1>
                <button className="btn btn-primary add-new-btn" onClick={handleCreateVendor}>+ Add New User</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {/* <button onClick={handleCreateVendor}>Create Vendor</button> */}
            {users.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-hover table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Roles</th>
                                <th>Actions</th>
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
                                        {(user.roles.includes('Customer') || user.roles.includes('Vendor')) && (
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
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
};

export default AdminDashboard;