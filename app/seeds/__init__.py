from flask.cli import AppGroup
from .users import seed_users, undo_users
from .parking_spot import seed_parkingSpots, undo_parkingSpots
from .aircraft import seed_aircrafts, undo_aircrafts
from .owner import seed_owners, undo_owners
from .fuel_order import seed_fuelOrders, undo_fuelOrders
<<<<<<< HEAD
from .airport_parking import seed_airport_parkings, undo_airport_parkings
from .role import seed_roles, undo_roles
=======
from .airport_area import seed_airport_area, undo_airport_area
from .fuel_pricing import seed_fuelPricing, undo_fuelPricing
from .parking_history import seed_parking_history, undo_parking_history
from .fuel_tank import seed_fuel_tank, undo_fuel_tank

>>>>>>> main

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_fuel_tank()
        undo_parking_history()
        undo_fuelPricing()
        undo_airport_area()
        undo_fuelOrders()
        undo_owners()
        undo_parkingSpots()
        undo_aircrafts()
        undo_users()
        undo_roles()
    seed_roles()
    seed_users()
    seed_airport_area()
    seed_parkingSpots()
    seed_aircrafts()
    seed_owners()
    seed_fuelOrders()
    seed_fuelPricing()
    seed_parking_history()
    seed_fuel_tank()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_fuel_tank()
    undo_parking_history()
    undo_fuelPricing()
    undo_airport_area()
    undo_fuelOrders()
    undo_owners()
    undo_parkingSpots()
    undo_aircrafts()
    undo_users()
    undo_roles()
    
    # Add other undo functions here
