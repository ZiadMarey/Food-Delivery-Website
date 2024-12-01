import './hp-card.css';
import { PropTypes } from "prop-types";

function HP_Card(props) {
  return (
    <div className="container-card">
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
