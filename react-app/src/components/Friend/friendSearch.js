import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./friend.css"
import { addFriend, getFriendRequestsThunk, getUserFRThunk, sendFriendRequest, sendFriendRequestThunk } from "../../store/friends";

const FriendSearch = ({ currentUser, allUsers, friend }) => {
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const dispatch = useDispatch()
    console.log(friend)
    console.log(friend)

    const addNewFriend = async (receiver_id) => {
        // console.log(receiver_id)
        console.log(receiver_id)
        await dispatch(sendFriendRequestThunk(receiver_id))
        // console.log(friend)
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

                    {searchResults.length > 0 && (
                        <ul className="search-results">
                            {searchResults.map((i) => (
                                <li className="search-li" key={i}>
                                    <p className="search-title">
                                        {i.username}
                                    </p>
                                    <button className="submit" onClick={() => { addNewFriend(i.id) }}>Add friend?</button>
                                    {/* {isAdded(i.username) && (
                                                    <button onClick={addNewFriend(i.id)}>Add friend?</button>
                                                )} */}

                                </li>
                            ))}
                        </ul>
                    )}

                    {/*  ----------------- SEARCH */}

                    {/* <button type="submit" className="search-button">
                    Search
                </button> */}
                </form>
            </div >
        </>
    )
}

export default FriendSearch
