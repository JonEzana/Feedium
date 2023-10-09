from app.models import db, Story, User, Topic, Comment, Snap, environment, SCHEMA
import random
from sqlalchemy.sql import text


def seed_snaps():
    # users = User.query.all()
    # # stories = Story.query.all()
    # if environment == 'production':
    #     # Before seeding, truncate all tables prefixed with schema name
    #     db.session.execute(f"TRUNCATE table {SCHEMA}.snaps RESTART IDENTITY CASCADE;")
        # Add a truncate command here for every table that will be seeded.

    # all_users = [user.to_dict() for user in users]
    # all_stories = [story.to_dict() for story in stories]
    # print('~~~~~ SNAP SEEDER: ALL STORIES~~~~~~~~', all_stories)
    # print('~~~~~ SNAP SEEDER: ALL USERS~~~~~~~~', all_users)
    snap1 = Snap(
        user_id=1,
        story_id=1
    )
    # snap2 = Snap(
    #     user_id=1,
    #     story_id=1
    # )
    # snap3 = Snap(
    #     user_id=1,
    #     story_id=3
    # )

    # snap1 = Snap(
    #     user_id=random.randint(1, 4),
    #     story_id=random.randint(1, 20)
    # )
    # snap2 = Snap(
    #     user_id=random.randint(1, 4),
    #     story_id=random.randint(1, 20)
    # )
    # snap3 = Snap(
    #     user_id=random.randint(1, 4),
    #     story_id=random.randint(1, 20)
    # )
    # snap4 = Snap(
    #     user_id=random.randint(1, 4),
    #     story_id=random.randint(1, 20)
    # )
    # snap5 = Snap(
    #     user_id=random.randint(1, 4),
    #     story_id=random.randint(1, 20)
    # )
    # snap6 = Snap(
    #     user_id=random.randint(1, 4),
    #     story_id=random.randint(1, 20)
    # )
    # snap7 = Snap(
    #     user_id=random.randint(1, 4),
    #     story_id=random.randint(1, 20)
    # )
    # snap8 = Snap(
    #     user_id=random.randint(1, 4),
    #     story_id=random.randint(1, 20)
    # )
    # snap9 = Snap(
    #     user_id=random.randint(1, 4),
    #     story_id=random.randint(1, 20)
    # )
    # snap10 = Snap(
    #     user_id=random.randint(1, 4),
    #     story_id=random.randint(1, 20),
    # )
    # snap11 = Snap(
    #     user_id=random.randint(1, 4),
    #     story_id=random.randint(1, 20),
    # )
    # snap12 = Snap(
    #     user_id=random.randint(1, 4),
    #     story_id=random.randint(1, 20),
    # )
    # snap13 = Snap(
    #     user_id=random.randint(1, 4),
    #     story_id=random.randint(1, 20),
    # )
    # snap14 = Snap(
    #     user_id=random.randint(1, 4),
    #     story_id=random.randint(1, 20),
    # )
    # snap15 = Snap(
    #     user_id=random.randint(1, 4),
    #     story_id=random.randint(1, 20),
    # )
    # snap16 = Snap(
    #     user_id=random.randint(1, 4),
    #     story_id=random.randint(1, 20),
    # )
    # snap17 = Snap(
    #     user_id=random.randint(1, 4),
    #     story_id=random.randint(1, 20),
    # )
    # snap18 = Snap(
    #     user_id=random.randint(1, 4),
    #     story_id=random.randint(1, 20),
    # )
    # snap19 = Snap(
    #     user_id=random.randint(1, 4),
    #     story_id=random.randint(1, 20),
    # )
    # snap20 = Snap(
    #     user_id=random.randint(1, 4),
    #     story_id=random.randint(1, 20),
    # )
    # snap1 = Snap(
    #     user_id=1,
    #     story_id=1
    # )
    # snap2 = Snap(
    #     user_id=random.choice(all_users)["id"],
    #     story_id=random.choice(all_stories)["id"]
    # )
    # snap3 = Snap(
    #     user_id=random.choice(all_users)["id"],
    #     story_id=random.choice(all_stories)["id"]
    # )
    # snap4 = Snap(
    #     user_id=random.choice(all_users)["id"],
    #     story_id=random.choice(all_stories)["id"]
    # )
    # snap5 = Snap(
    #     user_id=random.choice(all_users)["id"],
    #     story_id=random.choice(all_stories)["id"]
    # )
    # snap6 = Snap(
    #     user_id=random.choice(all_users)["id"],
    #     story_id=random.choice(all_stories)["id"]
    # )
    # snap7 = Snap(
    #     user_id=random.choice(all_users)["id"],
    #     story_id=random.choice(all_stories)["id"]
    # )
    # snap8 = Snap(
    #     user_id=random.choice(all_users)["id"],
    #     story_id=random.choice(all_stories)["id"]
    # )
    # snap9 = Snap(
    #     user_id=random.choice(all_users)["id"],
    #     story_id=random.choice(all_stories)["id"]
    # )
    # snap10 = Snap(
    #     user_id=random.choice(all_users)["id"],
    #     story_id=random.choice(all_stories)["id"],
    # )
    # snap11 = Snap(
    #     user_id=random.choice(all_users)["id"],
    #     story_id=random.choice(all_stories)["id"],
    # )
    # snap12 = Snap(
    #     user_id=random.choice(all_users)["id"],
    #     story_id=random.choice(all_stories)["id"],
    # )
    # snap13 = Snap(
    #     user_id=random.choice(all_users)["id"],
    #     story_id=random.choice(all_stories)["id"],
    # )
    # snap14 = Snap(
    #     user_id=random.choice(all_users)["id"],
    #     story_id=random.choice(all_stories)["id"],
    # )
    # snap15 = Snap(
    #     user_id=random.choice(all_users)["id"],
    #     story_id=random.choice(all_stories)["id"],
    # )
    # snap16 = Snap(
    #     user_id=random.choice(all_users)["id"],
    #     story_id=random.choice(all_stories)["id"],
    # )
    # snap17 = Snap(
    #     user_id=random.choice(all_users)["id"],
    #     story_id=random.choice(all_stories)["id"],
    # )
    # snap18 = Snap(
    #     user_id=random.choice(all_users)["id"],
    #     story_id=random.choice(all_stories)["id"],
    # )
    # snap19 = Snap(
    #     user_id=random.choice(all_users)["id"],
    #     story_id=random.choice(all_stories)["id"],
    # )
    # snap20 = Snap(
    #     user_id=random.choice(all_users)["id"],
    #     story_id=random.choice(all_stories)["id"],
    # )
    db.session.add(snap1)
    # db.session.add_all([snap1, snap2, snap3])
    # db.session.add_all([snap1, snap2, snap3, snap4, snap5, snap6, snap7, snap8, snap9, snap10, snap11, snap12, snap13, snap14, snap15, snap16, snap17, snap18, snap19, snap20])
    db.session.commit()

def undo_snaps():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.snaps RESTART IDENTITY CASCADE;")
  else:
      db.session.execute(text("DELETE FROM snaps"))

  db.session.commit()
