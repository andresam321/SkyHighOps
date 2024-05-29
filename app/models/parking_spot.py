from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class ParkingSpot(db.Model):
    __tablename__ = "parking_spot"

    if environment == "production":
        __table_args__ = {'schema':SCHEMA}

id = db.Column(db.Integer, primary_key = True)
user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('user.id')), nullable = False)
aircraft_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('aircraft.id')), unique=True)
spot_number = db.column(db.String(50), nullable = False)
spot_size = db.Column(db.String(50),nullable = False)
is_reserved = db.Column(db.Boolean, nullable = False)
created_at = db.Column(db.DateTime, default=datetime.now)
updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)



#one to many 
employee = db.relationship('User', back_populates ='parking_spots')

#one to one 
aircraft = db.relationship('Aircraft', back_populates = 'parking_spot', uselist=False)





def to_dict(self):

    return {
        "id": self.id,
        "user_id":self.user_id,
        "aircraft_id":self.aircraft_id,
        "spot_number": self.spot_number,
        "spot_size": self.spot_size,
        "is_reserved": self.is_reserved 
        ##add connections down here tooo   
            
    }

