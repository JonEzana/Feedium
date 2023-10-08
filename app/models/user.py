from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from .follow import follows

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    profile_pic = db.Column(db.String(255))
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(), default=datetime.now())
    updated_at = db.Column(db.DateTime(), default=datetime.now())

    # relationships
    stories = db.relationship('Story', back_populates='user', cascade="all, delete-orphan")
    comments = db.relationship('Comment', back_populates='user', cascade="all, delete-orphan")
    snaps = db.relationship("Snap", back_populates="users", cascade="all, delete-orphan")
    followers = db.relationship(
        "User",
        secondary=follows,
        primaryjoin=(follows.c.follower_id == id),
        secondaryjoin=(follows.c.followed_id == id),
        backref=db.backref("following", lazy="dynamic"),
        lazy="dynamic"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self, stories=False, comments=False, snaps=False, followers=False, following=False):
        user_dictionary = {
            'id': self.id,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'username': self.username,
            'email': self.email,
            'profilePic': self.profile_pic,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
        if stories:
            user_dictionary["stories"] = [story.to_dict() for story in self.stories]

        if comments:
            user_dictionary["comments"] = [comment.to_dict() for comment in self.comments]

        if snaps:
            user_dictionary["snaps"] = [snap.to_dict() for snap in self.snaps]

        if followers:
            user_dictionary["followers"] = [follower.to_dict() for follower in self.followers]

        if following:
            user_dictionary["following"] = [following.to_dict() for following in self.following]

        return user_dictionary

    def to_dict_no_story(self, followers=False, following=False, snaps=False):
        user_dictionary = {
            'id': self.id,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'username': self.username,
            'email': self.email,
            'profilePic': self.profile_pic,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
        if followers:
            user_dictionary["followers"] = [follower.to_dict() for follower in self.followers]

        if following:
            user_dictionary["following"] = [following.to_dict() for following in self.following]

        if snaps:
            user_dictionary["snaps"] = [snap.to_dict() for snap in self.snaps]

        return user_dictionary
