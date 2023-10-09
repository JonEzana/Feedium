from flask.cli import AppGroup
from .all import seed_users, undo_users
from .users import seed_users, undo_users
from .stories import seed_stories, undo_stories
from .comments import seed_comments, undo_comments
from .snaps import seed_snaps, undo_snaps

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
        # Before seeding, truncate all tables prefixed with schema name
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.stories RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.snaps RESTART IDENTITY CASCADE;")

        undo_snaps()
        undo_comments()
        undo_stories()
        undo_users()
    # Add other seed functions here
    seed_users()
    seed_stories()
    seed_comments()
    seed_snaps()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # Add other undo functions here
    undo_snaps()
    undo_comments()
    undo_stories()
    undo_users()
