import './Profile_Cards.css';

function NameCard({name}){
    
    return(
    <div className="profile-box">
      <span className="profile-label">Name</span>
      <div className="profile-value1">{name}</div>
    </div>);
    

}


export default NameCard;
