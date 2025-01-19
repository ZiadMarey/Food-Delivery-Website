import LogoPlaceholder from './assets/logoPlaceholder.png';
import UserIcon from './assets/profilePlaceholder.svg';
import HistoryIcon from './assets/shoppingPlaceholder.svg';
import './new-header.css';
import {Link} from 'react-router-dom';



function MainHeader() {
    console.log("MainHeader Rendered");
    
    return (


        <div className="mainHeader">

            <div className='logo-container'>


            <Link to="/homepage" className = "header-elements logo-container ">
                <img src={LogoPlaceholder} alt="Website-Logo" className="header-elements website-logo" />
        
                <h2 className="header-elements header-restaurant-name website-name">Lieferspatz</h2>
            </Link>

            </div>
            
            <div className = "right-icons">

            <div className="icon-container">
                <Link to ="/userorderhist" className = "header-elements">
                    <img src={HistoryIcon} alt="Purchase History" className="header-icons history-icon" />
                    <p className="header-elements icon-text">Order History</p>
                </Link>
            </div>


            <div className="icon-container">
                <Link to = "/profile" className='header-elements'>
                    <img src={UserIcon} alt="User Icon" className="header-icons profile-icon" />
                    <p className="header-elements icon-text">Profile</p>
                </Link>
            </div>

            </div>


        </div>
    );
}



export default MainHeader;
