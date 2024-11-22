import LogoPlaceholder from './assets/logoPlaceholder.png';
import UserIcon from './assets/profilePlaceholder.svg';
import HistoryIcon from './assets/shoppingPlaceholder.svg';
import './header.css';




function MainHeader(){

    return (
        <div className="mainHeader">
            
                <img src={LogoPlaceholder} alt='Website-Logo' className='header-elements website-logo'/>
                <h2 className='header-elements header-restaurant-name' class='header-elements website-name' >Food Place</h2>
                <img src={HistoryIcon} alt='Purchase History' className='header-elements header-icons'/>
                <img src={UserIcon} alt='User Icon' className='header-elements header-icons'/>

        </div>
    );
}

export default MainHeader;