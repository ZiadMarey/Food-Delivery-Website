import './preview-cards.css'
import DeleteIcon from './assets/trash-can.svg';
import { PropTypes } from "prop-types";

function Card(props){

    console.log("ItemCard Props:", props);

    return (
        <div className='card'>
            
            <div className='card-items menu-item-image-container'>
                <img src={props.item_picture} alt='Menu Item Image' className='menu-item-image '/>
            </div>
            <p className='item-name card-items'>Item Name: {props.name}</p>

            <p className='quantity card-items'> Quantity: {props.quantity} </p>

            <p className='item-price card-items'> Item Price: {props.price}€</p>

            {/*removing a card still doesnt work*/ }
            <img src={DeleteIcon} alt='delete' className='delete-icon' onClick={() => removeCard(props.id)}/>
            
        </div>
    );
} 

Card.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string ,
    quantity: PropTypes.number,
    price: PropTypes.number,
};

export default Card;


