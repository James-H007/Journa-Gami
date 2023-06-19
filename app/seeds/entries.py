from app.models import db, Entry, environment, SCHEMA
from sqlalchemy.sql import text

def seed_entries():
    demo = Entry(
        owner_id=1,
        journal_id = 1,
        title = "Withering Heights",
        content = "This was a good book.",
        favorite = False,
        mood = "happy",
        weather = "sunny",
        location = "California"
    )
    marnie = Entry(
        owner_id=2,
        journal_id = 2,
        title = "Huckleberry Finn",
        content = "I never finished the book.",
        favorite = False,
        mood = "neutral",
        weather = "cloudy",
        location = "Oregon"
    )
    bobbie = Entry(
        owner_id=3,
        journal_id = 3,
        title = "Jade City",
        content = "I LOVED THIS BOOK!",
        favorite = False,
        mood = "excited",
        weather = "cloudy",
        location = "New York"
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()

def undo_entries():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.entries RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM entries"))

    db.session.commit()
