import './Profile_Cards.css';

function EmailCard({email}){
    
    
    return(
    <div className="profile-box">
    <span className="profile-label">Email</span>
    <div className="profile-value1">{email}</div>
  </div>);
    

}


export default EmailCard;
