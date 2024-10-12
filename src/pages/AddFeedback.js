import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/manageinventory.css';
import { toast } from 'react-toastify';

const AddFeedback = () => {
    const [commentText, setCommentText] = useState('');
    const [rank, setRank] = useState(1); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [userDetails, setUserDetails] = useState(null);
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const { vendorId } = useParams();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const userResponse = await fetch('/Auth/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!userResponse.ok) {
                    throw new Error('Failed to fetch user details');
                }

                const userData = await userResponse.json();
                setUserDetails(userData);

            } catch (error) {
                console.error(error);
            }
        };

        fetchUserDetails();
    }, []);

    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        let customerId = userDetails.userId

        try {
            // Assuming the token is stored in localStorage
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `/api/Vendor/${vendorId}/feedback`,
                {
                    customerId,
                    commentText,
                    rank,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setSuccess(response.data.message);
            toast.success('Comment added successfully!');
            navigate("/customer-dashboard")
            setRank(1); // Reset the form after successful submission
        } catch (err) {
            setError('Error submitting feedback');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="container manage-inventory-page">
            <h2 className="page-title">Add Feedback</h2>
            <div className="">
                <div className="">
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}
                    <form onSubmit={handleFeedbackSubmit} className="inventory-form">
                        <div className="form-group">
                            <label htmlFor="commentText">Comment</label>
                            <textarea
                                id="commentText"
                                className="form-control"
                                rows="4"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="rank">Rating</label>
                            <select
                                id="rank"
                                className="form-control"
                                value={rank}
                                onChange={(e) => setRank(e.target.value)}
                                required
                            >
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="button-group">
                            <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
                                {loading ? 'Submitting...' : 'Submit Feedback'}
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary back-btn"
                                onClick={() => navigate(-1)} // Navigate back
                            >
                                Back
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddFeedback;