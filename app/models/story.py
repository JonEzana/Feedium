from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .story_topic import story_topics
from .snap import Snap


class Story(db.Model):
  __tablename__ = 'stories'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
  title = db.Column(db.String(255), nullable=False)
  story_text = db.Column(db.String(6000), nullable=False)
  snap_count = db.Column(db.Integer, nullable=False, default=0)
  image_url1 = db.Column(db.String(500))
  image_url2 = db.Column(db.String(500))
  image_url3 = db.Column(db.String(500))
  image_url4 = db.Column(db.String(500))
  image_url_1 = db.Column(db.String(500))
  image_url_2 = db.Column(db.String(500))
  image_url_3 = db.Column(db.String(500))
  image_url_4 = db.Column(db.String(500))
  created_at = db.Column(db.DateTime(), default=datetime.now())
  updated_at = db.Column(db.DateTime(), default=datetime.now())

  # relationships
  user = db.relationship("User", back_populates="stories")
  comments = db.relationship('Comment', back_populates='story', cascade="all, delete-orphan")
  snaps = db.relationship("Snap", back_populates="story", cascade="all, delete-orphan")
  topics = db.relationship("Topic", secondary=story_topics, back_populates="stories")


  def to_dict(self):
    return {
      'id': self.id,
      'userId': self.user_id,
      'title': self.title,
      'storyText': self.story_text,
      'snapCount': self.snap_count,
      'imageUrl1': self.image_url1,
      'imageUrl2': self.image_url2,
      'imageUrl3': self.image_url3,
      'imageUrl4': self.image_url4,
      'imageUrl_1': self.image_url_1,
      'imageUrl_2': self.image_url_2,
      'imageUrl_3': self.image_url_3,
      'imageUrl_4': self.image_url_4,
      'createdAt': self.created_at,
      'updatedAt': self.updated_at,
      'user': self.user.to_dict_no_story(),
      'topics': [topic.to_dict() for topic in self.topics]
    }
