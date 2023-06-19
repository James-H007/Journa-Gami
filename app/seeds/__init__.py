from flask.cli import AppGroup
from .users import seed_users, undo_users
from .entries import seed_entries, undo_entries
from .images import seed_images, undo_images
from .journals import seed_journals, undo_journals
from .pets import seed_pets, undo_pets
from .tags import seed_tags, undo_tags


from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_pets()
        undo_journals()
        undo_entries()
        undo_tags()
        undo_images()
    seed_users()
    seed_pets()
    seed_journals()
    seed_entries()
    seed_tags()
    seed_images()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_pets()
    undo_journals()
    undo_entries()
    undo_tags()
    undo_images()
    # Add other undo functions here
