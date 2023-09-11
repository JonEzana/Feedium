from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import SubmitField
from app.models import Story
from app.api.aws_routes import ALLOWED_EXTENSIONS

class AddImagesToStoryForm(FlaskForm):
  image_url1 = FileField('Upload an image (optional)', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
  image_url2 = FileField('Upload an image (optional)', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
  image_url3 = FileField('Upload an image (optional)', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
  image_url4 = FileField('Upload an image (optional)', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
  submit = SubmitField('Submit')
