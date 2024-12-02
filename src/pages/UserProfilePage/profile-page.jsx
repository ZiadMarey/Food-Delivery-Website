import React from 'react';
import UserIcon from '/Users/shamzainaldin/Order/src/Header/assets/profilePlaceholder.svg'; 

import './profile-page.css';
import NameCard from './Components/Name_Card.jsx';
import AddCard from './Components/Address_Card.jsx';
import PostCard from './Components/Post_Card.jsx';
import SurnameCard from './Components/Surname_Card.jsx';
import EmailCard from './Components/Email_Card.jsx';


function ProfilePage() {
  return (
    <>
      
      <div className="profile-content">
        <div className="left-section">
    
          <div className="profile-image-placeholder">
            <img src={UserIcon} alt="User Icon" className="profile-image" />
          </div>
          <p className="profile-name">Name Surname</p>
          <div className="balance">
            <p>Account Balance: </p>
          </div>
        </div>

        
        <div className="right-section">

         <NameCard></NameCard>
         <SurnameCard></SurnameCard>
         <EmailCard></EmailCard>
         <AddCard></AddCard>  
         <PostCard></PostCard>
         

         

          </div>
        </div>
  
    </>
  );
}

export default ProfilePage;
