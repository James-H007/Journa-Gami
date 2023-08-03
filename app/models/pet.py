from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Pet(db.Model):
    __tablename__ = "pets"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(26), nullable=False)
    happiness = db.Column(db.Integer, nullable=False, default=100)
    fetch = db.Column(db.Boolean, nullable=False, default=False)
    avatar_img_url = db.Column(db.String(1500), default = "https://cdn-icons-png.flaticon.com/512/5569/5569224.png")
    banner_img_url = db.Column(db.String(1500), default = "https://www.csn.edu/__data/assets/image/0031/19669/default-banner-img_1.png")
    state = db.Column(db.Integer, default = 1)
    ticket = db.Column(db.Integer, default=0, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


    user = db.relationship("User", back_populates="pet")

    def to_dict(self):
        return {
            'id': self.id,
            "ownerId": self.owner_id,
            "name": self.name,
            "happiness": self.happiness,
            "fetch": self.fetch,
            "ticket": self.ticket,
            "avatarImgUrl": self.avatar_img_url,
            "bannerImgUrl": self.banner_img_url,
            "state": self.state,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at
        }
