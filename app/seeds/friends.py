from app.models import db, Friend, environment, SCHEMA
from sqlalchemy.sql import text

def seed_friends():
    demo = Friend(
        user_id=1,
        friend_id=2
    )
    marnie = Friend(
        user_id=2,
        friend_id=3
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.commit()

def undo_entries():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.friends RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM friends"))

    db.session.commit()
