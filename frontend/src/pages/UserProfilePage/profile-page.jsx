import React, { useEffect, useState } from "react";
import UserIcon from './assets/profilePlaceholder.svg'; 
import { useNavigate, Link } from "react-router-dom";

import './profile-page.css';
import NameCard from './Components/Name_Card.jsx';
import AddCard from './Components/Address_Card.jsx';
import PostCard from './Components/Post_Card.jsx';
import SurnameCard from './Components/Surname_Card.jsx';
import EmailCard from './Components/Email_Card.jsx';

function ProfilePage() {
  // State to store profile data
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
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch profile data from backend
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        alert("Unauthorized. Please log in.");
        navigate("/logincustomer");
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:5000/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (response.status === 401) {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("token");
          navigate("/logincustomer");
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();

        // Update state with the fetched data
        setProfile({
          name: data.firstName || "",
          surname: data.lastName || "",
          email: data.email || "",
          address: data.address || "",
          postalCode: data.postalCode || "",
          accountBalance: data.accountBalance || 0
        });

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, token]);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p>Error loading profile: {error}</p>;
  }

  return (
    <>
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
    </>
  );
}

export default ProfilePage;