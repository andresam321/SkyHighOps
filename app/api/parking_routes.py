from flask import Blueprint, redirect, request
from flask_login import login_required, current_user
from app.models import db, ParkingSpot, Aircraft, AircraftWithParkingSpot
from app.forms import ParkingSpotForm, AircraftForm
from .aws_helpers import upload_file_to_s3, get_unique_filename



parking_routes = Blueprint('parking_spots', __name__)



# read all spots, list of all parking spots 
@parking_routes.route("/")
def all_spots():
    parkingSpots = ParkingSpot.query.all()
    return {"parkingSpots": [parkingSpot.to_dict() for parkingSpot in parkingSpots]}, 200


@parking_routes.route("/empty")
def all_spots_that_are_not_reserved():
    # Adjusting the filter condition to match the string representation of 'is_reserved'
    emptyParkingSpots = ParkingSpot.query.filter_by(is_reserved="No").all()
    return {"parkingSpots": [parkingSpot.to_dict() for parkingSpot in emptyParkingSpots]}, 200


#gets parking spot by id
@parking_routes.route("/<int:id>")
@login_required
def parking_spot_by_id(id):
    parkingSpot = ParkingSpot.query.get(id)
    if not parkingSpot:
        return {"message": "Parking spot couldnt be found"}, 404
    return parkingSpot.to_dict(),200


#creating a parking spot
@parking_routes.route("/", methods=["POST"])
@login_required
def create_parking_spot():
    print("In create form =>")

    form = ParkingSpotForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        new = ParkingSpot(
            user_id = current_user.id,
            spot_number = form.data["spot_number"],
            spot_size = form.data["spot_size"],
            is_reserved = form.data["is_reserved"]
        )
        db.session.add(new)
        db.session.commit()

        return new.to_dict(), 201
    else:
        return form.errors, 400


#update parking spot
@parking_routes.route('/<int:id>',methods=['PUT'])
@login_required
def update_parking_spot(id):
    parkingSpot = ParkingSpot.query.get(id)
    if not parkingSpot:
        return {"message": "Parking Spot couldnt be found"}, 404
    
    form = ParkingSpotForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        parkingSpot.spot_number = form.data['spot_number']
        parkingSpot.spot_size = form.data['spot_size']
        parkingSpot.is_reserved = form.data['is_reserved']

        db.session.commit()
    
        return parkingSpot.to_dict(), 200
    else:
        return form.errors, 400


#delete parking spot
@parking_routes.route("/<int:id>", methods = ["DELETE"])
@login_required
def delete_parking_spot(id):
    parkingSpot = ParkingSpot.query.get(id)
    if not parkingSpot:
        return {"message": "parkingSpot couldn't be found"}, 404
    else:
        db.session.delete(parkingSpot)
        db.session.commit()

        return {"message": "Successfully deleted parkingSpot"}, 200


#add an aircraft to a parking spot
@parking_routes.route("/<int:parking_spot_id>/add_plane/<int:aircraft_id>", methods=['POST'])
@login_required
def add_aircraft_to_parking(aircraft_id,parking_spot_id):
        aircraft_with_parking_spot_obj = AircraftWithParkingSpot(
        aircraft_id=aircraft_id,
        parking_spot_id=parking_spot_id
        )

        db.session.add(aircraft_with_parking_spot_obj)
        db.session.commit()

        return {"message": "Plane added to parking spot successfully"}, 201
    

#render parking spots with airplanes
@parking_routes.route("/with_aircrafts")
# @login_required
def get_parking_spots_with_aircraft():
    parking_spots_with_planes = AircraftWithParkingSpot.query.all()
    return {"parkingSpots": [spot_and_plane.to_dict() for spot_and_plane in parking_spots_with_planes]}, 200



# Edit a parking spot to assign an aircraft
@parking_routes.route("/<int:parking_spot_id>/edit", methods=['POST'])
@login_required
def edit_parking_spot(parking_spot_id):
    
    parking_spot = ParkingSpot.query.get()
    if not parking_spot:
        return {"message": "parkingSpot couldn't be found"}, 404
    aircraft_id = request.json.get(aircraft_id)

    aircraft = Aircraft.query.get(aircraft_id)
    if not aircraft:
        return {"message": "Parking spot couldnt be found"}, 404
    
    parking_spot.aircraft_id = aircraft_id
    parking_spot.is_reserved = "Yes"

    db.session.commit()

    return {"message": "Plane added to parking spot successfully"}, 201



#current spots with airplanes
@parking_routes.route("/current_spots_with_planes")
@login_required
def current_spots_with_planes():
    pass