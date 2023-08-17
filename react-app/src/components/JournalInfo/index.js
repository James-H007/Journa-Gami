
import { useEffect, useState, useRef } from "react"
import "./JournalInfo.css"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useDispatch, useSelector } from "react-redux"
import { getJournalById } from "../../store/journals"
import OpenModalButton from "../OpenModalButton";
import JournalEditFormModal from "../JournalEditFormModal"
import { useModal } from "../../context/Modal";
import gear from "../../assets/gear-solid.svg"
import OpenModalButtonIcon from "../OpenModalButtonIcon"
import pencil from "../../assets/pen-to-square-solid.svg"
import { NavLink } from "react-router-dom/cjs/react-router-dom.min"
import loading from "../../assets/ungaloading.gif"
import JournalDelete from "../JournalDelete"
import trash from "../../assets/trash.svg"
import backroom from "../../assets/backroom.gif"


const JournalInfo = () => {
    const [cover, setCover] = useState("")
    const [title, setTitle] = useState("")
    const [isLoaded, setIsLoaded] = useState(false)
    const [showMenu, setShowMenu] = useState(false);
    const [isAuth, setIsAuth] = useState(false)
    const { id } = useParams()
    const { closeModal } = useModal();
    const dispatch = useDispatch()
    const currentJournal = useSelector(state => state.journals.currentJournal)
    const sessionUser = useSelector(state => state.session.user)
    const ulRef = useRef();
    const graphic = "https://cdna.artstation.com/p/assets/images/images/064/652/984/large/reza-afshar-0012.jpg?1688450401"
    // console.log(currentJournal)
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    // console.log(sessionUser)


    useEffect(async () => {
        await dispatch(getJournalById(id))
        await setIsLoaded(true)
    }, [])

    useEffect(() => {
        if (currentJournal) {
            setCover(currentJournal.cover);
            setTitle(currentJournal.title)
        }
    }, [currentJournal])

    useEffect(async () => {
        if (sessionUser && currentJournal) {
            if (sessionUser.id === currentJournal.ownerId) {
                setIsAuth(true)
            }
        }

    }, [sessionUser, currentJournal])

    // useEffect(async () => {
    //     await setIsLoaded(false)
    //     await dispatch(getJournalById(id))
    //     await setIsLoaded(true)
    // }, [currentJournal, isLoaded])

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

    // const formatDate = (date) => {
    //     const shrunk = { month: "short", day: "numeric" };
    //     return new Date(dateString).toLocaleDateString("en-US", options);
    // }




    return (
        <>
            {!isLoaded && (
                <div className="loading">
                    <img src={loading} alt="loading-gif" />
                    <p>Loading...</p>
                </div>
            )}
            {isLoaded && !isAuth && (
                <div className="no-auth">
                    <img src={backroom} alt="no-auth" className="no-auth-img" />
                    <div className="no-auth-text">You're either not allowed here or in nowhere.</div>
                </div>
            )}
            {isLoaded && currentJournal && isAuth && (
                <div className="single-journal-wrapper">
                    <div className="single-journal-container">
                        <div className="single-journal-box-preview">
                            <div className="single-journal-box-cover">
                                <img src={currentJournal.cover} alt='cover' className="cover-art" />
                            </div>
                            <div className="single-journal-title">{currentJournal.title}</div>
                        </div>
                    </div>
                    <div className="entry-collection-container">
                        {currentJournal.entries.map((entry, i) => (
                            <NavLink exact to={`/entries/${entry.id}`} className="entry-collection-link" key={i}>
                                <div className="entry-collection-preview" >
                                    <div className="entry-collection-entry-title">{entry.title}</div>
                                    <div className="entry-collection-entry-banner"><img src={entry.banner} alt="banner" className="entry-banner-img" /></div>
                                </div>
                            </NavLink>
                        ))}

                    </div>
                    <div className="journal-edit-button">
                        <OpenModalButtonIcon
                            icon={gear}
                            buttonText="Edit Journal"
                            onItemClick={closeMenu}
                            modalComponent={<JournalEditFormModal />}
                            className="journal-edit-button"
                        />

                    </div>
                    <div className="journal-delete-button">
                        <OpenModalButtonIcon
                            icon={trash}
                            buttonText="Delete Journal"
                            onItemClick={closeMenu}
                            modalComponent={<JournalDelete id={currentJournal.id} />}
                        />
                    </div>
                    <div className="entry-create-button">
                        <NavLink exact to={`/journals/${currentJournal.id}/entries/create`}>
                            <img src={pencil} alt="make-entry" className="pencil" />
                        </NavLink>

                    </div>
                </div>
            )}
        </>
    )
}

export default JournalInfo

// {
//     cover:
//       'https://cdnb.artstation.com/p/assets/images/images/064/381/991/4k/krzysztof-maziarz-forestrailsmockup-final.jpg?1687803093',
//     createdAt: 'Mon, 26 Jun 2023 22:38:25 GMT',
//     entries: [],
//     id: 4,
//     ownerId: 1,
//     title: 'Art',
//     updatedAt: 'Mon, 26 Jun 2023 22:38:25 GMT'
//   }
