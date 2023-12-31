import { useDispatch } from "react-redux";
import { deleteFriendThunk, getAllFriendsThunk, getFriendRequestsThunk, getOutgoingFriendRequestsThunk } from "../../store/friends";
import { getAllUsers } from "../../store/session";
import deleteFriend from "../../assets/unfriend.svg"


const FriendList = ({ currentUser, allUsers, friend }) => {
    const dispatch = useDispatch();
    const friends = friend.friends
    const unfriend = async (friendId) => {
        await dispatch(deleteFriendThunk(friendId))
        await dispatch(getAllUsers())
        await dispatch(getFriendRequestsThunk())
        await dispatch(getOutgoingFriendRequestsThunk())
        await dispatch(getAllFriendsThunk())
    }


    return (
        <>
            <div className="friend-list-wrapper">
                {friends.length === 0 && (
                    <p>
                        Your friend's list is empty.
                    </p>
                )}
                <div className="friend-list">
                    {friends.map((friend) => (
                        <>
                            <div className="search-li" key={friend.id}>
                                <p className="search-title">{friend.username}</p>
                                <img src={deleteFriend} className="add-user" onClick={() => { unfriend(friend.id) }} />
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </>
    )
}

export default FriendList
