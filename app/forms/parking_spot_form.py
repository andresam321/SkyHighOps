from flask_wtf import FlaskForm
from wtforms import StringField,SelectField,BooleanField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from ..models import ParkingSpot



def check_spot(form, field):
    spot_number = field.data
    parkingSpot = ParkingSpot.query.filter(ParkingSpot.spot_number == spot_number).first()
    if parkingSpot:
        raise ValidationError("Spot number already in use")
    

class ParkingSpotForm(FlaskForm):
    spot_number = StringField("Spot Number", validators=[DataRequired(), check_spot])
    spot_size = SelectField("Spot Number",choices=[('Small','Small'), ('Medium','Medium'), ('Large','Large')], validators=[DataRequired()])
    is_reserved = SelectField("Is Reserved", choices=[('Yes','Yes'), ('No','No')], validators=[DataRequired()])
