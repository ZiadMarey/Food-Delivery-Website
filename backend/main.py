from flask import request, jsonify, session
from config import app, db
from models import Food , User, Restaurant, OpeningHours, DeliveryArea, Customer
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash

@app.route("/login", methods=["POST"])
def login():
    username = request.json.get("username")
    password = request.json.get("password")

    # validate input
    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400

    # fetch the user
    user = User.query.filter_by(username=username).first()

    if not user:
        return jsonify({"message": "Invalid username or password"}), 401
    if not check_password_hash(user.password, password):
        return jsonify({"message": "Invalid username or password"}), 401
    # flask-Login
    login_user(user)

    session.permanent = True

    return jsonify({
        "message": "Login successful",
        "username": user.username,
        "userType": user.user_type,
        "accountBalance": user.account_balance
    }), 200

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logout successful"})

@app.route("/register_customer", methods=["POST"])
def register_customer():
    user_type = "customer"
    email = request.json.get("email")
    password = request.json.get("password")
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    address = request.json.get("address")
    postal_code = request.json.get("postalCode")
    account_balance = 100.0
    


    # Validate input
    if not email or not password or not user_type or not first_name or not last_name or not postal_code:
        return jsonify({"message": "Email, password, and user type are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email already exists"}), 400

    # Hash the password
    hashed_password = generate_password_hash(password, method='sha256')

    new_customer = Customer(
        email=email,
        password=hashed_password,
        first_name=first_name,
        last_name=last_name,
        user_type=user_type,
        address=address,
        postal_code=postal_code,
        account_balance=account_balance,
    )

    # Add specific data for restaurants
    if user_type == "restaurant":
        new_restaurant = Restaurant(
            name=f"{username}'s Restaurant",
            address="To be updated",
            description="To be updated"
        )
        db.session.add(new_restaurant)
        db.session.flush()  # Ensure the restaurant ID is generated
        new_user.restaurant_id = new_restaurant.id

    # Add specific data for customers
    elif user_type == "customer":
        if not address:
            return jsonify({"message": "Address is required for customers"}), 400
        new_user.address = address

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        db.session.rollback()  # Rollback in case of an error
        return jsonify({"message": str(e)}), 400


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
    
    return jsonify({"message": "Item created"}), 201

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

@app.route("/restaurant_details", methods= ["GET"])
def restaurant_details():
    restaurant = Restaurant.query.all()
    delivery_area = DeliveryArea.query.all()
    opening_hours = OpeningHours.query.all()    
    
    json_restaurant = list(map(lambda x: x.to_json(), restaurant))
    json_delivery_area = list(map(lambda x: x.to_json(), delivery_area))
    json_opening_hours = list(map(lambda x: x.to_json(), opening_hours))

    return jsonify({
        "restaurant": json_restaurant,
        "delivery_areas": json_delivery_area,
        "opening_hours": json_opening_hours
    })

@app.route("/update_restaurant_details", methods=["PATCH"])
@login_required
def update_restaurant_details():
    # ensure the current user is a restaurant owner
    if current_user.user_type != "restaurant":
        return jsonify({"message": "Only restaurant owners can update restaurant details"}), 403

    # Retrieve the restaurant associated with the user
    restaurant = Restaurant.query.get(current_user.restaurant_id)
    if not restaurant:
        return jsonify({"message": "No restaurant associated with this user"}), 404

    # Get data from request
    data = request.json
    restaurant.name = data.get("restaurantName", restaurant.name)
    restaurant.address = data.get("restaurantAddress", restaurant.address)
    restaurant.description = data.get("restaurantDescription", restaurant.description)

    try:
        db.session.commit()
        return jsonify({"message": "Restaurant details updated successfully"}), 200
    except Exception as e:
        db.session.rollback()  #in case of an error
        return jsonify({"message": str(e)}), 400

@app.route("/add_delivery_area", methods=["POST"])
@login_required
def add_delivery_area():
    if current_user.user_type != "restaurant":
        return jsonify({"message": "Only restaurant owners can add delivery areas"}), 403

    postal_code = request.json.get("postalCode")
    
    if not postal_code:
        return jsonify({"message": "Area name and restaurant ID are required"}), 400
    
    new_area = DeliveryArea(postal_code=postal_code, restaurant_id=current_user.restaurant_id)
    
    try:
        db.session.add(new_area)
        db.session.commit()
        return jsonify({"message": "Delivery area added"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 400
    
@app.route("/update_delivery_area/<int:area_id>", methods=["PATCH"])
@login_required
def update_delivery_area(area_id):
    if current_user.user_type != "restaurant":
        return jsonify({"message": "Only restaurant owners can update delivery areas"}), 403

    delivery_area = DeliveryArea.query.get(area_id)
    if not delivery_area or delivery_area.restaurant_id != current_user.restaurant_id:
        return jsonify({"message": "Delivery area not found or unauthorized"}), 404
    
    postal_code = request.json.get("postalCode")
    delivery_area.postal_code = postal_code if postal_code else delivery_area.postal_code

    try:
        db.session.commit()
        return jsonify({"message": "Delivery area updated"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 400

@app.route("/delete_delivery_area/<int:area_id>", methods=["DELETE"])
@login_required
def delete_delivery_area(area_id):
    if current_user.user_type != "restaurant":
        return jsonify({"message": "Only restaurant owners can delete delivery areas"}), 403

    delivery_area = DeliveryArea.query.get(area_id)
    if not delivery_area or delivery_area.restaurant_id != current_user.restaurant_id:
        return jsonify({"message": "Delivery area not found or unauthorized"}), 404

    try:
        db.session.delete(delivery_area)
        db.session.commit()
        return jsonify({"message": "Delivery area deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 400
    
@app.route("/add_opening_hours", methods=["POST"])
@login_required
def add_opening_hours():
    if current_user.user_type != "restaurant":
        return jsonify({"message": "Only restaurant owners can add opening hours"}), 403

    day_of_week = request.json.get("dayOfWeek")
    opening_time = request.json.get("openingTime")
    closing_time = request.json.get("closingTime")

    if not day_of_week or not opening_time or not closing_time:
        return jsonify({"message": "All fields are required"}), 400

    new_hours = OpeningHours(
        day_of_week=day_of_week,
        opening_time=opening_time,
        close_time=closing_time,
        restaurant_id=current_user.restaurant_id
    )
    try:
        db.session.add(new_hours)
        db.session.commit()
        return jsonify({"message": "Opening hours added"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 400
    
@app.route("/update_opening_hours/<int:hours_id>", methods=["PATCH"])
@login_required
def update_opening_hours(hours_id):
    if current_user.user_type != "restaurant":
        return jsonify({"message": "Only restaurant owners can update opening hours"}), 403

    opening_hours = OpeningHours.query.get(hours_id)
    
    if not opening_hours or opening_hours.restaurant_id != current_user.restaurant_id:
        return jsonify({"message": "Opening hours not found or unauthorized"}), 404

    data = request.json
    opening_hours.day_of_week = data.get("dayOfWeek", opening_hours.day_of_week)
    opening_hours.opening_time = data.get("openingTime", opening_hours.opening_time)
    opening_hours.closing_time = data.get("closingTime", opening_hours.closing_time)

    try:
        db.session.commit()
        return jsonify({"message": "Opening hours updated"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 400




if __name__ == "__main__":
    with app.app_context():
        db.create_all() #create all db in the model

    app.run(debug = True)