import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../history-order-preview.jsx';
import ItemCard from '../Cards/Item_Card.jsx';
import NotesCard from '../Cards/Notes_Card.jsx';
import TotalCard from '../Cards/Total_Card.jsx';
import './history-container.css';

function Container() {
    // Access the order data from context
    const orderData = useContext(UserContext);
    const { restaurantName, items, totalPrice } = orderData;

    // State to hold the user type (e.g., 'customer' or 'restaurant')
    const [userType, setUserType] = useState(null);

    // Fetch user type from the backend when the component mounts
    useEffect(() => {
        const fetchUserType = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/get-user-type", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`, // Include the JWT token
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user type");
                }

                const data = await response.json();
                setUserType(data.userType); // Store user type in state
            } catch (error) {
                console.error("Error fetching user type:", error);
            }
        };

        fetchUserType();
    }, []);

    // Dynamically calculate container height based on the number of order items
    const containerHeight = items?.length > 2 ? (items.length - 2) * 16.2 + 105 : 105;

    return (
        <div
            className="container"
            style={{
                height: `${containerHeight}vh`,
            }}
        >
            <p className="order-preview-text">Order Preview</p>
            <p className="rest-title">{restaurantName}</p>

            {/* Dynamically render an ItemCard for each item in the order */}
            {items.map((item, index) => (
                <ItemCard
                    key={index}
                    name={item.foodName}
                    quantity={item.quantity}
                    price={item.priceAtOrder}
                />
            ))}

            <NotesCard />
            <TotalCard total={totalPrice} /> {/* Pass total price to TotalCard */}

            {/* Conditionally render the return button based on the user type */}
            {userType && (
                <Link 
                    to={userType === "customer" ? "/userorderhist" : "/restorders"} 
                    className="return-button"
                >
                    <p className="return-text">Return</p>
                </Link>
            )}
        </div>
    );
}

export default Container;