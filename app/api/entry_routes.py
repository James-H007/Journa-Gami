from flask import Blueprint, jsonify, session, request
from app.models import User, db, Entry, Tag, EntryImage
from app.forms.entry_form import EntryForm
from app.forms.tag_form import TagForm
from app.forms.image_form import EntryImageForm
from flask_login import current_user, login_user, logout_user, login_required
from werkzeug.utils import secure_filename
from ..aws_s3_bucket import s3, bucket
import os

entry_routes = Blueprint('entries', __name__)

@entry_routes.route("/")
def entries():
    """
    Return all of the entries
    """

    entries = Entry.query.all()

    return {'entries': [entry.to_dict() for entry in entries]}, 200

@entry_routes.route('/<int:id>', methods = ["GET"])
@login_required
def entry(id):
    entry = Entry.query.get(id)
    """
    Query for an entry by id and returns that entry in a dictionary
    """
    if entry is None:
        return jsonify({"Error": "Entry not found"}), 404

    return entry.to_dict()

@entry_routes.route('/mine')
@login_required
def my_entries():
    """
    Return all of the current user's entries
    """
    userId = current_user.id
    user_entries = Entry.query.filter_by(owner_id=userId).all()

    return {'entries': [entry.to_dict() for entry in user_entries]}, 200

@entry_routes.route("/create/<int:journal_id>", methods=["POST"])
@login_required
def entry_create(journal_id):
    """
    Create a entry based on journal id
    """
    print('Receive request to create post for journal id:', journal_id)

    userId = current_user.id
    form = EntryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        entry = Entry (
           journal_id = journal_id,
           owner_id = userId,
           title =  form.data["title"],
           banner = form.data["banner"],
           content = form.data["content"],
           favorite = form.data["favorite"],
           mood = form.data["mood"],
           weather = form.data["weather"],
           location = form.data["location"]
        )
        db.session.add(entry)
        db.session.commit()
        return jsonify({'entry': entry.to_dict()})

    errors = form.errors
    print(errors)
    return jsonify({'errors': errors}), 400


@entry_routes.route('/<int:id>/edit', methods = ["PUT"])
@login_required
def entry_edit(id):
    """
    Edit an entry based on entry id
    """

    userId = current_user.id

    entry = Entry.query.get(id)

    if not entry:
        return {"Error": "Entry not found"}, 404

    if entry.owner_id != userId:
        return {"Error": "You don't have permission to edit this entry"}, 403

    data = request.get_json()

    if "title" in data:
        entry.title = data["title"]
    if "banner" in data:
        entry.banner = data["banner"]
    if "content" in data:
        entry.content = data["content"]
    if "favorite" in data:
        entry.favorite = data["favorite"]
    if "mood" in data:
        entry.mood = data["mood"]
    if "weather" in data:
        entry.weather = data["weather"]
    if "location" in data:
        entry.location = data["location"]

    db.session.commit()
    return {"entry": entry.to_dict()}, 200

@entry_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def entry_delete(id):
    """
    Delete a entry based on id
    """

    userId = current_user.id
    entry = Entry.query.get(id)

    if entry is None:
        return {'error': "Entry not found"}, 404
    if entry.owner_id != userId:
        return {"Error": "You don't have to permission to delete this entry"}, 403

    db.session.delete(entry)
    db.session.commit()
    return {'message': 'Successfully deleted'}, 204

@entry_routes.route('/my-tags', methods=['GET'])
@login_required
def my_tags():
    """
    Get all of the current user's tags
    """
    userId = current_user.id
    user_tags = Tag.query.filter_by(owner_id=userId).all()

    return {'tags': [tag.to_dict() for tag in user_tags]}, 200

@entry_routes.route('/<int:id>/tags')
@login_required
def entry_tags(id):
    """
    Get tags with that id
    """
    userId = current_user.id
    entry = Entry.query.get(id)

    if entry is None:
        return {'error': "Entry not found"}, 404
    if entry.owner_id != userId:
        return {"Error": "You don't have to permission to view this entry"}, 403

    entry_tags = Tag.query.filter_by(entry_id = id).all()

    return {'tags': [tag.to_dict() for tag in entry_tags]}, 200

@entry_routes.route('/<int:id>/tags/create', methods = ["POST"])
@login_required
def create_tag(id):
    """
    Create tags for a given entry id
    """

    userId = current_user.id
    form = TagForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        tag = Tag (
            owner_id = userId,
            entry_id = id,
            tag_name = form.data["tag_name"]
        )

        db.session.add(tag)
        db.session.commit()
        return jsonify({'tag': tag.to_dict()})

    errors = form.errors
    print(errors)
    return jsonify({'errors': errors}), 400

# @entry_routes.route('/<int:id>/tags/edit', methods = ["PUT"])
# @login_required
# def edit_tag(id):
#     """
#     Edit tags for a given entry id
#     """

#     userId = current_user.id
#     tag = Tag.query.get(id)

#     if not tag:
#         return {"Error": "Tag not found"}, 404



@entry_routes.route('/tags/<int:id>/delete', methods = ["DELETE"])
@login_required
def delete_tag(id):
    """
    Delete a tag based on id
    """

    userId = current_user.id
    tag = Tag.query.get(id)

    if tag is None:
        return {'Error': 'Tag is not found'}, 404
    if tag.owner_id != userId:
        return {"Error": "You don't have permission to delete this journal."}, 403

    db.session.delete(tag)
    db.session.commit()
    return {'message': "Successfully deleted"}, 204

@entry_routes.route('/images')
@login_required
def get_all_images():
    """
    Get all of the images
    """

    images = EntryImage.query.all()

    return {'images': [image.to_dict() for image in images]}, 200

@entry_routes.route('/images/<int:id>')
@login_required
def get_image(id):
    """
    Get image based on id
    """

    userId = current_user.id
    image = EntryImage.query.get(id)

    if image is None:
        return jsonify({"Error": "Image not found"}, 404)
    return image.to_dict()

@entry_routes.route('/<int:id>/images')
@login_required
def get_entry_images(id):
    """
    Get images based on Entry id
    """

    userId = current_user.id
    images = EntryImage.query.filter_by(entry_id = id).all()

    return {'entryImages': [image.to_dict() for image in images]}, 200

@entry_routes.route('/<int:id>/images', methods = ["POST"])
@login_required
def create_image(id):
    """
    Create image based on entry id
    """

    # images = EntryImage.query.filter_by(entry_id = id).all()
    # if (images.length >= 4):
    #     return {'Error': "Max amount of images have been reached"}

    form = EntryImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit():
    #     image = EntryImage(
    #         entry_id = id,
    #         image_url = form.data["image_url"]
    #     )

    #     db.session.add(image)
    #     db.session.commit()
    #     return jsonify({'image': image.to_dict()})

    # errors = form.errors
    # print(errors)
    # return jsonify({'errors': errors}), 400
    if 'file' in request.files:
        file = request.files['file']
        if file.filename == '':
            return {"error": "No file selected"}, 400
        filename = secure_filename(file.filename)
        file.save(filename)

        s3.upload_file(
            Bucket='journagami',
            Filename=filename,
            Key=filename
        )
        url = f"https://{bucket}.s3.us-west-1.amazonaws.com/{filename}"

        form = EntryImageForm(
            entry_id = id,
            image_url = url
        )

        db.session.add(form)
        db.session.commit()

        try:
            os.remove(filename)
        except Exception as e:
            print(f"Error occurred while deleting file: {e}")

        return jsonify({'image': form.to_dict()}, 201)
    else:
        errors = form.errors
        print(errors)
        return jsonify({'errors': errors}), 400



@entry_routes.route('/images/<int:id>', methods = ["EDIT"])
@login_required
def edit_image(id):
    """
    Edit an entry image
    """

    image = EntryImage.query.get(id)

    if not image:
        return {"Error": "Image not found"}, 404

    data = request.get_json

    if "image_url" in data:
        image.image_url = data["image_url"]

    db.session.commit()
    return {"image": image.to_dict()}, 200

@entry_routes.route('/images/<int:id>', methods = ["DELETE"])
@login_required
def delete_image(id):
    """
    Delete an entry image
    """

    image = EntryImage.query.get(id)

    if not image:
        return {"Error": "Image not found"}, 404

    data = request.get_json

    db.session.delete(image)
    db.session.commit()
    return {'message': 'Successfully deleted'}, 204
