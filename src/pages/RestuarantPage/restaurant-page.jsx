import React from "react";
import ItemsCard from "./ItemComponents/items";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./restaurant-page.css";
import rest from "./assets/italian.jpg";
import HP_Card from "../../Componenets/HomePage_Card/hp-card";

function RestaurantPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const {restName, restDescription, openHours, closeHours} = location.state;

  const handleProceedToOverview = () => {
    // Pass the cart data to the OrderPreview page
    navigate("/userorderpreview");
  };
 
  
  return (
    <>
      <div className="restaurant-label">
        <img src={rest} alt="" className = "rest-img"/>
        <h1 className="restaurant-name">{restName}</h1>
        <p className="opening-hour-desc">
          Opening Hours: {openHours}:00 - {closeHours}:00
          <br />
          {restDescription}
        </p>
      </div>

      <div className="menu-section">
        <h2>Menu</h2>
      </div>

      <div className="grid-container">

      <ItemsCard itemName="Cheese Burger" price={9.99} />
      <ItemsCard itemName="Cheese Burger" price={9.99} />
      <ItemsCard itemName="Cheese Burger" price={9.99} />
      <ItemsCard itemName="Cheese Burger" price={9.99} />

      </div>

      <button className="checkout-button" onClick={handleProceedToOverview}>
        Proceed to overview
      </button>

    </>
  );
}

export default RestaurantPage;
