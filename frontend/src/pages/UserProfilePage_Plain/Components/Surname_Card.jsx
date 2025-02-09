import './Profile_Cards.css';

function SurnameCard({surname}){
    
    
    return(
    <div className="profile-box">
    <span className="profile-label">Surname</span>
    <div className="profile-value1"> {surname} </div>
  
    </div>
  );
    

}


export default SurnameCard;
