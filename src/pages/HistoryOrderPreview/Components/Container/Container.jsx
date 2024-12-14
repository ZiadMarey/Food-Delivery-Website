import ItemCard from '../Cards/Item_Card.jsx';
import NotesCard from '../Cards/Notes_Card.jsx';
import TotalCard from '../Cards/Total_Card.jsx';
import './container.css'

import {useContext} from "react";
import {Link} from 'react-router-dom';
import {useState} from 'react';
import { UserContext } from '../../history-order-preview.jsx';


function Container (){
    const [cards, setCards] = useState([]);

    const addCard = () => {
        setCards([...cards, {id: cards.length + 1}])
    }

    const removeCard = (id) => {
        setCards(cards.filter((card) => card.id !== id));
    }

    const containerHeight = cards.length >2 ?  (cards.length-2) : 0;
    //this line records the number of cards present above 2, because 2 is the default amount of cards in the container

    const restaurantName = useContext(UserContext); //fetching the restaurant name only for now
    return(
        <div className='container' style= {{
            height: `${containerHeight*16.2 + 105/*67.6*/ }vh`
            //This line adjusts the height of the container according to the number of cards present in it, the default amount of cards here is 2
        }}>
            <p className='order-preview-text'> Order Preview </p>
            <p className='rest-name'> {restaurantName} </p>

            <ItemCard name="Cheese Burger" quantity={1}/>
            <ItemCard />




            <NotesCard />
            <TotalCard />
            <Link to ="/userorderhist" className='return-button'>
                <p className='reutn-text'>Return</p>
            </Link>

        </div>
    );
}
export default Container;