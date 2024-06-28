from flask import Blueprint, redirect, request, jsonify
from flask_login import login_required,current_user
from app.models import db, Owner,Aircraft
from app.forms import OwnerForm,OwnerUpdateForm



owner_routes = Blueprint('owners', __name__)


#display all the owners that correspond to that aircraft ID
@owner_routes.route("/aircrafts/<int:aircraft_id>")
@login_required
def get_owners_by_aircraft(aircraft_id):
    owners = Owner.query.filter_by(aircraft_id=aircraft_id).all()

    if not owners:
        return jsonify({"message": "No owners found for the specified aircraft"}), 404

    data = [owner.to_dict() for owner in owners]

    return jsonify({"owners": data}), 200

#get one owner by ID
@owner_routes.route("/<int:id>")
@login_required
def get_one_owner_by_id(id):
    owners = Owner.query.get(id)

    if not owners:
        return jsonify({"message": "Owner couldnt be found"}), 404
    return owners.to_dict(), 200


#add an owner to the aircraft
@owner_routes.route("/<int:aircraft_id>/new/owner/to_aircraft", methods=['POST'])
@login_required
def create_owner(aircraft_id):
    
    form = OwnerForm()
    form["csrf_token"].data = request.cookies["csrf_token"] 

    if form.validate_on_submit():
        new_owner = Owner(
            created_by_user_id=current_user.id,
            aircraft_id=aircraft_id,
            firstname=form.data["firstname"],
            lastname=form.data['lastname'],
            username=form.data['username'],
            email=form.data["email"],
            address=form.data["address"],
            phone_number=form.data['phone_number'],
            payment_type=form.data['payment_type'],
            notes=form.data['notes']
        )
        db.session.add(new_owner)
        db.session.commit()
        print(new_owner)
        return new_owner.to_dict(), 201  
    else:
        print("Form errors:", form.errors)
        return {"errors": form.errors}, 400   
    

#update an owner
@owner_routes.route("/<int:aircraft_id>/owner/<int:owner_id>", methods=['PUT'])
@login_required
def update_owner(owner_id, aircraft_id):

    owner = Owner.query.get(owner_id)

    
    form = OwnerForm()


    form["csrf_token"].data = request.cookies["csrf_token"]

    if not owner:
        return {"message": "Owner couldn't be found"}, 404

    if form.validate_on_submit():
        owner.firstname = form.data["firstname"]
        owner.lastname = form.data['lastname']
        owner.username = form.data['username']
        owner.email = form.data["email"]
        owner.address = form.data["address"]
        owner.phone_number = form.data['phone_number']
        owner.payment_type = form.data['payment_type']
        owner.notes = form.data['notes']

        db.session.commit()
        return owner.to_dict(), 200

    print("Form errors:", form.errors)
    return {"errors": form.errors}, 400



#DELEte an owner
@owner_routes.route("/<int:id>/owner/<int:owner_id>", methods = ["DELETE"])
@login_required
def delete_owner(id, owner_id):
    individual_owner = Owner.query.get(owner_id)

    if not individual_owner:
        return {"message": "Owner couldn't be found"}, 404
    else:
        db.session.delete(individual_owner)
        db.session.commit()
    
    return {"Message": "Succesfully Deleted Owner"}, 200



