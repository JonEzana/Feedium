from flask import Blueprint, session, request
from flask_login import login_required, current_user
from app.models import Story, db
from app.forms import CreateStoryForm, UpdateStoryForm
# from app.forms import UpdatePhotoForm
# from app.api.aws_routes import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from sqlalchemy import and_

story_routes = Blueprint('story', __name__)


@story_routes.route('/all')
@login_required
def all_stories():
    """
    Returns all stories
    """
    stories = Story.query.all();
    res = [story.to_dict() for story in stories]
    return {"stories": res}


@story_routes.route('/most-popular')
def most_popular_stories():
    """
    Splash page displays 6 most popular stories
    """

    stories = Story.query.all()
    res = [story.to_dict() for story in stories]
    final_res = sorted(res, key=lambda x: x["snapCount"], reverse=True)[0:6]

    return {'stories': final_res}


@story_routes.route('/users/<int:userId>/stories')
@login_required
def current_user_stories(userId):
    stories = Story.query.filter(Story.user_id == userId)
    res = [story.to_dict() for story in stories]

    return {"stories": res}


@story_routes.route('/<int:id>')
def single_story(id):
    """
    Query for a single story by id
    """
    single_story = Story.query.get(id)
    return single_story.to_dict()


@story_routes.route('/new', methods=["POST"])
@login_required
def new_story():
    """
    Create new story
    """
    form = CreateStoryForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        if "image_url" not in data:
            new_story = Story(
                title=data["title"],
                story_text=data["story_text"],
                user_id=current_user.id
            )
        else:
            new_story = Story(
                title=data["title"],
                story_text=data["story_text"],
                image_url=data["image_url"],
                user_id=current_user.id
            )
        db.session.add(new_story)
        db.session.commit()
        return new_story.to_dict()

    if form.errors:
        return {"errors": form.errors}


@story_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def edit_story(id):
    form = UpdateStoryForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        story_to_edit = Story.query.get(id)
        story_to_edit.title = form.data['title']
        story_to_edit.story_text = form.data['story_text']

        db.session.commit()
        return story_to_edit.to_dict()

    if form.errors:
        return {"errors": form.errors}


@story_routes.route('/<int:id>/delete', methods=["DELETE"])
@login_required
def delete_story(id):
    story = Story.query.get(id)
    db.session.delete(story)
    db.session.commit()
    return {"Message": "Story Deleted Successfully"}
