from config import db

class Food(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    food_name = db.Column(db.String(32), unique = False, nullable = False)
    food_price = db.Column(db.String(8), unique = False, nullable = False)

    def to_json(self):
        return{
            "id": self.id,
            "food_name": self.food_name,
            "food_price": self.food_price
        }

#items in cart
class Cart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    food_name = db.Column(db.String(32), nullable=False)
    food_price = db.Column(db.String(8), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    restaurant_name = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False) 


    def to_json(self):
        return {
            "id": self.id,
            "food_name": self.food_name,
            "food_price": self.food_price,
            "quantity": self.quantity,
            "restaurant_name" : self.restaurant_name
        }
    

# order table - used by order history
class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_name = db.Column(db.String(100), nullable=False)
    customer_address = db.Column(db.String(255), nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    status = db.Column(db.Enum('Ongoing', 'Declined', 'Completed'), nullable=False, default='Pending')
    date_ordered = db.Column(db.DateTime, nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False)
    restaurant_name  = db.relationship('Restaurant', backref=db.backref('orders', lazy=True))

    def __repr__(self):
        return f'<Order {self.id} - {self.status}>'


class Restaurant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    restaurant_name = db.Column(db.String(80), unique=True, nullable=False)
    address = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=True)
    image = db.Column(db.String(255), nullable=True)  # Optional image path
    opening_hours = db.relationship('OpeningHours', backref='restaurant', lazy=True)
    delivery_areas = db.relationship('DeliveryArea', backref='restaurant', lazy=True)

    def __repr__(self):
        return f'<Restaurant {self.name}>'
    

# Opening Hours Table
class OpeningHours(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    day_of_week = db.Column(db.String(20), nullable=False)
    start_time = db.Column(db.Time, nullable=False)
    end_time = db.Column(db.Time, nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False)

    def __repr__(self):
        return f'<OpeningHours {self.day_of_week} {self.start_time}-{self.end_time}>'

# Delivery Area Table
class DeliveryArea(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    postal_code = db.Column(db.String(20), nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False)

    def __repr__(self):
        return f'<DeliveryArea {self.postal_code}>'