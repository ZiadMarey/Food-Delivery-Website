import ItemCard from '../Cards/Item_Card.jsx';
import NotesCard from '../Cards/Notes_Card.jsx';
import TotalCard from '../Cards/Total_Card.jsx';

import { Link } from 'react-router-dom';
import {useState} from 'react';
import './preview-container.css'

function Container (){
    const [cards, setCards] = useState([]);

    const addCard = () => {
        setCards([...cards, {id: cards.length + 1}])
    }

    const removeCard = (id) => {
        setCards(cards.filter((card) => card.id !== id));
    }

    const containerHeight = cards.length >1 ?  (cards.length-1) : 1;
    //this line records the number of cards present above 1, because 1 is the default amount of cards in the container
    
    return(
        <div className='container' style= {{
            height: `${containerHeight*16.2 + 95/*67.6*/ }vh`
            //This line adjusts the height of the container according to the number of cards present in it, the default amount of cards here is 2
        }}>
            <p className='orderPreview-text'> Order Preview </p>

            <ItemCard name="Cheese Burger" quantity={1}/>
            <ItemCard />




            
            <NotesCard />
            <TotalCard />
            
            <Link to="/" className='cancel-button' > Cancel and Return to Main Menu</Link>
            <button className='submit-button' >Submit Order </button>
        </div>
    );
}
export default Container;