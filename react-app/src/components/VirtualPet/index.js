import "./virtualPet.css"
import loading from "../../assets/ungaloading.gif"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPetById, getUserPet } from "../../store/pets"
import OpenModalButtonIcon from "../OpenModalButtonIcon"
import info from "../../assets/info.svg"
import VirtualPetInfo from "../VirtualPetInfo"


const VirtualPet = () => {

    const test = "https://cdn.discordapp.com/attachments/1116804623211184308/1131726488119541771/ungadiner.gif"
    const [isLoaded, setIsLoaded] = useState(false)
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const currentPet = useSelector(state => state.pets.currentPet)
    console.log(currentPet)

    useEffect(async () => {
        if (sessionUser) {
            await setIsLoaded(true)
            await dispatch(getPetById(sessionUser.id))
        }
    }, [sessionUser])

    const closeMenu = () => setShowMenu(false);

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
                                <OpenModalButtonIcon
                                    icon={info}
                                    buttonText="Pet Info"
                                    onItemClick={closeMenu}
                                    modalComponent={<VirtualPetInfo pet={currentPet} />}

                                />
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
