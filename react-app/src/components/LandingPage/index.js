import "./landing.css"
import sketchbook from "../../assets/sketchbook.png"
import { useEffect, useState } from "react"

const LandingPage = () => {
    const avatar = "https://img.wattpad.com/286ea0e7dc93d535f9e04dae613223d3d4ddfac9/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f65454337674630684d594f5276773d3d2d3637353137303937352e313537356430373466313763313438623338393034323838373636362e6a7067?s=fit&w=720&h=720"
    const background = "https://i.ytimg.com/vi/DiHn4oO7TvU/maxresdefault.jpg"
    const pet = "https://thumbs.gfycat.com/BleakAgileChick-max-1mb.gif"
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        setInterval(() => setDate(new Date()), 30000);
    }, [])



    return (
        <div className="landing-wrapper">
            <div className="landing-container">
                <div className="landing-select">
                    <div className="user-info-container">
                        <div className="icon-wrapper">
                            <img
                                src={avatar}
                                alt="avatar"
                                className="user-icon"
                            />
                        </div>
                        <div className="user-info-stack">
                            <img
                                src={background}
                                alt="background"
                                className="user-banner"
                            />
                        </div>
                    </div>
                </div>
                <div className="personal-wrapper">

                </div>

                <div className="personal-wrapper2">
                    <div className="personal-box">
                        <div className="personal-header">
                            Journals 📔
                        </div>
                        <div className="personal-info">
                            2
                        </div>
                    </div>
                    <div className="personal-box">
                        <div className="personal-header">
                            Entries 📝
                        </div>
                        <div className="personal-info">
                            5
                        </div>
                    </div>
                    <div className="personal-box">
                        <div className="personal-header">
                            Streaks 🔥
                        </div>
                        <div className="personal-info">
                            10
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default LandingPage



// <div className="land-container">
// <div className="land-container-1">
//     <div className="user-info-container">
//         <div className="icon-wrapper">
//             <img
//                 src={avatar}
//                 alt="avatar"
//                 className="user-icon"
//             />
//         </div>
//         <div className="user-info-stack">
//             <img
//                 src={background}
//                 alt="background"
//                 className="user-banner"
//             />
//             <div className="user-greeting"> Welcome Miranda!</div>
//         </div>
//     </div>
//     <div className="virtual-pet-container">
//         <div className="virtual-pet-box">
//             <img src={pet} alt="pet" className="pet" />
//             <div className="pet-text">🔴BROADCASTING LIVE...</div>
//         </div>
//         <div className="chat-wrapper">
//             <div className="chat-header">Chat</div>
//             <div className="chat-container">
//                 <div className="message">Froggy found a coin.</div>
//                 <div className="message">Froggy found a coin.</div>
//                 <div className="message">Froggy found a coin.</div>
//                 <div className="message">Froggy found a coin.</div>
//                 <div className="message">Froggy found a coin.</div>
//                 <div className="message">Froggy found a coin.</div>
//                 <div className="message">Froggy found a coin.</div>
//                 <div className="message">Froggy found a coin.</div>
//                 <div className="message">Froggy found a coin.</div>
//                 <div className="message">Froggy found a coin.</div>
//                 <div className="message">Froggy found a coin.</div>
//             </div>
//             <form className="send-chat-form">
//                 <input type="text" placeholder="Streamer has restricted chat..." disabled={true} />
//                 <button type="submit" disabled={true}>Send</button>
//             </form>
//         </div>
//     </div>
//     <div>
//         <div className="pet-info-container">
//             <div className="pet-info-wrapper">
//                 <div className="about-me-pet-header"> About Me</div>
//                 <div className="about-me">Hello my name is Froggy. I'm here to help my owner, Miranda!</div>
//             </div>
//             <div className="journal-buttons">
//                 <img src={sketchbook} alt="journal" className="journal-button" />
//             </div>
//         </div>

//     </div>
// </div>

// </div>


{/* <div className="user-greeting">
<p className="user-word">Welcome Miranda</p>
<p className="user-word">{date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
})}</p>
</div> */}
