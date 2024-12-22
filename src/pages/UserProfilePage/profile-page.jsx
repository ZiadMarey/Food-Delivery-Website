import React from 'react';
import UserIcon from './assets/profilePlaceholder.svg'; 

import './profile-page.css';
import NameCard from './Components/Name_Card.jsx';
import AddCard from './Components/Address_Card.jsx';
import PostCard from './Components/Post_Card.jsx';
import SurnameCard from './Components/Surname_Card.jsx';
import EmailCard from './Components/Email_Card.jsx';
import { useState } from "react";

function ProfilePage() {
  

  //make functions to pass  
  const [name, setName] = useState("Jane");
  const [surname, setSurname] = useState("Williams");
  
  
  
  return (
    <>
      
      <div className="profile-content">


        <div className="left-section">
    
          <div className="profile-image-placeholder">
            <img src={UserIcon} alt="User Icon" className="profile-image" />
          </div>
          <p className="profile-name">{name} {surname}</p>

          <div className="balance">
            <p>Account Balance: </p>
          </div>
        </div>

        
        <div className="right-section">

         <NameCard name ={name} ></NameCard>
         <SurnameCard surname = {surname} ></SurnameCard>
         <EmailCard email = "jane.will@lieferspatz.com"></EmailCard>
         <AddCard address = "Loth str."></AddCard>  
         <PostCard postcode = "40235"></PostCard>
         
         </div>
         

          </div>
        
  
    </>
  );
}

export default ProfilePage;
