from .db import db, add_prefix_for_prod, SCHEMA, environment
from sqlalchemy import UniqueConstraint
import os



class Snap(db.Model):
    __tablename__ = "snaps"

    # __tableargs__ = (
    #     {'schema': SCHEMA} if environment == "production" else None
    # )

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    story_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stories.id')))


    users = db.relationship('User', back_populates='snaps')
    story = db.relationship('Story', back_populates='snaps')


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'storyId': self.story_id,
            'story': self.story.to_dict()
        }

# snaps = db.Table(
#     "snaps",
#     db.Model.metadata,
#     db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE"), primary_key=True),
#     db.Column("story_id", db.Integer, db.ForeignKey(add_prefix_for_prod("stories.id"), ondelete="CASCADE"), primary_key=True)
# )
