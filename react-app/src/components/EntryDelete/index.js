import { useParams } from "react-router-dom"
import "./entryDelete.css"
import { useDispatch } from "react-redux"
import { removeEntry } from "../../store/entries"
import { useModal } from "../../context/Modal"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect, useState } from "react"

const EntryDelete = ({ id, journalId }) => {
    const [journal, setJournal] = useState(0)
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const history = useHistory()
    console.log(journalId)
    console.log(journal)
    useEffect(() => {
        if (journalId) {
            setJournal(journalId)
        }
    }, [journalId])

    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(removeEntry(id))
        await closeModal()
        await history.push(`/journals/${journalId}`)
        return
    }

    const closeMenu = async (e) => {
        e.preventDefault()
        await closeModal()
        return
    }


    return (
        <>
            <div className="entry-delete-wrapper">
                <h1>Are you sure you want to delete this entry?</h1>
                <div className="entry-delete-container">
                    <div className="entry-delete-yes" onClick={handleDelete}>Yes</div>
                    <div className="entry-delete-no" onClick={closeMenu}>No</div>
                </div>
            </div>
        </>
    )
}

export default EntryDelete
