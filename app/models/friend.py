from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Friend(db.Model):
    __tablename__ = "friends"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    friend_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship("User", foreign_keys = [user_id],back_populates="friends")
    friend_user = db.relationship("User", foreign_keys=[friend_id],back_populates="friends")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'friendId': self.friend_id,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
