from flask import Blueprint, redirect, request, jsonify
from flask_login import login_required,current_user
from app.models import db, FuelOrder
from app.forms import FuelOrderForm


fueling_routes = Blueprint("fuelings", __name__)


@fueling_routes.route("/all")
@login_required
def all_fuel_request():
    fuel_requests = FuelOrder.query.all()
    return {"fuel_request":[fuel_request.to_dict() for fuel_request in fuel_requests]}


#uppdate fueling status only
@fueling_routes.route("/<int:id>/update/status", methods=["PUT"])
@login_required
def update_fuel_status(id):
    fuel_order = FuelOrder.query.get(id)
    if not fuel_order:
        return jsonify({"error": "Fuel order not found"}), 404
    
    data = request.json
    if "is_completed" not in data:
        return jsonify({"message": "Missing 'is_completed' field"}), 400
    
    new_status = data["is_completed"]
    if new_status not in ["Yes", "No", "En Route"]:
        return jsonify({"error": "Invalid status value"}), 400
    
    fuel_order.is_completed = new_status
    fuel_order.completed_by_user_id = current_user.id 
    db.session.commit()

    return jsonify({
        "message": f"Fuel order status updated to '{new_status}'",
        "fuel_order": fuel_order.to_dict()
    })

#sends a fuel request to the page
@fueling_routes.route("/aircraft/<int:aircraft_id>/new/fuel_request", methods=["POST"])
@login_required
def create_fuel_request_on_parking_spot(aircraft_id):
    
    form = FuelOrderForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        new_fuel_request = FuelOrder(
        aircraft_id=aircraft_id,
        created_by_user_id=current_user.id,
        parking_spot_id = aircraft_id,
        fuel_type = form.data['fuel_type'],
        request_by = form.data['request_by'],
        positive_prist = form.data['positive_prist'],
        quantity = form.data['quantity'],
        paid = form.data['paid'],
        service_date_deadline_by = form.data["service_date_deadline_by"],
        service_time_deadline_by = form.data["service_time_deadline_by"],
        is_completed = form.data['is_completed'],
        order_date = form.data['order_date']
        
        )
        db.session.add(new_fuel_request)
        db.session.commit()
        
        return new_fuel_request.to_dict(), 201
    else:
        print("Form errors:", form.errors)
        return {'errors':form.errors}, 400



