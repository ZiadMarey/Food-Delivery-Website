
import React, { useEffect, useState } from "react";
import ItemsCard from "./ItemComponents/items.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import "./restaurant-page.css";
import rest from "./assets/italian.jpg";
import MainHeader from "../../Componenets/New_Header/new-header.jsx";

import ChinesePic from "./NewAssets/Chinese.jpg";
import ArabicPic from "./NewAssets/Arabic.png";
import AsianPic from "./NewAssets/Asian.jpg";
import JapanesePic from "./NewAssets/Japanese.jpg";
import JamaicanPic from "./NewAssets/Jamaican.jpg";
import IndianPic from "./NewAssets/Indian.jpg";
import MexicanPic from "./NewAssets/Mexican.jpg";
import BreakfastPic from "./NewAssets/Breakfast.png";
import VeganPic from "./NewAssets/Vegan.jpg";
import TurkishPic from "../HomePage/Components/HomePage_Card/Components/Turkish.jpg";

function RestaurantPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const { restID, restName, restDescription, openHours, closeHours, restType } = location.state;

  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const handleProceedToOverview = () => {
    navigate("/userorderpreview");
  };

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/restaurant?restID=${restID}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch menu: ${response.statusText}`);
        }

        const data = await response.json();
        setMenu(data.menu);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMenu();
  }, [restID]);
  

  const getRestaurantImage = () => {
    switch (restType) {
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

      case "Turkish":
        return TurkishPic;

      default:
        return rest; // Default image incase 
    }
  };

  return (
    <>
      <MainHeader />
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
          Opening Hours: {openHours} - {closeHours}
          <br />
          {restDescription}
        </p>
      </div>

      <div className="menu-section">
        <h2>Menu</h2>
        {loading && <p>Loading menu...</p>}
        {error && <p>Error: {error}</p>}
      </div>

      <div className="grid-container">
      {menu.map((item) => (
          <ItemsCard
            itemID={item.id}
            itemName={item.foodName} 
            //itemType={item.type} // Add type if available in the backend response
            restID={restID}
            price={item.foodPrice}
            restaurantName={restName}
          />
        ))}
        
      </div>







      <button className="checkout-button" onClick={handleProceedToOverview}>
        Proceed to overview
      </button>
    </>
  );
}

export default RestaurantPage;
