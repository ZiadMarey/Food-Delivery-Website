from flask import request, jsonify
from config import app, db
from models import Food
from models import Cart
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

    if not food_name or not food_price or not quantity:
        return jsonify({"message": "You must include name, price, and quantity"}), 400

    # adding item to cart
    new_cart_item = Cart(food_name=food_name, food_price=food_price, quantity=quantity)
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






if __name__ == "__main__":
    with app.app_context():
        db.create_all() #create all db in the model

    app.run(debug = True)





#submitting order
@app.route("/submit_order", methods=["POST"])
def submit_order():
    res_name = request.json.get("restaurant_name")

    new_order = Order(
        customer_name="Default Customer",  
        customer_address="Default Address",
        total_price=0.0,  
        status="Ongoing",
        restaurant_id=None,
        rest_name = res_name,
        date_ordered = datetime.now()
    )

    try:
        db.session.add(new_order)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": f"Error saving order: {str(e)}"}), 500

    return jsonify({"message": "Order submitted successfully"}), 201

# Endpoint to fetch all orders
@app.route('/get_orders', methods=['GET'])
def get_orders():
    
    orders = Order.query.all()
    order_list = [{"id": order.id, "status": order.status, "res_name" : order.res_name, "date_ordered" : order.date_ordered} for order in orders]
    return jsonify({"orders": order_list})



