import './Profile_Cards.css';

function PostCard({postcode}){

    return(
        <div className="profile-box">
        <span className="profile-label">Post Code</span>
        <div className="profile-value1">{postcode}</div>
        </div>
    );


}

export default PostCard;