import Card from "./Components/HomePage_Card/hp-card.jsx";
import React, { useState, useEffect } from "react";
import "./home-page.css";
import MainHeader from "../../Componenets/New_Header/new-header.jsx";

function HomePage() {

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch restaurants data from the API
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/homepage", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch restaurants.");
        }

        const data = await response.json();
        setRestaurants(data.restaurants);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) {
    return <p>Loading restaurants...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  
  return (
    <>
      <MainHeader />
      <div className="home-page">


        {/* add zipcode to display which area*/}
        <p className="restArea"> Restaurants in your area </p>
        <div className="card-pool">
          {restaurants.map((restaurant) => (
            <Card
              restID={restaurant.id}
              restName={restaurant.restaurantName}
              restDescription={restaurant.description}
              openHours={restaurant.openingHours[0]?.openingTime || "N/A"}
              closeHours={restaurant.openingHours[0]?.closingTime || "N/A"}
            />
          ))}
        </div>
      </div>
    </>
  );
}
export default HomePage;
