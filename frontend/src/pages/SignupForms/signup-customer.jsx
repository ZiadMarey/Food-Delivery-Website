import React, {useState} from 'react'
import './signup-customer.css';
import { useNavigate, Link } from "react-router-dom";

{/*checks if passwords match*/}
function SignupCustomer () {

    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [errormsg, setErrorMsg] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault(); 
        if (password !== confirmpassword) {setErrorMsg('Passwords do not match!');} 
        else {
          setErrorMsg(''); 
          console.log('Form submitted successfully');
          
          e.target.submit(); 
          navigate("/");
        }
      };

    return (
        <div className="body">
    
            <div className="bgimage-sc"></div>
            <div className="wrapper">
            <div className="formbox-signup">
            <h2>Create an account</h2>
            <p className="signin-text">Already have an account? <Link to="/logincus">Sign in</Link> </p>
            <form onSubmit={handleSubmit}>
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
                        <input type="password" id="pass1" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <label>Create password</label>
                    </div>
                    <div className="input-box half-width">
                        <input type="password" id="pass2" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        <label>Confirm password</label>
                    </div>
                    
                </div>
                {errormsg && <p className="error-message">{errormsg}</p>}
                <button type="submit" className="signup-button" >Sign up</button>
                </form>
                
            </div>
        </div>
    

    </div>

    );
};

export default SignupCustomer;