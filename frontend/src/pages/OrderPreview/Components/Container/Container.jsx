import Card from '../Cards/Item_Card.jsx';
import NotesCard from '../Cards/Notes_Card.jsx';
import TotalCard from '../Cards/Total_Card.jsx';

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './preview-container.css';

function Container() {
    const [cards, setCards] = useState([]);

    const addCard = () => {
        setCards([...cards, { id: cards.length + 1 }]);
    };

    const removeCard = (id) => {
        setCards(cards.filter((card) => card.id !== id));
    };

    const containerHeight = cards.length > 1 ? (cards.length - 1) : 1;
    // this line records the number of cards present above 1, because 1 is the default amount of cards in the container

    useEffect(() => {
        // Fetch cart items when the component mounts
        fetch("http://127.0.0.1:5000/get_cart_items")
            .then(response => response.json())
            .then(data => {
                console.log("Fetched Cart Items:", data.cart_items);
                // updating the state with the fetched data
                setCards(data.cart_items || []);
            })
            .catch(error => {
                console.error("Error fetching cart items:", error);
            });
    }, []);

    useEffect(() => {
        return () => {
            setCards([]); // Empty the cart when this component unmounts

            fetch("http://127.0.0.1:5000/reset_cart", { method: "POST" })
                .then(response => response.json())
                .then(data => console.log("Cart reset successfully"))
                .catch(error => console.error("Error resetting cart:", error));
        };
    }, []);

    const handleSubmitOrder = () => {
        const totalPrice = cards.reduce((sum, card) => {
            return sum + (parseFloat(card.food_price) * card.quantity); // Calculate price * quantity for each item
        }, 0);

        const orderData = {
            customerName: "John Doe",
            customerAddress: "123 Main St, City",
            totalPrice: totalPrice,
            restaurantName: cards[0]?.restaurant_name || "Unknown"
        };
        console.log("Order Data Sent to Backend:", orderData);

        fetch("http://127.0.0.1:5000/submit_order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === "Order submitted successfully") {
                    console.log("Order submitted successfully:", data);
                }
            })
            .catch(error => {
                console.error("Error submitting order:", error);
            });
    };

    return (
        <div
            className='container'
            style={{
                height: `${containerHeight * 16.2 + 95}vh`, // This line adjusts the height of the container according to the number of cards present in it, the default amount of cards here is 2
            }}
        >
            <p className='orderPreview-text'>Order Preview</p>

            {cards.map((card) => (
                <Card
                    key={card.id}
                    id={card.id}
                    name={card.food_name}
                    quantity={card.quantity}
                    price={parseFloat(card.food_price)}
                    restaurantName={card.restaurant_name}
                    removeCard={removeCard}
                />
            ))}
            <NotesCard />
            <TotalCard />

            <Link to="/" className='cancel-button'>
                Cancel and Return to Main Menu
            </Link>
            <button className='submit-button' onClick={handleSubmitOrder}>
                Submit Order
            </button>
        </div>
    );
}

export default Container;
