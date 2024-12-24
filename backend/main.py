from flask import request, jsonify
from config import app, db
from models import Food

@app.route("/menu", methods = ["GET"])
def get_menu():
    menu = Food.query.all() #need to transfer python objects to json
    json_menu = list(map(lambda x: x.to_json(), menu)) #apply the to_json method for each object and gives a list
    return jsonify({"menu": json_menu})


@app.route("/add_food", methods= ["POST"])
def add_food():
    print("request to add food")
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



if __name__ == "__main__":
    with app.app_context():
        db.create_all() #create all db in the model

    app.run(debug = True)

