import "./virtualPet.css"
import loading from "../../assets/ungaloading.gif"
import cafe from "../../assets/ungacafe.gif"
import diner from "../../assets/ungadiner.gif"
import supper from "../../assets/ungasupper.gif"
import statica from "../../assets/static.gif"
import bath from "../../assets/ungabath.gif"
import dance from "../../assets/ungaDance.gif"
import canyon from "../../assets/ungagrandcanyon.gif"
import star from "../../assets/ungastar.gif"


import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changePet, getAllPets, getPetById, getUserPet, makePet } from "../../store/pets"
import OpenModalButtonIcon from "../OpenModalButtonIcon"
import info from "../../assets/info.svg"
import VirtualPetInfo from "../VirtualPetInfo"


const VirtualPet = () => {

    const test = "https://cdn.discordapp.com/attachments/1116804623211184308/1131726488119541771/ungadiner.gif"
    const [isLoaded, setIsLoaded] = useState(false)
    const [isAuth, setIsAuth] = useState(false)
    const [hasPet, setHasPet] = useState(false)
    const [showMenu, setShowMenu] = useState(false);
    const [petName, setPetName] = useState("")
    const [errors, setErrors] = useState([])
    const [time, setTime] = useState(new Date())
    const [petActivity, setPetActivity] = useState(diner)
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const currentPet = useSelector(state => state.pets.myPet)
    const allPets = useSelector(state => state.pets.allPets)

    const activities = [diner, bath, dance, canyon]
    const eating = [cafe, supper]

    useEffect(async () => {
        await dispatch(getAllPets())
    }, [])

    useEffect(async () => {
        if (sessionUser) {
            await setIsLoaded(true)

            if (allPets.find(pet => pet.ownerId === sessionUser.id)) {
                await dispatch(getUserPet())
                await setHasPet(true)
                await setIsAuth(true)
            }
            else {
                await setHasPet(false)
                await setIsAuth(true)
            }
        }
    }, [sessionUser, allPets])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (petName.trim().length !== 0 && petName.length < 26) {
            const form = { name: petName }
            await dispatch(makePet(form))
            await setIsLoaded(false)
            await dispatch(getAllPets)
            await dispatch(getUserPet())
            await setHasPet(true)
            await setIsLoaded(true)
        }
        else {
            setErrors(["Pet name must be between 0 and 26 characters"])
            return
        }
    }

    const handleFeed = async (e) => {
        e.preventDefault()
        if (currentPet.ticket > 0) {
            const form = { ticket: (currentPet.ticket - 1), happiness: (currentPet.happiness + 5) }
            await dispatch(changePet(currentPet.id, form))
            await setIsLoaded(false)
            await dispatch(getUserPet())
            await setIsLoaded(true)
        }
        else {
            return alert("You don't have enough tickets")
        }

        setPetActivity(supper)
    }

    const freeTicket = async (e) => {
        e.preventDefault()
        const form = { ticket: (currentPet.ticket + 1) };
        await dispatch(changePet(currentPet.id, form));
        await setIsLoaded(false)
        await dispatch(getUserPet())
        await setIsLoaded(true)
    }

    const closeMenu = () => setShowMenu(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000)

        return () => clearInterval(intervalId)
    }, []);

    const formatTime = (time) => {
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        const monthNames = ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"];
        const day = time.getDay();
        const date = time.getDate();
        const month = time.getMonth();
        const hours = time.getHours().toString().padStart(2, '0');
        const minutes = time.getMinutes().toString().padStart(2, '0');
        const seconds = time.getSeconds().toString().padStart(2, '0');
        return `${dayNames[day]}, ${monthNames[month]} ${date},  ${hours}:${minutes}:${seconds}`
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            const randomActivity = Math.floor(Math.random() * (activities.length))
            setPetActivity(statica)
            setTimeout(() => {
                setPetActivity(activities[randomActivity])
            }, 500)

        }, 10000)
        return () => clearInterval(intervalId)
    }, []);

    return (
        <>
            {(!isLoaded || !isAuth) && (
                <div className="loading">
                    <img src={loading} alt="loading-gif" />
                    <p>Loading...</p>
                </div>
            )}
            {isLoaded && !hasPet && isAuth && (
                <div className="pet-creation">
                    <form className="pet-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={petName}
                            onChange={(e) => setPetName(e.target.value)}
                            required
                            placeholder="Enter a name for your pet..."
                            className="petName-Input"
                        />
                        <button type="submit" className="signup-button" disabled={Object.keys(errors).length > 0}>Submit</button>
                    </form>
                    <ul>
                        {errors.map((error, idx) => (
                            <div key={idx} className="error">{error}</div>
                        ))}
                    </ul>
                </div>
            )}
            {isLoaded && hasPet && isAuth && (
                < div className="virtual-pet-wrapper">
                    <div className="virtual-pet-case">
                        <div className="virtual-pet-container">
                            <div className="virtual-pet-daily">
                                <div className="virtual-pet-time">{formatTime(time)}</div>
                            </div>
                            <div className="virtual-pet-upper">
                                <div className="virtual-pet-screen">
                                    <img src={petActivity} alt="pet" className="pet-image-screen" />
                                </div>

                            </div>
                            <div className="virtual-pet-lower">
                                <div className="virtual-pet-button" onClick={handleFeed}>
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
                                {/* <div className="virtual-pet-button" onClick={freeTicket}>
                                    Free Ticket
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div >
            )}
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
