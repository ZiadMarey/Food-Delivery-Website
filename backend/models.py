from config import db
from datetime import datetime


# Base User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    user_type = db.Column(db.String(20), nullable=False)
    restaurant = db.relationship('Restaurant', backref='user', uselist=False)
    customer = db.relationship('Customer', backref='user', uselist=False)

    def to_json(self):
        return {
            "id": self.id,
            "email": self.email,
            "userType": self.user_type,
        }


# Customer Model
class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    account_balance = db.Column(db.Float, nullable=False, default=100)
    address = db.Column(db.String(255), nullable=True)
    postal_code = db.Column(db.Integer, nullable=True)


    def to_json(self):
        return {
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "address": self.address,
            "postalCode": self.postal_code,
            "accountBalance": self.account_balance,
        }


# Restaurant Model
class Restaurant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    restaurant_name = db.Column(db.String(80), unique=True, nullable=False)
    address = db.Column(db.String(120), nullable=False)
    postal_code = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text, nullable=False)
    restaurant_type = db.Column(db.String(120), nullable=True)
    account_balance = db.Column(db.Float, nullable=False, default=0)
    opening_hours = db.relationship('OpeningHours', backref='restaurant', lazy=True)
    delivery_areas = db.relationship('DeliveryArea', backref='restaurant', lazy=True)

    def to_json(self):
        return {
            "id": self.id,
            "restaurantName": self.restaurant_name,
            "address": self.address,
            "description": self.description,
            "accountBalance": self.account_balance,
        }


# Menu Table
class Food(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    food_name = db.Column(db.String(32), unique = False, nullable = False)
    food_description = db.Column(db.Text, nullable=True)
    food_price = db.Column(db.Integer, unique = False, nullable = False)
    image = db.Column(db.String(255), nullable=True)  # Optional image path
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False)
    restaurant = db.relationship('Restaurant', backref=db.backref('foods', lazy=True))

    def to_json(self):
        return {
            "id": self.id,
            "foodName": self.food_name,
            "foodPrice": self.food_price,
            "restaurantId": self.restaurant_id,
        }

# Opening Hours Table
class OpeningHours(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    opening_time = db.Column(db.Time, nullable=False)
    closing_time = db.Column(db.Time, nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "openingTime": self.opening_time,
            "closingTime": self.closing_time,
            "restaurantId": self.restaurant_id
        }

# Delivery Area Table
class DeliveryArea(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    postal_code = db.Column(db.String(20), nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "postalCode": self.postal_code,
            "restaurantId": self.restaurant_id
        }

# Order Table
class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    notification_status = db.Column(db.Boolean, default=False) 
    customer_name = db.Column(db.String(100), nullable=False)
    customer_address = db.Column(db.String(255), nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    status = db.Column(db.Enum('pending', 'confirmed', 'declined', 'completed'), nullable=False, default='pending')
    created_at = db.Column(db.DateTime, nullable=False)
    note = db.Column(db.Text, nullable=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'), nullable=False)
    restaurant = db.relationship('Restaurant', backref=db.backref('orders', lazy=True))

    def to_json(self):
        return {
            "id": self.id,
            "customerName": self.customer_name,
            "customerAddress": self.customer_address,
            "totalPrice": self.total_price,
            "status": self.status,
            "createdAt": self.created_at,
            "note": self.note,
            "restaurantId": self.restaurant_id,
            "notification_status": True,
            "customerId" : self.customer_id
        }
    
# OrderItem Table
class OrderItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    price_at_order = db.Column(db.Float, nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)
    order = db.relationship('Order', backref=db.backref('order_foods', lazy=True))
    food_id = db.Column(db.Integer, db.ForeignKey('food.id', ondelete="SET NULL"), nullable=True)
    food = db.relationship('Food', backref=db.backref('order_foods', lazy=True))

    def to_json(self):
        return {
            "id": self.id,
            "quantity": self.quantity,
            "priceAtOrder": self.price_at_order,
            "orderId": self.order_id,
            "foodId": self.food_id
        }


class Lieferspatz(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    balance = db.Column(db.Float, nullable=False)
    

    def to_json(self):
        return{
            "id" : self.id,
            "Balance" : self.balance,
            
        }



class BlacklistedToken(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), nullable=False, unique=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())