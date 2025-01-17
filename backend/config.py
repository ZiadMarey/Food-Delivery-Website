from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import timedelta
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['JWT_SECRET_KEY'] = '3a8e7fb2c9b1f4dca0f5c3a9d8e9a2b7f6d4c1e2a3f8b7d6c9e1a2f4d3b6c5e7'
app.config['JWT_HEADER_TYPE'] = 'Bearer'

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///food_delivery.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

