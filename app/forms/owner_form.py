from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField,SelectField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Owner

def check_firstName(form, field):
    if len(field.data) < 2:
        raise ValidationError("First Name must be at least 2 characters")
    
def check_lastName(form, field):
    if len(field.data) < 2:
        raise ValidationError("Last Name must be at least 2 characters")
    
def user_exists(form, field):
    # Checking if user exists
    email = field.data
    owner = Owner.query.filter(Owner.email == email).first()
    if owner:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    owner = Owner.query.filter(Owner.username == username).first()
    if owner:
        raise ValidationError('Username is already in use.')


class OwnerForm(FlaskForm):
    firstname = StringField("First Name", validators=[DataRequired(), check_firstName])
    lastname = StringField("Last Name", validators=[DataRequired(), check_lastName])
    username = StringField("User Name", validators=[DataRequired()])
    email = StringField("Email", validators=[DataRequired()])
    address = StringField("address", validators=[DataRequired()])
    phone_number = StringField("Phone Number", validators=[DataRequired()])
    payment_type = SelectField("Payment Type", choices=[('Debit Card', 'Debit Card'), ('Credit Card', 'Credit Card'), ('Cash', 'Cash'), ('Other', 'Other')])
    notes = StringField("Notes")

class OwnerUpdateForm(FlaskForm):
    firstname = StringField("First Name", validators=[DataRequired()])
    lastname = StringField("Last Name", validators=[DataRequired()])
    username = StringField("User Name", validators=[DataRequired()])
    email = StringField("Email", validators=[DataRequired()])
    address = StringField("address", validators=[DataRequired()])
    phone_number = StringField("Phone Number", validators=[DataRequired()])
    payment_type = SelectField("Payment Type", choices=[('Debit Card', 'Debit Card'), ('Credit Card', 'Credit Card'), ('Cash', 'Cash'), ('Other', 'Other')])
    notes = StringField("Notes")