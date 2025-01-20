import './rest-profile-page1.css'; 
import UserIcon from "./assets/profilePlaceholder2.svg";
import { useNavigate, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import MainHeader from '../../Componenets/New_Header/new-header';


function RestaurantProfilePage() {
  // State to store profile data
    const [profile, setProfile] = useState({
      "restaurantName": "",
      "address": "",
      "postalCode": "",
      "accountBalance": 0,
    });
  
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
  
    // Fetch profile data from backend
    useEffect(() => {
      const fetchProfile = async () => {
        if (!token) {
          alert("Unauthorized. Please log in.");
          navigate("/loginrestaurant");
          return;
        }
  
        try {
          const response = await fetch("http://127.0.0.1:5000/profile", {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          });
  
          if (response.status === 401) {
            alert("Session expired. Please log in again.");
            localStorage.removeItem("token");
            navigate("/logincustomer");
            return;
          }
  
          if (!response.ok) {
            throw new Error("Failed to fetch profile data");
          }
  
          const data = await response.json();
          setProfile({
            restaurantName: data.restaurantName || "",
            email: data.email || "",
            address: data.address || "",
            postalCode: data.postalCode || "",
            accountBalance: data.accountBalance || 0,
          });

  
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };
  
      fetchProfile();
    }, [navigate, token]);

    const handleLogout = async () => {
      if (!token) {
        alert("You are not logged in.");
        navigate("/logincustomer");
        return;
      }
  
      try {
        const response = await fetch("http://127.0.0.1:5000/logout", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
  
        if (response.status === 401) {
          alert("Session expired. Please log in again.");
        } else if (!response.ok) {
          throw new Error("Logout failed.");
        }
  
        localStorage.removeItem("token");
        navigate("/loginrestaurant");
      } catch (error) {
        alert(`An error occurred: ${error.message}`);
      }
    };
  
    if (loading) {
      return <p>Loading profile...</p>;
    }
  
    if (error) {
      return <p>Error loading profile: {error}</p>;
    }

    return (
      <>
      <MainHeader />
      <div className="center-wrapper">
        <div className="profile-page-container">
          <div className="profile-image-container">
            <img src={UserIcon} alt="User Icon" className="profile-image" />
          </div>
          <div className="restaurant-details">
            <p className="rest-name">{profile.restaurantName}</p>
            <p className="account-balance">Account Balance: {profile.accountBalance}</p>
          </div>
  
          <div className="buttons-container">
            <button 
              className="menu-button" 
              onClick={() => navigate("/restaurantmenu")}
            >
              Go to Menu
            </button>
            <button 
              className="orders-button" 
              onClick={() => navigate("/restorders")}
            >
              Go to Orders
            </button>


            <button 
              className='res-logout-button' onClick={handleLogout}
            >
              Logout
            </button>

          </div>
        </div>
      </div>
      </>
    );
}

export default RestaurantProfilePage;
