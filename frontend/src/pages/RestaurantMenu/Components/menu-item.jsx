import './menu-item.css'

function MenuItem({food, updateFood, onDelete}) {
    return (
        <div class="menu-item">
            <span class="food-name">{food.foodName}</span>
            <div class="actions">
                <button class="update-button" onClick={() => updateFood(food)} >Update</button>
                <button class="delete-button" onClick={() => onDelete(food.id)}>Delete</button>
            </div>
        </div>
    )

}export default MenuItem