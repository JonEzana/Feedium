from app.models import db, Snap, environment, SCHEMA
import random
from sqlalchemy.sql import text


def seed_snaps():
    snap1 = Snap(
        user_id=random.randint(1, 4),
        story_id=random.randint(1, 20)
    )
    snap2 = Snap(
        user_id=random.randint(1, 4),
        story_id=random.randint(1, 20)
    )
    snap3 = Snap(
        user_id=random.randint(1, 4),
        story_id=random.randint(1, 20)
    )
    snap4 = Snap(
        user_id=random.randint(1, 4),
        story_id=random.randint(1, 20)
    )
    snap5 = Snap(
        user_id=random.randint(1, 4),
        story_id=random.randint(1, 20)
    )
    snap6 = Snap(
        user_id=random.randint(1, 4),
        story_id=random.randint(1, 20)
    )
    snap7 = Snap(
        user_id=random.randint(1, 4),
        story_id=random.randint(1, 20)
    )
    snap8 = Snap(
        user_id=random.randint(1, 4),
        story_id=random.randint(1, 20)
    )
    snap9 = Snap(
        user_id=random.randint(1, 4),
        story_id=random.randint(1, 20)
    )
    snap10 = Snap(
        user_id=random.randint(1, 4),
        story_id=random.randint(1, 20),
    )
    snap11 = Snap(
        user_id=random.randint(1, 4),
        story_id=random.randint(1, 20),
    )
    snap12 = Snap(
        user_id=random.randint(1, 4),
        story_id=random.randint(1, 20),
    )
    snap13 = Snap(
        user_id=random.randint(1, 4),
        story_id=random.randint(1, 20),
    )
    snap14 = Snap(
        user_id=random.randint(1, 4),
        story_id=random.randint(1, 20),
    )
    snap15 = Snap(
        user_id=random.randint(1, 4),
        story_id=random.randint(1, 20),
    )
    snap16 = Snap(
        user_id=random.randint(1, 4),
        story_id=random.randint(1, 20),
    )
    snap17 = Snap(
        user_id=random.randint(1, 4),
        story_id=random.randint(1, 20),
    )
    snap18 = Snap(
        user_id=random.randint(1, 4),
        story_id=random.randint(1, 20),
    )
    snap19 = Snap(
        user_id=random.randint(1, 4),
        story_id=random.randint(1, 20),
    )
    snap20 = Snap(
        user_id=random.randint(1, 4),
        story_id=random.randint(1, 20),
    )

    db.session.add_all([snap1, snap2, snap3, snap4, snap5, snap6, snap7, snap8, snap9, snap10, snap11, snap12, snap13, snap14, snap15, snap16, snap17, snap18, snap19, snap20])
    db.session.commit()

def undo_snaps():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.snaps RESTART IDENTITY CASCADE;")
  else:
      db.session.execute(text("DELETE FROM snaps"))

  db.session.commit()
