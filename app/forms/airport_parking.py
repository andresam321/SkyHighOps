from flask_wtf import FlaskForm
from wtforms import StringField,SelectField,BooleanField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from ..models import AirportParking

class AirportParkingForm(FlaskForm):
    parking_name = SelectField("parking name",choices=[('North','North'), ('East','East'), ('West','West'),('South','South')], validators=[DataRequired()])
