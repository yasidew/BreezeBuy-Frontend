/*
 * AssignRole.js
 * Author: [Dayananda I.H.M.B.L. | IT21307058]
 * This is Assign role to users
 */

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';  // Import useLocation to access passed state
import axios from 'axios';
import SideNav from "../components/sidenav";
import '../styles/manageinventory.css';
import { toast } from 'react-toastify';

const AssignRole = () => {
    const location = useLocation();
    const navigate = useNavigate();  
    const { username } = location.state || {};  
    const [role, setRole] = useState('');  

    // function assign role
    const handleRoleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/Role/assign-role', {

                username,
                role,
            });
            toast.success(`Role ${role} assigned to ${username}`)
            navigate("/admin")
        } catch (error) {
            console.error('Failed to assign role', error);
            alert('Failed to assign role');
        }
    };  

    return (
        <div className="container manage-inventory-page">
            <SideNav />
            <h2 className="page-title">Assign Role to {username}</h2>
            <form onSubmit={handleRoleSubmit} className="inventory-form">
                <div className="form-group">
                    <label>Role:</label>
                    <select
                        value={role}
                        className="form-control"
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="">Select a role</option>  {/* Default option */}
                        <option value="Vendor">Vendor</option>
                        <option value="CSR">Customer Service Representative(CSR)</option>
                    </select>
                </div>

                <div className="button-group">
                    <button type="submit" className="btn btn-secondary back-btn">Assign Role</button>
                    <button className="btn btn-secondary back-btn" onClick={() => navigate(-1)}>
                        Back
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AssignRole;