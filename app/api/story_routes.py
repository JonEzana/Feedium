from flask import Blueprint, session, request
from flask_login import login_required, current_user
from app.models import Story, db
# from app.forms import CreateStoryForm
# from app.forms import UpdatePhotoForm
# from app.api.aws_routes import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from sqlalchemy import and_

story_routes = Blueprint('story', __name__)

@story_routes.route('/most-popular')
def most_popular_stories():
    """
    Splash page displays 6 most popular stories
    """

    stories = Story.query.all()
    res = [story.to_dict() for story in stories]
    filtered_res = sorted(res, key=lambda story: story["snapCount"], reverse=True)
    print('!!!!!! STORIES !!!!!!.....', filtered_res)

    return {'stories': filtered_res[0:7]}
