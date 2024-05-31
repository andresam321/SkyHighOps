from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, timezone

class Aircraft(db.Model):
    __tablename__ = "aircrafts"

    if environment == "production":
        __table_args__ = {"schema":SCHEMA}
    
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable = False)
    plane_image = db.Column(db.String,nullable = False)
    tail_number = db.Column(db.String(10), nullable = False)
    manufacturer = db.Column(db.String(255))
    model = db.Column(db.String(255))
    max_takeoff_weight = db.Column(db.String(50))
    seating_capacity = db.Column(db.String(50))
    operation_status = db.Column(db.String(50), nullable = False)
    fuel_type = db.Column(db.String(50), nullable = False)
    active_owners = db.Column(db.String(10),nullable = False)
    notes = db.Column(db.String(255))
    last_time_fueled = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)


    #one to many 
    employee = db.relationship('User', back_populates ='aircrafts')

    #one to one 
    parking_spot_link = db.relationship("AircraftWithParkingSpot", back_populates="aircraft", cascade='all, delete-orphan', single_parent=True, uselist=False)


    def to_dict(self):

        return {
            "id":self.id,
            "user_id":self.user_id,
            "plane_image":self.plane_image,
            "tail_number":self.tail_number,
            "manufacturer":self.manufacturer,
            "model":self.model,
            "max_takeoff_weight":self.max_takeoff_weight,
            "seating_capacity":self.seating_capacity,
            "operation_status":self.operation_status,
            "fuel_type":self.fuel_type,
            "active_owners":self.active_owners,
            "notes":self.notes,
            "last_time_fueled":self.last_time_fueled
        }
    
