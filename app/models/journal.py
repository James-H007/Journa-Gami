from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Journal(db.Model):
    __tablename__ = "journals"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(24))
    cover = db.Column(db.String(800))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship("User", back_populates="journals")

    entries = db.relationship("Entry", back_populates="journal", cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.owner_id,
            'title': self.title,
            'cover': self.cover,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }

class Entry(db.Model):
    __tablename__ = "entries"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    journal_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('journals.id')), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(36))
    banner = db.Column(db.String(2000))
    content = db.Column(db.String(15000))
    favorite = db.Column(db.Boolean)
    mood = db.Column(db.String(100))
    weather = db.Column(db.String(1000))
    location = db.Column(db.String(1000))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship("User", back_populates="entries")

    journal = db.relationship("Journal", back_populates="entries")

    tags = db.relationship("Tag", back_populates="entry", cascade='all, delete-orphan')

    entry_images = db.relationship("EntryImage", back_populates="entry", cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'journalId': self.journal_id,
            'ownerId': self.owner_id,
            'title': self.title,
            'content': self.content,
            'favorite': self.favorite,
            'mood': self.mood,
            'weather': self.weather,
            'location': self.location,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }

class Tag(db.Model):
    __tablename__ = "tags"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    entry_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('entries.id')), nullable=False)
    tag_name = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    entry = db.relationship("Entry", back_populates="tags")

    user = db.relationship("User", back_populates="tags")

    def to_dict(self):
        return {
            'id': self.id,
            'entryId': self.entry_id,
            'tagName': self.tag_name,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }

class EntryImage(db.Model):
    __tablename__ = "entry_images"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    entry_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('entries.id')))
    image_url = db.Column(db.String(800))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    entry = db.relationship("Entry", back_populates="entry_images")

    def to_dict(self):
        return {
            'id': self.id,
            'entryId': self.entry_id,
            'imageUrl': self.image_url,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
