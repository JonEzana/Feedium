from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Story, Snap, User, db
from sqlalchemy import and_

snap_routes = Blueprint('snap', __name__)


@snap_routes.route('/all')
def get_every_users_snaps():
    """
    return all users' liked stories
    """
    raw_users = User.query.all()
    users = [user.to_dict() for user in raw_users]

    raw_snaps = Snap.query.all()
    snaps = [snap.to_dict() for snap in raw_snaps]

    res = {}

    for user in users:
        res[user["id"]] = [snap["story"] for snap in snaps if snap["userId"] == user["id"]]

    return {"storySnaps": res}


@snap_routes.route('/<int:storyId>/<int:userId>/change', methods=['POST'])
@login_required
def change_snap_count(storyId, userId):
    """
    add or remove like from story
    """

    print('~~~~~~ IN SNAP ~~~~~~')
    story = Story.query.get(storyId)
    already_snapped = Snap.query.filter(and_(Snap.user_id == userId, Snap.story_id == storyId)).first()

    if not already_snapped:
        new_snap = Snap(user_id = userId, story_id = storyId)
        story.snap_count += 1
        db.session.add(new_snap)
        db.session.commit()

        return {"snappedStory": new_snap.story.to_dict()}
    else:
        story.snap_count -= 1
        db.session.delete(already_snapped)
        db.session.commit()

        print('~~~~~ SNAPPED ~~~~~')
        return {"snappedStory": story.to_dict(), "Delete": "DeletedSnap"}
