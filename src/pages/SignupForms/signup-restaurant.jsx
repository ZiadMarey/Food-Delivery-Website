import React from 'react'
import './signup-restaurant.css';
  

export const signuprestaurant = () => {
    return (
        <div className="body">
    
            <div class="bgimage-sr"></div>
            <div class="wrapper-sr">
            <div class="formbox-signup">
            <h2>Create an account</h2>
            <p class="signin-text-sr">Already have an account? <a href="restaurantlogin">Sign in</a></p>
            <form action="#">
                <div class="input-group-sr">
                    <div class="input-box full-width">
                        <input type="text" required />
                        <label>Restaurant name</label>
                    </div>
                    
                </div>
                <div class="input-box full-width">
                    <input type="email" required />
                    <label>Email</label>
                </div>
                <div class="input-group-sr">
                    <div class="input-box half-width">
                        <input type="text" required />
                        <label>Address</label>
                    </div>
                    <div class="input-box half-width">
                        <input type="text" required />
                        <label>Post code</label>
                    </div>
                </div>
                <div class="input-group-sr">
                    <div class="input-box half-width">
                        <input type="password" id="pass1" required />
                        <label>Create password</label>
                    </div>
                    <div class="input-box half-width">
                        <input type="password" id="pass2" required />
                        <label>Confirm password</label>
                    </div>
                    
                </div>
                <button type="submit" class="signup-button" onclick="checkP()">Sign up</button>
                </form>
                
            </div>
        </div>
    

    </div>

    );
};

export default signuprestaurant;