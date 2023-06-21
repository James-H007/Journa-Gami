from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Email, Length, ValidationError
from app.models.pet import Pet


class PetForm(FlaskForm):
    name = StringField('name',validators=[Length(min=1, max=26, message="Tag name must be 1 to 26 characters")])
    happiness = IntegerField('happiness')
    submit = SubmitField('Post')
