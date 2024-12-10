import './cards.css';
import { PropTypes } from "prop-types";

function NotesCard(props){
    return(
        <div className='card'>
            <p className='notes-text'> Additional Notes: {props.notes} </p>
        </div>
    );
}

NotesCard.propTypes = {
    notes: PropTypes.string,
}
export default NotesCard;