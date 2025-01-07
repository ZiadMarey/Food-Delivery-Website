import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import StartMenu from './pages/Start/start.jsx';
import HomePage from './Pages/HomePage/home-page.jsx'
import MainHeader from "./Componenets/New_Header/new-header.jsx";
import ProfilePage from "./pages/UserProfilePage/profile-page.jsx";
import RestaurantPage from "./pages/RestuarantPage/restaurant-page.jsx";
import UserOrderPage from "./pages/OrdersUserPage/order-userpage.jsx";
import RestOrderPage from "./pages/OrdersRestPage/order-restpage.jsx";
import RestaurantProfilePage from "./pages/RestaurantProfilePage/rest-profile-page.jsx";
import UserOrderPreview from "./pages/OrderPreview/order-preview.jsx";
import HistoryOrderPreview from "./pages/HistoryOrderPreview/history-order-preview.jsx"
import SignupRestaurant from "./pages/SignupForms/signup-restaurant.jsx";
import SignupCustomer from "./pages/SignupForms/signup-customer.jsx";
import AddToMenu from "./pages/AddToMenu/add-to-menu.jsx";
import RestaurantMenu from "./pages/RestaurantMenu/rest-menu.jsx";

import LoginRestaurant from "./pages/LoginForms/LoginRestaurant/login-restaurant.jsx";
import LoginCustomer from "./pages/LoginForms/LoginCustomer/login-customer.jsx";

import StartPage from "./pages/Start/start.jsx";

function App() {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user_type, setUserType] = useState('restaurant'); 
  const [restaurantName, setRestaurantName] = useState(''); 
  const [restaurantAddress, setRestaurantAddress] = useState(''); 
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          user_type,
          restaurant_name: user_type === 'restaurant' ? restaurantName : '', 
          restaurant_address: user_type === 'restaurant' ? restaurantAddress : '', 
        }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      // Erfolgreiche Registrierung (z.B. Weiterleitung)
      console.log('Registration successful!');
      // window.location.href = '/login'; 

    } catch (error) {
      setErrorMessage('Registration failed. Please try again.');
    }
  };

  const [menu, setMenu] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentFood, setCurrentFood] = useState({})

  useEffect(() => {
    fetchMenu()
  }, [])

  const fetchMenu = async () => {
    const response = await fetch("http://127.0.0.1:5000/menu")
    const data = await response.json()
    setMenu(data.menu)
    //console.log(data.menu)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentFood({})
  }

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  const openEditModal = (food) => {
    if (isModalOpen) return
    setCurrentFood(food)
    setIsModalOpen(true)
  }

  const onUpdate = () => {
    closeModal()
    fetchMenu()
  }
 
  console.log('App rendered');
  return (
      <Router>
        {/* Main Header outside of Routes so it shows on all pages */}
        <MainHeader />

        <Routes>

          <Route path="/" element={<StartMenu />} />
          <Route path="/home" element={<HomePage />} />


          <Route path="/userorderhist" element={<UserOrderPage />} />
          <Route path="/restorders" element={<RestOrderPage />} />
          <Route path="/restprofile" element={<RestaurantProfilePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          {/* changed path to accept dynamic parameter*/}
          <Route path="/restaurant/:restName" element={<RestaurantPage />} />
          <Route path="/userorderpreview" element={<UserOrderPreview />} />
          <Route path="/historyorderpreview" element={<HistoryOrderPreview />} />


          <Route path="/signupres" element={<SignupRestaurant />}></Route>
          <Route path="/signupcus" element={<SignupCustomer />}></Route>
          {/* Routed login pages */}
          <Route path="/loginres" element={<LoginRestaurant />}></Route>
          <Route path="/logincus" element={<LoginCustomer />}></Route>


        </Routes>
      </Router>

  );
}

export default App;
