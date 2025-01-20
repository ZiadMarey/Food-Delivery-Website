import React, { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import './history-order-preview.css';
import CardContainer from './Components/Container/Container.jsx';

export const UserContext = createContext();

function OrderPreview() {
    const location = useLocation();
    const [orderData, setOrderData] = useState(null); // State to store order data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    const orderID = location.state?.orderID; // Access orderID from location state

    useEffect(() => {
        if (!orderID) {
            setError("Order ID is missing.");
            setLoading(false);
            return;
        }

        const fetchOrderData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/order_details/${orderID}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`, // Include auth token if required
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch order details");
                }

                const data = await response.json();
                setOrderData(data); // Update state with order details
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderData();
    }, [orderID]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="order-preview">
            {/* Provide order data via context */}
            <UserContext.Provider value={orderData}>
                <CardContainer />
            </UserContext.Provider>
        </div>
    );
}

export default OrderPreview;