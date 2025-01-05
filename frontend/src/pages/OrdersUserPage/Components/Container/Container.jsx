import Card from '../Cards/order-card.jsx'

import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import './Container.css'

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


    useEffect(() => {
        fetch("http://127.0.0.1:5000/get_orders")
        .then(response => response.json())
        .then(data => {
            console.log("fetched order", data.order_list)
            setCards(data.order_list ||[]);
        }
        )
        .catch(error => {
            console.error("Error fetching cart items:", error);
          });
        
    }, []);


    return(

        <div className='container' style= {{
            height: `${containerHeight*21.5 + 60 }vh`
            //This line adjusts the height of the container according to the number of cards present in it, the default amount of cards here is 1
        }}>
            <p className="order-list-text">Order History</p>

           {cards.map((orders) =>(
            <Card
            key ={orders.id}
            restaurantName = {orders.res_name}
            status = {orders.status}
            dateOrdered = {orders.date_ordered}
            />
            ))
           }

            <Link to ="/" className='return-button'>
                <p className='reutn-text'>Return</p>
            </Link>
        </div>
    );
}
export default Container;