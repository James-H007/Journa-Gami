const GET_ALL_IMAGES = "images/GET_ALL_IMAGES"
const GET_MY_IMAGES = "images/GET_MY_ENTRIES"
const GET_ENTRY_IMAGES = "images/GET_ENTRY_IMAGES"
const GET_IMAGE_ID = "images/GET_IMAGE_BY_ID"
const CREATE_IMAGE = "images/CREATE_ENTRY"
const EDIT_IMAGE = "images/EDIT_IMAGES"
const DELETE_IMAGE = "images/DELETE_IMAGE"

const getImages = (images) => {
    return {
        type: GET_ALL_IMAGES,
        payload: images
    }
};

const getMyImages = (images) => {
    return {
        type: GET_MY_IMAGES,
        payload: images
    }
}

const getEntryImages = (images) => {
    return {
        type: GET_ENTRY_IMAGES,
        payload: images
    }
}

const setImage = (image) => {
    return {
        type: CREATE_IMAGE,
        payload: image
    }
}

const createImage = (image) => {
    return {
        type: CREATE_IMAGE,
        payload: image
    }
};

const editImage = (image) => {
    return {
        type: EDIT_IMAGE,
        payload: image
    }
}

const deleteImage = (imageId) => {
    return {
        type: DELETE_IMAGE,
        payload: imageId
    }
}

export const getAllImages = () => async (dispatch) => {
    const response = await fetch(`/api/entries/images`, {
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (response.ok) {
        const images = await response.json()
        dispatch(getImages(images))
        return images
    }
}

//@entry_routes.route('/<int:id>/images')
export const getImageByEntryId = (id) => async (dispatch) => {
    const response = await fetch(`/api/entries/${id}/images`, {
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (response.ok) {
        const images = await response.json()
        dispatch(getEntryImages(images))
        return images
    }
    else {
        console.log('Error: Images not found')
    }
}

//@entry_routes.route('/images/<int:id>')
export const getImageById = (id) => async (dispatch) => {
    const response = await fetch(`/api/entries/images/${id}`, {
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (response.ok) {
        const image = await response.json()
        dispatch(setImage(image))
        return image;
    }

    else {
        console.log('Error: Image not found')
    }
}

//@entry_routes.route('/<int:id>/images', methods = ["POST"])
export const createImageByEntry = (entry_id, formData) => async (dispatch) => {
    console.log(formData)
    const response = await fetch(`/api/entries/${entry_id}/images`, {
        method: "POST",
        body: formData
    })

    // console.log(response)

    if (response.ok) {
        const { image } = await response.json()
        dispatch(createImage(image))
        return image
    }

    else {
        console.log('Error: Problem with creating')
    }
}

//@entry_routes.route('/images/<int:id>', methods = ["EDIT"])
export const changeImage = (entry_id, formData) => async (dispatch) => {
    const response = await fetch(`/api/entries/images/${entry_id}`, {
        method: "PUT",
        body: formData
    })

    if (response.ok) {
        const { image } = await response.json()
        dispatch(editImage(image))
        return image
    }

    else {
        console.log('Error: Problem with editing image')
    }

}

//@entry_routes.route('/images/<int:id>', methods = ["DELETE"])
export const removeImage = (image_id) => async (dispatch) => {
    const response = await fetch(`/api/entries/images/${image_id}`, {
        method: "DELETE",
    })

    if (response.ok) {
        const data = await response.json()

        if (data.message === "Successfully deleted") {
            dispatch(deleteImage(image_id))
        }
    }
}

const initialState = { allImages: [], entryImages: [], currentImage: null }

export default function imagesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_IMAGES:
            return {
                ...state,
                allImages: action.payload
            }
        case GET_IMAGE_ID:
            return {
                ...state,
                currentImage: action.payload
            }
        case CREATE_IMAGE:
            return {
                ...state,
                allImages: [...state.allImages, action.payload]
            }
        case EDIT_IMAGE:
            const index = state.allImages.findIndex(i => i.id === action.payload.id)
            let newImage = [...state.allImages]
            if (index !== -1) {
                newImage[index] = action.payload
            }
            return {
                ...state,
                allImages: newImage
            }
        case DELETE_IMAGE:
            return {
                ...state,
                allImages: state.allImages.filter(i => i.id !== action.payload)
            }
        default:
            return state;
    }
}
