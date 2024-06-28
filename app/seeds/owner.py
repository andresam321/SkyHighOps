from app.models import db, environment, SCHEMA, Owner
from sqlalchemy.sql import text


def seed_owners():
    owners = [
        {
            "created_by_user_id": 1,
            "aircraft_id": 1,
            "firstname": "John",
            "lastname": "Doe",
            "username": "johndoe",
            "email": "johndoe@example.com",
            "address": "123 Main St",
            "phone_number": "1234567890",
            "payment_type": "Credit Card",
            "notes": "VIP customer",
        },
        {
            "created_by_user_id": 2,
            "aircraft_id": 2,
            "firstname": "Jane",
            "lastname": "Smith",
            "username": "janesmith",
            "email": "janesmith@example.com",
            "address": "456 Elm St",
            "phone_number": "2345678901",
            "payment_type": "PayPal",
            "notes": "Frequent flyer",
        },
        {
            "created_by_user_id": 3,
            "aircraft_id": 3,
            "firstname": "Alice",
            "lastname": "Johnson",
            "username": "alicejohnson",
            "email": "alicejohnson@example.com",
            "address": "789 Oak St",
            "phone_number": "3456789012",
            "payment_type": "Debit Card",
            "notes": "Prefers window seat",
        },
        {
            "created_by_user_id": 4,
            "aircraft_id": 4,
            "firstname": "Bob",
            "lastname": "Brown",
            "username": "bobbrown",
            "email": "bobbrown@example.com",
            "address": "321 Pine St",
            "phone_number": "4567890123",
            "payment_type": "Credit Card",
            "notes": "Loyal customer",
        },
        {
            "created_by_user_id": 1,
            "aircraft_id": 5,
            "firstname": "Charlie",
            "lastname": "Davis",
            "username": "charliedavis",
            "email": "charliedavis@example.com",
            "address": "654 Cedar St",
            "phone_number": "5678901234",
            "payment_type": "Bitcoin",
            "notes": "Travel blogger",
        },
        {
            "created_by_user_id": 2,
            "aircraft_id": 6,
            "firstname": "Diana",
            "lastname": "Evans",
            "username": "dianaevans",
            "email": "dianaevans@example.com",
            "address": "987 Spruce St",
            "phone_number": "6789012345",
            "payment_type": "Credit Card",
            "notes": "Business traveler",
        },
        {
            "created_by_user_id": 3,
            "aircraft_id": 7,
            "firstname": "Ethan",
            "lastname": "Garcia",
            "username": "ethangarcia",
            "email": "ethangarcia@example.com",
            "address": "123 Maple St",
            "phone_number": "7890123456",
            "payment_type": "PayPal",
            "notes": "Prefers aisle seat",
        },
        {
            "created_by_user_id": 4,
            "aircraft_id": 8,
            "firstname": "Fiona",
            "lastname": "Harris",
            "username": "fionaharris",
            "email": "fionaharris@example.com",
            "address": "456 Birch St",
            "phone_number": "8901234567",
            "payment_type": "Debit Card",
            "notes": "First time flyer",
        },
        {
            "created_by_user_id": 1,
            "aircraft_id": 9,
            "firstname": "Jorge",
            "lastname": "Ivy",
            "username": "jorgeivy",
            "email": "jorgeivy@example.com",
            "address": "789 Walnut St",
            "phone_number": "9012345678",
            "payment_type": "Credit Card",
            "notes": "Frequent upgrades",
        },
        {
            "created_by_user_id": 2,
            "aircraft_id": 10,
            "firstname": "Hannah",
            "lastname": "Jones",
            "username": "hannahjones",
            "email": "hannahjones@example.com",
            "address": "321 Ash St",
            "phone_number": "0123456789",
            "payment_type": "Bitcoin",
            "notes": "Student traveler",
        }
    ]

    [db.session.add(Owner(**owner)) for owner in owners]
    db.session.commit()


def undo_owners():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.owners RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM owners"))

    db.session.commit()