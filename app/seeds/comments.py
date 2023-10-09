from app.models import db, Comment, environment, SCHEMA
import random
from sqlalchemy.sql import text

def seed_comments():
    comment1 = Comment(
        story_id=1,
        user_id=1,
        comment_text="🤤🤤🤤🤤🤤🤤🤤",
    )
    # comment2 = Comment(
    #     story_id=random.randint(1, 20),
    #     user_id=random.randint(1, 3),
    #     comment_text="WOWWW",
    # )
    # comment3 = Comment(
    #     story_id=random.randint(1, 20),
    #     user_id=random.randint(1, 3),
    #     comment_text="Not reading all that, nice profile pic tho 🫶"
    # )
    # comment4 = Comment(
    #     story_id=random.randint(1, 20),
    #     user_id=random.randint(1, 3),
    #     comment_text="This is making me so hungry!"
    # )
    # comment5 = Comment(
    #     story_id=random.randint(1, 20),
    #     user_id=random.randint(1, 3),
    #     comment_text="Love it!"
    # )
    # comment6 = Comment(
    #     story_id=random.randint(1, 20),
    #     user_id=random.randint(1, 3),
    #     comment_text="Wonderful!"
    # )
    # comment7 = Comment(
    #     story_id=random.randint(1, 20),
    #     user_id=random.randint(1, 3),
    #     comment_text="Amazing!"
    # )
    # comment8 = Comment(
    #     story_id=random.randint(1, 20),
    #     user_id=random.randint(1, 3),
    #     comment_text="Great content!!"
    # )
    # comment9 = Comment(
    #     story_id=random.randint(1, 20),
    #     user_id=random.randint(1, 3),
    #     comment_text="Thanks for sharing!!!"
    # )
    # comment10 = Comment(
    #     story_id=7,
    #     user_id=1,
    #     comment_text="nice post! promote it on @foodhub 🔥"
    # )
    # comment11 = Comment(
    #     story_id=7,
    #     user_id=2,
    #     comment_text="nice post! promote it on @ultimate_foodiez 🔥"
    # )
    # comment12 = Comment(
    #     story_id=7,
    #     user_id=3,
    #     comment_text="nice post! promote it on @food_finder 🔥"
    # )
    # comment13 = Comment(
    #     story_id=random.randint(1, 20),
    #     user_id=random.randint(1, 3),
    #     comment_text="Super!"
    # )
    # comment14 = Comment(
    #     story_id=random.randint(1, 20),
    #     user_id=random.randint(1, 3),
    #     comment_text="Incredible."
    # )
    # comment15 = Comment(
    #     story_id=random.randint(1, 20),
    #     user_id=random.randint(1, 3),
    #     comment_text="Excellent!"
    # )
    # comment16 = Comment(
    #     story_id=random.randint(1, 20),
    #     user_id=random.randint(1, 3),
    #     comment_text="amazing 🧎🧎🧎"
    # )
    # comment17 = Comment(
    #     story_id=random.randint(1, 20),
    #     user_id=random.randint(1, 3),
    #     comment_text="Thanks for sharing!"
    # )
    # comment18 = Comment(
    #     story_id=random.randint(1, 20),
    #     user_id=random.randint(1, 3),
    #     comment_text="Nice content."
    # )
    # comment19 = Comment(
    #     story_id=random.randint(1, 20),
    #     user_id=random.randint(1, 3),
    #     comment_text="Truly enlightening."
    # )
    # comment20 = Comment(
    #     story_id=random.randint(1, 20),
    #     user_id=random.randint(1, 3),
    #     comment_text="Profoundly informative."
    # )
    db.session.add(comment1)
    # db.session.add_all([comment1, comment2, comment3, comment4, comment5, comment6, comment7, comment8, comment9, comment10, comment11, comment12, comment13, comment14, comment15, comment16, comment17, comment18, comment19, comment20])
    db.session.commit()

def undo_comments():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
  else:
      db.session.execute(text("DELETE FROM comments"))

  db.session.commit()
