from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Email, Length, ValidationError
from app.models import Tag

class TagForm(FlaskForm):
    tag_name = StringField(validators=[Length(min=1, max=50, message="Tag name must be 1 to 50 characters")])
    submit = SubmitField('Post')
