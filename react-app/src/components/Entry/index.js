import { useEffect, useState } from "react"
import "./Entry.css"
import { useDispatch, useSelector } from "react-redux"
import { getEntryById } from "../../store/entries"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import penguin from "../../assets/giphy.gif"
import { NavLink } from "react-router-dom/cjs/react-router-dom.min"
import pencil from "../../assets/pencil-solid.svg"

const EntryPage = () => {

    const [isLoaded, setIsLoaded] = useState(false)
    const [isLoaded2, setIsLoaded2] = useState(false)
    const [isAuth, setIsAuth] = useState(false)
    const [image1, setImage1] = useState("https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg")
    const [image2, setImage2] = useState("https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg")
    const [image3, setImage3] = useState("https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg")
    const [image4, setImage4] = useState("https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg")
    const dispatch = useDispatch()
    const { id } = useParams()
    // console.log(id)

    const sessionUser = useSelector(state => state.session.user)
    const entry = useSelector(state => state.entries.currentEntry)
    const sun = "https://cdn.discordapp.com/attachments/1116804623211184308/1129346105608511508/SunEmoji.gif"
    const cloud = "https://cdn.discordapp.com/attachments/1116804623211184308/1129350125647560805/cloud.gif"
    const rain = "https://cdn.discordapp.com/attachments/1116804623211184308/1129359726552039444/Rain.gif"
    const snow = "https://cdn.discordapp.com/attachments/1116804623211184308/1129361555369230336/snow.gif"
    const unga = "https://cdn.discordapp.com/attachments/1116804623211184308/1129364927321210900/unga.gif"
    const unga2 = "https://cdn.discordapp.com/attachments/1116804623211184308/1129368567192752138/ungatv.gif"
    console.log(entry)
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
            const images = entry.images
            images.map((image, i) => {
                if (image.imageUrl && i === 0) {
                    setImage1(image.imageUrl)
                }
                else if (image.imageUrl && i === 1) {
                    setImage2(image.imageUrl)
                }
                else if (image.imageUrl && i === 2) {
                    setImage3(image.imageUrl)
                }
                else if (image.imageUrl && i === 3) {
                    setImage4(image.imageUrl)
                }
            })
        }
        setIsLoaded2(true)
    }, [isLoaded, entry])

    return (
        <>
            {isLoaded && !isLoaded2 && isAuth && (
                <div className="loading">
                    <img src={penguin} alt="loading-gif" />
                    <p>Loading...</p>
                </div>)}
            {isLoaded && isLoaded2 && !isAuth && (
                <div>
                    YOU DON'T BELONG HERE!
                </div>
            )}

            {isLoaded && isLoaded2 && isAuth && (
                <div className="entry-wrapper">
                    <div className="entry-container">
                        <div className="entry-info-1">
                            <div className="entry-info-1-image-container">
                                <img src={unga2} alt="entry-image" className="entry-image" />

                            </div>

                            <div className="entry-info-1-information">
                                <div className="entry-info-1-weather">
                                    <div className="entry-info-1-header">Weather</div>
                                    <img src={snow} alt="weather" className="weather" />
                                </div>
                                <div className="entry-info-1-mood">
                                    <div className="entry-info-1-header">Mood</div>
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
                            <div className="entry-info-2-content">{entry.content}</div>
                            <div className="entry-info-2-date">Updated at: {entry.updatedAt}</div>
                        </div>
                    </div>
                    <div className="entry-edit-button">
                        <NavLink exact to={`/entries/${entry.id}/edit`}>
                            <img src={pencil} alt="edit-entry" className="pencil" />
                        </NavLink>
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
