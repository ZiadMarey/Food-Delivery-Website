import React, { useState } from "react";
import "./Orders_Rest_Box.css";
import { Link } from "react-router-dom";

function RestOrderCard({ orderID, restaurantName, orderDate, status, totalPrice }) {
    const [orderStatus, setOrderStatus] = useState(status); 
    const [isLoading, setIsLoading] = useState(false); 


    const updateOrderStatus = async (newStatus) => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://127.0.0.1:5000/update_order_status/${orderID}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            const data = await response.json();
            if (response.ok) {
                setOrderStatus(newStatus);
            } else {
                console.error(data.message || "Failed to update order status");
                alert(data.message || "Failed to update order status");
            }
        } catch (error) {
            console.error("Error updating order status:", error);
            alert("An error occurred while updating the order status. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="card-container">
            <div className="card-content">
                <div className="card-details">
                    <p className="customer-name">Order ID: {orderID}</p>
                    <p className="date-ordered">Order Date: {orderDate}</p>
                    <Link
                        to="/historyorderpreview"
                        className="view-details"
                        state={{ orderID }}
                    >
                        View order details
                    </Link>
                    <Link
                        to={`/userprofileplain/${orderID}`}
                        className="customer-profile-details"
                    >
                        <p className="view-details">View Customer Details</p>
                    </Link>
                </div>

                {orderStatus === "declined" && (
                    <div className="card-status">
                        <p>Status: <span className="status-text">Rejected</span></p>
                    </div>
                )}

                {orderStatus === "confirmed" && (
                    <>
                        <button
                            className="confirm1"
                            onClick={() => updateOrderStatus("completed")}
                            disabled={isLoading}
                        >
                            {isLoading ? "Completing..." : "Complete Order"}
                        </button>
                    </>
                )}

                {orderStatus === "completed" && (
                    <div className="card-status">
                        <p>Status: <span className="status-text">Completed</span></p>
                    </div>
                )}

                {/* Confirm/Reject Buttons */}
                {orderStatus === "pending" && (
                    <div className="confirm-reject">
                        <button
                            className="confirm"
                            onClick={() => updateOrderStatus("confirmed")}
                            disabled={isLoading}
                        >
                            {isLoading ? "Processing..." : "Confirm"}
                        </button>
                        <br />
                        <br />
                        <button
                            className="reject"
                            onClick={() => updateOrderStatus("declined")}
                            disabled={isLoading}
                        >
                            {isLoading ? "Processing..." : "Reject"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RestOrderCard;