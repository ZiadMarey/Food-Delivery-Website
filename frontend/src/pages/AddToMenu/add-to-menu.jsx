import './add-to-menu.css'
import {useState} from 'react'

function AddToMenu({ existingFood = {}, updateCallback }) {

    const [foodName, setFoodName] = useState("")
    const [foodPrice, setFoodPrice] = useState("")

    const updating = Object.entries(existingFood).length !== 0

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            foodName,
            foodPrice
        }

        const url = "http://127.0.0.1:5000/" + (updating ? `update_food/${existingFood.id}` : "add_food")
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        const response = await fetch(url, options)
        if (response.status !== 201 && response.status !== 200){
            const message = await response.json()
            alert(message.message)
        }else {
            updateCallback()
        }
    }

    return (
    <div class="overlay">
        <div class="modal">
            <h2>Add Item to Menu</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="foodName">Name:</label>
                    <input
                        type="text"
                        id="foodName"
                        value={foodName}
                        onChange={(e) => setFoodName(e.target.value)}
                    />
                
                <label htmlFor="foodPrice">Price:</label>
                <input
                    type="text"
                    id="foodPrice"
                    value={foodPrice}
                    onChange={(e) => setFoodPrice(e.target.value)}
                />

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