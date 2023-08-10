from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Email, Length, ValidationError
from app.models import Friend

class FriendForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    friend_id = IntegerField('friend_id', validators=[DataRequired()])
    submit = SubmitField('Add')
