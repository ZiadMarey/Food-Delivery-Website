import React from 'react'
import './login-customer.css';



export const logincustomer = () => {
  return (
    <div className="body1">
      
      <div className="bgimage-c"></div>
        <div className="wrapper-c">
         <div className="login-box-c">Login as Customer</div>
          <form action="#">
          <div className="input-box-c">
            <input type="email" id="email" required />
            <label>Email</label>
          </div>
          <div className="input-box-c">
            <input type="password" id="password" required />
            <label>Password</label>
          </div>
          <button type="submit" className="signin-button-c">Sign In</button>
          <div className="signup-text-c">
            Don't have an account? <a href="/customersignup">Sign Up</a>
          </div>
        </form>

      </div>
      
    </div>

  );
};
export default logincustomer;
