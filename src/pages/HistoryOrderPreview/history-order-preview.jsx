import {createContext, useState} from "react";
import { useLocation } from "react-router-dom";
import './history-order-preview.css';
import Header from '../../Componenets/Header/header.jsx';
import CardContainer from './Components/Container/Container.jsx';


export const UserContext = createContext();

function OrderPreview(props){

    // const [restaurantName, setRestaurantName] = useState("Meat In A Box");
    const location = useLocation()
    const restName = location.state?.restName || "Default Restaurant Name";

    return(
        <div className='order-preview'>
            {/* <Header /> */}
            
            
            
            <UserContext.Provider value={restName}>
                <CardContainer />
            </UserContext.Provider>
        </div>
    );
}
export default OrderPreview;