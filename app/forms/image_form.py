from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, BooleanField
from wtforms.validators import DataRequired, Length, ValidationError, URL
from app.models.journal import EntryImage

def validate_image(form, field):
    if field.data:
        if not (field.data.endswith('.png') or field.data.endswith('.jpg') or field.data.endswith('.jpeg') or field.data.endswith('.gif') or field.data.endswith('.webp')):
            raise ValidationError('Invalid image extension. We accept .jpg, .jpeg, .gif, .webp, and .png.')


class EntryImageForm(FlaskForm):
    image_url = StringField('Image URL', validators=[validate_image])
    submit = SubmitField('Create')
