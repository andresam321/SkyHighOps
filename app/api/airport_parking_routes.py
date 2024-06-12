from flask import Blueprint, redirect, request
from flask_login import login_required, current_user # type: ignore
from app.models import db, ParkingSpot, AirportParking
from app.forms import AirportParkingForm



airport_routes = Blueprint("airport_parkings", __name__)


@airport_routes.route("/all_places")
@login_required
def all_places():
    airport_parkings = AirportParking.query.all()
    return {"airport": [airport_parking.parking_name for airport_parking in airport_parkings]},200


@airport_routes.route("/all_places/with_parking_spots")
@login_required
def all_places_with_parking_spots():
    airport_spots = AirportParking.query.all()
    return {"airport": [airport.to_dict() for airport in airport_spots]},200