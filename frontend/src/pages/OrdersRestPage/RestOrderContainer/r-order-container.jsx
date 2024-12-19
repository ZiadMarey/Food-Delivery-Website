
import { Link } from 'react-router-dom';
import {useState} from 'react';
import './r-order-container.css';

import RestOrderCard from '../Components/Orders_Rest_Box';
import RejectCard from '../Components/Order_Rejected_Box';
import ConfirmCard from '../Components/Order_Confirmed_Box';


function RestOrderContainer (){
    const [cards, setCards] = useState([]);

    const addCard = () => {
        setCards([...cards, {id: cards.length + 1}])
    }

    const removeCard = (id) => {
        setCards(cards.filter((card) => card.id !== id));
    }

    const containerHeight = cards.length >1 ?  (cards.length-1) : 0; 
    //this line records the number of cards present above 1, because 1 is the default amount of cards in the container

    return(
        <div className='container' style= {{
            height: `${containerHeight*21.3 + 60 }vh`
            //This line adjusts the height of the container according to the number of cards present in it, the default amount of cards here is 1
        }}>
            <p className="order-list-text">Order History</p>

         <RestOrderCard></RestOrderCard>
            <RejectCard></RejectCard>
            <ConfirmCard></ConfirmCard>





            

            <Link to ="/" className='return-button'>
                <p className='reutn-text'>Return</p>
            </Link>
        </div>
    );
}
export default RestOrderContainer;