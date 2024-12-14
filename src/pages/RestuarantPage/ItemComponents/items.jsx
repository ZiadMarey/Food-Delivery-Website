import React from "react";
import "./Items.css";
import burger from "./burger.png";
import {useState} from "react";

function ItemsCard(props) {

  const {itemName, price} = props;

  const [quantity, setQuantity] = useState(0);


  const increaseQuant = () => {
    setQuantity(prevQuantity => prevQuantity + 1)
  } 

  const decreaseQuant = () => {
    if (quantity >= 1){
      setQuantity(prevQuantity => prevQuantity - 1)
    }

  }

  return (
    
      <div className="card-conta">
        <div className="card-cont">
          <img src={burger} alt="Burger" className="foodPic" />
          <div className="card-det">
            <p className="item">{itemName}</p>
            <p className = "item-price"> ${price}  </p>
            <div className="quantity">
              <span>Quantity: </span>
              <div className="quantity-control">
                <button className="control-button" onClick={decreaseQuant}>-</button>
                <span className="quantity-number">{quantity}</span>
                <button className="control-button" onClick={increaseQuant}>+</button>
              </div>
            </div>
            <button className="add-to-cart">Add to cart</button>
          </div>
        </div>
      </div>
      
  );
}


export default ItemsCard;
