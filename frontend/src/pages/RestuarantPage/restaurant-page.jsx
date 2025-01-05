import React from "react";
import ItemsCard from "./ItemComponents/items.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import "./restaurant-page.css";
import rest from "./assets/italian.jpg";

import ChinesePic from "./NewAssets/Chinese.jpg";
import ArabicPic from "./NewAssets/Arabic.png";
import AsianPic from "./NewAssets/Asian.jpg";
import JapanesePic from "./NewAssets/Japanese.jpg";
import JamaicanPic from "./NewAssets/Jamaican.jpg";
import IndianPic from "./NewAssets/Indian.jpg";
import MexicanPic from "./NewAssets/Mexican.jpg";
import BreakfastPic from "./NewAssets/Breakfast.png";
import VeganPic from "./NewAssets/Vegan.jpg";

function RestaurantPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { restName, restDescription, openHours, closeHours } = location.state;

  const handleProceedToOverview = () => {
    navigate("/userorderpreview");
  };

  

  const getRestaurantImage = () => {
    switch (restDescription) {
      case "Chinese":
        return ChinesePic;

      case "Arabic":
        return ArabicPic;


      case "Asian":
        return AsianPic;

      case "Japanese":
        return JapanesePic;

      case "Jamaican":

        return JamaicanPic;

      case "Indian":
        return IndianPic;

      case "Mexican":
        return MexicanPic;

      case "Breakfast":
        return BreakfastPic;

      case "Vegan":
        return VeganPic;

      default:
        return rest; // Default image incase 
    }
  };

  return (
    <>
      <div className="restaurant-label">
        <div className="restaurant-img">
          <img
            className="rest-image"
            src={getRestaurantImage()}
            alt={`${restDescription} Food Picture`}
          />
        </div>

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
        <ItemsCard itemName="Cheese Burger" itemType="Burger" price={9.99} />
        <ItemsCard itemName="Chicken Kebab" itemType="Kebab" price={13.99} />
        <ItemsCard itemName="Fish Ackee" itemType="Ackee" price={15.99} />
        <ItemsCard itemName="Green Smoothie" itemType="Smoothie" price={20.99} />
        
        
        
      </div>


      <button className="checkout-button" onClick={handleProceedToOverview}>
        Proceed to overview
      </button>
    </>
  );
}

export default RestaurantPage;
