from flask import Blueprint, jsonify, session, request
from app.models import User, db, Journal
from app.forms import JournalForm
from flask_login import current_user, login_user, logout_user, login_required

journal_routes = Blueprint('journals', __name__)

@journal_routes.route("/")
def journals():
    """
    Returns all of the journals
    """

    journals = Journal.query.all()

    return {'journals': [journal.to_dict for journal in journals]}, 200

@journal_routes.route("/mine")

def my_journals():
    """
    Returns all of the journals owned by the current user
    """
