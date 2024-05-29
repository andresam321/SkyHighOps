from app.models import db, environment, SCHEMA, Aircraft
from sqlalchemy.sql import text
from faker import Faker
from datetime import datetime, timezone



fake = Faker()

def seed_aircrafts():
    aircrafts = [
        {
            "user_id": 1,
            "plane_image": fake.image_url(),
            "tail_number": fake.bothify(text='??-#####'),
            "manufacturer": fake.company(),
            "model": fake.word(),
            "max_takeoff_weight": fake.random_number(digits=5),
            "seating_capacity": fake.random_int(min=1, max=300),
            "operation_status": fake.random_element(elements=("Operational", "Maintenance", "Decommissioned")),
            "fuel_type": fake.random_element(elements=("Jet A", "100ll AvGas", "94 unleaded", "100 unleaded")),
            "active_owners": fake.random_int(min=1, max=10),
            "notes": fake.text(max_nb_chars=200),
            "last_time_fueled": datetime.now(timezone.utc),
            
        },
        {
            "user_id": 2,
            "plane_image": fake.image_url(),
            "tail_number": fake.bothify(text='??-#####'),
            "manufacturer": fake.company(),
            "model": fake.word(),
            "max_takeoff_weight": fake.random_number(digits=5),
            "seating_capacity": fake.random_int(min=1, max=300),
            "operation_status": fake.random_element(elements=("Operational", "Maintenance", "Decommissioned")),
            "fuel_type": fake.random_element(elements=("Jet A", "100ll AvGas", "94 unleaded", "100 unleaded")),
            "active_owners": fake.random_int(min=1, max=10),
            "notes": fake.text(max_nb_chars=200),
            "last_time_fueled": datetime.now(timezone.utc),
            
        },
        {
            "user_id": 3,
            "plane_image": fake.image_url(),
            "tail_number": fake.bothify(text='??-#####'),
            "manufacturer": fake.company(),
            "model": fake.word(),
            "max_takeoff_weight": fake.random_number(digits=5),
            "seating_capacity": fake.random_int(min=1, max=300),
            "operation_status": fake.random_element(elements=("Operational", "Maintenance", "Decommissioned")),
            "fuel_type": fake.random_element(elements=("Jet A", "100ll AvGas", "94 unleaded", "100 unleaded")),
            "active_owners": fake.random_int(min=1, max=10),
            "notes": fake.text(max_nb_chars=200),
            "last_time_fueled": datetime.now(timezone.utc),
        },
        {
            "user_id": 4,
            "plane_image": fake.image_url(),
            "tail_number": fake.bothify(text='??-#####'),
            "manufacturer": fake.company(),
            "model": fake.word(),
            "max_takeoff_weight": fake.random_number(digits=5),
            "seating_capacity": fake.random_int(min=1, max=300),
            "operation_status": fake.random_element(elements=("Operational", "Maintenance", "Decommissioned")),
            "fuel_type": fake.random_element(elements=("Jet A", "100ll AvGas", "94 unleaded", "100 unleaded")),
            "active_owners": fake.random_int(min=1, max=10),
            "notes": fake.text(max_nb_chars=200),
            "last_time_fueled": datetime.now(timezone.utc),
        },
        {
            "user_id": 5,
            "plane_image": fake.image_url(),
            "tail_number": fake.bothify(text='??-#####'),
            "manufacturer": fake.company(),
            "model": fake.word(),
            "max_takeoff_weight": fake.random_number(digits=5),
            "seating_capacity": fake.random_int(min=1, max=300),
            "operation_status": fake.random_element(elements=("Operational", "Maintenance", "Decommissioned")),
            "fuel_type": fake.random_element(elements=("Jet A", "100ll AvGas", "94 unleaded", "100 unleaded")),
            "active_owners": fake.random_int(min=1, max=10),
            "notes": fake.text(max_nb_chars=200),
            "last_time_fueled": datetime.now(timezone.utc),
        },
        {
            "user_id": 6,
            "plane_image": fake.image_url(),
            "tail_number": fake.bothify(text='??-#####'),
            "manufacturer": fake.company(),
            "model": fake.word(),
            "max_takeoff_weight": fake.random_number(digits=5),
            "seating_capacity": fake.random_int(min=1, max=300),
            "operation_status": fake.random_element(elements=("Operational", "Maintenance", "Decommissioned")),
            "fuel_type": fake.random_element(elements=("Jet A", "100ll AvGas", "94 unleaded", "100 unleaded")),
            "active_owners": fake.random_int(min=1, max=10),
            "notes": fake.text(max_nb_chars=200),
            "last_time_fueled": datetime.now(timezone.utc),
        },
        {
            "user_id": 7,
            "plane_image": fake.image_url(),
            "tail_number": fake.bothify(text='??-#####'),
            "manufacturer": fake.company(),
            "model": fake.word(),
            "max_takeoff_weight": fake.random_number(digits=5),
            "seating_capacity": fake.random_int(min=1, max=300),
            "operation_status": fake.random_element(elements=("Operational", "Maintenance", "Decommissioned")),
            "fuel_type": fake.random_element(elements=("Jet A", "100ll AvGas", "94 unleaded", "100 unleaded")),
            "active_owners": fake.random_int(min=1, max=10),
            "notes": fake.text(max_nb_chars=200),
            "last_time_fueled": datetime.now(timezone.utc),
        },
        {
            "user_id": 8,
            "plane_image": fake.image_url(),
            "tail_number": fake.bothify(text='??-#####'),
            "manufacturer": fake.company(),
            "model": fake.word(),
            "max_takeoff_weight": fake.random_number(digits=5),
            "seating_capacity": fake.random_int(min=1, max=300),
            "operation_status": fake.random_element(elements=("Operational", "Maintenance", "Decommissioned")),
            "fuel_type": fake.random_element(elements=("Jet A", "100ll AvGas", "94 unleaded", "100 unleaded")),
            "active_owners": fake.random_int(min=1, max=10),
            "notes": fake.text(max_nb_chars=200),
            "last_time_fueled": datetime.now(timezone.utc),
        },
        {
            "user_id": 9,
            "plane_image": fake.image_url(),
            "tail_number": fake.bothify(text='??-#####'),
            "manufacturer": fake.company(),
            "model": fake.word(),
            "max_takeoff_weight": fake.random_number(digits=5),
            "seating_capacity": fake.random_int(min=1, max=300),
            "operation_status": fake.random_element(elements=("Operational", "Maintenance", "Decommissioned")),
            "fuel_type": fake.random_element(elements=("Jet A", "100ll AvGas", "94 unleaded", "100 unleaded")),
            "active_owners": fake.random_int(min=1, max=10),
            "notes": fake.text(max_nb_chars=200),
            "last_time_fueled": datetime.now(timezone.utc),
        },
        {
            "user_id": 10,
            "plane_image": fake.image_url(),
            "tail_number": fake.bothify(text='??-#####'),
            "manufacturer": fake.company(),
            "model": fake.word(),
            "max_takeoff_weight": fake.random_number(digits=5),
            "seating_capacity": fake.random_int(min=1, max=300),
            "operation_status": fake.random_element(elements=("Operational", "Maintenance", "Decommissioned")),
            "fuel_type": fake.random_element(elements=("Jet A", "100ll AvGas", "94 unleaded", "100 unleaded")),
            "active_owners": fake.random_int(min=1, max=10),
            "notes": fake.text(max_nb_chars=200),
            "last_time_fueled": datetime.now(timezone.utc),
        }
    ]

    [db.session.add(Aircraft(**aircraft)) for aircraft in aircrafts]
    db.session.commit()

def undo_aircrafts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.aircrafts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM aircrafts"))

    db.session.commit()