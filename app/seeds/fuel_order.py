from app.models import db, environment, SCHEMA, FuelOrder
from datetime import datetime, timezone
from sqlalchemy.sql import text


def seed_fuelOrders():
    fuel_orders = [
        {
            "user_id": 1,
            "aircraft_id": 1,
            "fuel_type": "Jet-A",
            "request_by": "John Doe",
            "positive_prist": "Yes",
            "quantity": "500 gallons",
            "paid": "Yes",
            "order_date": datetime.now(timezone.utc),
        },
        {
            "user_id": 2,
            "aircraft_id": 2,
            "fuel_type": "Avgas",
            "request_by": "Jane Smith",
            "positive_prist": "No",
            "quantity": "200 gallons",
            "paid": "Yes",
            "order_date": datetime.now(timezone.utc),
        },
        {
            "user_id": 3,
            "aircraft_id": 3,
            "fuel_type": "Jet-A",
            "request_by": "Alice Johnson",
            "positive_prist": "Yes",
            "quantity": "300 gallons",
            "paid": "No",
            "order_date": datetime.now(timezone.utc),
        },
        {
            "user_id": 4,
            "aircraft_id": 4,
            "fuel_type": "Avgas",
            "request_by": "Robert Brown",
            "positive_prist": "No",
            "quantity": "150 gallons",
            "paid": "Yes",
            "order_date": datetime.now(timezone.utc),
        },
        {
            "user_id": 1,
            "aircraft_id": 5,
            "fuel_type": "Jet-A",
            "request_by": "Emily Davis",
            "positive_prist": "Yes",
            "quantity": "400 gallons",
            "paid": "No",
            "order_date": datetime.now(timezone.utc),
        },
        {
            "user_id": 2,
            "aircraft_id": 6,
            "fuel_type": "Avgas",
            "request_by": "William Wilson",
            "positive_prist": "No",
            "quantity": "350 gallons",
            "paid": "Yes",
            "order_date": datetime.now(timezone.utc),
        },
        {
            "user_id": 3,
            "aircraft_id": 7,
            "fuel_type": "Jet-A",
            "request_by": "Olivia Martinez",
            "positive_prist": "Yes",
            "quantity": "250 gallons",
            "paid": "No",
            "order_date": datetime.now(timezone.utc),
        },
        {
            "user_id": 4,
            "aircraft_id": 8,
            "fuel_type": "Avgas",
            "request_by": "James Garcia",
            "positive_prist": "No",
            "quantity": "300 gallons",
            "paid": "Yes",
            "order_date": datetime.now(timezone.utc),
        },
        {
            "user_id": 1,
            "aircraft_id": 9,
            "fuel_type": "Jet-A",
            "request_by": "Sophia Martinez",
            "positive_prist": "Yes",
            "quantity": "450 gallons",
            "paid": "No",
            "order_date": datetime.now(timezone.utc),
        },
        {
            "user_id": 2,
            "aircraft_id": 10,
            "fuel_type": "Avgas",
            "request_by": "Liam Hernandez",
            "positive_prist": "No",
            "quantity": "600 gallons",
            "paid": "Yes",
            "order_date": datetime.now(timezone.utc),
        }
    ]

    [db.session.add(FuelOrder(**fuelOrder)) for fuelOrder in fuel_orders]
    db.session.commit()

def undo_aircrafts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.fuel_order RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM fuel_order"))

    db.session.commit()