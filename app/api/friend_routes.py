from flask import Blueprint, jsonify, session, request
from app.models import User, db, Friend, FriendRequest
from flask_login import current_user, login_user, logout_user, login_required
from datetime import datetime

friend_routes = Blueprint('friend', __name__)


@friend_routes.route('/requests', methods=['GET'])
@login_required
def get_friend_requests():
    """
    Get all current's users friend requests
    """
    user_id = current_user.id
    friend_requests = FriendRequest.query.filter_by(receiver_id=user_id).all()

    return jsonify({"friend_requests": [request.to_dict() for request in friend_requests]}), 200

@friend_routes.route('/outgoing-requests', methods=['GET'])
@login_required
def get_outgoing_friend_requests():
    """
    Get all current's users out-going friend requests
    """
    user_id = current_user.id
    friend_requests = FriendRequest.query.filter_by(sender_id=user_id).all()

    return jsonify({"friend_requests": [request.to_dict() for request in friend_requests]}), 200

@friend_routes.route('/<int:id>/requests', methods = ['GET'])
@login_required
def get_requests_user_id(id):
    """
    Get a specific user's friend requests
    """
    friend_requests = FriendRequest.query.filter(receiver_id=id).all()

    return jsonify({"friend_requests": [request.to_dict() for request in friend_requests]}), 200


@friend_routes.route('/<int:request_id>/decline', methods=['DELETE'])
@login_required
def decline_friend_request(request_id):
    """
    Decline friend request
    """
    friend_request = FriendRequest.query.get(request_id)

    if friend_request is None or friend_request.receiver_id != current_user.id:
        return jsonify({'error': 'Decline failed'})

    friend_request.status = 'Declined'

    db.session.delete(friend_request)
    db.session.commit()

    # return {'friend_requests': [friend_request.to_dict()]}
    return {'message': "Successfully deleted"}, 204


@friend_routes.route('/<int:friend_id>/add', methods=['POST'])
@login_required
def add_friend(friend_id):
    """
    Add a friend
    """
    friends = Friend(
        user_id=current_user.id,
        friend_id=friend_id
    )

    db.session.add(friends)
    db.session.commit()

    return jsonify({"friends": [friends.to_dict()]}), 200


@friend_routes.route('/<int:receiver_id>', methods=['POST'])
@login_required
def send_friend_request(receiver_id):
    """
    Send a friend request
    """

    friend_request = FriendRequest(
        sender_id = current_user.id,
        receiver_id = receiver_id,
        status = 'Sent',
    )

    db.session.add(friend_request)
    db.session.commit()

    return jsonify({'friend_request': friend_request.to_dict()}), 201


@friend_routes.route('/<int:request_id>/accept', methods=['POST'])
@login_required
def accept_friend_request(request_id):
    """
    Accept friend request
    """

    friend_request = FriendRequest.query.get(request_id)

    if friend_request is None or friend_request.receiver_id != current_user.id:
        return jsonify({'error': 'Error with friend request'})


    friend1 = Friend(
        user_id=friend_request.sender_id,
        friend_id=friend_request.receiver_id
    )
    friend2 = Friend(
        user_id=friend_request.receiver_id,
        friend_id=friend_request.sender_id
    )

    db.session.add(friend1)
    db.session.add(friend2)

    friend_request.accepted = True

    db.session.delete(friend_request)
    db.session.commit()


    return {'friend1': friend1.to_dict(), 'friend2': friend2.to_dict()}


@friend_routes.route('/<int:friend_id>/remove', methods=['DELETE'])
@login_required
def remove_friend(friend_id):
    """
    Remove friend
    """

    friend = Friend.query.filter(((Friend.user_id == current_user.id) & (Friend.friend_id == friend_id))).first()
    friend2 = Friend.query.filter((Friend.user_id == friend_id) & (Friend.friend_id == current_user.id)).first()

    if not friend and not friend2 :
        return jsonify({'error': 'Friend does not exist'}), 404

    if friend:
        db.session.delete(friend)

    if friend2:
        db.session.delete(friend2)

    db.session.commit()

    return jsonify({'message': 'Successfully unfriended'}), 200


@friend_routes.route('/friends', methods=['GET'])
@login_required
def get_friends():
    """
    Get user's friend
    """

    friends = User.query.get(current_user.id).added_friends

    return jsonify({"friends": [friend.friend.to_dict_simple() for friend in friends]}), 200
