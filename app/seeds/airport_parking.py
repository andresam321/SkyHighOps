from app.models import db, environment, SCHEMA, AirportParking
from sqlalchemy.sql import text


def seed_airport_parkings():
    airport_parkings = [
        {"parking_name": "North"},
        {"parking_name": "East"},
        {"parking_name": "West"},
        {"parking_name": "South"}
    ]

    [db.session.add(AirportParking(**airport_parking)) for airport_parking in airport_parkings]
    db.session.commit()

def undo_airport_parkings():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.airport_parkings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM airport_parkings"))


    db.session.commit()
