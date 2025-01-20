import React, {useState} from 'react'
import './signup-restaurant.css';
import {useNavigate} from "react-router-dom";
import MainHeaderPlain from '../../Componenets/New_Header_Plain/new-header-plain';



  
function SignupRestaurant() {

    const [formData, setFormData] = useState({
        restaurantName: '',
        email: '',
        address: '',
        postalCode: '',
        password: '',
        confirmpassword: ''
    });

    const [errormsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { restaurantName, email, address, postalCode, password, confirmpassword } = formData;
        if (password !== confirmpassword) {
            setErrorMsg('Passwords do not match!');
        } else {
            setErrorMsg('');
            const data = {
                restaurantName,
                email,
                address,
                postalCode,
                password
            }
            const url = "http://127.0.0.1:5000/register_restaurant"
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            };
            
            try {
                const response = await fetch(url, options);
                const responseData = await response.json();

                if (response.status !== 201 && response.status !== 200) {
                    alert(responseData.message);
                } else {
                    console.log('Form submitted successfully');
                    // Save restaurantID and navigate
                    navigate("/restaurant_details", { state: { restaurantID: responseData.restaurantId } });
                }
            } catch (error) {
                console.error("Error during form submission:", error);
                alert("An error occurred. Please try again.");
            }
        }

    };

    return (
        <>
        <MainHeaderPlain />
        <div className="signup-restaurant-page">
    
            
            <div className="wrapper-sr">
            <div className="formbox-signup">
            <h2>Create an account</h2>
            <p className="signin-text-sr">Already have an account? <a href="/loginres">Sign in</a></p>
           
            <form onSubmit={handleSubmit}>
                <div className="input-group-sr">
                    <div className="input-box full-width">
                        <input type="text" name="restaurantName" value={formData.restaurantName} onChange={handleInputChange} required/>
                        <label>Restaurant name</label>
                    </div>
                    
                </div>
                <div className="input-box full-width">
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                    <label>Email</label>
                </div>
                <div className="input-group-sr">
                    <div className="input-box half-width">
                        <input type="text" name="address" value={formData.address} onChange={handleInputChange} required />
                        <label>Address</label>
                    </div>
                    <div className="input-box half-width">
                        <input type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} required />
                        <label>Post code</label>
                    </div>
                </div>
                <div className="input-group-sr">
                    <div className="input-box half-width">
                        <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
                        <label>Create password</label>
                    </div>
                    <div className="input-box half-width">
                        <input type="password" name="confirmpassword" value={formData.confirmpassword} onChange={handleInputChange} required />
                        <label>Confirm password</label>
                    </div>
                    
                </div>
                {errormsg && <p className="error-message-res">{errormsg}</p>}
                
                <button type="submit" className="signup-button" >Sign up</button>

                </form>
                    
                </div>
            </div>
        

        </div>
    </>
    );
};

export default SignupRestaurant;