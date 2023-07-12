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
        payload: entryId
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
