from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    journals = db.relationship("Journal", back_populates='user', cascade='all, delete-orphan')

    entries = db.relationship("Entry", back_populates="user", cascade='all, delete-orphan')

    pet = db.relationship("Pet", back_populates="user")

    tags = db.relationship("Tag", back_populates='user', cascade='all, delete-orphan')
    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'journals': [journal.to_dict() for journal in self.journals],
            'entries': [entry.to_dict() for entry in self.entries],
            'tags': [tag.to_dict() for tag in self.tags]
        }
