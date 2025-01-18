import "./lieferspatz.css";
import Logo from "./assets/logoPlaceHolder.png";

function LiferspatzPage(){
    

    return(
      <div className="page-div">
        <img src={Logo} alt="Lieferspatz's Logo" className="page-logo"/>
        <div className="info-section">
            <p className="blanace-text">Current Balance: </p>
            
        </div>
      </div>
    );
}

export default LiferspatzPage;