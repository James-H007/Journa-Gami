import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import "./entryImage.css"
import { useEffect, useState } from "react";
import loading from "../../assets/ungaloading.gif"


const EntryImage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileSizeError, setFileSizeError] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [imageEmbedCode, setImageEmbedCode] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(async () => {
        await setIsLoaded(true)
    }, [])

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

    return (
        <>
            {!isLoaded && (
                <div className="loading">
                    <img src={loading} alt="loading-gif" />
                    <p>Loading...</p>
                </div>
            )}
            {isLoaded && (
                <div className="entry-image-form-container">
                    <div className="entry-image-form-wrapper">
                        <div>
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
                                    Upload an image for your entry...
                                </label>
                                {fileSizeError && <div className="errors">{fileSizeError}</div>}
                            </form>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default EntryImage
