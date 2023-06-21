from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.models.pet import Pet
from app.forms.entry_form import EntryForm
from app.forms.pet_form import PetForm
from flask_login import current_user, login_user, logout_user, login_required

pet_routes = Blueprint('pets', __name__)

@pet_routes.route("/")
def pets():
    """
    Return all of the pets
    """

    pets = Pet.query.all()

    return {'pets': [pet.to_dict() for pet in pets]}, 200

@pet_routes.route('/<int:id>')
@login_required
def pet(id):
    pet = Pet.query.get(id)
    """
    Query for an entry by id and returns that entry in a dictionary
    """

    if pet is None:
        return jsonify({"Error": "Pet not found :("}), 404

    return pet.to_dict()

@pet_routes.route('/mine')
@login_required
def my_pet():
    """
    Return the user's pet
    """

    userId = current_user.id
    user_pet = Pet.query.filter_by(owner_id=userId)

    return {'pet': user_pet.to_dict()}, 200

@pet_routes.route('/create', methods = ["POST"])
@login_required
def pet_create():
    """
    Create a pet
    """

    userId = current_user.id
    form = PetForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        pet = Pet (
            owner_id = userId,
            name = form.data["name"]
        )

        db.session.add(pet)
        db.session.commit()
        return jsonify({'pet': pet.to_dict()})

    errors = form.errors
    print(errors)

    return jsonify({'errors': errors}), 400

@pet_routes.route('/<int:id>/edit', methods=["PUT"])
@login_required
def pet_edit(id):
    """
    Edit a pet based on pet id
    """

    userId = current_user.id

    pet = Pet.query.get(id)

    if not pet:
        return {"Error": "Pet not found"}, 404

    if pet.owner_id != userId:
        return {"Error": "You don't have permission to edit this pet"}, 403

    data = request.get_json()

    if "name" in data:
        pet.name = data["name"]
    if "happiness" in data:
        pet.happiness = data["happiness"]

    db.session.commit()
    return {'pet': pet.to_dict()}, 200

@pet_routes.route('/<int:id>/delete', methods = ['DELETE'])
@login_required
def pet_delete(id):
    """
    Delete a pet based on id
    """

    userId = current_user.id
    pet = Pet.query.get(id)

    if pet is None:
        return {'Error': 'Pet not found'}, 404
    if pet.owner_id != userId:
        return {'Error': "You don't have permission to delete this pet."}, 403

    db.session.delete(pet)
    db.session.commit()
    return {'message': 'Successfully deleted'}, 204
