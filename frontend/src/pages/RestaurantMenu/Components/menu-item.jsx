import './menu-item.css'

function MenuItem(food) {
    return (
        <div class="menu-item">
            <span class="food-name">{food.foodName}</span>
            <div class="actions">
                <button class="update-button">Update</button>
                <button class="delete-button">Delete</button>
            </div>
        </div>
    )

}export default MenuItem