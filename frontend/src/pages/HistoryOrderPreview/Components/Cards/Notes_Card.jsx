<<<<<<< HEAD
import './history-cards.css';
=======
import './preview-cards.css';
>>>>>>> 802fafa46075c57c80248b1ed9b905e230ac6906
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