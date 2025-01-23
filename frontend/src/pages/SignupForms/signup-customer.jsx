import React, { useState } from 'react';
import './signup-customer.css';
import { useNavigate, Link } from "react-router-dom";
import MainHeaderPlain from '../../Componenets/New_Header_Plain/new-header-plain';

function SignupCustomer() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
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

        const { firstName, lastName, email, address, postalCode, password, confirmpassword } = formData;
        if (password !== confirmpassword) {
            setErrorMsg('Passwords do not match!');
        } else {
            setErrorMsg('');
            const data = {
                firstName,
                lastName,
                email,
                address,
                postalCode,
                password
            }
            const url = "http://127.0.0.1:5000/register_customer"
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
            const response = await fetch(url, options)
            if (response.status !== 201 && response.status !== 200) {
                const data = await response.json()
                alert(data.message)
            } else {
                console.log('Form submitted successfully');
            }
            navigate("/logincus");
        }
    };

    return (
        <>
            <MainHeaderPlain />
            <div className="signup-customer-page">
                
                <div className="wrapper">
                        <h2>Create an account</h2>
                        <p className="signin-text">
                            Already have an account? <Link to="/logincus">Sign in</Link>
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <div className="input-box">
                                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                                    <label>First name</label>
                                </div>
                                <div className="input-box">
                                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                                    <label>Last name</label>
                                </div>
                            </div>
                            <div className="input-box">
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                                <label>Email</label>
                            </div>
                            <div className="input-group">
                                <div className="input-box">
                                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} required />
                                    <label>Address</label>
                                </div>
                                <div className="input-box">
                                    <input type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} required />
                                    <label>Post code</label>
                                </div>
                            </div>
                            <div className="input-group">
                                <div className="input-box">
                                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
                                    <label>Create password</label>
                                </div>
                                <div className="input-box">
                                    <input type="password" name="confirmpassword" value={formData.confirmpassword} onChange={handleInputChange} required />
                                    <label>Confirm password</label>
                                </div>
                            </div>
                            {errormsg && <p className="error-message" aria-live="assertive">{errormsg}</p>}
                            <button type="submit" className="signup-button">Sign up</button>
                        </form>
                    </div>
                
            </div>
        </>
    );
}

export default SignupCustomer;