from config import db
from models import Restaurant, OpeningHours, DeliveryArea

initial_restaurants = [
    {
        "restaurant": Restaurant(
            restaurant_name="Bamboo Garden",
            address="main",
            description="Chinese",
            account_balance = 0.0,

            
        ),
        "opening_hours": [
            OpeningHours(opening_time="08:00", closing_time="18:00")
        ],
        "delivery_areas": ["40123"],
    },
   
]

def seed_database():
    if Restaurant.query.count() == 0:
        for data in initial_restaurants:
            restaurant = data["restaurant"]
            db.session.add(restaurant)
            db.session.flush()

            for hours in data["opening_hours"]:
                hours.restaurant_id = restaurant.id
                db.session.add(hours)

            for postal_code in data["delivery_areas"]:
                delivery_area = DeliveryArea(postal_code=postal_code, restaurant_id=restaurant.id)
                db.session.add(delivery_area)

        db.session.commit()
        print("Database seeded successfully.")
    else:
        print("Database already seeded. No changes made.")

if __name__ == "__main__":
    seed_database()
