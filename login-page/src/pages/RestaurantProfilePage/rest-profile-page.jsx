import './rest-profile-page.css'; 
import UserIcon from "./assets/profilePlaceholder.svg";


function RestaurantProfilePage() {
  return (
    <div className="profile-page-container">
      <div className="profile-image-container">
      <img src={UserIcon} alt="User Icon" className="profile-image" />
      
      </div>

      <div className="restaurant-details">
        <p className="rest-name">Restaurant Name</p>
        <p className="account-balance">Account Balance: </p>
      </div>

      <div className="buttons-container">
        <button className="menu-button">Go to Menu</button>
        <button className="orders-button">Go to Orders</button>
      </div>
    </div>
  );
}

export default RestaurantProfilePage;
