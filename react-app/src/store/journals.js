const GET_JOURNALS = "journals/GET_JOURNALS"
const GET_JOURNAL_BY_ID = "journals/GET_JOURNALS_BY_ID"
const GET_MY_JOURNALS = "journals/GET_MY_JOURNALS"
const EDIT_JOURNAL_BY_ID = "journals/EDIT_JOURNAL_BY_ID"
const DELETE_JOURNAL_BY_ID = "journals/DELETE_JOURNAL_BY_ID"
const CREATE_JOURNAL = "journals/CREATE_JOURNAL"


const getJournals = (journals) => {
    return {
        type: GET_JOURNALS,
        payload: journals
    }
};

const getMyJournals = (journals) => {
    return {
        type: GET_MY_JOURNALS,
        payload: journals
    }
}

const setJournal = (journal) => {
    return {
        type: GET_JOURNAL_BY_ID,
        payload: journal
    }
};

const createNewJournal = (journal) => {
    return {
        type: CREATE_JOURNAL,
        payload: journal
    }
}

const editJournal = (journal) => {
    return {
        type: EDIT_JOURNAL_BY_ID,
        payload: journal
    }
};

const deleteJournal = (id) => {
    return {
        type: DELETE_JOURNAL_BY_ID,
        payload: id
    }
};

// @journal_routes.route("/")
export const getAllJournals = () => async (dispatch) => {
    const response = await fetch('/api/journals/', {
        headers: {
            "Content-Type": "application/json",
        }
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(getJournals(data))
    }
}

//@journal_routes.route("/<int:id>", methods=["GET"])
export const getJournalById = (id) => async (dispatch) => {
    const response = await fetch(`/api/journals/${id}`, {
        headers: {
            "Content-Type": "application/json",
        }
    })

    if (response.ok) {
        const journal = await response.json()
        dispatch(setJournal(journal))
        return journal
    }
    else {
        console.log('Error: Journal not found')
    }
}

//@journal_routes.route("/mine")
export const getUserJournals = () => async (dispatch) => {
    const response = await fetch('/api/journals/mine', {
        headers: {
            "Content-Type": "application/json",
        }
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(getMyJournals(data.journals))
    }
}

//@journal_routes.route('/create', methods=["POST"])
export const createJournal = (journal) => async (dispatch) => {
    const response = await fetch(`/api/journals/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(journal)
    })

    if (response.ok) {
        const newJournal = await response.json()
        dispatch(createNewJournal(newJournal.journal))
        return newJournal
    }
}

// @journal_routes.route('/<int:id>/edit', methods=["PUT"])
export const editAJournal = (id, journal) => async (dispatch) => {
    const response = await fetch(`/api/journals/${id}/edit`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(journal)
    })

    if (response.ok) {
        const updatedJournal = await response.json()
        dispatch(editJournal(updatedJournal.journal))
        return updatedJournal
    }
}

// @journal_routes.route('/<int:id>/delete', methods=['DELETE'])
export const removeJournalById = (id) => async (dispatch) => {
    const response = await fetch(`/api/journals/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (response.ok) {
        dispatch(deleteJournal(id))
    }
}

const initialState = { journals: [], currentJournal: null, myJournals: [] }

export default function journalReducer(state = initialState, action) {
    switch (action.type) {
        case GET_JOURNALS:
            return {
                ...state,
                journals: action.payload //<<-- state => state.journals.journals
            }
        case GET_JOURNAL_BY_ID:
            return {
                ...state,
                currentJournal: action.payload //<<-- state => state.journals.currentJournal
            }
        case GET_MY_JOURNALS:
            return {
                ...state,
                myJournals: action.payload
            }
        case CREATE_JOURNAL:
            return {
                ...state,
                journals: [...state.journals, action.payload]
            }
        case EDIT_JOURNAL_BY_ID:
            const index = state.journals.findIndex(i => i.id === action.payload.id)
            let newJournals = [...state.journals]
            if (index !== -1) {
                newJournals[index] = action.payload
            }

            return {
                ...state,
                journals: newJournals
            }
        case DELETE_JOURNAL_BY_ID:
            return {
                ...state,
                journals: state.journals.filter(i => i.id !== action.payload)
            }
        default:
            return state;
    }
}
