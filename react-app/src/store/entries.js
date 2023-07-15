const GET_ALL_ENTRIES = "entries/GET_ALL_ENTRIES";
const GET_MY_ENTRIES = "entries/GET_MY_ENTRIES";
const GET_ENTRY_ID = "entries/GET_ENTRY_ID";
const CREATE_ENTRY = "entries/CREATE_ENTRY";
const EDIT_ENTRIES = "entries/EDIT_ENTRIES";
const DELETE_ENTRY = "entries/DELETE_ENTRY"

const getEntries = (entries) => {
    return {
        type: GET_ALL_ENTRIES,
        payload: entries
    }
};

const getMyEntries = (entries) => {
    return {
        type: GET_MY_ENTRIES,
        payload: entries
    }
};

const setEntry = (entry) => {
    return {
        type: GET_ENTRY_ID,
        payload: entry
    }
}

const createEntry = (entry) => {
    return {
        type: CREATE_ENTRY,
        payload: entry
    }
};

const editEntry = (entry) => {
    return {
        type: EDIT_ENTRIES,
        payload: entry
    }
};

const deleteEntry = (entryId) => {
    return {
        type: DELETE_ENTRY,
        payload: entryId
    }
}

//@entry_routes.route("/")
export const getAllEntries = () => async (dispatch) => {
    const response = await fetch('/api/entries/', {
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (response.ok) {
        const { entries } = await response.json()
        dispatch(getEntries(entries))
        return entries
    }
}

//@entry_routes.route('/<int:id>', methods = ["GET"])
export const getEntryById = (id) => async (dispatch) => {
    const response = await fetch(`/api/entries/${id}`, {
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (response.ok) {
        const entry = await response.json()
        dispatch(setEntry(entry))
        return entry
    }
    else {
        console.log('Error: Entry not found')
    }
}

//@entry_routes.route('/mine')
export const getUserEntries = () => async (dispatch) => {
    const response = await fetch('/api/entries/mine', {
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (response.ok) {
        const { entries } = await response.json()
        dispatch(getMyEntries(entries))
        return entries
    }
}

//@entry_routes.route("/create", methods=["POST"])
export const makeEntry = (journal_id, formData) => async (dispatch) => {
    // console.log(formData, "FORM DATA")
    const response = await fetch(`/api/entries/create/${journal_id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    // console.log(response, 'RESPONSE')
    if (response.ok) {
        const { entry } = await response.json()
        dispatch(createEntry(entry))
        return entry
    }
}

// @entry_routes.route('/<int:id>/edit', methods = ["PUT"])
export const changeEntry = (entry_id, formData) => async (dispatch) => {
    const response = await fetch(`/api/entries/${entry_id}/edit`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    console.log(formData)
    if (response.ok) {
        const { entry } = await response.json()
        dispatch(editEntry(entry))
        return entry
    }
}

//@entry_routes.route('/<int: id>/ delete', methods=['DELETE'])
export const removeEntry = (entry_id) => async (dispatch) => {
    const response = await fetch(`/api/entries/${entry_id}/delete`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (response.ok) {
        dispatch(deleteEntry(entry_id))
    }
}

const initialState = { allEntries: [], myEntries: [], currentEntry: null }

export default function entriesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_ENTRIES:
            return {
                ...state,
                allEntries: action.payload
            }
        case GET_MY_ENTRIES:
            return {
                ...state,
                myEntries: action.payload
            }
        case GET_ENTRY_ID:
            return {
                ...state,
                currentEntry: action.payload
            }
        case CREATE_ENTRY:
            return {
                ...state,
                allEntries: [...state.allEntries, action.payload],
                myEntries: state.myEntries.concat(action.payload)
            }
        case EDIT_ENTRIES:
            const index = state.allEntries.findIndex(i => i.id === action.payload.id)
            let newEntries = [...state.allEntries]
            if (index !== -1) {
                newEntries[index] = action.payload
            }
            return {
                ...state,
                allEntries: newEntries
            }
        case DELETE_ENTRY:
            return {
                ...state,
                allEntries: state.allEntries.filter(i => i.id !== action.payload)
            }
        default:
            return state;
    }
}
