from .db import db, add_prefix_for_prod
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


follows = db.Table(
    "follows",
    db.Column("follower_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"))),
    db.Column("followed_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
)

if environment == "production":
    follows.schema = SCHEMA
