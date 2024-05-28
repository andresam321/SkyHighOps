from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField
from app.routes.aws_helpers import ALLOWED_EXTENSIONS

class ImageForm(FlaskForm):
    image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Create Post")






    # If you are using templating in 
    # your application, you will want to make a minor 
    # change to the form in the template file, making 
    # sure you have set the encription type on the form 
    # as follows (we now need "multipart/form-data" 
    # type since we are sending data as well as a file):


    # <form action="/posts/new" method="POST" enctype="multipart/form-data">