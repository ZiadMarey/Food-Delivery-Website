import React from 'react'
import './signup-customer.css';
  
{/*changed it into a function*/}
function SignupCustomer () {
    return (
        <div className="body">
    
            <div className="bgimage-sc"></div>
            <div className="wrapper">
            <div className="formbox-signup">
            <h2>Create an account</h2>
            <p className="signin-text">Already have an account? <a href="customerlogin">Sign in</a></p>
            <form action="#">
                <div className="input-group">
                    <div className="input-box half-width">
                        <input type="text" required />
                        <label>First name</label>
                    </div>
                    <div className="input-box half-width">
                        <input type="text" required />
                        <label>Last name</label>
                    </div>
                </div>
                <div className="input-box full-width">
                    <input type="email" required />
                    <label>Email</label>
                </div>
                <div className="input-group">
                    <div className="input-box half-width">
                        <input type="text" required />
                        <label>Address</label>
                    </div>
                    <div className="input-box half-width">
                        <input type="text" required />
                        <label>Post code</label>
                    </div>
                </div>
                <div className="input-group">
                    <div className="input-box half-width">
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

export default SignupCustomer;