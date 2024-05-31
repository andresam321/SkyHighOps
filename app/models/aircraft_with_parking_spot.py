from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, timezone


class AircraftWithParkingSpot(db.Model):
    __tablename__ = "aircraft_with_parking_spots"

    if environment == "production":
        __table_args__ = {"schema":SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    aircraft_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('aircrafts.id')),nullable=False)
    parking_spot_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('parking_spots.id')), nullable=False)


    aircraft = db.relationship('Aircraft', back_populates = 'parking_spot_link',cascade='all, delete-orphan', uselist=False,single_parent=True)

    parking_spot = db.relationship("ParkingSpot",back_populates = "aircraft_link",cascade='all, delete-orphan',single_parent=True,uselist=False)

    def to_dict(self):
        return {
            'aircraft_id': self.aircraft_id,
            'parking_spot_id': self.parking_spot_id,
            'aircraft': self.aircraft.to_dict(),
            'parking_spot': self.parking_spot.to_dict()
        }