import { useState } from "react"
import "./EntryCreate.css"


const EntryCreate = () => {
    const [title, setTitle] = useState("")
    const [banner, setBanner] = useState("https://htmlcolorcodes.com/assets/images/colors/dark-gray-color-solid-background-1920x1080.png")
    const [content, setContent] = useState("")
    const [weather, setWeather] = useState("")
    const [mood, setMood] = useState("")
    const [fav, setFav] = useState(false)
    return (
        <>
            <div className="entry-form-wrapper">
                <form className="entry-form-container">
                    <div className="entry-form-container">
                        <div className="entry-form-image"><img src={banner} alt="banner-form" className="banner-form-image" /></div>
                        <div className="entry-form-title">
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                placeholder="Input your title..."
                                className="entry-form-title"
                            />
                        </div>
                        <div className="entry-form-content-holder" >
                            <textarea
                                placeholder="Write your entry..."
                                required
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="entry-form-content"
                                rows={33}
                                cols={100}
                            />
                        </div>
                    </div>
                    <div className="entry-form-banner">
                        <h2 className="banner-header">Add a Banner ! 🎨</h2>
                        <input
                            type="text"
                            value={banner}
                            onChange={(e) => setBanner(e.target.value)}
                            placeholder="Banner Url"
                            className="entry-form-banner-input"
                        />
                    </div>
                    <div className="entry-form-weather">
                        <h2 className="banner-header">Weather</h2>
                    </div>
                    <div className="entry-form-mood">
                        <h2 className="banner-header">Mood</h2>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EntryCreate


{/* <form className="entry-form">
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
                                row="8"
                                cols="33"
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
                        </form> */}
