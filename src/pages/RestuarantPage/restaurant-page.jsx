import React from "react";
import ItemsCard from "./Items/items";
import "./restaurantPage.css";
import rest from "./assets/rest.jpg";

function RestaurantPage() {
  return (
    <>
      <div className="restaurant-label">
        <img src={rest} alt="" className = "rest-img"/>
        <h1 className="restaurant-name">Restaurant Name</h1>
        <p className="opening-hour-desc">
          Opening Hours:
          <br />
          Description
        </p>
      </div>

      <div className="menu-section">
        <h2>Menu</h2>
      </div>

      <div className="grid-container">
        <ItemsCard />
        <ItemsCard />
        <ItemsCard />
        <ItemsCard />
      </div>

      <button className="checkout-button">
        Proceed to overview
      </button>

    </>
  );
}

export default RestaurantPage;
