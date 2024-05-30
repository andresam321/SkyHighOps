from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Owner

def check_firstName(form, field):
    if len(field.data) < 2:
        raise ValidationError("First Name must be at least 2 characters")
    
def check_lastName(form, field):
    if len(field.data) < 2:
        raise ValidationError("Last Name must be at least 2 characters")

class OwnerForm(FlaskForm):
    firstname = StringField("First Name", validators=[DataRequired(), check_firstName])
    lastname = StringField("Last Name", validators=[DataRequired(), check_lastName])
    username = StringField("User Name")
    email = StringField("Email", validators=[DataRequired()])
    address = StringField("Email", validators=[DataRequired()])
    phone_number = StringField("Phone Number", validators=[DataRequired()])
    payment_type = StringField("Payment Type", choices=[('Debit Card', 'Debit Card'), ('Credit Card', 'Credit Card'), ('Cash', 'Cash')])
    notes = StringField("Notes")
    