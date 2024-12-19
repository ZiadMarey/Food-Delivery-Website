import './add-to-menu.css'

function AddToMenu() {
    return (
    <div class="overlay">
        <div class="modal">
            <h2>Add Item to Menu</h2>
            <form>
                <label for="food-name">Name</label>
                <input type="text" id="food-name" name="food-name" placeholder="Enter the name" />

                <label for="food-price">Price</label>
                <input type="text" id="food-price" name="food-price" placeholder="Enter the price" />

                <label for="food-photo">Upload the photo</label>
                <div class="upload-container">
                    <input type="file" id="food-photo" name="food-photo" />
                </div>

                <button type="submit" class="add-button">Add</button>
            </form>
        </div>
    </div>

    )

}export default AddToMenu