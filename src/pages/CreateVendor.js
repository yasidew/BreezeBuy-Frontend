/*
 * CreateVendor.js
 * Author: [Dayananda I.H.M.B.L. | IT21307058]
 * This is Create Vendor to system
 */

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SideNav from "../components/sidenav";
import '../styles/manageinventory.css';
import { toast } from 'react-toastify';

const CreateVendor = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(''); 

        // Check if the password and confirm password match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('/Auth/register', {
                username,
                email,
                password
            });

            if (response.status === 200) {
                toast.success('Create Vendor Successfully')
                navigate('/admin');
            }
        } catch (err) {
            // Handle error responses
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="container manage-inventory-page">
            <SideNav />
            <h2 className="page-title">Register Vendor</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleRegister} className="inventory-form">
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />...
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="text"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="button-group">
                    <button type="submit" className="btn btn-secondary back-btn">Register</button>
                    <button className="btn btn-secondary back-btn" onClick={() => navigate(-1)}>
                        Back
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateVendor