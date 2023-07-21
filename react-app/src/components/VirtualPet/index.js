import "./virtualPet.css"

const VirtualPet = () => {

    const test = "https://cdn.discordapp.com/attachments/1116804623211184308/1131726488119541771/ungadiner.gif"

    return (
        <>
            <div className="virtual-pet-wrapper">
                <div className="virtual-pet-case">
                    <div className="virtual-pet-container">
                        <div className="virtual-pet-upper">
                            <div className="virtual-pet-screen">
                                <img src={test} alt="pet" className="pet-image-screen" />
                            </div>

                        </div>
                        <div className="virtual-pet-lower">
                            <div className="virtual-pet-button">
                                Feed
                            </div>
                            <div className="virtual-pet-button">
                                Info
                            </div>
                            <div className="virtual-pet-button">
                                Fetch
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VirtualPet


{/* <div className="virtual-pet-stat">
<h1>Name: Unga</h1>
<p>Happiness: 100/100</p>
<p>Tickets: 0</p>
<p>Age: 0 days</p>
<p>Temperature: 0 F</p>
<p>Entries Created: 0</p>
<p>Location</p>
</div> */}
