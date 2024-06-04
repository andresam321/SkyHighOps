from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed#, FileRequired
from wtforms import StringField, IntegerField,DateField,SelectField,DateTimeField,DateTimeLocalField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Aircraft
from ..api.aws_helpers import ALLOWED_EXTENSIONS

def check_tailNumber(form, field):
    if len(field.data) < 3:
        raise ValidationError("Tail # must be at least 3 characters")



class AircraftForm(FlaskForm):
    plane_image = FileField("Plane Image Url", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    tail_number = StringField("Tail Number", validators=[DataRequired(), check_tailNumber])
    manufacturer = StringField("Manufacturer", validators=[DataRequired()])
    model = StringField("Model", validators=[DataRequired()])
    max_takeoff_weight = StringField("Max takeoff weight", validators=[DataRequired()])
    seating_capacity = StringField("Seating Capacity", validators=[DataRequired()])
    operation_status = SelectField("Operation Status", choices=[('Operational', 'Operational'), ('Maintenance', 'Maintenance'), ('Decommissioned', 'Decommissioned')])
    fuel_type = SelectField("Fuel Type", choices = [('100ll AvGas', '100ll AvGas'), ('94 unleaded', '94 unleaded'), ('Jet A', 'Jet A'),('100 unleaded', '100 unleaded')])
    active_owners = StringField("Active Owners", validators=[DataRequired()])
    notes = StringField("Notes")
    last_time_fueled = StringField("Last Time Fueled",)
