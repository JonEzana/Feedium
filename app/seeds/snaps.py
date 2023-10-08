from app.models import db, Story, User, Topic, Comment, Snap, environment, SCHEMA
import random
from sqlalchemy.sql import text

def seed_snaps():
    snap1 = Snap(
        user_id=1,
        story_id=1
    )
    snap2 = Snap(
        user_id=1,
        story_id=2,
    )
    snap3 = Snap(
        user_id=1,
        story_id=3,
    )
    snap4 = Snap(
        user_id=1,
        story_id=4,
    )
    snap5 = Snap(
        user_id=1,
        story_id=5,
    )
    snap6 = Snap(
        user_id=2,
        story_id=6,
    )
    snap7 = Snap(
        user_id=2,
        story_id=7,
    )
    snap8 = Snap(
        user_id=2,
        story_id=8,
    )
    snap9 = Snap(
        user_id=2,
        story_id=9,
    )
    snap10 = Snap(
        user_id=2,
        story_id=10,
    )
    snap11 = Snap(
        user_id=3,
        story_id=11,
    )
    snap12 = Snap(
        user_id=3,
        story_id=12,
    )
    snap13 = Snap(
        user_id=3,
        story_id=13,
    )
    snap14 = Snap(
        user_id=3,
        story_id=14,
    )
    snap15 = Snap(
        user_id=3,
        story_id=15,
    )
    snap16 = Snap(
        user_id=4,
        story_id=16,
    )
    snap17 = Snap(
        user_id=4,
        story_id=17,
    )
    snap18 = Snap(
        user_id=4,
        story_id=18,
    )
    snap19 = Snap(
        user_id=4,
        story_id=19,
    )
    snap20 = Snap(
        user_id=4,
        story_id=20,
    )

    db.session.add_all([snap1, snap2, snap3, snap4, snap5, snap6, snap7, snap8, snap9, snap10, snap11, snap12, snap13, snap14, snap15, snap16, snap17, snap18, snap19, snap20])
    db.session.commit()

def undo_snaps():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.snaps RESTART IDENTITY CASCADE;")
  else:
      db.session.execute(text("DELETE FROM snaps"))

  db.session.commit()
