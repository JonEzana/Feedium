from app.models import db, snaps, environment, SCHEMA
import random
from sqlalchemy.sql import text

def seed_snaps():
    seed_snaps = [
        {"user_id": 1, "story_id": 1},
        {"user_id": 1, "story_id": 2},
        {"user_id": 1, "story_id": 3},
        {"user_id": 1, "story_id": 4},
        {"user_id": 2, "story_id": 5},
        {"user_id": 2, "story_id": 7},
        {"user_id": 2, "story_id": 6},
        {"user_id": 2, "story_id": 8},
        {"user_id": 3, "story_id": 9},
        {"user_id": 3, "story_id": 10},
        {"user_id": 3, "story_id": 11},
        {"user_id": 3, "story_id": 12},
        {"user_id": 4, "story_id": 13},
        {"user_id": 4, "story_id": 14},
        {"user_id": 4, "story_id": 15},
        {"user_id": 4, "story_id": 16}
        ]
    for snap in seed_snaps:
        new_snap =

def undo_snaps():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.snaps RESTART IDENTITY CASCADE;")
  else:
      db.session.execute(text("DELETE FROM snaps"))

  db.session.commit()
