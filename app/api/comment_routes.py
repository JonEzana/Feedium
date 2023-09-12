from flask import Blueprint, session, request
from flask_login import login_required, current_user
from app.models import Comment, db
from app.forms import CreateCommentForm, UpdateCommentForm
# from app.forms import UpdatePhotoForm
# from app.api.aws_routes import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from sqlalchemy import and_

comment_routes = Blueprint('comment', __name__)


@comment_routes.route('/<int:id>')
@login_required
def comments_by_story_id(id):
    '''
    Returns all comments belonging to a particular story
    '''
    comments = Comment.query.filter(Comment.story_id == id).all()
    res = [comment.to_dict() for comment in comments]
    return {"comments": res}


@comment_routes.route('/<int:id>/new', methods=["POST"])
@login_required
def create_comment(id):
    '''
    Creats a comment for a particular story
    '''
    form = CreateCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        new_comment = Comment(
            user_id = current_user.id,
            story_id = id,
            comment_text = data["comment_text"]
        )

        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()

    if form.errors:
        print('~~~~~ CREATE COMMENT FORM ERRORS ~~~~~', form.errors)
        return {"errors": form.errors}


@comment_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def update_comment(id):
    '''
    Update comment by comment id
    '''
    form = UpdateCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        comment_to_edit = Comment.query.get(id)
        comment_to_edit.comment_text = form.data["comment_text"]

        db.session.commit()
        return comment_to_edit.to_dict()

    if form.errors:
        print('~~~~~ UPDATE COMMENT FORM ERRORS ~~~~~', form.errors)
        return {"errors": form.errors}


@comment_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_comment(id):
    '''
    Deletes comment by comment id
    '''
    comment_to_delete = Comment.query.get(id)
    db.session.delete(comment_to_delete)
    db.session.commit()
    return {"Message": "Comment deleted successfully"}
