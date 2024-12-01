import LogoPlaceholder from './assets/logoPlaceholder.png';
import UserIcon from './assets/profilePlaceholder.svg';
import HistoryIcon from './assets/shoppingPlaceholder.svg';
import './header.css';




function MainHeader() {
    return (
        <div className="mainHeader">
            <img src={LogoPlaceholder} alt="Website-Logo" className="header-elements website-logo" />
            <h2 className="header-elements header-restaurant-name website-name">Lieferspatz</h2>
            
            <div className="icon-container">
                <img src={HistoryIcon} alt="Purchase History" className="header-icons" />
                <p className="header-elements icon-text">Order History</p>
            </div>
            <div className="icon-container">
                <img src={UserIcon} alt="User Icon" className="header-icons" />
                <p className="header-elements icon-text">Profile</p>
            </div>
        </div>
    );
}


export default MainHeader;