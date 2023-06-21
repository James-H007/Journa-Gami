from flask import Blueprint, jsonify, session, request
from app.models import User, db, Journal
from app.forms.journal_form import JournalForm
from flask_login import current_user, login_user, logout_user, login_required

journal_routes = Blueprint('journals', __name__)

@journal_routes.route("/")
def journals():
    """
    Returns all of the journals
    """

    journals = Journal.query.all()

    return {'journals': [journal.to_dict() for journal in journals]}, 200

@journal_routes.route("/<int:id>", methods=["GET"])
@login_required
def journal(id):
    journal = Journal.query.get(id)
    """
    Query for a journal by id and returns that entry in a dictionary
    """

    if journal is None:
        return jsonify({"Error": "Journal not found"}), 404

    return journal.to_dict()

@journal_routes.route("/mine")
@login_required
def my_journals():
    """
    Returns all of the current user's entries
    """

    userId = current_user.id
    user_journals = Journal.query.filter_by(owner_id=userId).all()

    return {'journals': [journal.to_dict() for journal in user_journals]}, 200

@journal_routes.route('/create', methods=["POST"])
@login_required
def journal_create():
    """
    Create a journal based on user id, for the first time
    """
    userId = current_user.id
    form = JournalForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        journal = Journal (
            title = form.data["title"],
            owner_id = userId,
            cover = form.data["cover"]
        )
        db.session.add(journal)
        db.session.commit()
        return jsonify({'journal': journal.to_dict()})

    errors = form.errors
    print(errors)
    return jsonify({'errors': errors}), 400

@journal_routes.route('/<int:id>/edit', methods=["PUT"])
@login_required
def journal_edit(id):
    """
    Edit a journal on user id
    """

    userId = current_user.id

    journal = Journal.query.get(id)

    if not journal:
        return {"Error": "Journal not found."}, 404

    if journal.owner_id != userId:
        return {"Error": "You don't have permission to edit this journal"}, 403


    data = request.get_json()

    if "title" in data:
        journal.title = data["title"]
    if "cover" in data:
        journal.cover = data["cover"]

    db.session.commit()
    return {"journal": journal.to_dict()}, 200

@journal_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def journal_delete(id):
    """
    Delete a journal based on id
    """
    userId = current_user.id
    journal = Journal.query.get(id)

    if journal is None:
        return {'Error': 'Journal not found'}, 404
    if journal.owner_id != userId:
        return {"Error": "You don't have permission to delete this journal."}, 403

    db.session.delete(journal)
    db.session.commit()
    return {'message': 'Successfully deleted'}, 204
