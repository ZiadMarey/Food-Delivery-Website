import React from 'react'
import './logincustomer.css';
import user_icon from '../Assets/profilePlaceholder.png'; // Corrected path
import logo from '../Assets/logoPlaceHolder.png';     


export const logincustomer = () => {
  return (
    <div className="body">
      <div className="mainHeader">
      <img src={logo} alt="Logo" class="header-icons" />
          <div className="title">
          
            <h2 class="website-name">Food Place</h2>
              
            
          </div>

          <div class="icon-container">
            <img src={user_icon} alt="User Icon" class="header-icons" /> 
             
        </div>


      </div>
      <div className="bgimage"></div>
        <div className="wrapper">
         <div className="login-box">Login as Customer</div>
          <form action="#">
          <div className="input-box">
            <input type="email" required />
            <label>Email</label>
          </div>
          <div className="input-box">
            <input type="password" id="password" required />
            <label>Password</label>
          </div>
          <button type="submit" className="signin-button">Sign In</button>
          <div className="signup-text">
            Don't have an account? <a href="signupc.html">Sign Up</a>
          </div>
        </form>
      

      </div>
      
    </div>

  );
};
export default logincustomer;
