from app.models import db, Story, environment, SCHEMA
import random
from sqlalchemy.sql import text

def seed_stories():
  Story1 = Story(
    user_id=1, title="Ipsum Lorem", story_text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", snap_count=random.randint(1, 40), image_url="https://aperture-bucket-april-2023.s3.amazonaws.com/ONEEE.jpeg"
  )
  Story2 = Story(
    user_id=1, title="Ipsum Lorem", story_text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", snap_count=random.randint(1, 40), image_url="https://aperture-bucket-april-2023.s3.amazonaws.com/ONEEE.jpeg"
  )
  Story3 = Story(
    user_id=2, title="Ipsum Lorem", story_text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", snap_count=random.randint(1, 40), image_url="https://aperture-bucket-april-2023.s3.amazonaws.com/ONEEE.jpeg"
  )
  Story4 = Story(
    user_id=2, title="Ipsum Lorem", story_text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", snap_count=random.randint(1, 40), image_url="https://aperture-bucket-april-2023.s3.amazonaws.com/ONEEE.jpeg"
  )
  Story5 = Story(
    user_id=3, title="Ipsum Lorem", story_text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", snap_count=random.randint(1, 40), image_url="https://aperture-bucket-april-2023.s3.amazonaws.com/ONEEE.jpeg"
  )
  Story6 = Story(
    user_id=3, title="Ipsum Lorem", story_text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", snap_count=random.randint(1, 40), image_url="https://aperture-bucket-april-2023.s3.amazonaws.com/ONEEE.jpeg"
  )


  db.session.add(Story1)
  db.session.add(Story2)
  db.session.add(Story3)
  db.session.add(Story4)
  db.session.add(Story5)
  db.session.add(Story6)
  db.session.commit()

def undo_stories():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.stories RESTART IDENTITY CASCADE;")
  else:
      db.session.execute(text("DELETE FROM stories"))

  db.session.commit()
