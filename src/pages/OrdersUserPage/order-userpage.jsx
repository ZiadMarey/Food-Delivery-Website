import UserOrderCard from "./Components/order-card";
import './order-userpage.css';

function OrdersUserPage(){

    return(
        <>
        <p className="order-list-text">Order List</p>

        <UserOrderCard/>
        <UserOrderCard/>
        </>
    );


}

export default OrdersUserPage;