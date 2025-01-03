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

class User(db.Model):
    userid = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    address = db.Column(db.String(200), nullable=True)
    post_code = db.Column(db.String(20), nullable=True)
    password = db.Column(db.String(100), nullable=False)

    def to_json(self):
        return{
            "userid": self.userid,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "address": self.address,
            "post_code": self.post_code,
            "password": self.password
        }