import LogoPlaceholder from './assets/logoPlaceholder.png';
import UserIcon from './assets/profilePlaceholder.svg';
import HistoryIcon from './assets/shoppingPlaceholder.svg';
import './new-header.css';
import {Link} from 'react-router-dom';



function MainHeader() {
    return (
        <div className="mainHeader">
            <img src={LogoPlaceholder} alt="Website-Logo" className="header-elements website-logo" />
            

            {/*change to homepage*/}
            <Link to="/">
            <h2 className="header-elements header-restaurant-name website-name">Lieferspatz</h2>
            </Link>

            <div className="icon-container">
                <img src={HistoryIcon} alt="Purchase History" className="header-icons" />
                <Link to ="/userorderhist" className = "header-elements">
                <p className="header-elements icon-text">Order History</p>
                </Link>
            </div>
            <div className="icon-container">
                <img src={UserIcon} alt="User Icon" className="header-icons" />
                <Link to = "/profile" className='header-elements'>
                <p className="header-elements icon-text">Profile</p>
                </Link>
            </div>
        </div>
    );
}



export default MainHeader;