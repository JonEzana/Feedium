from .db import db, add_prefix_for_prod
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


story_topics = db.Table(
    "story_topics",
    db.Model.metadata,
    db.Column("story_id", db.Integer, db.ForeignKey(add_prefix_for_prod("stories.id")), primary_key=True),
    db.Column("topic_id", db.Integer, db.ForeignKey(add_prefix_for_prod("topics.id")), primary_key=True)
)

if environment == "production":
    story_topics.schema = SCHEMA
