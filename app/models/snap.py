from .db import db, add_prefix_for_prod
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

snaps = db.Table(
    "snaps",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE"), primary_key=True),
    db.Column("story_id", db.Integer, db.ForeignKey(add_prefix_for_prod("stories.id"), ondelete="CASCADE"), primary_key=True)
)

if environment == "production":
    snaps.schema = SCHEMA
