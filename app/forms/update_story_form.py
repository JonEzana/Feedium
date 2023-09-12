from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Length
from app.models import Story
from app.api.aws_routes import ALLOWED_EXTENSIONS

class UpdateStoryForm(FlaskForm):
  title = StringField('Title', validators=[DataRequired(), Length(min=5, max=255)])
  story_text = TextAreaField('Tell your story...', validators=[DataRequired(), Length(min=5, max=4000)])
  image_url_1 = StringField('')
  image_url_2 = StringField('')
  image_url_3 = StringField('')
  image_url_4 = StringField('')
  image_url1 = FileField('Upload an image (optional)', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
  image_url2 = FileField('Upload an image (optional)', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
  image_url3 = FileField('Upload an image (optional)', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
  image_url4 = FileField('Upload an image (optional)', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
  submit = SubmitField('Submit')
