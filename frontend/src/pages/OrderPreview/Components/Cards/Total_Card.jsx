import './preview-cards.css';
import { PropTypes } from "prop-types";

function TotalCard({totalPrice}){
    return(
        <div className='card'>
            <p className='total-text'> Total: {totalPrice}€ </p>
        </div>
    );
}
export default TotalCard;