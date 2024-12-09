import React from "react";
import "./Items.css";
import burger from "./burger.png";

function ItemsCard() {
  return (
    
      <div className="card-conta">
        <div className="card-cont">
          <img src={burger} alt="Burger" className="foodPic" />
          <div className="card-det">
            <p className="item">Item name</p>
            <div className="quantity">
              <span>Quantity: </span>
              <div className="quantity-control">
                <button className="control-button">-</button>
                <span className="quantity-number">1</span>
                <button className="control-button">+</button>
              </div>
            </div>
            <button className="add-to-cart">Add to cart</button>
          </div>
        </div>
      </div>
      
  );
}

export default ItemsCard;
