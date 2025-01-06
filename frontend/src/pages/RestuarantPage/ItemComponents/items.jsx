import React from "react";
import "./Items.css";

import {useState} from "react";

import Falafel from "./ItemImages/Arabic/Falafel.png";
import Friedchicken from "./ItemImages/Arabic/Friedchicken.png";
import Kabseh from "./ItemImages/Arabic/Kabseh.png";
import Koshari from "./ItemImages/Arabic/Koshari.png";
import Shawerma from "./ItemImages/Arabic/Shawerma.png";

import Coffee from "./ItemImages/Breakfast/Coffee.png";
import Croissant from "./ItemImages/Breakfast/Croissant.png";
import Englishbreakfast from  "./ItemImages/Breakfast/Englishbreakfast.png";
import Pancake from  "./ItemImages/Breakfast/Pancake.png";
import Baguette from  "./ItemImages/Breakfast/Baguette.png";

import Noodles from "./ItemImages/Chinese/asianNoodles.png";
import Dumplings from "./ItemImages/Chinese/Dumplings.png";
import FriedRice from "./ItemImages/Chinese/Friedrice.png";
import SpringRolls from "./ItemImages/Chinese/Springrolls.png";
import Tofu from "./ItemImages/Chinese/Tofu.png";

import Burger from "./ItemImages/Fastfood/burger.png";
import Combo from "./ItemImages/Fastfood/Combo.png";
import Fries from "./ItemImages/Fastfood/Fries.png";
import Pizza from "./ItemImages/Fastfood/Pizza.png";
import Soda from "./ItemImages/Fastfood/Soda.png";

import Biryani from "./ItemImages/Indian/Biryani.png";
import ChickenLollipop from "./ItemImages/Indian/Chickenlolipop.png";
import Curry from "./ItemImages/Indian/Curry.png";
import Naan from "./ItemImages/Indian/Naan.png";
import Samosa from "./ItemImages/Indian/Samosa.png";

import Ackee from "./ItemImages/Jamaican/Ackee.png";
import BeefPatty from "./ItemImages/Jamaican/Beefpatties.png";
import JerkChicken from "./ItemImages/Jamaican/Jerkchicken.png";
import RiceandPeas from "./ItemImages/Jamaican/Riceandpeas.png";
import Stew from "./ItemImages/Jamaican/Stew.png";

import MisoSoup from "./ItemImages/Japanese/Misosoup.png";
import Ramen from "./ItemImages/Japanese/Ramen.png";
import Sashimi from "./ItemImages/Japanese/Sashimi.png";
import Sushi from "./ItemImages/Japanese/Sushi.png";
import Udon from "./ItemImages/Japanese/Udon.png";

import Buritto from "./ItemImages/Mexican/Buritto.png";
import Fajita from "./ItemImages/Mexican/Fajita.png";
import Nachos from "./ItemImages/Mexican/Nachos.png";
import Quesadilla from "./ItemImages/Mexican/Quesadilla.png";
import Taco from "./ItemImages/Mexican/Taco.png";

import Cigkofte from "./ItemImages/Turkish/Cigkofte.png"; 
import Döner from "./ItemImages/Turkish/Döner.png"; 
import Iskender from "./ItemImages/Turkish/Iskender.png"; 
import Kebab from "./ItemImages/Turkish/Kebab.png"; 
import Lahmacun from "./ItemImages/Turkish/Lahmacun.png"; 

import Pokebowl from "./ItemImages/Vegan/Pokebowl.png"; 
import Ratatouille from "./ItemImages/Vegan/Ratatouille.png"; 
import Salad from "./ItemImages/Vegan/Salad.png"; 
import Smoothie from "./ItemImages/Vegan/Smoothie.png"; 
import VeganBurger from "./ItemImages/Vegan/Veganburger.png"; 





function ItemsCard(props) {

  const {itemName, price, itemType, restaurantName} = props;

  const [quantity, setQuantity] = useState(0);


  const increaseQuant = () => {
    setQuantity(prevQuantity => prevQuantity + 1)
  } 

  const decreaseQuant = () => {
    if (quantity >= 1){
      setQuantity(prevQuantity => prevQuantity - 1)
    }

  }


  
  const addToCart = () => {
    if (quantity > 0) {
      const cartItem = {
        foodName: itemName,
        foodPrice: price,
        quantity: quantity,
        restaurantName: restaurantName
      };

      fetch("http://127.0.0.1:5000/add_food_to_cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Item added to cart:", data);
          // Optionally, update state here for local cart management
        })
        .catch((error) => {
          console.error("Error adding item to cart:", error);
        });
    } else {
      alert("Please select a quantity greater than 0.");
    }
  };
  
  const getItemImage = () => {
    switch (itemType) {
      // Arabic Items
      case "Falafel":
        return Falafel;
      case "Fried Chicken":
        return Friedchicken;
      case "Kabseh":
        return Kabseh;
      case "Koshari":
        return Koshari;
      case "Shawerma":
        return Shawerma;

      // Breakfast Items
      case "Coffee":
        return Coffee;
      case "Croissant":
        return Croissant;
      case "English Breakfast":
        return Englishbreakfast;
      case "Pancake":
        return Pancake;
      case "Baguette":
        return Baguette;

      // Chinese Items
      case "Noodles":
        return Noodles;
      case "Dumplings":
        return Dumplings;
      case "Fried Rice":
        return FriedRice;
      case "Spring Rolls":
        return SpringRolls;
      case "Tofu":
        return Tofu;

      // Fast Food Items
      case "Burger":
        return Burger;
      case "Combo":
        return Combo;
      case "Fries":
        return Fries;
      case "Pizza":
        return Pizza;
      case "Soda":
        return Soda;

      // Indian Items
      case "Biryani":
        return Biryani;
      case "Chicken Lollipop":
        return ChickenLollipop;
      case "Curry":
        return Curry;
      case "Naan":
        return Naan;
      case "Samosa":
        return Samosa;

      // Jamaican Items
      case "Ackee":
        return Ackee;
      case "Beef Patty":
        return BeefPatty;
      case "Jerk Chicken":
        return JerkChicken;
      case "Rice and Peas":
        return RiceandPeas;
      case "Stew":
        return Stew;

      // Japanese Items
      case "Miso Soup":
        return MisoSoup;
      case "Ramen":
        return Ramen;
      case "Sashimi":
        return Sashimi;
      case "Sushi":
        return Sushi;
      case "Udon":
        return Udon;

      // Mexican Items
      case "Burrito":
        return Buritto;
      case "Fajita":
        return Fajita;
      case "Nachos":
        return Nachos;
      case "Quesadilla":
        return Quesadilla;
      case "Taco":
        return Taco;

      // Turkish Items
      case "Cigkofte":
        return Cigkofte;
      case "Döner":
        return Döner;
      case "Iskender":
        return Iskender;
      case "Kebab":
        return Kebab;
      case "Lahmacun":
        return Lahmacun;

      // Vegan Items
      case "Poke Bowl":
        return Pokebowl;
      case "Ratatouille":
        return Ratatouille;
      case "Salad":
        return Salad;
      case "Smoothie":
        return Smoothie;
      case "Vegan Burger":
        return VeganBurger;

      // Default case
      default:
        return null;
    }
  };


  return (
    
      <div className="card-conta">
        <div className="card-cont">
          
          <div className="card-det">
            <p className="item">{itemName}</p>
            <img src={getItemImage()} alt={itemType} className="foodPic"/>
            <p className = "item-price"> ${price}  </p>
            <div className="quantity">
              <span>Quantity: </span>
              <div className="quantity-control">
                <button className="control-button" onClick={decreaseQuant}>-</button>
                <span className="quantity-number">{quantity}</span>
                <button className="control-button" onClick={increaseQuant}>+</button>
              </div>
            </div>
            <button className="add-to-cart" onClick={addToCart}>Add to cart</button>
          </div>
        </div>
      </div>
      
  );
}


export default ItemsCard;
