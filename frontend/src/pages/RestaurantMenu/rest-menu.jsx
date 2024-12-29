import MenuItem from "./Components/menu-item"
import "./rest-menu.css"

function RestMenu({menu}) {
    return(

            <div class="Menu Container">
                <div className="header-container">
                    <h1>Restaurant Menu</h1>
                    <button className="new-item-button">Add New</button>
                </div>

                <div>
                    {menu.map((food) => (
                        <MenuItem key={food.id}
                        foodName={food.food_name}
                        foodPrice={food.food_price}
                        />
                        ))}
                </div>
            </div>    
    )
    

}export default RestMenu