import "./landing.css"

const LandingPage = () => {
    const avatar = "https://img.wattpad.com/286ea0e7dc93d535f9e04dae613223d3d4ddfac9/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f65454337674630684d594f5276773d3d2d3637353137303937352e313537356430373466313763313438623338393034323838373636362e6a7067?s=fit&w=720&h=720"
    const background = "https://i.ytimg.com/vi/DiHn4oO7TvU/maxresdefault.jpg"
    const pet = "https://thumbs.gfycat.com/BleakAgileChick-max-1mb.gif"
    return (
        <div>
            <div className="land-container">
                <div className="land-container-1">
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
                            <div className="user-greeting"> Welcome Miranda!</div>
                        </div>
                    </div>
                    <div className="virtual-pet-container">
                        <div className="virtual-pet-box">
                            <img src={pet} alt="pet" />
                        </div>
                        <div className="calendar">

                        </div>
                    </div>
                </div>
                <div className="land-container-2">
                </div>
            </div>
        </div>
    )
}

export default LandingPage
