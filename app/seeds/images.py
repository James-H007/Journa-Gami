from app.models import db, EntryImage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_images():
    demo = EntryImage(
        entry_id=1,
        image_url='https://static.wikia.nocookie.net/monster-prom/images/c/cf/Map-city.png')
    marnie = EntryImage(
        entry_id=2,
        image_url='https://static.wikia.nocookie.net/monster-prom/images/4/45/Monster_Camp_Prologue_Bus_Background.png')
    bobbie = EntryImage(
        entry_id=3,
        image_url='https://64.media.tumblr.com/cb6d5094b0ea0ff4195dc3e712992ec3/tumblr_pxf1rtzAV51w9d3c3o1_1280.jpg')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()

def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.entry_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM entry_images"))

    db.session.commit()
