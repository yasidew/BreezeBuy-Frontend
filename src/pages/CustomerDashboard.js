import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/CustomerDashboard.css"
import { FaStar, FaComment, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import SideNav from '../components/sidenav';

const CustomerDashboard = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [vendors, setVendors] = useState([]);
    const [visibleComments, setVisibleComments] = useState({}); 
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const BEST_VENDOR_THRESHOLD = 3.5;
    const MINIMUM_COMMENTS = 7;

    useEffect(() => {
        const fetchCustomerFeedbacks = async () => {
            try {
                const response = await axios.get('/api/Vendor/customer/feedbacks', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, 
                    },
                });
                setFeedbacks(response.data);
            } catch (err) {
                setError('Error fetching feedbacks');
            } finally {
                setLoading(false);
            }
        };

        const fetchVendorDetails = async () => {
            try {
                const vendorResponse = await axios.get('/api/Vendor/sorted-vendors'); // Fetching all vendors
                setVendors(vendorResponse.data);
            } catch (err) {
                setError('Error fetching feedbacks');
            } finally {
                setLoading(false);
            }
        }

        fetchCustomerFeedbacks();
        fetchVendorDetails();
    }, []);

    console.log(vendors)

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
    
    return (
        <div className="dashboard-container">
            <SideNav />
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
                            <h5 className="card-title">Name: {vendor.name}
                                {(vendor.averageRating > BEST_VENDOR_THRESHOLD && vendor.comments.length > MINIMUM_COMMENTS) && (
                                    <span className="badge badge-success ml-2">Best Vendor</span> // Display "Best Vendor" tag
                                )}
                            </h5>
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
                                        <li key={index} className="comment-item">
                                            <div className="comment-section">
                                                <FaComment className="icon" /> {comment.commentText}
                                            </div>
                                            <div className="star-section">
                                                {[...Array(comment.rank)].map((_, i) => <FaStar key={i} className="star-icon" />)}
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
