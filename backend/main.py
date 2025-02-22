from flask import request, jsonify, session
from config import app, db
from models import Food , User, Restaurant,Lieferspatz ,OpeningHours, DeliveryArea, Customer, Order, OrderItem, BlacklistedToken
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from datetime import timedelta
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jwt
from flask_socketio import SocketIO

jwt = JWTManager(app)
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route("/login", methods=["POST"])
def login():
    # Extract email and password from the request
    email = request.json.get("username")
    password = request.json.get("password")

    # Validate input
    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    # Query the user by email
    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"message": "Invalid email or password"}), 401
    
    token = create_access_token(identity={
        "id": user.id
    }, expires_delta=timedelta(days=1))

    return jsonify({"token": token}), 200

@app.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"] 
    try:
        db.session.add(BlacklistedToken(jti=jti, created_at=datetime.utcnow()))
        db.session.commit()
        return jsonify({"message": "Logout successful"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "An error occurred during logout: " + str(e)}), 500

@app.route("/register_customer", methods=["POST"])
def register_customer():

    email = request.json.get("email")
    password = request.json.get("password")
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    address = request.json.get("address")
    postal_code = request.json.get("postalCode")
    account_balance = 100.0



    # Validate input
    if not email or not password or not first_name or not last_name or not postal_code:
        return jsonify({"message": "All fields are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email already exists"}), 400

    # Hash the password
    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

    # Create the user
    new_user = User(email=email, password=hashed_password, user_type="customer")

    try:
        db.session.add(new_user)
        db.session.flush()  # Flush to get the new_user.id without committing

        # Create the customer
        new_customer = Customer(
            user_id=new_user.id,
            first_name=first_name,
            last_name=last_name,
            address=address,
            postal_code=postal_code,
            account_balance=account_balance,
        )

        db.session.add(new_customer)
        db.session.commit()
        return jsonify({"message": "User registered successfully"}), 201

    except Exception as e:
        db.session.rollback()  # Rollback in case of an error
        return jsonify({"message": str(e)}), 400

@app.route("/register_restaurant", methods=["POST"])
def register_restaurant():
    email = request.json.get("email")
    password = request.json.get("password")
    restaurant_name = request.json.get("restaurantName")
    address = request.json.get("address")
    postal_code = request.json.get("postalCode")
    restaurnat_description = "description"
    account_balance = 0



    # Validate input
    if not email or not password or not restaurant_name or not postal_code:
        return jsonify({"message": "All fields are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email already exists"}), 400

    # Hash the password
    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

    # Create the user
    new_user = User(email=email, password=hashed_password, user_type="restaurant")

    try:
        db.session.add(new_user)
        db.session.flush()  # Flush to get the new_user.id without committing

        # Create the customer
        new_restaurant = Restaurant(
            user_id=new_user.id,
            restaurant_name=restaurant_name,
            address=address,
            postal_code=postal_code,
            description= restaurnat_description,
            account_balance=account_balance,
        )

        db.session.add(new_restaurant)
        db.session.commit()
        return jsonify({
            "message": "User registered successfully",
            "restaurantId": new_restaurant.id  # Return the restaurant ID
        }), 201
    except Exception as e:
        db.session.rollback()  # Rollback in case of an error
        return jsonify({"message": str(e)}), 400

@app.route("/register_restaurant_details", methods=["POST"])
def register_restaurant_details():
    # Extract data from the request
    data = request.json
    restaurant_id = data.get("restaurantID")
    description = data.get("description")
    opening_time_str = data.get("openingHours")  
    closing_time_str = data.get("closingHours")  
    zip_codes = data.get("zipCodes")
    restaurant_type = data.get("restaurantType")


    if not restaurant_id or not description or not opening_time_str or not closing_time_str or not zip_codes:
        return jsonify({"message": "All fields (restaurantID, description, openingHours, closingHours, zipCodes) are required"}), 400

    # convert time format (HH:MM -> datetime.time)
    try:
        opening_time = datetime.strptime(opening_time_str, "%H:%M").time()
        closing_time = datetime.strptime(closing_time_str, "%H:%M").time()
    except ValueError:
        return jsonify({"message": "Invalid time format. Use HH:MM."}), 400

    
    restaurant = Restaurant.query.get(restaurant_id)

    if not restaurant:
        return jsonify({"message": "Restaurant not found"}), 404

    try:
        restaurant.description = description
        restaurant.restaurant_type = restaurant_type

        # Delete existing opening hours for the restaurant
        OpeningHours.query.filter_by(restaurant_id=restaurant.id).delete()

        # Add new opening and closing hours (converted to datetime.time)
        new_hours = OpeningHours(
            opening_time=opening_time,
            closing_time=closing_time,
            restaurant_id=restaurant.id
        )
        db.session.add(new_hours)

        # Delete existing delivery areas for the restaurant
        DeliveryArea.query.filter_by(restaurant_id=restaurant.id).delete()

        # Add new delivery areas
        for postal_code in zip_codes:
            new_area = DeliveryArea(postal_code=postal_code, restaurant_id=restaurant.id)
            db.session.add(new_area)

        db.session.commit()

        return jsonify({"message": "Restaurant details saved successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 400
    
@app.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():
    
    current_user = get_jwt_identity()
    user = User.query.filter_by(id=current_user["id"]).first()

    # Check if the user exists
    if not user:
        return jsonify({"message": "User not found"}), 404

    # Prepare profile data
    profile_data = {
        "id": user.id,
        "email": user.email,
        "userType": user.user_type,
    }

    # Fetch additional details based on user type
    if user.user_type == "customer":
        customer = Customer.query.filter_by(user_id=user.id).first()
        if customer:
            profile_data.update({
                "firstName": customer.first_name,
                "lastName": customer.last_name,
                "address": customer.address,
                "postalCode": customer.postal_code,
                "accountBalance": customer.account_balance,
            })
    elif user.user_type == "restaurant":
        restaurant = Restaurant.query.filter_by(user_id=user.id).first()
        if restaurant:
            profile_data.update({
                "restaurantName": restaurant.restaurant_name,
                "address": restaurant.address,
                "postalCode": restaurant.postal_code,
                "accountBalance": restaurant.account_balance,
            })
    else:
        return jsonify({"message": "Invalid user type"}), 400

    return jsonify(profile_data), 200

#for restaurant to view the profile of the customer 
@app.route("/customer-profile/<int:order_id>", methods=["GET"])
@jwt_required()
def get_customer_profile(order_id):
    # Get the restaurant user making the request
    current_user = get_jwt_identity()
    restaurant = Restaurant.query.filter_by(user_id=current_user["id"]).first()
    
    if not restaurant:
        return jsonify({"message": "Unauthorized"}), 403

    # Get the order and verify it's related to the restaurant
    order = Order.query.filter_by(id=order_id, restaurant_id=restaurant.id).first()

    if not order:
        return jsonify({"message": "Order not found"}), 404

    # Fetch the customer linked to the order
    customer = Customer.query.filter_by(id=order.customer_id).first()
    if not customer:
        return jsonify({"message": "Customer not found"}), 404

    # Return customer details
    return jsonify({
        "firstName": customer.first_name,
        "lastName": customer.last_name,
        "email": customer.user.email,
        "address": customer.address,
        "postalCode": customer.postal_code,
        "accountBalance": customer.account_balance,
    }), 200

@app.route("/get-user-type", methods=["GET"])
@jwt_required()
def get_user_type():
    current_user = get_jwt_identity()
    user = User.query.filter_by(id=current_user["id"]).first()
    user_type = ({"userType":user.user_type})

    return jsonify(user_type), 200

@app.route("/homepage", methods=["GET"])
@jwt_required()
def load_homepage():
    current_user = get_jwt_identity()
    
    # Get the user from the database
    user = User.query.filter_by(id=current_user["id"]).first()
    if not user or user.user_type != "customer":
        return jsonify({"message": "Unauthorized or invalid user type"}), 403

    # Get the user's postal code
    customer = Customer.query.filter_by(user_id=user.id).first()
    if not customer:
        return jsonify({"message": "Customer details not found"}), 404

    customer_postal_code = customer.postal_code

    # Query delivery areas for matching postal codes
    delivery_areas = DeliveryArea.query.filter_by(postal_code=customer_postal_code).all()
    if not delivery_areas:
        return jsonify({"message": "No restaurants deliver to your area"}), 404

    # Get restaurant IDs from the delivery areas
    restaurant_ids = [area.restaurant_id for area in delivery_areas]

    # Fetch restaurant details for the matching IDs
    restaurants = Restaurant.query.filter(Restaurant.id.in_(restaurant_ids)).all()

    # Serialize restaurant details
    restaurant_details = []
    for restaurant in restaurants:
        opening_hours = [
            {
                "id": hours.id,
                "openingTime": hours.opening_time.strftime("%H:%M"),
                "closingTime": hours.closing_time.strftime("%H:%M"),
            }
            for hours in restaurant.opening_hours
        ]

        restaurant_details.append({
            "id": restaurant.id,
            "restaurantName": restaurant.restaurant_name,
            "address": restaurant.address,
            "postalCode": restaurant.postal_code,
            "description": restaurant.description,
            "restaurantType": restaurant.restaurant_type,
            "accountBalance": restaurant.account_balance,
            "openingHours": opening_hours
        })

    return jsonify({"restaurants": restaurant_details}), 200

@app.route("/restaurant", methods=["GET"])
@jwt_required()
def  load_restaurant():
    restaurant_id = request.args.get("restID")
    
    menu = Food.query.filter_by(restaurant_id=restaurant_id).all()
    if not menu:
        return jsonify({"menu": []}), 200  # Return an empty menu if no items exist

    # Transform menu items to JSON
    json_menu = [food.to_json() for food in menu]

    return jsonify({"menu": json_menu}), 200

@app.route("/create_order", methods=["POST"])
@jwt_required()
def create_order():
    current_user = get_jwt_identity()
    user = User.query.filter_by(id=current_user["id"]).first()

    if not user or user.user_type != "customer":
        return jsonify({"message": "Unauthorized. Only customers can place orders"}), 403

    data = request.json
    restaurant_id = data.get("restaurantID")
    order_items = data.get("orderItems")
    total_price = data.get("totalPrice")
    note = data.get("note")

    if not restaurant_id or not order_items or not total_price:
        return jsonify({"message": "Incomplete order data"}), 400

    # check if the restaurant exists
    restaurant = Restaurant.query.get(restaurant_id)
    if not restaurant:
        return jsonify({"message": "Restaurant not found"}), 404

    # fetch the customer's account balance
    customer = Customer.query.filter_by(user_id=user.id).first()
    if not customer:
        return jsonify({"message": "Customer details not found"}), 404

    # check if the customer has enough balance
    if customer.account_balance < total_price:
        return jsonify({"message": "Insufficient balance"}), 400

    # deduct total price from customer's account balance
    customer.account_balance = round(customer.account_balance - total_price, 2)

    # 85% of the total price to the restaurant's account balance
    restaurant.account_balance = round(restaurant.account_balance + total_price * 0.85, 2)
    lieferspatz = Lieferspatz.query.first()
    if not lieferspatz:
         lieferspatz = Lieferspatz(balance=0)  # if it doesn't exist
         db.session.add(lieferspatz)
         db.session.commit()

    # Update Lieferspatz balance
    lieferspatz.balance = round(lieferspatz.balance + total_price * 0.15, 2)

    try:
        # Create the order
        new_order = Order(
            customer_name=customer.first_name,
            customer_address=customer.address,
            customer_id=customer.id,
            total_price=total_price,
            status="pending",
            created_at=datetime.utcnow(),
            note=note,
            restaurant_id=restaurant_id,
            notification_status = True
        )

        db.session.add(new_order)
        db.session.flush()

        # Add order items
        for item in order_items:
            new_order_item = OrderItem(
                quantity=item["quantity"],
                price_at_order=item["price"],
                order_id=new_order.id,
                food_id=item["itemID"],
            )
            db.session.add(new_order_item)

        db.session.commit()
        socketio.emit('new_order', new_order.to_json(), namespace='/restprofile')

        # Emit socket event with order details
        order_data = {
            'id': new_order.id,
            'restaurant_id': restaurant_id,
            'total': total_price
        }
        print("Emitting new order:", order_data) # Debug log
        socketio.emit('new_order', order_data)

        return jsonify({"message": "Order created successfully"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
@app.route("/orders", methods=["GET"])
@jwt_required()
def orders():
    current_user = get_jwt_identity()

    # Fetch the user from the database
    user = User.query.filter_by(id=current_user["id"]).first()
    if not user:
        return jsonify({"message": "Unauthorized user"}), 403

    if user.user_type == "customer":
        # Retrieve all orders for the logged-in customer using customer_id
        customer = Customer.query.filter_by(user_id=user.id).first()
        if not customer:
            return jsonify({"message": "Customer details not found"}), 404

        orders = Order.query.filter_by(customer_id=customer.id).all()

        if not orders:
            return jsonify({"message": "No orders found"}), 404

        # Serialize order details for customers
        order_details = []
        for order in orders:
            # Fetch restaurant details
            restaurant = Restaurant.query.filter_by(id=order.restaurant_id).first()

            # Get order items
            order_items = OrderItem.query.filter_by(order_id=order.id).all()
            items = [
                {
                    "foodName": item.food.food_name,
                    "quantity": item.quantity,
                    "priceAtOrder": item.price_at_order
                }
                for item in order_items
            ]

            order_details.append({
                "orderId": order.id,
                "restaurantName": restaurant.restaurant_name if restaurant else "Unknown",
                "totalPrice": order.total_price,
                "status": order.status,
                "createdAt": order.created_at.strftime("%Y-%m-%d %H:%M:%S"),
                "items": items
            })

        return jsonify({"orders": order_details}), 200

    elif user.user_type == "restaurant":
        # Retrieve all orders for the restaurant
        restaurant = Restaurant.query.filter_by(user_id=user.id).first()
        if not restaurant:
            return jsonify({"message": "Restaurant details not found"}), 404

        orders = Order.query.filter_by(restaurant_id=restaurant.id).all()

        if not orders:
            return jsonify({"message": "No orders found"}), 404

        # Serialize order details for restaurants
        order_details = []
        for order in orders:
            # Get order items
            order_items = OrderItem.query.filter_by(order_id=order.id).all()
            items = [
                {
                    "foodName": getattr(item.food, "food_name", "Unknown Food"),
                    "quantity": item.quantity,
                    "priceAtOrder": item.price_at_order
                }
                for item in order_items
            ]

            order_details.append({
                "orderId": order.id,
                "customerName": order.customer_name,
                "customerAddress": order.customer_address,
                "totalPrice": order.total_price,
                "status": order.status,
                "createdAt": order.created_at.strftime("%Y-%m-%d %H:%M:%S"),
                "items": items
            })

        return jsonify({"orders": order_details}), 200

    else:
        return jsonify({"message": "Unauthorized user type"}), 403

@app.route("/order_details/<int:order_id>", methods=["GET"])
@jwt_required()
def get_order_details(order_id):
    current_user = get_jwt_identity()

    # Fetch the user from the database
    user = User.query.filter_by(id=current_user["id"]).first()
    if not user:
        return jsonify({"message": "Unauthorized. User not found"}), 403

    # For customers: Ensure the order belongs to the customer
    if user.user_type == "customer":
        order = Order.query.filter_by(id=order_id, customer_id=user.customer.id).first()
        if not order:
            return jsonify({"message": "Order not found"}), 404

        # Fetch restaurant details
        restaurant = Restaurant.query.filter_by(id=order.restaurant_id).first()

        # Fetch order items
        order_items = OrderItem.query.filter_by(order_id=order.id).all()
        items = [
            {
                "foodName": getattr(item.food, "food_name", "Unknown Food"),
                "quantity": item.quantity,
                "priceAtOrder": item.price_at_order,
            }
            for item in order_items
        ]

        # Serialize order details
        order_details = {
            "orderId": order.id,
            "restaurantName": restaurant.restaurant_name if restaurant else "Unknown",
            "restaurantId": restaurant.id if restaurant else None,
            "totalPrice": order.total_price,
            "status": order.status,
            "note": order.note,
            "createdAt": order.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            "items": items,
        }

        return jsonify(order_details), 200

    # For restaurants: Ensure the order belongs to the restaurant
    elif user.user_type == "restaurant":
        restaurant = Restaurant.query.filter_by(user_id=user.id).first()
        if not restaurant:
            return jsonify({"message": "Restaurant not found"}), 404

        order = Order.query.filter_by(id=order_id, restaurant_id=restaurant.id).first()
        if not order:
            return jsonify({"message": "Order not found"}), 404

        # Fetch customer details
        customer = Customer.query.filter_by(id=order.customer_id).first()

        # Fetch order items
        order_items = OrderItem.query.filter_by(order_id=order.id).all()
        items = [
            {
                "foodName": getattr(item.food, "food_name", "Unknown Food"),
                "quantity": item.quantity,
                "priceAtOrder": item.price_at_order,
            }
            for item in order_items
        ]

        # Serialize order details
        order_details = {
            "orderId": order.id,
            "customerName": customer.first_name if customer else "Unknown",
            "customerAddress": order.customer_address,
            "totalPrice": order.total_price,
            "status": order.status,
            "note":order.note,
            "createdAt": order.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            "items": items,
        }

        return jsonify(order_details), 200

    else:
        return jsonify({"message": "Unauthorized. Only customers or restaurant owners can view order details"}), 403

@app.route("/update_order_status/<int:order_id>", methods=["PATCH"])
@jwt_required()
def update_order_status(order_id):
    current_user = get_jwt_identity()
    
    restaurant = Restaurant.query.filter_by(user_id=current_user["id"]).first()
    if not restaurant:
        return jsonify({"message": "Unauthorized. Only restaurant owners can update order status"}), 403

    order = Order.query.filter_by(id=order_id, restaurant_id=restaurant.id).first()
    if not order:
        return jsonify({"message": "Order not found"}), 404


    new_status = request.json.get("status")
    valid_statuses = ["confirmed", "declined", "completed"]


    if not new_status or new_status not in valid_statuses:
        return jsonify({
            "message": "Invalid status. Allowed statuses: 'confirmed', 'declined', 'completed'"
        }), 400


    if order.status == "pending" and new_status in ["confirmed", "declined"]:
        # handle the case where the order is rejected
        if new_status == "declined":
            try:
        
                customer = Customer.query.filter_by(id=order.customer_id).first()
                if not customer:
                    return jsonify({"message": "Customer not found"}), 404

                lieferspatz = Lieferspatz.query.first()
                if not lieferspatz:
                    return jsonify({"message": "Lieferspatz account not found"}), 404

                refund_to_customer = round(order.total_price, 2)
                deduction_from_restaurant = round(order.total_price * 0.85, 2)
                deduction_from_lieferspatz = round(order.total_price * 0.15, 2)

                customer.account_balance += refund_to_customer
                restaurant.account_balance -= deduction_from_restaurant
                lieferspatz.balance -= deduction_from_lieferspatz

                # set the order status to declined
                order.status = new_status
                db.session.commit()

                return jsonify({
                    "message": "Order rejected successfully and balance refunded to the customer",
                    "order": order.to_json()
                }), 200
            except Exception as e:
                db.session.rollback()
                return jsonify({"message": str(e)}), 500

        # handle the case where the order is confirmed
        elif new_status == "confirmed":
            order.status = new_status

    elif order.status == "confirmed" and new_status == "completed":
        order.status = new_status
    else:
        return jsonify({
            "message": "Invalid status transition"
        }), 400

    try:
        # commit the change to the database
        db.session.commit()
        return jsonify({
            "message": "Order status updated successfully",
            "order": order.to_json()
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500

@app.route("/menu", methods=["GET"])
@jwt_required()
def get_menu():
    current_user = get_jwt_identity()
    
    # Fetch the user and validate
    user = User.query.filter_by(id=current_user["id"]).first()
    if not user or user.user_type != "restaurant":
        return jsonify({"message": "Unauthorized or user type not restaurant"}), 403

    # Fetch the restaurant and validate
    restaurant = Restaurant.query.filter_by(user_id=user.id).first()
    if not restaurant:
        return jsonify({"message": "Restaurant not found"}), 404

    # Fetch menu items and validate
    menu = Food.query.filter_by(restaurant_id=restaurant.id).all()
    if not menu:
        return jsonify({"menu": []}), 200  # Return an empty menu if no items exist

    # Transform menu items to JSON
    json_menu = [food.to_json() for food in menu]

    return jsonify({"menu": json_menu}), 200

@app.route("/add_food", methods= ["POST"])
@jwt_required()
def add_food():
    current_user = get_jwt_identity()
    restaurant = Restaurant.query.filter_by(user_id=current_user["id"]).first()

    food_name = request.json.get("foodName")
    food_price = request.json.get("foodPrice")

    if not food_name or not food_price:
        return(
            jsonify({"message": "You must include a name and price"}), 400
        )
    
    new_food = Food(food_name = food_name, food_price = food_price, restaurant_id = restaurant.id)
    try:
        db.session.add(new_food)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}),400
    
    return jsonify({"message": "Item created"}), 201

@app.route("/update_food/<int:food_id>", methods= ["PATCH"])
@jwt_required()
def update_food(food_id):#need to update
    current_user = get_jwt_identity()
    restaurant = Restaurant.query.filter_by(user_id=current_user["id"]).first()

    food = Food.query.get(food_id)

    if not food:
        return jsonify({"message": "Food not exist"}), 404
    
    data = request.json
    food.food_name = data.get("foodName", food.food_name)
    food.food_price = data.get("foodPrice", food.food_price)

    db.session.commit()

    return jsonify({"message": "Food updated"}), 200

@app.route("/delete_food/<int:food_id>", methods = ["DELETE"])
@jwt_required()
def delete_food(food_id):
   
    food = Food.query.get(food_id)

    if not food:
        return jsonify({"message": "Food not exist"}), 404

    order_items = OrderItem.query.filter_by(food_id=food_id).all()

    if order_items:
        # Handle the situation where the food is still referenced in order items
        # For example, set the food_id to None (if the database schema allows it)
        for order_item in order_items:
            order_item.food_id = None
        db.session.commit()  # Save the changes to the OrderItem table

    
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

@app.route("/add_delivery_area", methods=["POST"])
@jwt_required()
def add_delivery_area():
    current_user = get_jwt_identity()
    user = User.query.filter_by(id=current_user["id"]).first()
    restaurant = Restaurant.query.filter_by(user_id=user.id).first
    
    if user.user_type != "restaurant":
        return jsonify({"message": "Only restaurant owners can add delivery areas"}), 403

    postal_code = request.json.get("postalCode")
    
    if not postal_code:
        return jsonify({"message": "Area name and restaurant ID are required"}), 400
    
    new_area = DeliveryArea(postal_code=postal_code, restaurant_id=restaurant.id)
    
    try:
        db.session.add(new_area)
        db.session.commit()
        return jsonify({"message": "Delivery area added"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 400
    
@app.route("/update_delivery_area/<int:area_id>", methods=["PATCH"])
@jwt_required()
def update_delivery_area(area_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(id=current_user["id"]).first()
    restaurant = Restaurant.query.filter_by(user_id=user.id).first

    if user.user_type != "restaurant":
        return jsonify({"message": "Only restaurant owners can update delivery areas"}), 403

    delivery_area = DeliveryArea.query.get(area_id)
    if not delivery_area or delivery_area.restaurant_id != restaurant.restaurant_id:
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
@jwt_required()
def delete_delivery_area(area_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(id=current_user["id"]).first()
    restaurant = Restaurant.query.filter_by(user_id=user.id).first

    if user.user_type != "restaurant":
        return jsonify({"message": "Only restaurant owners can delete delivery areas"}), 403

    delivery_area = DeliveryArea.query.get(area_id)
    if not delivery_area or delivery_area.restaurant_id != restaurant.restaurant_id:
        return jsonify({"message": "Delivery area not found or unauthorized"}), 404

    try:
        db.session.delete(delivery_area)
        db.session.commit()
        return jsonify({"message": "Delivery area deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 400
    
@app.route("/add_opening_hours", methods=["POST"])
@jwt_required()
def add_opening_hours():
    current_user = get_jwt_identity()
    user = User.query.filter_by(id=current_user["id"]).first()
    restaurant = Restaurant.query.filter_by(user_id=user.id).first

    if user.user_type != "restaurant":
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
        restaurant_id=restaurant.restaurant_id
    )
    try:
        db.session.add(new_hours)
        db.session.commit()
        return jsonify({"message": "Opening hours added"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 400
    
@app.route("/update_opening_hours/<int:hours_id>", methods=["PATCH"])
@jwt_required()
def update_opening_hours(hours_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(id=current_user["id"]).first()
    restaurant = Restaurant.query.filter_by(user_id=user.id).first

    if user.user_type != "restaurant":
        return jsonify({"message": "Only restaurant owners can update opening hours"}), 403

    opening_hours = OpeningHours.query.get(hours_id)
    
    if not opening_hours or opening_hours.restaurant_id != restaurant.restaurant_id:
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


#restaurant notification
@app.route("/restaurant_notifications", methods=["GET"])
@jwt_required()
def restaurant_notifications():
    current_user = get_jwt_identity()
    restaurant_id = current_user['id']  # Extract the actual ID value
    
    # Get the restaurant for this user
    restaurant = Restaurant.query.filter_by(user_id=restaurant_id).first()
    if not restaurant:
        return jsonify({"message": "Restaurant not found"}), 404
        
    orders = Order.query.filter_by(
        restaurant_id=restaurant.id, 
        notification_status=True
    ).all()
    
    return jsonify([order.to_json() for order in orders]), 200


#liefer
@app.route("/lieferspatz_balance", methods=["GET"])
@jwt_required()
def get_lieferspatz_balance():
    # Assuming Lieferspatz has only one record
    lieferspatz = Lieferspatz.query.first()

    if not lieferspatz:
        lieferspatz = Lieferspatz(balance=0)  # Create a new Lieferspatz record if it doesn't exist
        db.session.add(lieferspatz)
        db.session.commit()

    return jsonify({"balance": lieferspatz.balance}), 200


if __name__ == "__main__":
    with app.app_context():
        db.create_all() #create all db in the model

    app.run(debug = True)

