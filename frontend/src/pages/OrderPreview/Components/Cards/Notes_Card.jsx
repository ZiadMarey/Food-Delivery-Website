import './preview-cards.css';
import { PropTypes } from "prop-types";

function NotesCard({note, setNote}){
    const handleInputChange = (event) => {
        setNote(event.target.value); // Update the note state
    };

    return(
        <div className='card'>
            <p className='notes-text'>Additional Notes:</p>
            <input
                type="text"
                value={note}
                onChange={handleInputChange}
                placeholder="Enter your notes here"
                className="notes-input"
            />
        </div>
    );
}

export default NotesCard;