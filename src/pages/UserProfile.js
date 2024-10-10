/*
 * UserProfile.js
 * Author: [Dayananda I.H.M.B.L. | IT21307058]
 * This is UserProfile
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Container, Spinner, Alert, Image } from 'react-bootstrap';
import { toast } from 'react-toastify';
import SideNav from "../components/sidenav";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const userResponse = await fetch('https://localhost:7260/Auth/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!userResponse.ok) {
                    throw new Error('Failed to fetch user details');
                }

                const userData = await userResponse.json();
                console.log(userData)
                setUser(userData);
            } catch (err) {
                setError('Error fetching user data.');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const deactivateAccount = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put('https://localhost:7260/Auth/deactivateAccount', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }); // Adjust API route based on your setup
            setMessage(response.data.Message);
            toast.success("User Deactivated Account Succeesfully")
            // After deactivating account, clear token and navigate to login
            localStorage.removeItem('token');  // Clear token
            navigate('/login');  // Redirect to login page
        } catch (err) {
            setError('Error deactivating account.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');  // Clear token from localStorage
        toast.info('Logged out successfully');
        navigate('/login');  // Redirect to login page
    };

    if (loading) {
        return <Spinner animation="border" role="status" />;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <>
        <SideNav />
            <Container className="d-flex flex-column align-items-center">
                <h2 className="page-title">User Profile</h2>  {/* Centered heading */}
                <Card className="w-75" style={{ maxWidth: '600px' }}>  {/* Control width of the card */}
                    <Card.Body className="text-center">
                        <div className="mb-3">
                            <Image
                                src="https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
                                roundedCircle
                                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                alt="Profile Image"
                            />
                        </div>
                        <p><strong>Username:</strong> {user?.username}</p>
                        <p><strong>Email:</strong> {user?.email}</p>
                        <p><strong>Roles:</strong> {user?.roles.join(', ')}</p>

                        {message && <Alert variant="success">{message}</Alert>}
                        {error && <Alert variant="danger">{error}</Alert>}

                        <Button
                            variant="danger"
                            className="mt-3"
                            onClick={deactivateAccount}
                            style={{ padding: '10px 20px' }}
                        >
                            Deactivate Account
                        </Button>
                        <Button
                            variant="secondary"
                            className="mt-3 ms-2"
                            onClick={handleLogout}
                            style={{ padding: '10px 20px' }}
                        >
                            Logout
                        </Button>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default UserProfile;
