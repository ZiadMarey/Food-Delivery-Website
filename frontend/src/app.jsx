import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
import RestaurantMenu from "./pages/RestaurantMenu/rest-menu.jsx";
import LoginCustomer from "./pages/LoginForms/LoginCustomer/login-customer.jsx"
import LoginRestaurant from "./pages/LoginForms/LoginRestaurant/login-restaurant.jsx"
import RestaurantDetails from "./pages/SignupForms/restaurant_details.jsx";
import StartPage from "./pages/Start/start.jsx";
import PlainUserProfile from "./pages/UserProfilePage_Plain/profile-page.jsx"
import LieferspatzPage from "./pages/LieferspatzPage/lieferspatz.jsx";

function App() {  
  console.log('App rendered');
  return (
    <Router>
      
      <MainHeader />

      <Routes>        
        <Route path="/" element={<StartPage/>} />
        
        <Route path= "/homepage" element={<HomePage/>} />
        <Route path="/logincustomer" element={<LoginCustomer/>} />
        <Route path="/loginrestaurant" element={<LoginRestaurant/>} />
        <Route path="/userorderhist" element={<UserOrderPage />} />

        <Route path="/restorders" element={<RestOrderPage />} />
        <Route path="/restprofile" element={<RestaurantProfilePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/userprofileplain" element={<PlainUserProfile />} />
        <Route path="/lieferspatzpage" element={<LieferspatzPage />} />
        
        <Route path="/restaurant/:restName" element={<RestaurantPage />} />
        <Route path="/userorderpreview" element={<UserOrderPreview />} />
        <Route path="/historyorderpreview" element={<HistoryOrderPreview />} />
        <Route path="/restaurantmenu" element={<RestaurantMenu/>} />
        
        <Route path="/signupres" element={<SignupRestaurant/>}/>
        <Route path="/restaurant_details" element={<RestaurantDetails/>}/>
        <Route path="/signupcus" element={<SignupCustomer/>}/>

        <Route path="/logincus" element={<LoginCustomer/>} />
        <Route path="/loginres" element={<LoginRestaurant/>} />

      </Routes>
    </Router>

  );
}
export default App;
