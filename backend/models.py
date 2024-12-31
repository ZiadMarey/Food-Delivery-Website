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

    def to_json(self):
        return {
            "id": self.id,
            "food_name": self.food_name,
            "food_price": self.food_price,
            "quantity": self.quantity
        }