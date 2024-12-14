import React from 'react'
import './signup-customer.css';
  

export const signupcustomer = () => {
    return (
        <div className="body">
    
            <div class="bgimage-sc"></div>
            <div class="wrapper">
            <div class="formbox-signup">
            <h2>Create an account</h2>
            <p class="signin-text">Already have an account? <a href="customerlogin">Sign in</a></p>
            <form action="#">
                <div class="input-group">
                    <div class="input-box half-width">
                        <input type="text" required />
                        <label>First name</label>
                    </div>
                    <div class="input-box half-width">
                        <input type="text" required />
                        <label>Last name</label>
                    </div>
                </div>
                <div class="input-box full-width">
                    <input type="email" required />
                    <label>Email</label>
                </div>
                <div class="input-group">
                    <div class="input-box half-width">
                        <input type="text" required />
                        <label>Address</label>
                    </div>
                    <div class="input-box half-width">
                        <input type="text" required />
                        <label>Post code</label>
                    </div>
                </div>
                <div class="input-group">
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

export default signupcustomer;