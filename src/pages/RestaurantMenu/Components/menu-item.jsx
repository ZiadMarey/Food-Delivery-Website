import './menu-item.css'

function MenuItem() {
    return (
        <div class="menu-item">
            <span class="food-name">Food Name</span>
            <div class="actions">
                <button class="update-button">Update</button>
                <button class="delete-button">Delete</button>
            </div>
        </div>
    )

}export default MenuItem