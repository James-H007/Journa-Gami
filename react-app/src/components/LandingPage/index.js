import "./landing.css"
import sketchbook from "../../assets/sketchbook.png"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import LoginFormPage from "../LoginFormPage"

const LandingPage = () => {
    // useEffect(() => {
    //     setInterval(() => setDate(new Date()), 30000);
    // }, [])
    const sessionUser = useSelector(state => state.session.user);


    return (
        <div className="landing-wrapper">
            {
                !sessionUser && (
                    <LoginFormPage />
                )
            }
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

{/* <div className="landing-container">
    <div className="landing-select">
        <img src={header} alt="header" className="journa-header" />
    </div>
    <div className="personal-wrapper">
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
                <div>
                    <p className="user-greeting">Owner: Miranda</p>
                    <p className="user-greeting">Pet: Goldy</p>
                    <p className="user-greeting">DOB: 6/28/2023</p>
                </div>
            </div>
        </div>
    </div>

    <div className="personal-wrapper2">
        <div className="personal-holder">
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
</div> */}
