import "./journalModal.css"
import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

const JournalFormModal = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [cover, setCover] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const graphic = "https://cdn.dribbble.com/users/763353/screenshots/5400172/media/4b0d5dc8f004d298781b7c9f31cc33df.png?compress=1&resize=800x600&vertical=center"

    const handleSubmit = async (e) => {
        // e.preventDefault();
        // const data = await dispatch(login(email, password));
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

                        </div>
                    </div>
                    <div className="journal-form-info">

                    </div>
                </div>
            </div>
        </>
    )
}

export default JournalFormModal
