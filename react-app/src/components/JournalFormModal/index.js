import "./journalModal.css"
import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./journalModal.css"
import { createJournal, getUserJournals } from "../../store/journals";

const JournalFormModal = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [cover, setCover] = useState("https://htmlcolorcodes.com/assets/images/colors/steel-gray-color-solid-background-1920x1080.png");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const graphic = "https://cdn.dribbble.com/users/763353/screenshots/5400172/media/4b0d5dc8f004d298781b7c9f31cc33df.png?compress=1&resize=800x600&vertical=center"

    const handleSubmit = async (e) => {
        e.preventDefault();
        let form = { title, cover };
        if (title.trim().length === 0 || title.length > 14) {
            setErrors(["Title can only be between 0 and 14 characters"])
            return
        }
        if (cover.trim().length > 800 || cover.length === 0) {
            setErrors(["Cover URL must be between 0 and 800 characters"])
            return
        }
        if (title.length > 0) {
            form.title = title
        }
        if (cover) {
            form.cover = cover
        }

        const data = await dispatch(createJournal(form));
        await dispatch(getUserJournals())
        closeModal()
        // if (data) {
        //     setErrors(data);
        // } else {
        //     closeModal()
        // }
    };
    return (
        <>
            <div className="journal-form-wrapper">
                <div className="journal-form-container">
                    <div className="journal-form-preview">
                        <div className="journal-form-preview-box">
                            <div className="journal-form-preview-image"><img src={cover} alt="cover-form" className="journal-form-cover-preview-image" /></div>
                            <div className="journal-form-preview-title">{title}</div>
                        </div>
                    </div>
                    <div className="journal-form-info">
                        <h1>Create a Journal</h1>
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
                            <button type="submit" className="signup-button">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default JournalFormModal
