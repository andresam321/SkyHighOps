from flask import Blueprint, redirect, request
from flask_login import login_required, current_user # type: ignore
from app.models import db, ParkingSpot, AirportParking
from app.forms import AirportParkingForm



airport_routes = Blueprint("airport_parkings", __name__)


@airport_routes.route("/all_places/with_parking_spots")
def all_places():
    airport_parkings = AirportParking.query.all()
    return {"airport": [airport_parking.parking_name for airport_parking in airport_parkings]},200


@airport_routes.route("/all_places")
@login_required
def all_places_with_parking_spots():
    airport_spots = AirportParking.query.all()
    return {"airport": [airport.to_dict() for airport in airport_spots]},200


@airport_routes.route('/<int:parking_id>/spots')
@login_required
def get_parking_spots(parking_id):
    airport_parking = AirportParking.query.get(parking_id)
    print(f"Fetching parking spots for parking ID: {parking_id}")
    if not airport_parking:
        return {'error': 'AirportParking not found'}, 404
    
    parking_spots = ParkingSpot.query.filter_by(airport_parking_id=parking_id).all()
    print(f"Found parking spots: {[spot.to_dict() for spot in parking_spots]}")
    return [spot.to_dict() for spot in parking_spots], 200
