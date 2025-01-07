import React, {useState} from 'react'
import './signup-restaurant.css';
import {useNavigate} from "react-router-dom";
  
{/*checks if passwords match*/}
function SignupRestaurant () {
    console.log("SignupRestaurant Component Rendered");
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [errormsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); 
        if (password !== confirmpassword) {setErrorMsg('Passwords do not match.');} 
        else {
          setErrorMsg(''); 
          console.log('Form submitted successfully');
          e.target.submit(); 

          navigate("/");
        }
      };

    return (
        <div className="body">
    
            <div className="bgimage-sr"></div>
            <div className="wrapper-sr">
            <div className="formbox-signup">
            <h2>Create an account</h2>
            <p className="signin-text-sr">Already have an account? <a href="/loginres">Sign in</a></p>
            <form onSubmit={handleSubmit}>
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
                        <input type="password" id="pass1" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <label>Create password</label>
                    </div>
                    <div className="input-box half-width">
                        <input type="password" id="pass2" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        <label>Confirm password</label>
                    </div>
                    
                </div>
                {errormsg && <p className="error-message-res">{errormsg}</p>}
                <button type="submit" className="signup-button" >Sign up</button>
                </form>
                
            </div>
        </div>
    

    </div>

    );
};

export default SignupRestaurant;