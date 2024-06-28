from app.models import db, environment, SCHEMA, FuelOrder
from datetime import datetime, timezone
from sqlalchemy.sql import text


def seed_fuelOrders():
    fuel_orders = [
        {
            "aircraft_id": 1,
            "completed_by_user_id":1,
            "created_by_user_id":1,
            "parking_spot_id":1,
            "fuel_type": "Jet-A",
            "request_by": "John Doe",
            "positive_prist": "Yes",
            "quantity": "500 gallons",
            "paid": "Yes",
            "is_completed":"Yes",
            "order_date": datetime.now(timezone.utc),
        },
        {
            "aircraft_id": 2,
            "completed_by_user_id":2,
            "created_by_user_id":2,
            "parking_spot_id":2,
            "fuel_type": "Avgas",
            "request_by": "Jane Smith",
            "positive_prist": "No",
            "quantity": "200 gallons",
            "paid": "Yes",
            "is_completed":"Yes",
            "order_date": datetime.now(timezone.utc),
        },
        {
            "aircraft_id": 3,
            "completed_by_user_id":3,
            "created_by_user_id":3,
            "parking_spot_id":3,
            "fuel_type": "Jet-A",
            "request_by": "Alice Johnson",
            "positive_prist": "Yes",
            "quantity": "300 gallons",
            "paid": "No",
            "is_completed":"No",
            "order_date": datetime.now(timezone.utc),
        },
        {
            "aircraft_id": 4,
            "completed_by_user_id":3,
            "created_by_user_id":3,
            "parking_spot_id":9,
            "fuel_type": "Avgas",
            "request_by": "Robert Brown",
            "positive_prist": "No",
            "quantity": "150 gallons",
            "paid": "Yes",
            "is_completed":"Yes",
            "order_date": datetime.now(timezone.utc),
        },
        {
            "aircraft_id": 5,
            "completed_by_user_id":4,
            "created_by_user_id":4,
            "parking_spot_id":10,
            "fuel_type": "Jet-A",
            "request_by": "Emily Davis",
            "positive_prist": "Yes",
            "quantity": "400 gallons",
            "paid": "No",
            "is_completed":"No",
            "order_date": datetime.now(timezone.utc),
        },
        {
            "aircraft_id": 6,
            "completed_by_user_id":1,
            "created_by_user_id":1,
            "parking_spot_id":4,
            "fuel_type": "Avgas",
            "request_by": "William Wilson",
            "positive_prist": "No",
            "quantity": "350 gallons",
            "paid": "Yes",
            "is_completed":"Yes",
            "order_date": datetime.now(timezone.utc),
        },
        {
            "aircraft_id": 7,
            "completed_by_user_id":2,
            "created_by_user_id":2,
            "parking_spot_id":5,
            "fuel_type": "Jet-A",
            "request_by": "Olivia Martinez",
            "positive_prist": "Yes",
            "quantity": "250 gallons",
            "paid": "No",
            "is_completed":"No",
            "order_date": datetime.now(timezone.utc),
        },
        {
            "aircraft_id": 8,
            "completed_by_user_id":3,
            "created_by_user_id":3,
            "parking_spot_id":6,
            "fuel_type": "Avgas",
            "request_by": "James Garcia",
            "positive_prist": "No",
            "quantity": "300 gallons",
            "paid": "Yes",
            "is_completed":"Yes",
            "order_date": datetime.now(timezone.utc),
        },
        {
            "aircraft_id": 9,
            "completed_by_user_id":4,
            "created_by_user_id":4,
            "parking_spot_id":7,
            "fuel_type": "Jet-A",
            "request_by": "Sophia Martinez",
            "positive_prist": "Yes",
            "quantity": "450 gallons",
            "paid": "No",
            "is_completed":"No",
            "order_date": datetime.now(timezone.utc),
        },
        {
            "aircraft_id": 10,
            "completed_by_user_id":2,
            "created_by_user_id":2,
            "parking_spot_id":8,
            "fuel_type": "Avgas",
            "request_by": "Liam Hernandez",
            "positive_prist": "No",
            "quantity": "600 gallons",
            "paid": "Yes",
            "is_completed":"Yes",
            "order_date": datetime.now(timezone.utc),
        }
    ]

    [db.session.add(FuelOrder(**fuelOrder)) for fuelOrder in fuel_orders]
    db.session.commit()

def undo_fuelOrders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.fuel_orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM fuel_orders"))

    db.session.commit()