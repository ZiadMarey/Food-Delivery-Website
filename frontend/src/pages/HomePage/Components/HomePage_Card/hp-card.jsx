import './hp-card.css';
import { PropTypes } from "prop-types";
import React from 'react';
import {Link} from 'react-router-dom';

import ChinesePic from './Components/Chinese.jpg';
import ArabicPic from './Components/Arabic.png';
import AsianPic from './Components/Asian.jpg';
import JapanesePic from './Components/Japanese.jpg';
import JamaicanPic from './Components/Jamaican.jpg';
import IndianPic from './Components/Indian.jpg';
import MexicanPic from './Components/Mexican.jpg';
import BreakfastPic from './Components/Breakfast.png';
import VeganPic from './Components/Vegan.jpg'



function HP_Card(props) {
 
  const { restName, restDescription, openHours, closeHours } = props;

  return (
    <div className="container-card">

      {/* added link to respective restaurant */}
      <Link to={`/restaurant/${props.restName}`} state={{restName, restDescription, openHours, closeHours}} className = 'card-link'>
      
      <div className='image-section'>
          {(() =>{
              switch (props.restDescription){
                case 'Chinese':
                  return <img className='items-image' src={ChinesePic} alt='Chinese Food Picture' />;
                
                case "Arabic":
                  return <img className='items-image' src={ArabicPic} alt='Arabic Food Picture' />
                
                case "Asian":
                  return <img className='items-image' src={AsianPic} alt='Asian Food Picture' />

                case "Japanese":
                  return <img className='items-image' src={JapanesePic} alt='Japanese Food Picture' />
                
                case "Jamaican":
                  return <img className='items-image' src={JamaicanPic} alt='Jamaican Food Picture' />
                
                case "Indian":
                  return <img className='items-image' src={IndianPic} alt='Indian Food Picture' />

                case "Mexican":
                  return <img className='items-image' src={MexicanPic} alt='Mexican Food Picture' />
              
                case "Breakfast":
                  return <img className='items-image' src={BreakfastPic} alt='Breakfast Food Picture' />
                
                case "Vegan":
                  return <img className='items-image' src={VeganPic} alt='Vegan Food Picture' />
              }
            }
          )()}
      </div>
        
      <div className="description">
        <p>Restaurant Name: {props.restName} </p>
        <p>Description: {props.restDescription}</p>
        <p>
          Opening Hours: {Math.floor(props.openHours / 10) == 0 ? "0" : ""}
          {props.openHours}
          {props.openHours == null ? "" : ":00 "} 
          -
          {Math.floor(props.closeHours / 10) == 0 ? " 0" : " "}
          {props.closeHours}
          {props.closeHours == null ? "" : ":00"}
        </p>
      </div>
      </Link>
    </div>
  );
}



HP_Card.propTypes = {
  restName: PropTypes.string,
  restDescription: PropTypes.string,
  openHours: PropTypes.number,
  closeHours: PropTypes.number,
};
export default HP_Card;
