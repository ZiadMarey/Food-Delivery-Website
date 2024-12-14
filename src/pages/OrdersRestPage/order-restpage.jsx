import RestOrderCard from "./Components/Orders_Rest_Box";
import ConfirmCard from "./Components/Order_Confirmed_Box";
import RejectCard from "./Components/Order_Rejected_Box";


function RestOrderPage(){

    return(
        <>
        <RestOrderCard></RestOrderCard>
        <ConfirmCard></ConfirmCard>
        <RejectCard></RejectCard>
        
        </>
    );

}

export default RestOrderPage;