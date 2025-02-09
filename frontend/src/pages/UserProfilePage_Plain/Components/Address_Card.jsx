import './Profile_Cards.css';

function AddCard({address}){
    return(
    <div className="profile-box">
    <span className="profile-label">Address</span>
    <div className="profile-value1">{address}</div>
    </div>
  );
}

export default AddCard;