import { useState } from "react"
import "./EntryCreate.css"
import { useDispatch } from "react-redux"
import { getUserEntries, makeEntry } from "../../store/entries"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"


const EntryEdit = () => {
    const [title, setTitle] = useState("")
    const [banner, setBanner] = useState("https://htmlcolorcodes.com/assets/images/colors/dark-gray-color-solid-background-1920x1080.png")
    const [content, setContent] = useState("")
    const [weather, setWeather] = useState("none")
    const [mood, setMood] = useState("none")
    const [favorite, setFavorite] = useState(false)
    const [location, setLocation] = useState("CA")
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    console.log(id, "HERE IS THE ID")
    const handleSubmit = async (e) => {
        e.preventDefault();
        let form = { title, banner, content, weather, mood, location, favorite };
        if (title.length > 0) {
            form.title = title
        }
        if (banner.length > 0) {
            form.banner = banner
        }
        if (content.length > 0) {
            form.content = content
        }
        if (weather) {
            form.weather = weather
        }
        if (mood) {
            form.mood = mood
        }
        if (location) {
            form.location = location
        }
        if (favorite) {
            form.favorite = favorite
        }


        console.log(form)
        console.log(id)
        const data = await dispatch(makeEntry(id, form))
        console.log(data)
        await dispatch(getUserEntries())
        if (data) {
            await history.push(`/entries/${data.id}/image`)
        }
        // history.push(`/journals/${id}`)
    }

    return (
        <>
            <div className="entry-form-wrapper">
                <form className="entry-form-container" onSubmit={handleSubmit}>
                    <div className="entry-form-container">
                        <div className="entry-form-image"><img src={banner} alt="banner-form" className="banner-form-image" /></div>
                        <div className="entry-form-errors"></div>
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
                        <div className="entry-form-weather-select">
                            <label className={`weather-option ${weather === 'sunny' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="weather"
                                    id="sunny-radio"
                                    value="sunny"
                                    onChange={(e) => setWeather(e.target.value)}
                                    checked={weather === 'sunny'}
                                />
                                ☀️
                            </label>

                            <label className={`weather-option ${weather === 'cloudy' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="weather"
                                    id="cloudy-radio"
                                    value="cloudy"
                                    onChange={(e) => setWeather(e.target.value)}
                                    checked={weather === 'cloudy'}
                                />
                                ☁️
                            </label>

                            <label className={`weather-option ${weather === 'rain' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="weather"
                                    id="rain-radio"
                                    value="rain"
                                    onChange={(e) => setWeather(e.target.value)}
                                    checked={weather === 'rain'}
                                />
                                🌧️
                            </label>

                            <label className={`weather-option ${weather === 'snow' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="weather"
                                    id="snow-radio"
                                    value="snow"
                                    onChange={(e) => setWeather(e.target.value)}
                                    checked={weather === 'snow'}
                                />
                                ❄️
                            </label>
                        </div>
                    </div>
                    <div className="entry-form-mood">
                        <h2 className="banner-header">Mood</h2>
                        <div className="entry-form-mood-select">
                            <label className={`mood-option ${mood === 'neutral' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="mood"
                                    id="neutral-radio"
                                    value="neutral"
                                    onChange={(e) => setMood(e.target.value)}
                                    checked={mood === 'neutral'}
                                />
                                😐
                            </label>

                            <label className={`mood-option ${mood === 'happy' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="mood"
                                    id="happy-radio"
                                    value="happy"
                                    onChange={(e) => setMood(e.target.value)}
                                    checked={mood === 'happy'}
                                />
                                😀
                            </label>

                            <label className={`mood-option ${mood === 'sad' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="mood"
                                    id="sad-radio"
                                    value="sad"
                                    onChange={(e) => setMood(e.target.value)}
                                    checked={mood === 'sad'}
                                />
                                😟
                            </label>

                            <label className={`mood-option ${mood === 'angry' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="mood"
                                    id="angry-radio"
                                    value="angry"
                                    onChange={(e) => setMood(e.target.value)}
                                    checked={mood === 'angry'}
                                />
                                😠
                            </label>
                            <label className={`mood-option ${mood === 'scared' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="mood"
                                    id="scared-radio"
                                    value="scared"
                                    onChange={(e) => setMood(e.target.value)}
                                    checked={mood === 'scared'}
                                />
                                😨
                            </label>
                        </div>
                    </div>
                    <div onClick={handleSubmit} className="entry-submit-button">
                        Create ➡️
                    </div>
                </form>
            </div>
        </>
    )
}

export default EntryEdit


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
{/* <div className="entry-form-weather-select">
    <label className={`weather-option ${weather === 'sunny' ? 'selected' : ''}`}>
        <input
            type="radio"
            name="weather"
            id="sunny-radio"
            value="sunny"
            onChange={(e) => setWeather(e.target.value)}
            checked={weather === 'sunny'}
        />
        ☀️
    </label>

    <label className={`weather-option ${weather === 'cloudy' ? 'selected' : ''}`}>
        <input
            type="radio"
            name="weather"
            id="cloudy-radio"
            value="cloudy"
            onChange={(e) => setWeather(e.target.value)}
            checked={weather === 'cloudy'}
        />
        ☁️
    </label>

    <label className={`weather-option ${weather === 'rain' ? 'selected' : ''}`}>
        <input
            type="radio"
            name="weather"
            id="rain-radio"
            value="rain"
            onChange={(e) => setWeather(e.target.value)}
            checked={weather === 'rain'}
        />
        🌧️
    </label>

    <label className={`weather-option ${weather === 'snow' ? 'selected' : ''}`}>
        <input
            type="radio"
            name="weather"
            id="snow-radio"
            value="snow"
            onChange={(e) => setWeather(e.target.value)}
            checked={weather === 'snow'}
        />
        ❄️
    </label>
</div> */}


{/* <div className="entry-form-mood-select">
                            <label className={`mood-option ${mood === 'neutral' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="mood"
                                    id="neutral-radio"
                                    value="neutral"
                                    onChange={(e) => setMood(e.target.value)}
                                    checked={mood === 'neutral'}
                                />
                                😐
                            </label>

                            <label className={`mood-option ${mood === 'happy' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="mood"
                                    id="happy-radio"
                                    value="happy"
                                    onChange={(e) => setMood(e.target.value)}
                                    checked={mood === 'happy'}
                                />
                                😀
                            </label>

                            <label className={`mood-option ${mood === 'sad' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="mood"
                                    id="sad-radio"
                                    value="sad"
                                    onChange={(e) => setMood(e.target.value)}
                                    checked={mood === 'sad'}
                                />
                                😟
                            </label>

                            <label className={`mood-option ${mood === 'angry' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="mood"
                                    id="angry-radio"
                                    value="angry"
                                    onChange={(e) => setMood(e.target.value)}
                                    checked={mood === 'angry'}
                                />
                                😠
                            </label>
                            <label className={`mood-option ${mood === 'fear' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="mood"
                                    id="scared-radio"
                                    value="scared"
                                    onChange={(e) => setMood(e.target.value)}
                                    checked={mood === 'scared'}
                                />
                                😨
                            </label>
                        </div>  */}
