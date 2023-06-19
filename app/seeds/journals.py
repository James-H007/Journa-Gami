from app.models import db, Journal, environment, SCHEMA
from sqlalchemy.sql import text

def seed_journals():
    demo = Journal(
        owner_id=1,
        title='Astronauts',
        cover='https://t4.ftcdn.net/jpg/05/75/86/09/360_F_575860904_9tKnp9yT8ngej9Et1rtBaWHHxxGr8ac0.jpg')
    marnie = Journal(
        owner_id=2,
        title='Poems',
        cover='https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/hummingbird-painting-the-studio-abstract-angel-artist-stephen-k.jpg')
    bobbie = Journal(
        owner_id=3,
        title='Characters',
        cover='https://www.hookresearch.co.uk/wp-content/uploads/2017/11/banner-cartoon-network.jpg')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()

def undo_journals():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.journals RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM journals"))

    db.session.commit()
