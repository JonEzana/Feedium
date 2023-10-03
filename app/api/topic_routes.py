from flask import Blueprint, session, request
from flask_login import login_required, current_user
from app.models import Topic, db
from app.forms import CreateTopicForm
from sqlalchemy import and_

topic_routes = Blueprint('topic', __name__)


@topic_routes.route('')
def get_all_topics():
    topics = Topic.query.all()
    res = [topic.to_dict() for topic in topics]
    return {"topics": res}
