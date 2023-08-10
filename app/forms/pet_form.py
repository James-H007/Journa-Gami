from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Email, Length, ValidationError
from app.models.pet import Pet

def validate_image(form, field):
    if field.data:
        if not (field.data.endswith('.png') or field.data.endswith('.jpg') or field.data.endswith('.jpeg') or field.data.endswith('.gif') or field.data.endswith('.webp')):
            raise ValidationError('Invalid image extension. We accept .jpg, .jpeg, .gif, .webp, and .png.')


class PetForm(FlaskForm):
    name = StringField('name',validators=[Length(min=1, max=26, message="Tag name must be 1 to 26 characters")])
    happiness = IntegerField('happiness')
    avatar_img_url = StringField('avatar')
    banner_img_url = StringField('banner')
    ticket = IntegerField('ticket')
    hunger = IntegerField('hunger')
    state = IntegerField('state')
    submit = SubmitField('Post')
