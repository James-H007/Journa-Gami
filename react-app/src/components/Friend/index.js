import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../store/session";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./friend.css"
import { addFriend, getAllFriendsThunk, getFriendRequestsThunk, getOutgoingFriendRequestsThunk, getUserFRThunk, sendFriendRequest, sendFriendRequestThunk } from "../../store/friends";
import FriendSearch from "./friendSearch";
import FriendList from "./friendList";
import Inbox from "./inbox";

const Friend = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [tabNumber, setTabNumber] = useState(0)

    const dispatch = useDispatch()
    const allUsers = useSelector(state => state.session.users)
    const currentUser = useSelector(state => state.session.user)
    const friend = useSelector(state => state.friends)
    // console.log(currentUser)
    // console.log(allUsers)
    // console.log(friend)
    console.log(friend)


    // const addNewFriend = async (receiver_id) => {
    //     // console.log(receiver_id)
    //     dispatch(getUserFRThunk(2))
    //     console.log(friend)
    // }


    useEffect(async () => {
        await dispatch(getAllUsers())
        await dispatch(getFriendRequestsThunk())
        await dispatch(getOutgoingFriendRequestsThunk())
        await dispatch(getAllFriendsThunk())
        await setIsLoaded(true)
    }, [])

    return (
        <>
            {
                isLoaded && (
                    <>
                        <div className="friend-wrapper">
                            <div className="friend-nav">
                                <div className="friend-tabs">
                                    <div className="friend-tab" onClick={() => { setTabNumber(0) }}>Friends</div>
                                    <div className="friend-tab" onClick={() => { setTabNumber(1) }}>Inbox</div>
                                    <div className="friend-tab" onClick={() => { setTabNumber(2) }}> Search</div>
                                </div>
                            </div>
                            <div className="friend-comp-wrapper">
                                <div className="friend-component">
                                    {(tabNumber == 0) && (
                                        <>
                                            <FriendList allUsers={allUsers} currentUser={currentUser} friend={friend} />

                                        </>
                                    )}
                                    {(tabNumber == 1) && (
                                        <>
                                            <Inbox allUsers={allUsers} currentUser={currentUser} friend={friend} />
                                        </>

                                    )}
                                    {(tabNumber == 2) && (
                                        <>
                                            <FriendSearch allUsers={allUsers} currentUser={currentUser} friend={friend} />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default Friend
