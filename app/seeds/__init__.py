from flask.cli import AppGroup
# from .users import seed_users, undo_users
from .stories import seed_users_stories_topics_comments_likes, undo_users_stories_topics_comments_likes
# from .comments import seed_comments, undo_comments
# from .topics import seed_topics, undo_topics

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
        # undo_topics()
        # undo_comments()
        # undo_users()
        undo_users_stories_topics_comments_likes()
    # Add other seed functions here
    # seed_users()
    # seed_storiesandtopics()
    # seed_comments()
    # seed_topics()
    seed_users_stories_topics_comments_likes()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # undo_topics()
    # undo_comments()
    # undo_storiesandtopics()
    # undo_users()
    undo_users_stories_topics_comments_likes()
    # Add other undo functions here
