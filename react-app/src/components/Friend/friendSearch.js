import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./friend.css"
import { addFriend, getAllFriendsThunk, getFriendRequestsThunk, getOutgoingFriendRequestsThunk, getUserFRThunk, sendFriendRequest, sendFriendRequestThunk } from "../../store/friends";
import { getAllUsers } from "../../store/session";
import addUser from "../../assets/user-plus-solid.svg"

const FriendSearch = () => {
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false)
    const [resultsLoaded, setResultsLoaded] = useState(false)
    const dispatch = useDispatch()
    const allUsers = useSelector(state => state.session.users)
    const currentUser = useSelector(state => state.session.user)
    const friend = useSelector(state => state.friends)


    useEffect(async () => {
        await dispatch(getAllUsers())
        await dispatch(getFriendRequestsThunk())
        await dispatch(getOutgoingFriendRequestsThunk())
        await dispatch(getAllFriendsThunk())
        await setIsLoaded(true)
        await setResultsLoaded(true)
    }, [])




    const addNewFriend = async (receiver_id) => {
        await setResultsLoaded(false)
        await dispatch(sendFriendRequestThunk(receiver_id))
        await dispatch(getAllUsers())
        await dispatch(getFriendRequestsThunk())
        await dispatch(getOutgoingFriendRequestsThunk())
        await dispatch(getAllFriendsThunk())
        await setResultsLoaded(true)
    }

    const handleSearch = async (e) => {
        setSearchText(e.target.value);


        if (e.target.value === '') {
            setSearchResults([])
            return

        }

        const results = allUsers.users.filter((i) =>
            i.username.toLowerCase().includes(e.target.value.toLowerCase())
            && i.username.toLowerCase() !== currentUser.username.toLowerCase()
        );

        setSearchResults(results);
    };

    const isAdded = (userId) => {
        // console.log(userId)
        if (friend.requests || friend.outgoing) {

            if (friend.requests.length > 0) {
                if (friend.requests.some((request) => (request.receiver.id === userId))
                    ||
                    friend.requests.some((request) => (request.sender.id === userId))) {
                    // console.log("hit")
                    return true
                }
            }
            if (friend.outgoing.length > 0) {
                if (friend.outgoing.some((request) => (request.receiver.id === userId))
                    ||
                    friend.outgoing.some((request) => (request.sender.id === userId))) {
                    return true
                }
            }
            if (friend.friends.length > 0) {
                if (friend.friends.some((friend) => (friend.id === userId))) {
                    return true
                }
            }

            return false
        }

        return false

    }



    return (
        <>
            {isLoaded && (
                <div className="search-wrapper">
                    <form className="searchForm">
                        <input
                            type="text"
                            name="search"
                            placeholder="Search..."
                            className="searchInput"
                            value={searchText}
                            onChange={handleSearch}
                        ></input>
                        {resultsLoaded && (
                            <>
                                {searchResults.length > 0 && (
                                    <ul className="search-results">
                                        {searchResults.map((user) => (
                                            <li className="search-li" key={user.id}>
                                                <p className="search-title">
                                                    {user.username}
                                                </p>
                                                {!isAdded(user.id) && (
                                                    <img src={addUser} className="add-user" onClick={() => { addNewFriend(user.id) }} />
                                                )}
                                                {/* {isAdded(i.username) && (
                                                    <button onClick={addNewFriend(i.id)}>Add friend?</button>
                                                )} */}

                                            </li>
                                        ))}
                                    </ul>

                                )}
                            </>
                        )}
                        {/*  ----------------- SEARCH */}

                        {/* <button type="submit" className="search-button">
                    Search
                </button> */}
                    </form>
                </div>
            )}
        </>
    )
}

export default FriendSearch
