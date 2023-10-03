from flask import Blueprint, session, request
from flask_login import login_required, current_user
from app.models import Story, db, Topic
from app.forms import CreateStoryForm, UpdateStoryForm, AddImagesToStoryForm
from sqlalchemy import and_
from app.api.aws_routes import get_unique_filename, upload_file_to_s3, remove_file_from_s3

story_routes = Blueprint('story', __name__)


@story_routes.route('/all')
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


@story_routes.route('/topics/<int:id>')
def stories_by_topic(id):
    """
    Returns all stories associated with given topic
    """
    all_stories = Story.query.all()
    stories = [story.to_dict() for story in all_stories]
    res_list = []
    for story in stories:
        topic_ids = [topic["id"] for topic in story["topics"]]
        if id in topic_ids:
            res_list.append(story)
    return {"stories": res_list}


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

        new_story = Story(
            title=data["title"],
            story_text=data["story_text"],
            user_id=current_user.id,
        )

        db.session.add(new_story)
        db.session.commit()
        return new_story.to_dict()

    if form.errors:
        return {"errors": form.errors}


@story_routes.route('/<int:id>/<int:offset>/images', methods=['PUT'])
@login_required
def add_images_to_story(id, offset):

    form = AddImagesToStoryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    story_to_change = Story.query.get(id)

    if form.validate_on_submit():
        data = form.data
        print('~~~ DATA ~~~~', data)
        img_list = []
        if data['image_url1']:
            img_list.append(data["image_url1"])
        if data['image_url2']:
            img_list.append(data["image_url2"])
        if data['image_url3']:
            img_list.append(data["image_url3"])
        if data['image_url4']:
            img_list.append(data["image_url4"])

        img_data = []
        for img in img_list:
            url = img
            url.filename = get_unique_filename(url.filename)
            upload = upload_file_to_s3(url)
            img_data.append(upload)

        if len(img_data) > 0:
            if len(img_data) == 1:
                story_to_change.image_url_1 = img_data[0]["url"]
            elif len(img_data) == 2:
                story_to_change.image_url_1 = img_data[0]["url"]
                story_to_change.image_url_2 = img_data[1]["url"]
            elif len(img_data) == 3:
                story_to_change.image_url_1 = img_data[0]["url"]
                story_to_change.image_url_2 = img_data[1]["url"]
                story_to_change.image_url_3 = img_data[2]["url"]
            else:
                story_to_change.image_url_1 = img_data[0]["url"]
                story_to_change.image_url_2 = img_data[1]["url"]
                story_to_change.image_url_3 = img_data[2]["url"]
                story_to_change.image_url_4 = img_data[3]["url"]
        # print('~~~~ IMG_DATA ~~~~', img_data)

        # allStoryImgs = [story_to_change.image_url_1, story_to_change.image_url_2, story_to_change.image_url_3, story_to_change.image_url_4 ]

        # eligibleImgs = allStoryImgs[offset:]
        # print('~~~~ ELIGIBLE: BEFORE~~~~', eligibleImgs)

        # img_data_new = img_data

        # if offset != 0:
        #     img_data_new = img_data[0:len(eligibleImgs)]

        # for x in range(0, len(img_data_new)):
        #     eligibleImgs[x] = img_data_new[x]["url"]

        # print('~~~~ ELIGIBLE: AFTER~~~~', eligibleImgs)

        # if len(img_data) > 0:
        #     if story_to_change.image_url_4 is None:
        #         story_to_change.image_url_4 = img_data[0]["url"]

        #     elif story_to_change.image_url_3 is None:
        #         if len(img_data) == 1:
        #             story_to_change.image_url_3 = img_data[0]["url"]
        #         else :
        #             story_to_change.image_url_3 = img_data[0]["url"]
        #             story_to_change.image_url_4 = img_data[1]["url"]

        #     elif story_to_change.image_url_2 is None:
        #         if len(img_data) == 1:
        #             story_to_change.image_url_2 = img_data[0]["url"]
        #         elif len(img_data) == 2:
        #             story_to_change.image_url_2 = img_data[0]["url"]
        #             story_to_change.image_url_3 = img_data[1]["url"]
        #         else:
        #             story_to_change.image_url_2 = img_data[0]["url"]
        #             story_to_change.image_url_3 = img_data[1]["url"]
        #             story_to_change.image_url_4 = img_data[2]["url"]

        #     elif story_to_change.image_url_1 is None:
        #         if len(img_data) == 1:
        #             story_to_change.image_url_1 = img_data[0]["url"]
        #         elif len(img_data) == 2:
        #             story_to_change.image_url_1 = img_data[0]["url"]
        #             story_to_change.image_url_2 = img_data[1]["url"]
        #         elif len(img_data) == 3:
        #             story_to_change.image_url_1 = img_data[0]["url"]
        #             story_to_change.image_url_2 = img_data[1]["url"]
        #             story_to_change.image_url_3 = img_data[2]["url"]
        #         else:
        #             story_to_change.image_url_1 = img_data[0]["url"]
        #             story_to_change.image_url_2 = img_data[1]["url"]
        #             story_to_change.image_url_3 = img_data[2]["url"]
        #             story_to_change.image_url_4 = img_data[3]["url"]

        #     else:
        #         pass

            # for x in range(0, len(img_data)):
            #     col_name = f"image_url{x + 1}"
            #     story_to_change[col_name] = img_data[x]["url"]

        db.session.commit()
        return story_to_change.to_dict()

    if form.errors:
        print('~~~~~ FORM ERRORS ~~~~~', form.errors)
        return {'errors': form.errors}



@story_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def edit_story(id):
    form = UpdateStoryForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        story_to_edit = Story.query.get(id)
        print('~~~~ STORY TO EDIT ~~~~~~~~', story_to_edit.to_dict())
        story_to_edit.title = form.data['title']
        story_to_edit.story_text = form.data['story_text']

        story_to_edit.image_url_1 = None
        story_to_edit.image_url_2 = None
        story_to_edit.image_url_3 = None
        story_to_edit.image_url_4 = None

        if form.data['image_url_1']:
            story_to_edit.image_url_1 = form.data['image_url_1']
        if form.data['image_url_2']:
            story_to_edit.image_url_2 = form.data['image_url_2']
        if form.data['image_url_3']:
            story_to_edit.image_url_3 = form.data['image_url_3']
        if form.data['image_url_4']:
            story_to_edit.image_url_4 = form.data['image_url_4']


        # if story_to_edit.image_url_1 and not form.data['image_url_1']:
        #     story_to_edit.image_url_1 == None
        # if story_to_edit.image_url_2 and not form.data['image_url_2']:
        #     story_to_edit.image_url_2 == None
        # if story_to_edit.image_url_3 and not form.data['image_url_3']:
        #     story_to_edit.image_url_3 == None
        # if story_to_edit.image_url_4 and not form.data['image_url_4']:
        #     story_to_edit.image_url_4 == None

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
