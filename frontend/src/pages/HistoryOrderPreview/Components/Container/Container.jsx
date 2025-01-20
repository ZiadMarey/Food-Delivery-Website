import ItemCard from '../Cards/Item_Card.jsx';
import NotesCard from '../Cards/Notes_Card.jsx';
import TotalCard from '../Cards/Total_Card.jsx';
import './history-container.css';

import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../history-order-preview.jsx';

function Container() {
    // Access the order data from context
    const orderData = useContext(UserContext);

    // Destructure items and restaurant name from order data
    const { restaurantName, items, totalPrice } = orderData;

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
            <Link to="/userorderhist" className="return-button">
                <p className="return-text">Return</p>
            </Link>
        </div>
    );
}

export default Container;