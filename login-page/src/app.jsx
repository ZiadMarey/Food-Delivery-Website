import HomePage from './pages/HomePage/home-page.jsx'

import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainHeader from "./Componenets/New_Header/new-header.jsx";
import ProfilePage from "./pages/UserProfilePage/profile-page.jsx";
import RestaurantPage from "./pages/RestuarantPage/restaurant-page.jsx";
import UserOrderPage from "./pages/OrdersUserPage/order-userpage.jsx";
import RestOrderPage from "./pages/OrdersRestPage/order-restpage.jsx";
import RestaurantProfilePage from "./pages/RestaurantProfilePage/rest-profile-page.jsx";
import CustomerLoginPage from "./pages/LoginForms/LoginCustomer/login-customer.jsx";
import RestaurantLoginPage from "./pages/LoginForms/LoginRestaurant/login-restaurant.jsx";
import CustomerSignupPage from "./pages/SignupForms/signup-customer.jsx"
import RestaurantSignupPage from "./pages/SignupForms/signup-restaurant.jsx"

function App() {
  return (
    <Router>
      {/* Main Header outside of Routes so it shows on all pages */}
      <MainHeader />

      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/userorderhist" element={<UserOrderPage />} />
        <Route path="/restorders" element={<RestOrderPage />} />
        <Route path="/restprofile" element={<RestaurantProfilePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/restaurantpage" element={<RestaurantPage />} />
        <Route path="/customerlogin" element={<CustomerLoginPage />} />
        <Route path="/restaurantlogin" element={<RestaurantLoginPage />} />
        <Route path="/customersignup" element={<CustomerSignupPage />} />
        <Route path="/restaurantsignup" element={<RestaurantSignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
