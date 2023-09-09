from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Length, URL
from app.models import Comment

class UpdateStoryForm(FlaskForm):
  title = StringField('Title', validators=[DataRequired(), Length(min=5, max=255)])
  story_text = TextAreaField('Tell your story...', validators=[DataRequired(), Length(min=5, max=4000)])
  image_url = StringField('Add a photo (optional)')
  submit = SubmitField('Submit')
