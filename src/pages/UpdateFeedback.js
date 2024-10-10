import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/manageinventory.css';

const UpdateFeedback = () => {
    const { vendorId, commentId } = useParams(); // Extract vendorId and commentId from URL params
    const [commentText, setCommentText] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the existing comment to prepopulate the form
        const fetchComment = async () => {
            try {
                const response = await axios.get(`/api/Vendor/${vendorId}/feedback/${commentId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Use token from localStorage
                    },
                });
                setCommentText(response.data.commentText); // Assuming response contains commentText
            } catch (err) {
                setError('Error fetching the comment');
            } finally {
                setLoading(false);
            }
        };

        fetchComment();
    }, [vendorId, commentId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/Vendor/${vendorId}/feedback/${commentId}`,
                commentText, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            toast.success('Comment updated successfully!');
            navigate("/customer-dashboard")
        } catch (err) {
            setError('Error updating the comment');
            toast.error('Error updating the comment')
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container manage-inventory-page">
            <h2 className="page-title">Update Comment</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit} className="inventory-form">
                <div className="form-group">
                    <label htmlFor="commentText">Comment</label>
                    <textarea
                        id="commentText"
                        className="form-control"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        rows="4"
                        required
                    />
                </div>
                <div className="button-group">
                    <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
                        {loading ? 'Updating....' : 'Update Comment'}
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
    );
};

export default UpdateFeedback;