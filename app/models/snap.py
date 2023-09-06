from .db import db


snaps = db.Table(
    "snaps",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("story_id", db.Integer, db.ForeignKey("stories.id"), primary_key=True)
)
