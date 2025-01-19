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

            <Link to="/" className = "header-elements logo-container ">
                <img src={LogoPlaceholder} alt="Website-Logo" className="header-elements website-logo" />
        
                <h2 className="header-elements header-restaurant-name website-name">Lieferspatz</h2>
            </Link>

            </div>
            


        </div>
    );
}



export default MainHeader;
