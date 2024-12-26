import React from 'react'
import './login-restaurant.css';



export const LoginRestaurant = () => {
  return (
    <div className="body1">
      
      <div className="bgimage-1"></div>
        <div className="wrapper-r">
         <div className="login-box-r">Login as Business</div>
          <form action="#">
          <div className="input-box-r">
            <input type="email" id="email" required />
            <label>Email</label>
          </div>
          <div className="input-box-r">
            <input type="password" id="password" required />
            <label>Password</label>
          </div>
          <button type="submit" className="signin-button-r">Sign In</button>
          <div className="signup-text-r">
            Don't have an account? <a href="/signupres">Sign Up</a>
          </div>
        </form>

      </div>
      
    </div>

  );
};
export default LoginRestaurant;
