import React, { useEffect, useState } from "react";
import css from "./UpdateModal.module.css";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../actions/userAction";
import useDebounce from "../../helpers/useDebounce";
import { uploadProfilePicture, uploadThreadImage } from "../../api/uploadRequest";

export const UpdateModal = ({ modal, setModal, type, user, token, threadId, files, postId }) => {

    const [ editPassword, setEditPassword ] = useState(false);
    const [ formData, setFormData ] = useState({});
    const [ error, setError ] = useState(false);
    
    const [ images, setImages ] = useState([]);
    const [ uploadImage, setUploadImage ] = useState(null);
    const [ fileName, setFileName ] = useState("");

    const { error: err, loading } = useSelector((state) => state.authReducer);

    const dispatch = useDispatch();

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
          let img = e.target.files[0];
          setUploadImage(img);
        }
      }

    const handleUploadImage = async (uploadFunction, body, token) => {
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
                await handleUploadImage(uploadProfilePicture, body, token);
            } else {
                body.append("threadId", threadId);
                body.append("file", uploadImage);
                console.log(images)
                setImages(images.push(fileName));
                console.log(images)
                await handleUploadImage(uploadThreadImage, body, token);
            }

          }
          
        let data = { body: formData, token };

        if (type === "thread") {

        } else if (type === "post") {

        } else if (type === "profile") {
            if (editPassword && formData.newPassword !== formData.confirmPassword) {
                handleError("Passwords doesn't match");
                return;
            }
            data.body.profilePicture = fileName;
            console.log(data);
            dispatch(updateUser(data));
        }
    }

    const handleSetFormData = (e) => {
        setFormData({ ...formData, [e.currentTarget.id]: e.currentTarget.value });
    }

    const handleResetForm = () => {
        editPassword ? setFormData({ _id: user._id, password: "", newPassword: "", confirmPassword: "" }) : setFormData(user);
        setUploadImage(null);
    }
    
    const handleError = (err) => {
        setError(err)
        setTimeout(() => {
            setError(false);
        }, 2000);
    }

    useEffect(() => {
        setUploadImage(null);
        setFileName("");
    }, [modal])

    useEffect(() => {
        setImages(files);
    }, [files])

    useEffect(() => {
        handleResetForm()
    }, [editPassword])

    useEffect(() => {
        console.log(formData);
    }, [formData])

    useEffect(() => {
        console.log(user);
        setFormData(user);
    }, [modal]);

    useEffect(() => {
        if (uploadImage) {
            console.log(uploadImage.type, uploadImage.type.replace(/(.*)\//g, ''))
            setFileName("IMG_" + Date.now() + "." + uploadImage.type.replace(/(.*)\//g, ''));
        }
        console.log(fileName)
    }, [uploadImage])




    return (
        <Modal
        isOpen={modal}
        contentLabel="Example Modal"
        className={css.modal}
        style={{ overlay: { background: "#00000095" } }}>
            <div className={css.scrollContainer}>
                <div>
                    <div className={css.btnWrapper} style={{ alignItems: "center" }}>
                        { type === "thread" ? <h1>Edytuj watek</h1> : type === "post" ? <h1>Edytuj post</h1> : <h1>Edytuj dane uzytkownika</h1> }
                        <button className="btn" type="reset" onClick={() => handleResetForm()}>{ editPassword ? "Wyczysc" : "Przywroc"}</button>
                    </div>
                    { error ? 
                    <div className="errorWrapper">
                        <span style={{ background: "var(--bg1Border)" }} className="error">{error}</span>
                    </div> : <></> }
                    <form spellCheck="false" className={css.form} onSubmit={(e) => handleSubmit(e)} onReset={() => handleResetForm()}>
                        { type !== "profile" ? 
                        <>
                        <div>Tresc:</div>
                        <textarea id={type === "post" ? "comment" : "description"} onChange={(e) => { handleSetFormData(e) }} rows={5} className={css.content} required/>
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
                        <>
                        <span>Nazwa uzytkownika</span>
                        <input id="username" value={formData.username} onChange={(e) => handleSetFormData(e) } autoFocus required />
                        <span>Imię:</span>
                        <input id="firstname" value={formData.firstname} onChange={(e) => handleSetFormData(e)} type="text" required />
                        <span>Naziwsko:</span>
                        <input id="lastname" value={formData.lastname} onChange={(e) => handleSetFormData(e)} type="text" required />
                        <span>E-mail:</span>
                        <input id="email" value={formData.email} onChange={(e) => handleSetFormData(e)} type="email" required />
                        <span>Sygnatura:</span>
                        <textarea id="signature" value={formData.signature} rows={4} onChange={(e) => handleSetFormData(e)} type="textarea" required />
                        <span>Opis:</span>
                        <textarea id="about" value={formData.about} rows={4} onChange={(e) => handleSetFormData(e)} type="textarea" />
                        { !editPassword ? 
                        <>
                        <div className={css.btnWrapper} style={{ justifyContent: "space-between" }}>
                            { type !== "profile" ? <span>Dodaj obraz</span> : <span>Dodaj zdjecie profilowe</span> }
                            { uploadImage ?  <span>{uploadImage.name}</span> : <></> }
                            <label htmlFor="file"><div className="btn">Wybierz plik</div></label>
                            <input id="file" accept="image/*" onChange={(e) => onImageChange(e)} type="file" style={{ display: "none" }} />
                        </div>
                        </> : <></>}
                        <div>
                            <span>Zawarte obrazy:</span>
                            <div className={css.fileWrapper} style={{ marginTop: "1rem" }}>
                                { images.map((image, i) => 
                                <div>
                                    <span>{image}</span>
                                    <div className="numberBadge"><div>x</div></div>
                                </div>) }
                            </div>
                        </div>
                        </> }
                        <div className={css.btnWrapper}>
                            <div className="btn" onClick={() => { setEditPassword(prev => !prev) }}>{ !editPassword ? "Zmiana hasla" : "Edycja danych"}</div>
                            <button className="btn" style={{ flex: "1" }} type="submit">Aktualizuj</button>
                        </div>
                    </form>
                    <div className={css.exit} onClick={() => setModal((prev) => !prev)}></div>
                </div>
            </div>
        </Modal>
    )
};
