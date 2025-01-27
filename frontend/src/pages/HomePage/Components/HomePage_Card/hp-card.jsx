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
import TurkishPic from "./Components/Turkish.jpg"


function HP_Card(props) {
 
  const {restID, restName, restDescription, openHours, closeHours, restType } = props;

  return (
    <div className="container-card">

      {/* added link to respective restaurant */}
      <Link to={`/restaurant/${props.restID}`} state={{restID, restName, restDescription, openHours, closeHours, restType}} className = 'card-link'>
      
      <div className='image-section'>
          {(() =>{
              switch (props.restType){
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

                case "Turkish":
                  return <img className='items-image' src={TurkishPic} alt='Vegan Food Picture' />
              }
            }
          )()}
      </div>
        
      <div className="description">
        <p>{props.restName} </p>
        <p>{props.restType}</p>
        <p>
          Opening Hours: {openHours} 
          -
          {closeHours}
        </p>
      </div>
      </Link>
    </div>
  );
}



HP_Card.propTypes = {
  restName: PropTypes.string,
  restDescription: PropTypes.string,
  restType: PropTypes.string,
  openHours: PropTypes.number,
  closeHours: PropTypes.number,
};
export default HP_Card;
