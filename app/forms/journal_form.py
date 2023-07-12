from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Email, Length, ValidationError
from app.models import Journal

class JournalForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), Length(min=1, max=24, message="Title must be between 1 and 24 characters.")])
    cover = StringField('cover', validators=[DataRequired()])
    submit = SubmitField('Post')
