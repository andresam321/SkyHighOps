from flask import Blueprint, redirect, request
from flask_login import login_required, current_user # type: ignore
from app.models import db, ParkingSpot, Aircraft
from app.forms import ParkingSpotForm, AircraftForm,UpdateParkingSpotForm
from .aws_helpers import upload_file_to_s3, get_unique_filename



parking_routes = Blueprint('parking_spots', __name__)



# read all spots, list of all parking spots 
@parking_routes.route("/all_spots")
@login_required
def all_spots():
    parkingSpots = ParkingSpot.query.all()
    return {"parkingSpots": [parkingSpot.to_dict() for parkingSpot in parkingSpots]}, 200


@parking_routes.route("/empty")
@login_required
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
@parking_routes.route("/new", methods=["POST"])
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
    
    form = UpdateParkingSpotForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        # Check if the new spot number already exists
        if ParkingSpot.query.filter_by(spot_number=form.data['spot_number']).first() is not None:
            return {"message": "Parking Spot number already exists"}

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
    aircraft = Aircraft.query.filter_by(parking_spot_id=id).first()

    if not parkingSpot:
        return {"message": "Parking spot couldn't be found"}, 404

    if aircraft:
        return {"message": "Parking spot is assigned to an aircraft and cannot be deleted"}, 400
    else:
        db.session.delete(parkingSpot)
        db.session.commit()

        return {"message": "Successfully deleted parkingSpot"}, 200


#add an aircraft to a parking spot
# @parking_routes.route("/<int:parking_spot_id>/add_plane/<int:aircraft_id>", methods=['POST'])
# @login_required
# def add_aircraft_to_parking(aircraft_id,parking_spot_id):
#         aircraft_with_parking_spot_obj = AircraftWithParkingSpot(
#         aircraft_id=aircraft_id,
#         parking_spot_id=parking_spot_id
#         )

#         db.session.add(aircraft_with_parking_spot_obj)
#         db.session.commit()

#         return {"message": "Plane added to parking spot successfully"}, 201
    

#render parking spots with airplanes
# @parking_routes.route("/with_aircrafts")
# def get_parking_spots_with_aircraft():
#     parking_spots_with_planes = AircraftWithParkingSpot.query.all()
#     return {"parkingSpots": [spot_and_plane.to_dict() for spot_and_plane in parking_spots_with_planes]}, 200

@parking_routes.route("/with_aircrafts")
@login_required
def get_parking_spots_with_aircraft():
    parking_spots = ParkingSpot.query.outerjoin(Aircraft).all()
    return {
        "parkingSpots": [
            {**parking_spot.to_dict(), "aircraft": parking_spot.aircraft.to_dict() if parking_spot.aircraft else None} 
            for parking_spot in parking_spots
        ]
    }, 200



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



#remove plane from parking spot wont delete from db
# @parking_routes.route("/<int:parking_spot_id>/remove_plane/<int:aircraft_id>", methods=['POST'])
# @login_required
# def remove_aircraft_from_parking(parking_spot_id,aircraft_id):

#     aircraft_with_parking_spot = AircraftWithParkingSpot.query.filter_by(parking_spot_id = parking_spot_id, aircraft_id = aircraft_id).first()

#     if not aircraft_with_parking_spot:
#         return {"message": "Association between aircraft and parking spot couldnt be found"},404
    
#     # remove the association
#     db.session.delete(aircraft_with_parking_spot)

#     parking_spot = ParkingSpot.query.get(parking_spot_id)
#     if parking_spot:
#         parking_spot.is_reserved = "No"

#     db.session.commit()

#     return {"message": "Aircraft removed from parking spot successfully"}, 200


#assign aircraft to parking spot 
@parking_routes.route("/assign_aircraft_to_parking_spot", methods=['POST'])
@login_required
def assign_aircraft_to_parking_spot():
    data = request.get_json()

    parking_spot_id = data.get('parking_spot_id')
    aircraft_id = data.get('aircraft_id')

    if not parking_spot_id or not aircraft_id:
        return {"error": "Parking spot ID or aircraft ID missing"}, 400

    parking_spot = ParkingSpot.query.get(parking_spot_id)
    if not parking_spot:
        return {"error": "Parking spot not found"}, 404
    
    aircraft = Aircraft.query.get(aircraft_id)
    if not aircraft:
        return {"error": "Aircraft not found"}, 404
    
    if parking_spot.aircraft_id:
        return {"error": "Parking spot already occupied"}, 400

    parking_spot.aircraft_id = aircraft_id
    db.session.add()
    db.session.commit()

    return {"message": "Aircraft assigned to parking spot successfully"}, 201



#current spots with airplanes
@parking_routes.route("/current_spots_with_planes")
@login_required
def current_spots_with_planes():
    pass