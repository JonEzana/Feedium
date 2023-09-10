from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User
from app.api.aws_routes import ALLOWED_EXTENSIONS


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    first_name = StringField('First name', validators=[DataRequired(), Length(min=3, max=50)])
    last_name = StringField('Last name', validators=[DataRequired(), Length(min=3, max=50)])
    username = StringField('username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    profile_pic = FileField('Profile Pic', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    password = StringField('password', validators=[DataRequired()])
    submit = SubmitField('Sign up')
