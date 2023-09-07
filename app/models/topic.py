from .db import db, environment, SCHEMA, add_prefix_for_prod
from app.models.story_topic import story_topics

class Topic(db.Model):
  __tablename__='topics'
  if environment == "production":
    __table_args__ = {'schema': SCHEMA}
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100), nullable=False)

  stories = db.relationship("Story", secondary=story_topics, back_populates="topics")

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name
    }
