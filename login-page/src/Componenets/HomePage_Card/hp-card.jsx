import './hp-card.css';
import { PropTypes } from "prop-types";
import React from 'react';
import {Link} from 'react-router-dom';

function HP_Card(props) {
 
  const { restName, restDescription, openHours, closeHours } = props;

  return (
    <div className="container-card">

      {/* added link to respective restaurant */}
      <Link to={`/restaurant/${props.restName}`} state={{restName, restDescription, openHours, closeHours}} className = 'card-link'>

      <div className="description">
        <p>Restaurant Name: {props.restName} </p>
        <p>Desctiption: {props.restDescription}</p>
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
