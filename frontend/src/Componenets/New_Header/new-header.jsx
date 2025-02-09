import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LogoPlaceholder from './assets/logoPlaceholder.png';
import UserIcon from './assets/profilePlaceholder.svg';
import HistoryIcon from './assets/shoppingPlaceholder.svg';
import './new-header.css';

function MainHeader() {
    const [userType, setUserType] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserType = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/get-user-type', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user type');
                }

                const data = await response.json();
                setUserType(data.userType); // Assuming backend returns { "userType": "restaurant" }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserType();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="mainHeader">
            <div className='logo-container'>
                <Link to={userType == 'restaurant' ? '/restprofile' : "/homepage"} className="header-elements logo-container">
                    <img src={LogoPlaceholder} alt="Website-Logo" className="header-elements website-logo" />
                    <h2 className="header-elements header-restaurant-name website-name">Lieferspatz</h2>
                </Link>
            </div>

            <div className="right-icons">
                <div className="icon-container">
                    <Link to={userType == 'restaurant' ? '/restorders' : "/userorderhist"} className="header-elements">
                        <img src={HistoryIcon} alt="Purchase History" className="header-icons history-icon" />
                        <p className="header-elements icon-text">Order History</p>
                    </Link>
                </div>

                <div className="icon-container">
                    <Link 
                        to={userType === 'restaurant' ? '/restprofile' : '/profile'} 
                        className="header-elements"
                    >
                        <img src={UserIcon} alt="User Icon" className="header-icons profile-icon" />
                        <p className="header-elements icon-text">Profile</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default MainHeader;