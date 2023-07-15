
import React, { useEffect, useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";

import { createJournal, editAJournal, getJournalById, getUserJournals } from "../../store/journals";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

const JournalEditFormModal = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [cover, setCover] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false)
    const { closeModal } = useModal();
    const { id } = useParams()
    const history = useHistory()
    const graphic = "https://cdn.dribbble.com/users/763353/screenshots/5400172/media/4b0d5dc8f004d298781b7c9f31cc33df.png?compress=1&resize=800x600&vertical=center"
    const currentJournal = useSelector(state => state.journals.currentJournal)
    useEffect(() => {
        dispatch(getJournalById(id))
        setIsLoaded(true)
    }, [])

    useEffect(() => {
        if (isLoaded && currentJournal) {
            setTitle(currentJournal.title)
            setCover(currentJournal.cover)
        }
    }, [isLoaded, currentJournal])


    const handleSubmit = async (e) => {
        e.preventDefault();
        // let form = { title, cover };
        if (title.length === 0 || title.length > 14) {
            setErrors(["Title can only be between 0 and 14 characters"])
            return
        }
        if (cover.length > 800 || cover.length === 0) {
            setErrors(["Cover URL must be between 0 and 800 characters"])
            return
        }

        const updatedJournal = {
            title: title,
            cover: cover
        }
        console.log(updatedJournal)
        // const data = await dispatch(createJournal(form));
        const data = await dispatch(editAJournal(currentJournal.id, updatedJournal))
        await dispatch(getUserJournals())
        await dispatch(getJournalById(currentJournal.id))
        closeModal()
        // if (data) {
        //     history.push(`/`)
        // }
        // if (data) {
        //     setErrors(data);
        // } else {
        //     closeModal()
        // }
    };
    return (
        <>
            {isLoaded && (
                <div className="journal-form-wrapper">
                    <div className="journal-form-container">
                        <div className="journal-form-preview">
                            <div className="journal-form-preview-box">
                                <div className="journal-form-preview-image"><img src={cover} alt="cover-form" className="journal-form-cover-preview-image" /></div>
                                <div className="journal-form-preview-title">{title}</div>
                            </div>
                        </div>
                        <div className="journal-form-info">
                            <h1>Edit a Journal</h1>
                            <ul>
                                {errors.map((error, idx) => (
                                    <div key={idx} className="error">{error}</div>
                                ))}
                            </ul>
                            <form className="journal-form-input" onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    placeholder="Title"
                                    className="journal-input"
                                />
                                <input
                                    type="text"
                                    value={cover}
                                    onChange={(e) => setCover(e.target.value)}
                                    required
                                    placeholder="Cover"
                                    className="journal-input"
                                />
                                <button type="submit" className="signup-button">Edit</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default JournalEditFormModal
