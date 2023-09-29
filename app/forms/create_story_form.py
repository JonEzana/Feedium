from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Length
from app.models import Story

class CreateStoryForm(FlaskForm):
  title = StringField('Title', validators=[DataRequired(), Length(min=5, max=255)])
  story_text = TextAreaField('Tell your story...', validators=[DataRequired(), Length(min=5, max=6000)])
  submit = SubmitField('Submit')
