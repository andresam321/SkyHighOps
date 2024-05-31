from app.models import db, environment, SCHEMA, AircraftWithParkingSpot
from sqlalchemy.sql import text

def seed_aircraft_with_spots():
    aircraft_with_spots = [
        {
            "aircraft_id": 1,
            "parking_spot_id":1
        },
        {
            "aircraft_id": 2,
            "parking_spot_id":2
        },
        {
            "aircraft_id": 3,
            "parking_spot_id":3
        },
        {
            "aircraft_id": 4,
            "parking_spot_id":4
        },
        {
            "aircraft_id": 5,
            "parking_spot_id":5
        },
        {
            "aircraft_id": 6,
            "parking_spot_id":6
        },
        {
            "aircraft_id": 7,
            "parking_spot_id":7
        },
        {
            "aircraft_id": 8,
            "parking_spot_id":8
        },
    ]

    [db.session.add(AircraftWithParkingSpot(**aircraftWithParkingSpot)) for aircraftWithParkingSpot in aircraft_with_spots]
    db.session.commit()

def undo_aircraft_with_spots():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.aircraft_with_parking_spots RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM aircraft_with_parking_spots"))


    db.session.commit()
