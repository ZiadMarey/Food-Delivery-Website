import './preview-cards.css'
import DeleteIcon from './assets/trash-can.svg';

function Card({ id, name, quantity, price, item_picture, removeCard }){


    return (
        <div className='card'>
            
            <div className='card-items menu-item-image-container'>
                <img src={item_picture} alt='Menu Item Image' className='menu-item-image '/>
            </div>
            <p className='item-name card-items'>Item Name: {name}</p>

            <p className='quantity card-items'> Quantity: {quantity} </p>

            <p className='item-price card-items'> Item Price: {price}€</p>

            
        
            {/*removing a card still doesnt work*/ }
            <img src={DeleteIcon} alt='delete' className='delete-icon' onClick={() => removeCard(id)}/>
            
        </div>
    );
} 

export default Card;


