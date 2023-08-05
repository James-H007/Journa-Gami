import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../store/session";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./friend.css"
import { addFriend, getFriendRequestsThunk, sendFriendRequest, sendFriendRequestThunk } from "../../store/friends";

const Friend = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const dispatch = useDispatch()
    const allUsers = useSelector(state => state.session.users)
    const currentUser = useSelector(state => state.session.user)
    const friend = useSelector(state => state.friends)
    console.log(currentUser)
    console.log(allUsers)
    console.log(friend)
    const handleSearch = async (e) => {
        setSearchText(e.target.value);


        if (e.target.value === '') {
            setSearchResults([])
            return

        }

        const results = allUsers.users.filter((i) =>
            i.username.toLowerCase().includes(e.target.value.toLowerCase()) && i.username.toLowerCase() !== currentUser.username.toLowerCase()
        );

        setSearchResults(results);
    };

    const addNewFriend = async (receiver_id) => {
        // console.log(receiver_id)
        dispatch(sendFriendRequestThunk(receiver_id))
    }

    const isAdded = async (target) => {
        if (allUsers && currentUser) {
            currentUser.addedFriends.forEach(friend => {
                if (friend.username.toLowerCase() === target) {
                    console.log(friend.username)
                    return true
                }
            });
            return false
        }
    }

    useEffect(async () => {
        await dispatch(getAllUsers())
        await dispatch(getFriendRequestsThunk())
        await setIsLoaded(true)
    }, [])

    return (
        <>
            {
                isLoaded && (
                    <>
                        <div className="friend-wrapper">
                            <form className="searchForm">
                                <input
                                    type="text"
                                    name="search"
                                    placeholder="Search..."
                                    className="searchInput"
                                    value={searchText}
                                    onChange={handleSearch}
                                ></input>

                                {searchResults.length > 0 && (
                                    <ul className="search-results">
                                        {searchResults.map((i) => (
                                            <li className="search-li" key={i}>
                                                <p className="search-title" onClick={() => {
                                                    // setSearchResults([]);
                                                    // setSearchText("");
                                                }}>
                                                    {i.username}

                                                </p>
                                                <button onClick={addNewFriend(i.id)}>Add friend?</button>
                                                {/* {isAdded(i.username) && (
                                                    <button onClick={addNewFriend(i.id)}>Add friend?</button>
                                                )} */}

                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {/*  ----------------- SEARCH */}

                                <button type="submit" className="search-button">
                                    Search
                                </button>
                            </form>

                        </div>
                    </>
                )
            }
        </>
    )
}

export default Friend
