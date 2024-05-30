from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField,DecimalField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from ..models import ParkingSpot


def check_spot(form, field):
    if len(field.data) < 2:
        raise ValidationError("Name must be at least 2 characters")
    

class ParkingSpotForm(FlaskForm):
    spot_number = StringField("Spot Number", validators=[DataRequired(), check_spot])
    spot_size = StringField("Spot Number",choices=[('Small', 'Small'), ('Medium', 'Medium'), ('Large', 'Large')], validators=[DataRequired()])
    is_reserved = BooleanField("Is Reserved", default=False)
