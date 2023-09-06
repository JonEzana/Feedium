from .db import db


story_topics = db.Table(
    "story_topics",
    db.Model.metadata,
    db.Column("story_id", db.Integer, db.ForeignKey("stories.id"), primary_key=True),
    db.Column("topic_id", db.Integer, db.ForeignKey("topics.id"), primary_key=True)
)
