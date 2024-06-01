from flask import Blueprint, redirect, request
from flask_login import login_required,current_user
from app.models import db, Aircraft, ParkingSpot
from app.forms import AircraftForm, ParkingSpotForm
from .aws_helpers import upload_file_to_s3, get_unique_filename

aircraft_routes = Blueprint('aircrafts', __name__)



#display all aircraft 
@aircraft_routes.route("/")
@login_required
def all_aircrafts():
    aircrafts = Aircraft.query.all()
    return {"aircrafts": [aircraft.to_dict() for aircraft in aircrafts]}, 200

#display one aircraft by ID
@aircraft_routes.route("/<int:id>")
@login_required
def aircraft_by_id(id):
    aircraft = Aircraft.query.get(id)
    if not aircraft:
        return {"message":"Aircraft  couldnt be found"},404
    return aircraft.to_dict(),200


#creating airplane 
@aircraft_routes.route("/", methods=["POST"])
@login_required
def create_parking_spot():
    print("In create form =>")

    form = AircraftForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    image = form.data["plane_image"]
    url = None

    if image:
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        if "url" not in upload:
            return {"product_image": "Image upload failed. Please try again later."}, 500
        url = upload["url"]
    
    if form.validate_on_submit():
        new_aircraft = Aircraft(
            user_id=current_user.id,
            plane_image=url,
            tail_number=form.data['tail_number'],
            manufacturer=form.data['manufacturer'],
            model=form.data['model'],
            max_takeoff_weight=form.data['max_takeoff_weight'],
            seating_capacity=form.data['seating_capacity'],
            operation_status=form.data['operation_status'],
            fuel_type=form.data['fuel_type'],
            active_owners=form.data['active_owners'],
            notes=form.data['notes'],
            last_time_fueled=form.data['last_time_fueled']
        )
        db.session.add(new_aircraft)
        db.session.commit()

        return new_aircraft.to_dict(), 201
    else:
        return form.errors, 400


#update aircraft by id
#update parking spot
@aircraft_routes.route('/<int:id>',methods=['PUT'])
@login_required
def update_parking_spot(id):
    aircraft = Aircraft.query.get(id)
    if not aircraft:
        return {"message": "Parking Spot couldnt be found"}, 404
    
    form = AircraftForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    image = form.data["plane_image"]
    url = None

    if image:
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        if "url" not in upload:
            return {"product_image": "Image upload failed. Please try again later."}, 500
        url = upload["url"]

    if form.validate_on_submit():
        aircraft.plane_image=url,
        aircraft.tail_number=form.data['tail_number'],
        aircraft.manufacturer=form.data['manufacturer'],
        aircraft.model=form.data['model'],
        aircraft.max_takeoff_weight=form.data['max_takeoff_weight'],
        aircraft.seating_capacity=form.data['seating_capacity'],
        aircraft.operation_status=form.data['operation_status'],
        aircraft.fuel_type=form.data['fuel_type'],
        aircraft.active_owners=form.data['active_owners'],
        aircraft.notes=form.data['notes'],
        aircraft.last_time_fueled=form.data['last_time_fueled']

        db.session.commit()
    
        return aircraft.to_dict(), 200
    else:
        return form.errors, 400


#delete plane by id
@aircraft_routes.route("/<int:id>", methods = ["DELETE"])
@login_required
def delete_parking_spot(id):
    aircraft = Aircraft.query.get(id)
    if not aircraft:
        return {"message": "aircraft couldn't be found"}, 404
    else:
        db.session.delete(aircraft)
        db.session.commit()

        return {"message": "Successfully deleted aircraft"}, 200
