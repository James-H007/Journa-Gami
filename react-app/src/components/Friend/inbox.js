import { useDispatch } from "react-redux"
import { getAllFriendsThunk, getFriendRequestsThunk, getOutgoingFriendRequestsThunk, postAcceptFriendRequestThunk, postDeclineFriendRequestThunk } from "../../store/friends";
import check from "../../assets/check-solid.svg"
import x from "../../assets/x-solid.svg"

const Inbox = ({ currentUser, allUsers, friend }) => {
    const dispatch = useDispatch();

    const requests = friend.requests

    const isAccepted = (request) => {
        if (friend) {
            if (request.accepted) {
                return true
            }
        }
        return false
    }

    const acceptFR = async (requestId) => {
        await dispatch(postAcceptFriendRequestThunk(requestId))
        await dispatch(getFriendRequestsThunk())
        await dispatch(getOutgoingFriendRequestsThunk())
        await dispatch(getAllFriendsThunk())
    }

    const declineFR = async (requestId) => {
        await dispatch(postDeclineFriendRequestThunk(requestId))
        await dispatch(getFriendRequestsThunk())
        await dispatch(getOutgoingFriendRequestsThunk())
        await dispatch(getAllFriendsThunk())
    }

    return (
        <>
            <div className="friend-list-wrapper">
                {friend.requests.length === 0 && (
                    <p>
                        Your inbox is empty.
                    </p>
                )}
                {friend.requests.length > 0 && (
                    <div className="friend-list">
                        {requests.map((request) => (
                            <div key={request.id}>
                                {!isAccepted(request) && (
                                    <div className="search-li" >
                                        <p className="search-title">{request.sender.username} would like to add you!</p>
                                        <div>
                                            <img src={check} className="add-user" onClick={() => { acceptFR(request.id) }} />
                                            <img src={x} className="add-user" onClick={() => { declineFR(request.id) }} />
                                        </div>
                                    </div>
                                )}

                            </div>
                        ))}

                    </div>
                )
                }
            </div>
        </>
    )
}

export default Inbox
