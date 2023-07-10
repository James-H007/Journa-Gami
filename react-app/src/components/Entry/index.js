import { useEffect, useState } from "react"
import "./Entry.css"
import { useDispatch, useSelector } from "react-redux"
import { getEntryById } from "../../store/entries"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

const EntryPage = () => {

    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()
    const { id } = useParams()
    console.log(id)
    const banner = "https://pbs.twimg.com/media/F0qlm58aIAMoT05?format=jpg&name=4096x4096"
    const entry = useSelector(state => state.entries.currentEntry)
    console.log(entry)
    useEffect(async () => {
        await dispatch(getEntryById(id))
        await setIsLoaded(true)
    }, [])

    return (
        <>
            {isLoaded && (
                <div className="entry-wrapper">
                    <div className="entry-container">
                        <div className="entry-info-1">
                            <div className="entry-info-1-image-container">

                            </div>

                        </div>
                        <div className="entry-info-2">
                            <div className="entry-info-2-banner"><img src={entry.banner} alt="banner" className="entry-banner" /></div>
                            <div className="entry-info-2-title">{entry.title}</div>
                            <div className="entry-info-2-content">{entry.content}</div>
                        </div>
                    </div>
                </div>
            )}
        </>


    )
}

export default EntryPage
