from flask_wtf import FlaskForm
from wtforms import StringField,SelectField,BooleanField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from ..models import ParkingSpot



def check_spot(form, field):
    spot_number = field.data
    airport_parking_id = form.airport_parking_id.data
    parkingSpot = ParkingSpot.query.filter(ParkingSpot.spot_number == spot_number).first()
    if parkingSpot:
        raise ValidationError("Spot number already in use")
    if not spot_number.startswith(get_prefix(airport_parking_id)):
        raise ValidationError(f"Spot number must start with '{get_prefix(airport_parking_id)}' for the selected parking area")

def get_prefix(parking_area_id):
    prefixes = {
        '1': 'N',  # North
        '2': 'E',  # East
        '3': 'W',  # West
        '4': 'S'   # South
    }
    return prefixes.get(parking_area_id, '')

class ParkingSpotForm(FlaskForm):
    airport_parking_id = SelectField("Airport Parking ID", choices=[('1','North'), ('2','East'),('3','West'), ('4','South')], validators=[DataRequired()])
    spot_number = StringField("Spot Number", validators=[DataRequired(), check_spot])
    spot_size = SelectField("Spot Size", choices=[('Small','Small'), ('Medium','Medium'), ('Large','Large')], validators=[DataRequired()])
    is_reserved = SelectField("Is Reserved", choices=[('Yes','Yes'), ('No','No')], validators=[DataRequired()])

class UpdateParkingSpotForm(FlaskForm):
    spot_number = StringField("Spot Number", validators=[DataRequired()])
    spot_size = SelectField("Spot Size", choices=[('Small','Small'), ('Medium','Medium'), ('Large','Large')], validators=[DataRequired()])
    is_reserved = SelectField("Is Reserved", choices=[('Yes','Yes'), ('No','No')], validators=[DataRequired()])