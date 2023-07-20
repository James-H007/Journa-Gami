import { useEffect, useState } from "react"
import "./Entry.css"
import { useDispatch, useSelector } from "react-redux"
import { getEntryById } from "../../store/entries"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import penguin from "../../assets/giphy.gif"
import { NavLink } from "react-router-dom/cjs/react-router-dom.min"
import pencil from "../../assets/pencil-solid.svg"
import loading from "../../assets/ungaloading.gif"
import cafe from "../../assets/ungacafe.gif"
import trash from "../../assets/trash.svg"
import OpenModalButtonIcon from "../OpenModalButtonIcon"
import EntryDelete from "../EntryDelete"
import backroom from "../../assets/backroom.gif"
import unga from "../../assets/unga.png"
import ReactMarkdown from 'react-markdown'
import htmlToMd from "html-to-md"

const EntryPage = () => {

    const [isLoaded, setIsLoaded] = useState(false)
    const [isLoaded2, setIsLoaded2] = useState(false)
    const [isAuth, setIsAuth] = useState(false)
    const [showMenu, setShowMenu] = useState(false);
    const [weather, setWeather] = useState("none")
    const [mood, setMood] = useState("😐")
    const [content, setContent] = useState("")
    const dispatch = useDispatch()
    const { id } = useParams()
    // console.log(id)

    const sessionUser = useSelector(state => state.session.user)
    const entry = useSelector(state => state.entries.currentEntry)
    const sun = "https://cdn.discordapp.com/attachments/1116804623211184308/1129346105608511508/SunEmoji.gif"
    const cloud = "https://cdn.discordapp.com/attachments/1116804623211184308/1129350125647560805/cloud.gif"
    const rain = "https://cdn.discordapp.com/attachments/1116804623211184308/1129359726552039444/Rain.gif"
    const snow = "https://cdn.discordapp.com/attachments/1116804623211184308/1129361555369230336/snow.gif"


    // console.log(entry)
    useEffect(async () => {
        await dispatch(getEntryById(id))
        await setIsLoaded(true)
    }, [])

    useEffect(async () => {
        if (entry && sessionUser) {
            if (entry.ownerId === sessionUser.id) {
                await setIsAuth(true)
            }
        }

    }, [sessionUser, entry])

    useEffect(async () => {
        if (isLoaded && entry) {
            if (entry.weather === "sunny") {
                setWeather(sun)
            }
            else if (entry.weather === "cloudy") {
                setWeather(cloud)
            }
            else if (entry.weather === "rain") {
                setWeather(rain)
            }
            else if (entry.weather === "snow") {
                setWeather(snow)
            }
            else if (entry.weather === "none") {
                setWeather(unga)
            }
            if (entry.mood === 'netural') {
                setMood("😐")
            }
            if (entry.mood === "happy") {
                setMood("😀")
            }
            if (entry.mood === "sad") {
                setMood("😟")
            }
            if (entry.mood === "angry") {
                setMood("😠")
            }
            if (entry.mood === "scared") {
                setMood("😨")
            }
            if (entry.content) {
                const mdContent = htmlToMd(entry.content)
                setContent(mdContent)

            }
        }
        setIsLoaded2(true)
    }, [isLoaded, entry])



    const closeMenu = () => setShowMenu(false);

    return (
        <>
            {isLoaded && !isLoaded2 && isAuth && (
                <div className="loading">
                    <img src={loading} alt="loading-gif" />
                    <p>Loading...</p>
                </div>)}
            {isLoaded && isLoaded2 && !isAuth && (
                <div className="no-auth">
                    <img src={backroom} alt="no-auth" className="no-auth-img" />
                    <div className="no-auth-text">You're either not allowed here or in nowhere.</div>
                </div>
            )}

            {isLoaded && isLoaded2 && isAuth && (
                <div className="entry-wrapper">
                    <div className="entry-container">
                        <div className="entry-info-1">
                            <div className="entry-info-1-image-container">
                                <img src={cafe} alt="entry-image" className="entry-image" />
                            </div>

                            <div className="entry-info-1-information">
                                <div className="entry-info-1-weather">
                                    <div className="entry-info-1-header">Weather</div>
                                    <img src={weather} alt="weather" className="weather" />
                                </div>
                                <div className="entry-info-1-mood">
                                    <div className="entry-info-1-header">Mood</div>
                                    <div className="entry-info-mood">{mood}</div>
                                </div>
                                <div className="entry-info-1-tags-container">
                                    <div className="entry-info-1-header">Tags</div>
                                    {entry.tags.map((tag, i) => (
                                        <div key={i} className="tag-name">
                                            {tag.tagName}
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                        <div className="entry-info-2">
                            <div className="entry-info-2-banner"><img src={entry.banner} alt="banner" className="entry-banner" /></div>
                            <div className="entry-info-2-title">{entry.title}</div>
                            <div className="entry-info-2-content">
                                <ReactMarkdown>{content}</ReactMarkdown>
                            </div>
                            <div className="entry-info-2-date">Updated at: {entry.updatedAt}</div>
                        </div>
                    </div>
                    <div className="entry-edit-button">
                        <NavLink exact to={`/entries/${entry.id}/edit`}>
                            <img src={pencil} alt="edit-entry" className="pencil" />
                        </NavLink>
                    </div>
                    <div className="entry-trash-button">
                        <OpenModalButtonIcon
                            icon={trash}
                            buttonText="Delete Trash"
                            onItemClick={closeMenu}
                            modalComponent={<EntryDelete id={entry.id} journalId={entry.journalId} />}
                            className="pencil"
                        />
                    </div>
                </div>
            )}
        </>


    )
}

export default EntryPage


// <div className="entry-info-1-image-container">
// <img src={image3} alt="entry-image" className="entry-image" />
// <img src={image4} alt="entry-image" className="entry-image" />
// </div>

// const images = entry.images
// images.map((image, i) => {
//     if (image.imageUrl && i === 0) {
//         setImage1(image.imageUrl)
//     }
//     else if (image.imageUrl && i === 1) {
//         setImage2(image.imageUrl)
//     }
//     else if (image.imageUrl && i === 2) {
//         setImage3(image.imageUrl)
//     }
//     else if (image.imageUrl && i === 3) {
//         setImage4(image.imageUrl)
//     }
// })
