from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Comment(db.Model):
  __tablename__='comments'
  if environment == "production":
    __table_args__ = {'schema': SCHEMA}
  id = db.Column(db.Integer, primary_key=True)
  user_id =db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
  story_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stories.id')))
  comment_text = db.Column(db.String(100), nullable=False)
  created_at = db.Column(db.DateTime(), default=datetime.now())
  updated_at = db.Column(db.DateTime(), default=datetime.now())

  user = db.relationship('User', back_populates='comments')
  story = db.relationship('Story', back_populates='comments')


  def to_dict(self):
    return {
      'id': self.id,
      'userId': self.user_id,
      'storyId': self.story_id,
      'commentText': self.comment_text,
      'createdAt': self.created_at,
      'updatedAt': self.updated_at,
      'user': self.user.to_dict_no_story()
    }
