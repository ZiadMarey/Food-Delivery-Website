import React from 'react'
import './signup-restaurant.css';
  
{/*changed it into a function*/}
function SignupRestaurant () {
    console.log("SignupRestaurant Component Rendered");


    return (



        <div className="body">
    
            <div className="bgimage-sr"></div>
            <div className="wrapper-sr">
            <div className="formbox-signup">
            <h2>Create an account</h2>
            <p className="signin-text-sr">Already have an account? <a href="restaurantlogin">Sign in</a></p>
            <form action="#">
                <div className="input-group-sr">
                    <div className="input-box full-width">
                        <input type="text" required />
                        <label>Restaurant name</label>
                    </div>
                    
                </div>
                <div className="input-box full-width">
                    <input type="email" required />
                    <label>Email</label>
                </div>
                <div className="input-group-sr">
                    <div className="input-box half-width">
                        <input type="text" required />
                        <label>Address</label>
                    </div>
                    <div className="input-box half-width">
                        <input type="text" required />
                        <label>Post code</label>
                    </div>
                </div>
                <div className="input-group-sr">
                    <div classNames="input-box half-width">
                        <input type="password" id="pass1" required />
                        <label>Create password</label>
                    </div>
                    <div className="input-box half-width">
                        <input type="password" id="pass2" required />
                        <label>Confirm password</label>
                    </div>
                    
                </div>
                <button type="submit" className="signup-button" >Sign up</button>
                </form>
                
            </div>
        </div>
    

    </div>

    );
};

export default SignupRestaurant;