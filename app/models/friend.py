from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey, ForeignKeyConstraint
from datetime import datetime

# class Friend(db.Model):
#     __tablename__ = "friends"

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key = True)
#     user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
#     friend_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
#     mutual = db.Column(db.Boolean, default=False)
#     created_at = db.Column(db.DateTime, default=datetime.utcnow)
#     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

#     user = db.relationship("User", foreign_keys = [user_id], back_populates="friends")




#     def to_dict_no_user(self):
#         return {
#             'id': self.id,
#             'userId': self.user_id,
#             'friendId': self.friend_id,
#             'createdAt': self.created_at,
#             'updatedAt': self.updated_at
#         }

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'userId': self.user_id,
#             'friendId': self.friend_id,
#             'createdAt': self.created_at,
#             'updatedAt': self.updated_at
#         }


class Friend(db.Model):
    __tablename__ = 'friends'

    if environment == "production":
        __table_args__ = (
            ForeignKeyConstraint(['user_id'], [add_prefix_for_prod('users.id')], name='user_id_fkey',ondelete='CASCADE'),
            ForeignKeyConstraint(['friend_id'], [add_prefix_for_prod('users.id')], name='friend_id_fkey',ondelete='CASCADE'),
            {'schema': SCHEMA}
        )

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
    friend_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
    user = relationship('User', foreign_keys=[user_id], back_populates='added_friends')
    friend = relationship('User', foreign_keys=[friend_id], back_populates='added_by')

    def to_dict(self):
     return {
         'userId': self.user_id,
         'friendId': self.friend_id,
         'user': self.user.to_dict_simple() if self.user else None,
         'friend': self.friend.to_dict() if self.friend else None
     }

class FriendRequest(db.Model):
    __tablename__ = 'friend_requests'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    receiver_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    status = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    sender = relationship('User', back_populates='sent_requests', foreign_keys=[sender_id])
    receiver = relationship('User', back_populates='received_requests', foreign_keys=[receiver_id])

    def to_dict(self):
        return {
            'id': self.id,
            'sender': self.sender.to_dict_simple() if self.sender else None,
            'receiver': self.receiver.to_dict_simple() if self.receiver else None,
            'status': self.status,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
