import React, { useState } from 'react';
import './restaurant_details.css'; // Use the updated CSS
import { useNavigate, Link, useLocation } from "react-router-dom";
import MainHeaderPlain from '../../Componenets/New_Header_Plain/new-header-plain';

function RestaurantDetails() {
    const location = useLocation();
    const { restaurantID } = location.state; // Get restaurantID from state

    const [formData, setFormData] = useState({
        description: '',
        openingHours: '',
        closingHours: '',
        restaurantType:'',
        zipCodes: [''], 
    });

    const [errormsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleZipCodeChange = (index, value) => {
        const newZipCodes = [...formData.zipCodes];
        newZipCodes[index] = value;
        setFormData({ ...formData, zipCodes: newZipCodes });
    };

    const addZipCodeField = () => {
        setFormData({ ...formData, zipCodes: [...formData.zipCodes, ''] });
    };

    const removeZipCodeField = (index) => {
        const newZipCodes = formData.zipCodes.filter((_, i) => i !== index);
        setFormData({ ...formData, zipCodes: newZipCodes });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { description, openingHours, closingHours, restaurantType, zipCodes } = formData;

       
        if (!description || !openingHours || !closingHours || zipCodes.some(zip => zip === '')) {
            setErrorMsg('Please fill all fields including valid zip codes!');
            return;
        }

        setErrorMsg('');

    
        const data = {
            restaurantID,
            description,
            openingHours,
            closingHours,
            restaurantType,
            zipCodes
        };

        const url = "http://127.0.0.1:5000/register_restaurant_details";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        try {
            const response = await fetch(url, options);
            const responseData = await response.json();

            if (response.status !== 201 && response.status !== 200) {
                alert(responseData.message);
            } else {
                console.log('Restaurant details submitted successfully');
                localStorage.removeItem("token");
                navigate("/loginres");
            }
        } catch (error) {
            console.error("Error during form submission:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <>
            <MainHeaderPlain />
            <div className="details-restaurant-page">
                
                <div className="wrapper">

                        <h2>Give your restaurant details</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="input-box">
                                <label htmlFor="description">Restaurant Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                    rows="3"
                                ></textarea>
                            </div>
                            <div className="input-box">
                                <label htmlFor="restaurantType">Restaurant Type</label>
                                <select
                                    id="restaurantType"
                                    name="restaurantType"
                                    value={formData.restaurantType}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">None</option>
                                    <option value="Chinese">Chinese</option>
                                    <option value="Arabic">Arabic</option>
                                    <option value="Asian">Asian</option>
                                    <option value="Japanese">Japanese</option>
                                    <option value="Jamaican">Jamaican</option>
                                    <option value="Indian">Indian</option>
                                    <option value="Mexican">Mexican</option>
                                    <option value="Vegan">Vegan</option>
                                    <option value="Turkish">Turkish</option>
                                    <option value="Breakfast">Breakfast</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <div className="input-box">
                                    <label htmlFor="openingHours">Opening Hours</label>
                                    <input
                                        id="openingHours"
                                        type="time"
                                        name="openingHours"
                                        value={formData.openingHours}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="input-box">
                                    <label htmlFor="closingHours">Closing Hours</label>
                                    <input
                                        id="closingHours"
                                        type="time"
                                        name="closingHours"
                                        value={formData.closingHours}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="input-box">
                                <label>Delivery Zip Codes</label>
                                {formData.zipCodes.map((zip, index) => (
                                    <div key={index} className="zip-code-group">
                                        <input
                                            type="text"
                                            value={zip}
                                            onChange={(e) => handleZipCodeChange(index, e.target.value)}
                                            required
                                        />
                                        {index > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => removeZipCodeField(index)}
                                                className="remove-button"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button type="button" onClick={addZipCodeField} className="add-button">
                                    Add More
                                </button>
                            </div>
                            {errormsg && <p className="error-message" aria-live="assertive">{errormsg}</p>}
                            <button type="submit" className="signup-button">Complete</button>
                        </form>

                </div>
            </div>
        </>
    );
}

export default RestaurantDetails;