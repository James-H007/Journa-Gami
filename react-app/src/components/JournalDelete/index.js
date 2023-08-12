import { useParams } from "react-router-dom"
import "./entryDelete.css"
import { useDispatch } from "react-redux"
import { removeEntry } from "../../store/entries"
import { useModal } from "../../context/Modal"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect, useState } from "react"
import { removeJournalById } from "../../store/journals"

const JournalDelete = ({ id }) => {

    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const history = useHistory()

    // console.log(id)
    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(removeJournalById(id))
        await closeModal()
        await history.push(`/journals`)
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
                <h1>Delete Journal?</h1>
                <h2>All entries tied to it will be deleted</h2>
                <div className="entry-delete-container">
                    <div className="entry-delete-yes" onClick={handleDelete}>Yes</div>
                    <div className="entry-delete-no" onClick={closeMenu}>No</div>
                </div>
            </div>
        </>
    )
}

export default JournalDelete
