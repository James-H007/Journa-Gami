from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SelectField, SubmitField
from wtforms.validators import DataRequired, Length, Email, ValidationError
from app.models import Entry

class EntryForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), Length(min=1, max=36, message="Entry title must be between 1 and 36 characters.")])
    content = StringField('content', validators=[DataRequired(), Length(min= 1, max= 15000, message="Entry content must be between 1 and 15,000 characters.")])
    favorite = BooleanField('favorite', validators=[DataRequired()])
    mood = StringField('mood', validators=[DataRequired()])
    weather = StringField('weather', validators=[DataRequired()])
    location = StringField('location', validators=[DataRequired()])
    submit = SubmitField('Post')
