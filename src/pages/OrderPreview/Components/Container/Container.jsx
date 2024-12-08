import ItemCard from '../Cards/Item_Card.jsx';
import NotesCard from '../Cards/Notes_Card.jsx';
import TotalCard from '../Cards/Total_Card.jsx';

import {useState} from 'react';
import './container.css'

function Container (){
    const [cards, setCards] = useState([]);

    const addCard = () => {
        setCards([...cards, {id: cards.length + 1}])
    }

    const removeCard = (id) => {
        setCards(cards.filter((card) => card.id !== id));
    }

    const containerHeight = cards.length >2 ?  (cards.length-2) : 2;

    return(
        <div className='container' style= {{
            height: `${containerHeight*16.2 + 85/*67.6*/ }vh`
        }}>
            <ItemCard name="Cheese Burger" quantity={1}/>
            <ItemCard />
            <ItemCard name="Cheese Burger" quantity={1}/>
            <ItemCard />


            
            <NotesCard />
            <TotalCard />
            
            <button className='cancel-button' > Cancel and Return to Main Menu</button>
            <button className='submit-button' >Submit Order </button>
        </div>
    );
}
export default Container;