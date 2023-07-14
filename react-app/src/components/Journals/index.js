import { useEffect, useRef, useState } from "react"
import { NavLink } from 'react-router-dom';
import "./journal.css"
import { useDispatch, useSelector } from "react-redux"
import { getUserJournals } from "../../store/journals"
import OpenModalButton from "../OpenModalButton";
import JournalFormModal from "../JournalFormModal";
import loadingGif from "../../assets/giphy.gif"
import OpenModalButtonIcon from "../OpenModalButtonIcon";
import hammer from "../../assets/hammer-solid.svg"
import plus from "../../assets/plus-solid.svg"
const JournalPage = () => {

    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const sessionUser = useSelector(state => state.session.user)
    const myJournals = useSelector(state => state.journals.myJournals)
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    // console.log("---------", myJournals)

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };



    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    useEffect(async () => {
        await dispatch(getUserJournals())
        await setIsLoaded(true)
    }, [])
    return (
        <>
            {!isLoaded && (
                <div className="loading">
                    <img src={loadingGif} alt="loading-gif" />
                    <p>Loading...</p>
                </div>)}
            {
                isLoaded && (
                    <div className="journal-wrapper">
                        <div className="journal-container">
                            {myJournals.map((journal, i) => (
                                <NavLink exact to={`/journals/${journal.id}`} key={i}>
                                    <div className="journal-holder" >
                                        <div className="journal-cover"><img src={journal.cover} alt="cover" className="journal-image" /></div>
                                        <div className="journal-title">{journal.title}</div>
                                    </div>
                                </NavLink>
                            ))
                            }
                            <div className="journal-button">
                                <OpenModalButtonIcon
                                    icon={plus}
                                    buttonText="Create a Journal"
                                    onItemClick={closeMenu}
                                    modalComponent={<JournalFormModal />}
                                    className="journal-button"
                                />
                            </div>


                        </div>

                    </div>
                )
            }
        </>

    )
}

export default JournalPage


// myJournals:
//   [
//     {
//       cover: 'https://t4.ftcdn.net/jpg/05/75/86/09/360_F_575860904_9tKnp9yT8ngej9Et1rtBaWHHxxGr8ac0.jpg',
//       createdAt: 'Mon, 26 Jun 2023 22:32:51 GMT',
//       entries: [
//         {
//           banner: 'https://cdnb.artstation.com/p/assets/images/images/064/094/593/4k/martin-teichmann-antique-shop-01.jpg',
//           content: 'This was a good book.',
//           createdAt: 'Mon, 26 Jun 2023 22:32:51 GMT',
//           favorite: false,
//           id: 1,
//           images: [
//             {
//               createdAt: 'Mon, 26 Jun 2023 22:32:51 GMT',
//               entryId: 1,
//               id: 1,
//               imageUrl: 'https://static.wikia.nocookie.net/monster-prom/images/c/cf/Map-city.png',
//               updatedAt: 'Mon, 26 Jun 2023 22:32:51 GMT'
//             }
//           ],
//           journalId: 1,
//           location: 'California',
//           mood: 'happy',
//           ownerId: 1,
//           tags: [
//             {
//               createdAt: 'Mon, 26 Jun 2023 22:32:51 GMT',
//               entryId: 1,
//               id: 1,
//               tagName: 'Books',
//               updatedAt: 'Mon, 26 Jun 2023 22:32:51 GMT'
//             }
//           ],
//           title: 'Withering Heights',
//           updatedAt: 'Mon, 26 Jun 2023 22:32:51 GMT',
//           weather: 'sunny'
//         }
//       ],
//       id: 1,
//       ownerId: 1,
//       title: 'Astronauts',
//       updatedAt: 'Mon, 26 Jun 2023 22:32:51 GMT'
//     }, {
//       cover:
//         'https://cdnb.artstation.com/p/assets/images/images/064/381/991/4k/krzysztof-maziarz-forestrailsmockup-final.jpg?1687803093',
//       createdAt: 'Mon, 26 Jun 2023 22:38:25 GMT',
//       entries: [],
//       id: 4,
//       ownerId: 1,
//       title: 'Art',
//       updatedAt: 'Mon, 26 Jun 2023 22:38:25 GMT'
//     },

//   ]
