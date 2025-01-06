from flask import request, jsonify
from config import app, db
from models import Food
from models import Cart
from models import Restaurant
from models import Order
from datetime import datetime 

@app.route("/menu", methods = ["GET"])
def get_menu():
    menu = Food.query.all() #need to transfer python objects to json
    json_menu = list(map(lambda x: x.to_json(), menu)) #apply the to_json method for each object and gives a list
    return jsonify({"menu": json_menu})


@app.route("/add_food", methods= ["POST"])
def add_food():
    food_name = request.json.get("foodName")
    food_price = request.json.get("foodPrice")

    if not food_name or not food_price:
        return(
            jsonify({"message": "You must include a name and price"}), 400
        )
    
    new_food = Food(food_name = food_name, food_price = food_price)
    try:
        db.session.add(new_food)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}),400
    
    return jsonify({"message": "User created"}), 201

@app.route("/update_food/<int:food_id>", methods= ["PATCH"])
def update_food(food_id):
    food = Food.query.get(food_id)

    if not food:
        return jsonify({"message": "Food not exist"}), 404
    
    data = request.json
    food.food_name = data.get("foodName", food.food_name)
    food.food_price = data.get("foodPrice", food.food_price)

    db.session.commit()

    return jsonify({"message": "Food updated"}), 200

@app.route("/delete_food/<int:food_id>", methods = ["DELETE"])
def delete_food(food_id):
    food = Food.query.get(food_id)

    if not food:
        return jsonify({"message": "Food not exist"}), 404
    
    db.session.delete(food)
    db.session.commit()

    return jsonify({"message": "Food deleted!"}), 200

# ADDING ITEMS TO CARD CODE

@app.route("/add_food_to_cart", methods=["POST"])
def add_food_to_cart():
    food_name = request.json.get("foodName")
    food_price = request.json.get("foodPrice")
    quantity = request.json.get("quantity")
    restaurant_name = request.json.get("restaurantName")

    if not food_name or not food_price or not quantity:
        return jsonify({"message": "You must include name, price, and quantity"}), 400

    # adding item to cart
    new_cart_item = Cart(food_name=food_name, food_price=food_price, quantity=quantity, restaurant_name=restaurant_name)
    try:
        db.session.add(new_cart_item)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message ": "Item added to cart"}), 201


@app.route("/get_cart_items", methods=["GET"])
def get_cart_items():
    cart_items = Cart.query.all()  # get all cart items
    json_cart_items = list(map(lambda x: x.to_json(), cart_items))  # converting each cart item to JSON objec
    return jsonify({"cart_items": json_cart_items})


#reseting the cart after redirecting from the order preview page 
@app.route("/reset_cart", methods=["POST"])
def reset_cart():
    try:
        Cart.query.delete()  
        db.session.commit()
        return jsonify({"message": "Cart reset successfully"}), 200
    except Exception as e:
        return jsonify({"message": f"Error resetting cart: {str(e)}"}), 500


#submitting order
from datetime import datetime

@app.route("/submit_order", methods=["POST"])
def submit_order():
    # Get the data from the request
    customer_name = request.json.get("customerName")
    customer_address = request.json.get("customerAddress")
    total_price = request.json.get("totalPrice")
    restaurant_name = request.json.get("restaurantName")

    cart_items = Cart.query.all()
    if not cart_items:
        return jsonify({"message": "Cart is empty"}), 400

    restaurant_name = cart_items[0].restaurant_name 

    # Get the restaurant ID from the restaurant name
    restaurant = Restaurant.query.filter_by(restaurant_name=restaurant_name).first()
    if not restaurant:
        return jsonify({"message": "Restaurant not found"}), 400
    
    # Create a new order entry
    new_order = Order(
        customer_name=customer_name,
        customer_address=customer_address,
        total_price=total_price,
        date_ordered=datetime.now(),
        
        restaurant_name=restaurant_name,
        status="Ongoing"
    )

    # Commit the order to the database
    try:
        
        db.session.add(new_order)
        db.session.commit()

        # Optionally, reset the cart after the order is submitted
        Cart.query.delete()  # Empty the cart
        db.session.commit()

        return jsonify({"message": "Order submitted successfully", "order_id": new_order.id}), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 400



if __name__ == "__main__":
    with app.app_context():
        db.drop_all()
        db.create_all() #create all db in the model
    app.run(debug=True) 