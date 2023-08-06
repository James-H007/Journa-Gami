import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./friend.css"
import { addFriend, getFriendRequestsThunk, getUserFRThunk, sendFriendRequest, sendFriendRequestThunk } from "../../store/friends";

const FriendSearch = ({ currentUser, allUsers, friend }) => {
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const dispatch = useDispatch()

    const addNewFriend = async (receiver_id) => {
        // console.log(receiver_id)
        dispatch(getUserFRThunk(2))
        console.log(friend)
    }

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

    return (
        <>
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
        </>
    )
}

export default FriendSearch
