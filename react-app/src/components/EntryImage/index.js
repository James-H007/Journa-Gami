import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import "./entryImage.css"
import { useEffect, useState } from "react";
import loading from "../../assets/ungaloading.gif"
import { getEntryById } from "../../store/entries";
import backroom from "../../assets/backroom.gif"
import { createImageByEntry } from "../../store/images";


const EntryImage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileSizeError, setFileSizeError] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [imageEmbedCode, setImageEmbedCode] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [isAuth, setIsAuth] = useState(false)
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const currentEntry = useSelector(state => state.entries.currentEntry)
    const sessionUser = useSelector(state => state.session.user)

    // console.log(currentEntry)
    useEffect(async () => {
        await dispatch(getEntryById(id))
        await setIsLoaded(true)
    }, [])

    useEffect(async () => {
        if (sessionUser && currentEntry) {
            if (sessionUser.id === currentEntry.ownerId) {
                setIsAuth(true)
            }
        }
    }, [sessionUser, currentEntry])

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setFileSizeError(
            validateFileSize(file) ? "" : "File size should be under 20MB."
        );

        // setFileSizeError(
        //   validateFileType(file) ? "" : "Only image files are allowed."
        // )

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const validateFileSize = (file) => {
        const maxSize = 20 * 1024 * 1024;
        return file && file.size <= maxSize;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(selectedFile)
        // console.log(id)
        if (!selectedFile) {
            setFileSizeError("Please select a file.");

            return;
        }

        if (!validateFileSize(selectedFile)) {
            setFileSizeError("File size should be under 20MB.")

            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile)
        // console.log(formData)
        const data = await dispatch(createImageByEntry(id, formData))

        await history.push(`/entries/${id}`)


    }

    return (
        <>
            {!isLoaded && (
                <div className="loading">
                    <img src={loading} alt="loading-gif" />
                    <p>Loading...</p>
                </div>
            )}
            {isLoaded && !isAuth && (
                <div className="no-auth">
                    <img src={backroom} alt="no-auth" className="no-auth-img" />
                    <div className="no-auth-text">You're either not allowed here or in nowhere.</div>
                </div>
            )}
            {isLoaded && isAuth && (
                <div className="entry-image-form-container">
                    <div className="entry-image-form-wrapper">
                        <div className="entry-image-form-preview">
                            {imagePreview && !fileSizeError && (
                                <div className="image-preview">
                                    <img src={imagePreview} alt="Preview" className="preview-image" />
                                </div>
                            )}

                            <form className="image-form">

                                <input
                                    type="file"
                                    id="fileInput"
                                    name="filename"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />

                                <label htmlFor="fileInput">
                                    Upload an image for your entry?
                                </label>
                                {fileSizeError && <div className="error">{fileSizeError}</div>}
                                <div onClick={handleSubmit} className="entry-submit-button">
                                    Finish ➡️
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default EntryImage
