const GET_MY_PET = "pets/GET_MY_PET";
const GET_ALL_PETS = "pets/GET_ALL_PETS";
const GET_PET_ID = "pets/GET_PET_ID"
const CREATE_PET = "pets/CREATE_PET"
const EDIT_PET = "pets/EDIT_PET"
const DELETE_PET = "pets/DELETE_PET"

const getPets = (pets) => {
    return {
        type: GET_ALL_PETS,
        payload: pets
    }
};

const getMyPet = (pet) => {
    return {
        type: GET_MY_PET,
        payload: pet
    }
}

const setPet = (pet) => {
    return {
        type: GET_PET_ID,
        payload: pet
    }
}

const createPet = (pet) => {
    return {
        type: CREATE_PET,
        payload: pet
    }
}

const editPet = (pet) => {
    return {
        type: EDIT_PET,
        payload: pet
    }
}

const deletePet = (pet) => {
    return {
        type: DELETE_PET,
        payload: pet
    }
}

//@pet_routes.route("/")
export const getAllPets = () => async (dispatch) => {
    const response = await fetch('/api/pets/', {
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (response.ok) {
        const { pets } = await response.json()
        dispatch(getPets(pets))
        return pets
    }
}

//@pet_routes.route('/mine')
export const getUserPet = () => async (dispatch) => {
    const response = await fetch(`/api/pets/mine`, {
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (response.ok) {
        console.log(response)
        const { pet } = await response.json()
        console.log(pet)
        dispatch(getMyPet(pet))
        return pet
    }
}


//@pet_routes.route('/<int:id>')
export const getPetById = (id) => async (dispatch) => {
    const response = await fetch(`/api/pets/${id}`, {
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (response.ok) {
        const pet = await response.json()
        dispatch(setPet(pet))
        return pet
    }
    else {
        console.log('Error: Pet not found')
    }
}

//@pet_routes.route('/create', methods = ["POST"])
export const makePet = (formData) => async (dispatch) => {
    const response = await fetch(`/api/pets/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })

    if (response.ok) {
        console.log(response)
        const { pet } = await response.json()
        dispatch(createPet(pet))
        return pet
    }
}

//@pet_routes.route('/<int:id>/edit', methods=["PUT"])
export const changePet = (pet_id, formData) => async (dispatch) => {
    const response = await fetch(`/api/pets/${pet_id}/edit`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    if (response.ok) {
        const { pet } = await response.json()
        dispatch(editPet(pet))
        return pet
    }
}

//@pet_routes.route('/<int:id>/delete', methods = ['DELETE'])
export const removePet = (pet_id) => async (dispatch) => {
    const response = await fetch(`/api/pets/${pet_id}/delete`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (response.ok) {
        dispatch(deletePet(pet_id))
    }
}

const initialState = { allPets: [], currentPet: {}, myPet: {} }

export default function petsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_PETS:
            return {
                ...state,
                allPets: action.payload
            }
        case GET_MY_PET:
            return {
                ...state,
                myPet: action.payload
            }
        case GET_PET_ID:
            return {
                ...state,
                currentPet: action.payload
            }
        case CREATE_PET:
            return {
                ...state,
                allPets: [...state.allPets, action.payload],
                currentPet: action.payload,
                myPet: action.payload
            }
        case EDIT_PET:
            const index = state.allPets.findIndex(i => i.id === action.payload.id)
            let newPets = [...state.allPets]
            if (index !== -1) {
                newPets[index] = action.payload
            }
            return {
                ...state,
                allPets: newPets
            }
        case DELETE_PET:
            return {
                ...state,
                allPets: state.allPets.filter(i => i.id !== action.payload)
            }
        default:
            return state;
    }
}
