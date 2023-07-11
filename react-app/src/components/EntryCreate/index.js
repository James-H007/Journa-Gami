import { useState } from "react"
import "./EntryCreate.css"


const EntryCreate = () => {
    const [title, setTitle] = useState("")
    const [banner, setBanner] = useState("")
    const [content, setContent] = useState("")
    const [weather, setWeather] = useState("")
    const [mood, setMood] = useState("")
    const [fav, setFav] = useState(false)
    return (
        <>
            <div className="entry-form-wrapper">
                <div className="entry-form-container">
                    <form>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="Title"
                        />
                        <textarea
                            placeholder="Write your entry..."
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <label for="weather-select">Choose the weather: </label>
                        <select name="weather" id="weather-select" onChange={(e) => setWeather(e.target.value)}>
                            <option value="sunny">☀️</option>
                            <option value="cloudy">☁️</option>
                            <option value="rain">🌧️</option>
                            <option value="snow">❄️</option>
                        </select>
                        <label for="mood-select">Choose a mood: </label>
                        <select name="mood" id="mood-select" onChange={(e) => setMood(e.target.value)}>
                            <option value="happy">Happy</option>
                            <option value="sad">Sad</option>
                            <option value="scared">Scared</option>
                            <option value="neutral">Neutral</option>
                        </select>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EntryCreate
