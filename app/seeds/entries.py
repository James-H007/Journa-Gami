from app.models import db, Entry, environment, SCHEMA
from sqlalchemy.sql import text

def seed_entries():
    demo = Entry(
        owner_id=1,
        journal_id = 1,
        title = "Withering Heights",
        content = "This was a good book.",
        banner = "https://cdnb.artstation.com/p/assets/images/images/064/094/593/4k/martin-teichmann-antique-shop-01.jpg",
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
        banner ="https://cdnb.artstation.com/p/assets/images/images/064/094/599/4k/martin-teichmann-antique-shop-03.jpg",
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
        banner = "https://cdna.artstation.com/p/assets/images/images/064/083/428/4k/michel-donze-hmy-nexus-ext.jpg",
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
