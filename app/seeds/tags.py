from app.models import db, Tag, environment, SCHEMA
from sqlalchemy.sql import text

def seed_tags():
    demo = Tag(
        owner_id = 1,
        entry_id = 1,
        tag_name = "Books"
    )
    marnie = Tag(
        owner_id = 1,
        entry_id = 2,
        tag_name = "MidBooks"
    )
    bobbie = Tag(
        owner_id = 3,
        entry_id = 3,
        tag_name = "GoodBooks"
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()

def undo_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tags"))

    db.session.commit()
