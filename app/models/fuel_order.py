from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, timezone


class FuelOrder(db.Model):
    __tablename__ = "fuel_order"

    if environment == "production":
        __table_args__ = {"schema":SCHEMA}


    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('user.id')), nullable = False)
    aircraft_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('aircraft.id')), unique=True)
    fuel_type = db.column(db.String(25), nullable = False)
    request_by = db.column(db.String(25), nullable = False)
    positive_prist = db.column(db.String(10), nullable = False)
    quantity = db.column(db.String(255), nullable = False)
    paid = db.column(db.String(55), nullable = False)
    order_date = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)


    # relationships need to be added still


    def to_dict(self):

        return {
            'id': self.id,
            'user_id':self.user_id,
            'aircraft_id':self.aircraft_id,
            'fuel_type':self.fuel_type,
            'request_by':self.request_by,
            'positive_prist':self.positive_prist,
            'quantity':self.quantity,
            'paid':self.paid,
            'order_date':self.order_date
        }
