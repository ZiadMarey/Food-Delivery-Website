import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserIcon from './assets/profilePlaceholder.svg'; 
import MainHeader from "../../Componenets/New_Header/new-header.jsx";
import './profile-page-plain.css';
import NameCard from './Components/Name_Card.jsx';
import AddCard from './Components/Address_Card.jsx';
import PostCard from './Components/Post_Card.jsx';
import SurnameCard from './Components/Surname_Card.jsx';
import EmailCard from './Components/Email_Card.jsx';
import { Link } from "react-router-dom";

function PlainUserProfile() {
  const { orderID } = useParams();
  const [profile, setProfile] = useState({
    name: "",
    surname: "",
    email: "",
    address: "",
    postalCode: "",
    accountBalance: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerProfile = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/customer-profile/${orderID}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setProfile({
          name: data.firstName || "",
          surname: data.lastName || "",
          email: data.email || "",
          address: data.address || "",
          postalCode: data.postalCode || "",
          accountBalance: data.accountBalance || 0
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerProfile();
  }, [orderID]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error loading profile: {error}</p>;

  return (
    <>
      <MainHeader />
      <div className="profile-content">
        <div className="left-section">
          <div className="profile-image-placeholder">
            <img src={UserIcon} alt="User Icon" className="profile-image" />
          </div>
          <p className="profile-name">{profile.name} {profile.surname}</p>
          <div className="balance">
            <p>Account Balance: ${profile.accountBalance.toFixed(2)}</p>
          </div>
        </div>

        <div className="right-section">
        
          <NameCard name={profile.name} />
          <SurnameCard surname={profile.surname} />
          <EmailCard email={profile.email} />
          <AddCard address={profile.address} />
          <PostCard postcode={profile.postalCode} />
        </div>


      </div>
      <Link to ="/restprofile" className='return-button'>
                <p className='reutn-text'>Return</p>
            </Link>
    </>
  );
}

export default PlainUserProfile;