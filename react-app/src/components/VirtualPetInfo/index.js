
import "./virtualPetInfo.css"
import virtualPet from "../../assets/unga.png"

const VirtualPetInfo = ({ pet }) => {
    // console.log(pet)
    return (
        <>
            <div className="pet-info-wrapper">
                <img src={pet.bannerImgUrl} alt="banner" className="pet-banner-img" />
                <div className="pet-info-container">
                    <div className="pet-pic">
                        <img src={virtualPet} alt="pet" className="pet-info-img" />

                    </div>
                    <div className="pet-info-info">
                        <h1>{pet.name}</h1>
                        <p>❤️ {pet.happiness}</p>
                        <p>🎟️ x{pet.ticket}</p>
                        <p>Date of Birth: {pet.createdAt}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VirtualPetInfo
