from app.models import environment, db, SCHEMA, Topic
from sqlalchemy.sql import text

def seed_topics():
    topic1 = Topic(name="Veganism")
    topic2 = Topic(name="Vegetarianism")
    topic3 = Topic(name="Restaurant review")
    topic4 = Topic(name="Japanese")
    topic5 = Topic(name="Korean")
    topic6 = Topic(name="North African")
    topic7 = Topic(name="Pizza")
    topic8 = Topic(name="Opinion")
    topic9 = Topic(name="Recipe")

    db.session.add_all([topic1, topic2, topic3, topic4, topic4, topic5, topic6, topic7, topic8, topic9])
    db.session.commit()

def undo_topics():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.topics RESTART IDENTITY CASCADE;")
  else:
      db.session.execute(text("DELETE FROM topics"))

  db.session.commit()
