import './history-cards.css';
import { PropTypes } from "prop-types";

function NotesCard({note}){
    return(
        <div className='card'>
            <p className='notes-text'> Additional Notes: {note} </p>
        </div>
    );
}

export default NotesCard;