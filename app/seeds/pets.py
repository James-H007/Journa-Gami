from app.models import db, Pet, environment, SCHEMA
from sqlalchemy.sql import text

def seed_pets():
    demo = Pet(
        owner_id=1,
        name='Astra',
        happiness=100,
        fetch = False)
    marnie = Pet(
        owner_id=2,
        name='Kan',
        happiness=75,
        fetch = False)
    bobbie = Pet(
        owner_id=3,
        name='Doo',
        happiness=20,
        fetch = False)

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()

def undo_pets():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pets RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pets"))

    db.session.commit()
