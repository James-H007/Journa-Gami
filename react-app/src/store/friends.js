const GET_MY_FRIENDS = "friend-request/GET_ALL_FRIENDS"
const ADD_FRIEND = "friend-request/ADD_FRIEND";
const REMOVE_FRIEND = "friend-request/REMOVE_FRIEND"
const GET_OUTGOING_FRIEND_REQUESTS = "friend-request/GET_OUTGOING_FRIEND_REQUESTS"
const GET_A_USER_FRIEND_REQUESTS = "friend-request/GET_A_USER_FRIEND_REQUESTS"
const GET_FRIEND_REQUESTS = "friend-request/GET_FRIEND_REQUESTS";
const ACCEPT_FRIEND_REQUEST = "friend-request/ACCEPT_FRIEND_REQUEST";
const SEND_FRIEND_REQUEST = "friend-request/SEND_FRIEND_REQUEST";
const DECLINE_FRIEND_REQUEST = "friend-request/DECLINE_FRIEND_REQUEST";

const getAUserFriendRequests = (friendRequests) => {
    return {
        type: GET_A_USER_FRIEND_REQUESTS,
        payload: friendRequests
    }
}

const getAUserFriendOutgoingRequests = (friendRequests) => {
    return {
        type: GET_OUTGOING_FRIEND_REQUESTS,
        payload: friendRequests
    }
}

const getFriendRequests = (friendRequests) => {
    return {
        type: GET_FRIEND_REQUESTS,
        payload: friendRequests,
    }
};

const declineFriendRequest = (requestId) => {
    return {
        type: DECLINE_FRIEND_REQUEST,
        payload: requestId
    }
};

const addFriend = (friendId) => {
    return {
        type: ADD_FRIEND,
        payload: friendId,
    }
};


const sendFriendRequest = (friendRequest) => {
    return {
        type: SEND_FRIEND_REQUEST,
        payload: friendRequest,
    }
};

const acceptFriendRequest = (friendRequest) => {
    return {
        type: ACCEPT_FRIEND_REQUEST,
        payload: friendRequest,
    }
};

const removeFriend = (friendId) => {
    return {
        type: REMOVE_FRIEND,
        payload: friendId
    }
}

const getFriends = (friends) => {
    return {
        type: GET_MY_FRIENDS,
        payload: friends
    }
}


export const addFriendThunk = (friend_id) => async (dispatch) => {
    const response = await fetch(`/api/friend/${friend_id}/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        dispatch(addFriend(friend_id));
    } else {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    }
};



export const sendFriendRequestThunk = (receiver_id) => async (dispatch) => {
    const response = await fetch(`/api/friend/${receiver_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        const { friend_request } = await response.json();
        dispatch(sendFriendRequest(friend_request));
        return friend_request
    } else {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    }
};


// @friendrequest_routes.route('/<int:request_id>/accept', methods=['POST'])
export const postAcceptFriendRequestThunk = (request_id) => async (dispatch) => {
    try {
        const response = await fetch(`/api/friend/${request_id}/accept`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.ok) {
            const data = await response.json()
            // console.log(data);
            dispatch(acceptFriendRequest(data))

        } else {
            const data = await response.json()

            if (data.errors) {
                return data.errors
            }
        }
    } catch (error) {
        console.error("Error occurred:", error);
    }

};


// @friendrequest_routes.route('/<int:friend_id>/remove', methods=['DELETE'])
export const deleteFriendThunk = (friend_id) => async (dispatch) => {
    const response = await fetch(`/api/friend/${friend_id}/remove`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })


    if (response.ok) {
        dispatch(removeFriend(friend_id))

    } else {

        const data = await response.json()

        if (data.errors) {
            return data.errors
        }
    }
}

//@friend_routes.route('/<int:id>/requests', methods = ['GET'])
export const getUserFRThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/friend/${id}/requests`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        const data = await response.json()
        // console.log(data)
        dispatch(getAUserFriendRequests(data.friend_requests))
    }
    else {
        const data = await response.json()
        if (data.errors) {
            return data.errors
        }
    }
}

// @friendrequest_routes.route('/friends', methods=['GET'])
export const getAllFriendsThunk = () => async (dispatch) => {
    const response = await fetch(`/api/friend/friends`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(getFriends(data.friends))

    } else {
        const data = await response.json()

        if (data.errors) {
            return data.errors
        }
    }
}


export const getFriendRequestsThunk = () => async (dispatch) => {
    const response = await fetch(`/api/friend/requests`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(getFriendRequests(data.friend_requests))
        // console.log(data)
        return data
    } else {
        const data = await response.json()

        if (data.errors) {
            return data.errors
        }
    }
};

//@friend_routes.route('/outgoing-requests', methods=['GET'])
export const getOutgoingFriendRequestsThunk = () => async (dispatch) => {
    const response = await fetch(`/api/friend/outgoing-requests`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(getAUserFriendOutgoingRequests(data.friend_requests))

    } else {
        const data = await response.json()

        if (data.errors) {
            return data.errors
        }
    }
}

export const postDeclineFriendRequestThunk = (request_id) => async (dispatch) => {
    const response = await fetch(`/api/friend/${request_id}/decline`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        dispatch(declineFriendRequest(request_id))

    }
    // else {
    //     const data = await response.json()

    //     if (data.errors) {
    //         return data.errors
    //     }
    // }

};




const initialState = { requests: [], friends: [], query: null, outgoing: [] };

export default function friendRequestReducer(state = initialState, action) {
    switch (action.type) {
        case GET_A_USER_FRIEND_REQUESTS:
            return {
                ...state,
                query: action.payload
            }
        case GET_OUTGOING_FRIEND_REQUESTS:
            return {
                ...state,
                outgoing: action.payload
            }

        case GET_FRIEND_REQUESTS:
            return {
                ...state,
                requests: action.payload
            }

        case DECLINE_FRIEND_REQUEST:
            return {
                ...state,
                requests: state.requests.filter((i) => i.id !== action.payload),
                outgoing: state.outgoing.filter((i) => i.id !== action.payload)
            }

        case ACCEPT_FRIEND_REQUEST:
            return {
                ...state,
                requests: state.requests.filter((i) => i.id !== action.payload.id),
                friends: [...state.friends, action.payload]
            }

        case SEND_FRIEND_REQUEST:
            return {
                ...state,
                requests: [...state.requests, action.payload]
            }

        case REMOVE_FRIEND:
            return {
                ...state,
                friends: state.friends.filter((i) => i.id !== action.payload)
            }

        case GET_MY_FRIENDS:
            return {
                ...state,
                friends: action.payload
            }

        case ADD_FRIEND:
            return {
                ...state,
                requests: state.requests.filter((i) => i.id !== action.payload.id),
                friends: [...state.friends, action.payload]
            }

        default:
            return state;
    }
}
