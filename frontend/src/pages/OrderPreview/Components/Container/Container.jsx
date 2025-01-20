import Card from '../Cards/Item_Card.jsx';
import NotesCard from '../Cards/Notes_Card.jsx';
import TotalCard from '../Cards/Total_Card.jsx';

import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './preview-container.css';

function Container() {
    const [cards, setCards] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();
    
    const addCard = () => {
        setCards([...cards, { id: cards.length + 1 }]);
    };

    const containerHeight = cards.length > 1 ? (cards.length - 1) : 1;
    // this line records the number of cards present above 1, because 1 is the default amount of cards in the container
    // Load cart data from localStorage on component mount
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCards(storedCart);

        // Calculate the total price initially
        const initialTotal = storedCart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
        setTotalPrice(initialTotal);
    }, []);

    // Remove card from the cart
    const removeCard = (id) => {
        const updatedCards = cards.filter((card) => card.itemID !== id);
        setCards(updatedCards);
        localStorage.setItem('cart', JSON.stringify(updatedCards));

        // Update the total price
        const updatedTotal = updatedCards.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
        setTotalPrice(updatedTotal);
    };

    // Handle cancel button
    const handleCancel = () => {
        localStorage.removeItem('cart'); // Clear cart data
        navigate('/homepage'); // Redirect to homepage
    };
    

    const handleSubmitOrder = async () => {
        // Get cart data from localStorage
        const cart = JSON.parse(localStorage.getItem('cart'));
    
        // Validate cart data
        if (!cart || cart.length === 0) {
            alert('Your cart is empty. Please add items before placing an order.');
            return;
        }
    
        // Prepare the payload for the backend
        const payload = {
            restaurantID: cart[0].restID,
            orderItems: cart.map((item) => ({
                itemID: item.itemID,
                itemName: item.itemName,
                price: item.price,
                quantity: item.quantity,
            })),
            totalPrice: cart.reduce((total, item) => total + item.price * item.quantity, 0),
        };
    
        const token = localStorage.getItem('token'); // Get the user's token
    
        try {
            // Make a POST request to the backend to create the order
            const response = await fetch('http://127.0.0.1:5000/create_order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Pass the token for authentication
                },
                body: JSON.stringify(payload),
            });
    
            if (response.ok) {
                // If the request is successful, navigate to the order history page
                const data = await response.json();
                console.log('Order created successfully:', data);
                localStorage.removeItem('cart'); // Clear the cart after successful submission
                navigate('/userorderhist'); // Navigate to the user order history page
            } else {
                // Handle error response
                const error = await response.json();
                alert(`Failed to create order: ${error.message}`);
                console.error('Order creation error:', error);
            }
        } catch (error) {
            // Handle network or other errors
            alert('An error occurred while creating the order. Please try again.');
            console.error('Error:', error);
        }
    };

    return (
        <div
            className='container'
            style={{
                height: `${containerHeight * 16.2 + 95}vh`, // This line adjusts the height of the container according to the number of cards present in it, the default amount of cards here is 2
            }}
        >
            <p className='orderPreview-text'>Order Preview</p>
            

            {cards.length === 0 ? (
                <p className='empty-cart-message'>Your cart is empty. Add some items to place an order!</p>
            ) : (
                <>
                    {cards.map((card) => (
                        <Card
                            id={card.itemID}
                            name={card.itemName}
                            quantity={card.quantity}
                            price={parseFloat(card.price)}
                            restaurantName={card.restaurant_name}
                            removeCard={() => removeCard(card.itemID)}
                        />
                    ))}
                    <NotesCard />
                    <TotalCard totalPrice={totalPrice} />
                </>
            )}

            <button className='cancel-button' onClick={handleCancel}>
                Cancel and Return to Main Menu
            </button>
            <button className='submit-button' onClick={handleSubmitOrder} disabled={cards.length === 0}>
                Submit Order
            </button>
        </div>
    );
}

export default Container;
