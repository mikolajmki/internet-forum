import React, { useEffect, useState } from "react";
import css from "./UpdateModal.module.css";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../actions/userAction";
import { deleteThreadImages, uploadProfilePicture, uploadThreadImage } from "../../api/uploadRequest";
import { updateThread } from "../../actions/threadAction";
import { updatePost } from "../../actions/postAction";
import { UilMultiply, UilRedo, UilKeySkeletonAlt, UilPlusCircle, UilEdit } from "@iconscout/react-unicons";

export const UpdateModal = ({ modal, setModal, type, content, user, token }) => {

    const [ editPassword, setEditPassword ] = useState(false);
    const [ formData, setFormData ] = useState(type === "profile" ? user : content);
    const [ error, setError ] = useState(false);
    
    const [ images, setImages ] = useState([]);
    const [ uploadImage, setUploadImage ] = useState(null);
    const [ uploadImages, setUploadImages ] = useState([]);
    const [ fileName, setFileName ] = useState("");

    const { error: err, loading } = useSelector((state) => state.authReducer);
    const thread = useSelector((state) => state.forumReducer.thread);

    const dispatch = useDispatch();

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setUploadImage(img);
    
            const name = "IMG_" + Date.now() + "." + e.target.files[0].type.replace(/(.*)\//g, '')
            console.log(e.target.files[0].type, e.target.files[0].type.replace(/(.*)\//g, ''))
            setFileName(name);
            if (type !== "profile") {
                setImages([ ...content.images, name ]);
            }
        }
    }

    const handleImageRequest = async (uploadFunction, body, token) => {
        try {
            await uploadFunction({ body, token })
        } catch (err) {
            dispatch({ type: "ERROR_SET", data: err.response.data.message });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const body = Object.keys(formData).filter((k) => { if (formData[k] !== "") { console.log(formData[k]); setBody({ ...body, [k]: formData[k] })} });

        if (uploadImage) {

            const body = new FormData();
            body.append("filename", fileName);
            
            if (type === "profile") {
                body.append("username", user.username);
                body.append("file", uploadImage);
                console.log(body.get("filename"))
                console.log(body.get("username"))
                await handleImageRequest(uploadProfilePicture, body, token);
            } else {
                body.append("threadId", thread._id);
                body.append("file", uploadImage);
                console.log(images)
                await handleImageRequest(uploadThreadImage, body, token);
            }

          }
          
        let data = { body: formData, token };

        if (type === "thread" || type === "post") {
            console.log(images.length, content.images.length)
            if ((uploadImage && images.length <= content.images.length) || (!uploadImage && images.length < content.images.length)) {
                const deleteImages = content.images.filter(image => !images.includes(image));
                console.log("delete", deleteImages)
                await handleImageRequest(deleteThreadImages, { threadId: thread._id, images: deleteImages }, token);
            }
            data.body.images = images;
            type === "thread" ? dispatch(updateThread(data)) : dispatch(updatePost(data))
        } else if (type === "profile") {
            if (editPassword && formData.newPassword !== formData.confirmPassword) {
                dispatch({ type: "ERROR_SET", data: "Confirm password doesn't match" });
                return;
            }
            fileName ? data.body.profilePicture = fileName : data.body.profilePicture = user.profilePicture;
            console.log(data);
            dispatch(updateUser(data));
        }
    }

    const handleSetFormData = (e) => {
        setFormData({ ...formData, [e.currentTarget.id]: e.currentTarget.value });
    }

    const handleResetForm = () => {
        if (type === "profile") {
            editPassword ? setFormData({ _id: user._id, password: "", newPassword: "", confirmPassword: "" }) : setFormData(user);
        } else if (type === "thread" || type === "post") {
            setFormData(content);
            setImages(content.images)
        }
        
        setUploadImage(null);
    }

    const handleToggleModal = () => {
        setEditPassword(prev => !prev)
        !editPassword ? setFormData({ _id: user._id, password: "", newPassword: "", confirmPassword: "" }) : setFormData(user);
    }

    const handleRemoveImage = (image) => {
        if (image === fileName) {
            setUploadImage(null);
            setFileName("");
        }
        if (type !== "profile") {
            setImages(images.filter((img) => img !== image));
        }
    }

    useEffect(() => {
        console.log(uploadImage);
    }, [uploadImage])

    useEffect(() => {
        setUploadImage(null);
        setFileName("");
    }, [modal])

    useEffect(() => {
        if (content) {
            setImages(content.images);
        }
    }, [content])

    // useEffect(() => {
    //     handleResetForm()
    // }, [editPassword])

    useEffect(() => {
        console.log(formData);
    }, [formData])

    useEffect(() => {
        handleResetForm();
        type === "profile" ? console.log(user) : console.log(content);
    }, [modal]);

    // useEffect(() => {
    //     if (uploadImage) {

    //     }
    //     console.log(fileName)
    // }, [uploadImage])

    useEffect(() => {
        console.log(images)
    }, [images])



    return (
        <Modal
        isOpen={modal}
        contentLabel="Example Modal"
        className={css.modal}
        style={{ overlay: { background: "#00000095" } }}>
            <div className={css.scrollContainer} style={editPassword ? { width: "30rem" } : {}}>
                <div>
                    <div className={css.btnWrapper} style={{ alignItems: "center" }}>
                        { type === "thread" ? <h1>Edytuj watek</h1> : type === "post" ? <h1>Edytuj odpowiedz</h1> : <h1>Edytuj dane uzytkownika</h1> }
                        <button className="btn" type="reset" onClick={() => handleResetForm()}><UilRedo/>{ editPassword ? "Wyczysc" : "Przywroc"}</button>
                    </div>
                    { error ? 
                    <div className="errorWrapper">
                        <span style={{ background: "var(--bg1Border)" }} className="error">{error}</span>
                    </div> : <></> }
                    <form spellCheck="false" className={css.form} onSubmit={(e) => handleSubmit(e)} onReset={() => handleResetForm()}>
                        { type !== "profile" ? 
                        <>
                        <div>Tresc:</div>
                        <textarea id={type === "post" ? "comment" : "description"} 
                        value={type === "post" ? formData.comment : formData.description} 
                        onChange={(e) => { handleSetFormData(e) }} rows={5} className={css.content} required/>
                        </> 
                        :
                        editPassword ? 
                        <>
                        <span>Aktualne hasło:</span>
                        <input value={formData.password} id="password" onChange={(e) => handleSetFormData(e)} type="password" required/>
                        <span>Nowe hasło:</span>
                        <input value={formData.newPassword} id="newPassword" onChange={(e) => handleSetFormData(e)} type="password" required/>
                        <span>Potwierdź hasło:</span>
                        <input value={formData.confirmPassword} id="confirmPassword" onChange={(e) => handleSetFormData(e)} type="password" required/>
                        </> 
                        :
                        <div className={css.columns}>
                            <div>
                                <span>Nazwa uzytkownika:</span>
                                <input id="username" maxLength={24} value={formData.username} onChange={(e) => handleSetFormData(e) } autoFocus required />
                                <span>Imie:</span>
                                <input id="firstname" value={formData.firstname} onChange={(e) => handleSetFormData(e)} type="text" required />
                                <span>Naziwsko:</span>
                                <input id="lastname" value={formData.lastname} onChange={(e) => handleSetFormData(e)} type="text" required />
                                <span>E-mail:</span>
                                <input id="email" value={formData.email} onChange={(e) => handleSetFormData(e)} type="email" required />
                            </div>
                            <div>
                                <span>Sygnatura: {formData.signature.length}/64</span>
                                <textarea id="signature" maxLength={64} value={formData.signature} rows={4} onChange={(e) => handleSetFormData(e)} type="textarea" required />
                                <div>
                                    <span>Opis: {formData.about.length}/128</span>
                                    <textarea id="about" maxLength={128} value={formData.about} rows={4} onChange={(e) => handleSetFormData(e)} type="textarea" />
                                </div>
                            </div>
                        </div> }
                        { !editPassword ? 
                        <>
                        <div className={css.btnWrapper} style={{ justifyContent: "space-between" }}>
                            <div className={css.btnWrapper} style={{ flexDirection: "column" }}>
                                { type !== "profile" ? <span>Dodaj obraz</span> : <span>Dodaj zdjecie profilowe</span> }
                                { fileName ? <span>Nowa nazwa</span> : <></> }
                            </div>
                            { uploadImage ?  
                            <div className={css.btnWrapper} style={{ flexDirection: "column" }}>
                                <span>{uploadImage.name}</span>
                                <span>{fileName}</span>
                            </div> : <></> }
                            <label htmlFor="file"><div className="btn"><UilPlusCircle/> Wybierz plik</div></label>
                            <input id="file" accept="image/*" onChange={(e) => onImageChange(e)} type="file" style={{ display: "none" }} />
                        </div>
                        </> : <></>}
                        { type !== "profile" ? 
                        <div>
                            <span>Zawarte obrazy:</span>
                            <div className="fileWrapper" style={{ marginTop: "1rem" }}>
                                { images.length > 0 ?
                                images.map((image, i) => 
                                <div key={i}>
                                    <span>{image}</span>
                                    <div className="numberBadge"><div onClick={() => handleRemoveImage(image)}>x</div></div>
                                </div>) : <div>Brak obrazow do wyswietlenia.</div> }
                            </div>
                        </div> : <></> }
                        <div className={css.btnWrapper}>
                            { type === "profile" ? <div className="btn" onClick={() => handleToggleModal()}>{editPassword ? <UilEdit/> : <UilKeySkeletonAlt/>}{ !editPassword ? "Zmiana hasla" : "Edycja danych"}</div> : <></> }
                            <button className="btn" style={{ flex: "1" }} type="submit">Zatwierdz zmiany</button>
                        </div>
                    </form>
                    <div className="exit" onClick={() => setModal((prev) => !prev)}><UilMultiply/></div>
                </div>
            </div>
        </Modal>
    )
};
