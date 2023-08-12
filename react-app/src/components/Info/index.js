import "./info.css"
import idle from "../../assets/ungaidle.gif"
import unga from "../../assets/unga.png"
import github from "../../assets/github-mark.svg"
import linkedin from "../../assets/linkedin.png"

const Info = () => {
    return (
        <div className="info-background">
            <div className="info-wrapper">
                <div className="info-container">
                    <div className="info-idle-stack">
                        <img src={idle} className="idle" alt="idle" />
                        <img src={idle} className="idle" alt="idle" />
                        <img src={idle} className="idle" alt="idle" />
                        <img src={idle} className="idle" alt="idle" />
                        <img src={idle} className="idle" alt="idle" />
                        <img src={idle} className="idle" alt="idle" />
                        <img src={idle} className="idle" alt="idle" />
                        <img src={idle} className="idle" alt="idle" />
                        <img src={idle} className="idle" alt="idle" />
                        <img src={idle} className="idle" alt="idle" />
                        <img src={idle} className="idle" alt="idle" />
                        <img src={idle} className="idle" alt="idle" />
                        <img src={idle} className="idle" alt="idle" />
                        <img src={idle} className="idle" alt="idle" />
                        <img src={idle} className="idle" alt="idle" />
                        <img src={idle} className="idle" alt="idle" />
                        <img src={idle} className="idle" alt="idle" />
                        <img src={idle} className="idle" alt="idle" />
                        <img src={idle} className="idle" alt="idle" />
                    </div>
                    <h1 className="info-header">Journa-Gami</h1>
                    <div className="info-introduction">
                        <img src={unga} alt="virtual-pet" className="vp" />
                        <div className="info-intro-bio">
                            <p>Hello! My name is James and I created this web application.
                                Journa-Gami was created in order to encourage journaling all the while having a friend along your side.
                                The idea was sprung up to me when I tried to get back into journaling. It was difficult because some days, I wouldn't
                                have anything exciting to say about my day. Soon, I would just shelf the habit.
                            </p>
                            <p>
                                That's when I got the idea. I didn't journal because there weren't any consequences to not journaling.
                                So that's why I made this app, Journa-Gami. If people feel responsible for a virtual pet, then they'd would
                                be more motivated to journal more. If you have any inquiries or would like to contact me, info is below.
                            </p>
                        </div>
                    </div>

                    <div className="info-links">
                        <a href="https://github.com/James-H007/Journa-Gami" target="_blank"><img src={github} alt="git" className="git-link" /> </a>
                        <a href="https://www.linkedin.com/in/jamesh007/" target="_blank"><img src={linkedin} alt="git" className="logo-link" /></a>
                    </div>
                    <div className="info-idle-stack">
                        <img src={idle} className="idle" alt="idle" />
                        <img src={idle} className="idle" alt="idle" />
                        <img src={idle} className="idle" alt="idle" />
                        <img src={idle} className="idle" alt="idle" />
                        <img src={idle} className="idle" alt="idle" />
                        <img src={idle} className="idle" alt="idle" />
                        <img src={idle} className="idle" alt="idle" />
                        <img src={idle} className="idle" alt="idle" />
                        <img src={idle} className="idle" alt="idle" />
                        <img src={idle} className="idle" alt="idle" />
                        <img src={idle} className="idle" alt="idle" />
                        <img src={idle} className="idle" alt="idle" />
                        <img src={idle} className="idle" alt="idle" />
                        <img src={idle} className="idle" alt="idle" />
                        <img src={idle} className="idle" alt="idle" />
                        <img src={idle} className="idle" alt="idle" />
                        <img src={idle} className="idle" alt="idle" />
                        <img src={idle} className="idle" alt="idle" />
                        <img src={idle} className="idle" alt="idle" />
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Info
