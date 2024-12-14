import React from "react";
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

function App() {
 
  console.log('App rendered');
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
        {/* changed path to accept dynamic parameter*/}
        <Route path="/restaurant/:restName" element={<RestaurantPage />} />
        <Route path="/userorderpreview" element={<UserOrderPreview />} />
        <Route path="/historyorderpreview" element={<HistoryOrderPreview />} />
      </Routes>
    </Router>
    // <HistoryOrderPreview />
  );
}

export default App;
