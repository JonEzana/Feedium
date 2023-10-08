from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Length
from app.models import Topic

class CreateTopicForm(FlaskForm):
  name = StringField('Create topic', validators=[DataRequired(), Length(min=3, max=100)])
  submit = SubmitField('Submit')
