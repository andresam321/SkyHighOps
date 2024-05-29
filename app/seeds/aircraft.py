from app.models import db, environment, SCHEMA, Aircraft
from sqlalchemy.sql import text
from faker import Faker
from datetime import datetime, timezone



fake = Faker()

def seed_aircrafts():
    
    planeOne = "https://skyhighimages.s3.us-west-1.amazonaws.com/skyhighops_images/Screenshot+2024-05-02+at+12.43.03%E2%80%AFPM.png"
    planeTwo = "https://skyhighimages.s3.us-west-1.amazonaws.com/skyhighops_images/Screenshot+2024-04-25+at+7.07.18%E2%80%AFPM.png"
    planeThree = "https://skyhighimages.s3.us-west-1.amazonaws.com/skyhighops_images/Screenshot+2024-05-02+at+12.42.40%E2%80%AFPM.png"
    planeFour = "https://skyhighimages.s3.us-west-1.amazonaws.com/skyhighops_images/Screenshot+2024-05-02+at+12.47.51%E2%80%AFPM.png"
    planeFive = "https://skyhighimages.s3.us-west-1.amazonaws.com/skyhighops_images/Screenshot+2024-05-02+at+12.51.59%E2%80%AFPM.png"
    planeSix = "https://skyhighimages.s3.us-west-1.amazonaws.com/skyhighops_images/Screenshot+2024-05-06+at+4.55.06%E2%80%AFPM.png"


    aircrafts = [
        {
            "user_id": 1,
            "plane_image": planeOne,
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
            "plane_image": planeTwo,
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
            "plane_image": planeThree,
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
            "plane_image": planeFour,
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
            "user_id": 1,
            "plane_image": planeSix,
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
            "plane_image": planeFive,
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
            "plane_image": planeOne,
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
            "plane_image": planeTwo,
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
            "user_id": 1,
            "plane_image": planeThree,
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
            "plane_image": planeFour,
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