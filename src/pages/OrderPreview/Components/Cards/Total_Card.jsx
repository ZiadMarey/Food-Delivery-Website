import './cards.css';
import { PropTypes } from "prop-types";

function TotalCard(props){
    return(
        <div className='card'>
            <p className='total-text'> Total: &nbsp; {props.total}€ </p>
        </div>
    );
}

TotalCard.propTypes = {
    total: PropTypes.number,
}

export default TotalCard;