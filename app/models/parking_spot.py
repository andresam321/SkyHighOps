from .db import db, environment, SCHEMA, add_prefix_for_prod

class ParkingSpot(db.Model):
    __tablename__ = "parkingspot"

    if environment == "production":
        __table_args__ = {'schema':SCHEMA}

id = db.Column(db.Integer, primary_key = True)
user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('user.id')), nullable = False)
aircraft_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('aircraft.id')), unique=True)
spot_number = db.column(db.String(50), nullable = False)
spot_size = db.Column(db.String(50),nullable = False)
is_reserved = db.Column(db.Boolean, nullable = False)


#one to one ## need to add connections
employee = db.relationship('User', back_populates ='parking_spots')
aircraft = db.relationship('Aircraft', back_populates = 'parking_spot')





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

