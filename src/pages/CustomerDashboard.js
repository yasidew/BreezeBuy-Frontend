import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/CustomerDashboard.css"
import { FaStar, FaComment, FaAngleDown, FaAngleUp } from 'react-icons/fa';

const CustomerDashboard = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [vendors, setVendors] = useState([]);
    const [visibleComments, setVisibleComments] = useState({}); // Track visible comments for each vendor
    const [error, setError] = useState('');
    const navigate = useNavigate();

    console.log(feedbacks)

    useEffect(() => {
        const fetchCustomerFeedbacks = async () => {
            try {
                const response = await axios.get('https://localhost:7260/api/Vendor/customer/feedbacks', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming the token is stored in localStorage
                    },
                });
                setFeedbacks(response.data);
                const vendorResponse = await axios.get('https://localhost:7260/api/vendor'); // Fetching all vendors
                setVendors(vendorResponse.data);
            } catch (err) {
                setError('Error fetching feedbacks');
            } finally {
                setLoading(false);
            }
        };

        fetchCustomerFeedbacks();
    }, []);

    const handleEditComment = (vendorId, commentId) => {
        navigate(`/vendor/${vendorId}/feedback/edit/${commentId}`);
    };

    const handleAddComment = (vendorId) => {
        navigate(`/comment/${vendorId}`)
    };

    const toggleComments = (vendorId) => {
        // Toggle the visibility of the comments for the specific vendor
        setVisibleComments(prevState => ({
            ...prevState,
            [vendorId]: !prevState[vendorId]
        }));
    };

    if (loading) {
        return <div className="text-center py-5">Loading...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="dashboard-container">
            <div className="feedback-section">
                <h2 className="mb-4">Your Feedbacks</h2>
                {feedbacks.map(feedback => (
                    <div key={feedback.id} className="card feedback-card">
                        <div className="card-body">
                            <h5 className="card-title">Vendor: {feedback.vendorName}</h5>
                            <p className="card-text">Product: {feedback.vendorProduct}</p>
                            <p className="card-text">Comment: {feedback.commentText}</p>
                            <p className="card-text rating">
                                {[...Array(feedback.rank)].map((_, i) => <FaStar key={i} />)}
                            </p>
                            <button className="btn btn-outline-primary" onClick={() => handleEditComment(feedback.vendorId, feedback.commentId)}>Edit Comment</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="vendor-section">
                <h2 className="mb-4">All Vendors</h2>
                {vendors.map(vendor => (
                    <div key={vendor.id} className="card vendor-card">
                        <div className="card-body">
                            <h5 className="card-title">Name: {vendor.name}</h5>
                            <p className="card-text">Product: {vendor.product}</p>

                            <button className="btn" onClick={() => toggleComments(vendor.id)}>
                                {visibleComments[vendor.id] ? (
                                    <>
                                        <FaAngleUp />
                                    </>
                                ) : (
                                    <>
                                        <FaAngleDown />
                                    </>
                                )}
                            </button>


                            {visibleComments[vendor.id] && (
                                <ul className="comment-list mt-3">
                                    {vendor.comments.map((comment, index) => (
                                        <li key={index}>
                                            <div className="comment-section">
                                                <FaComment className="icon" /> {comment.commentText}
                                            </div>
                                            <div className="star-section">
                                                {[...Array(comment.rank)].map((_, i) => <FaStar key={i} />)}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <button className="btn btn-outline-secondary mt-3" onClick={() => handleAddComment(vendor.id)}>Add Comment</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomerDashboard;
