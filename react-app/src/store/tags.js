const GET_ALL_TAGS = "tags/GET_ALL_TAGS"
const GET_MY_TAGS = "tags/GET_MY_TAGS"
const GET_TAG_ID = "tags/GET_TAG_ID"
const CREATE_TAG = "tags/CREATE_TAG"
const EDIT_TAG = "tags/EDIT_TAG"
const DELETE_TAG = "tags/DELETE_TAG"

const getTags = (tags) => {
    return {
        type: GET_ALL_TAGS,
        payload: tags
    }
};

const getMyTags = (tags) => {
    return {
        type: GET_MY_TAGS,
        payload: tags
    }
};

const setTag = (tag) => {
    return {
        type: GET_TAG_ID,
        payload: tag
    }
}

const createTag = (tag) => {
    return {
        type: CREATE_TAG,
        payload: entry
    }
};

const editTag = (tag) => {
    return {
        type: EDIT_TAG,
        payload: tag
    }
};

const deleteTag = (tagId) => {
    return {
        type: DELETE_TAG,
        payload: tagId
    }
}

//@entry_routes.route('/my-tags', methods=['GET'])

//@entry_routes.route('/<int:id>/tags')

//@entry_routes.route('/<int:id>/tags/create', methods = ["POST"])

//@entry_routes.route('/tags/<int:id>/delete', methods = ["DELETE"])
