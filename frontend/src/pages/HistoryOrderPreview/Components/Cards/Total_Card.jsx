<<<<<<< HEAD
import './history-cards.css';
=======
import './preview-cards.css';
>>>>>>> 802fafa46075c57c80248b1ed9b905e230ac6906
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