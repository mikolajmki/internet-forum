import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import css from "./ThreadModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../actions/postAction";
import { createThread } from "../../api/threadRequest";
import { useNavigate } from "react-router-dom";
import { UilMultiply, UilPlusCircle } from "@iconscout/react-unicons";
import { uploadThreadImage, uploadThreadImages } from "../../api/uploadRequest";

export const ThreadModal = ({ modal, setModal, type, token, threadId, forumId }) => {

    const [ formData, setFormData ] = useState({ title: "", comment: "", description: ""});
    const [ uploadImages, setUploadImages ] = useState([]);
    const [ fileNames, setFilenames ] = useState([]);

    const threads = useSelector((state) => state.forumReducer.threads);

    const dispatch = useDispatch();

    // console.log(formData, forumId);

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let files = e.target.files;

            if (files.length > 5) {
                dispatch({ type: "ERROR_SET", data: "Maximum of 5 files is allowed" });
                return;
            }

            // setUploadImage(img);
            setUploadImages(files);

            const images = Array.from(files);

            const names = [];

            for (let i = 0 ; i < files.length ; i ++) {
                names.push("IMG_" + Date.now() + i + "." + files[0].type.replace(/(.*)\//g, ''));
            }

            setFilenames(names);
            setFormData({ ...formData, images: names });

            console.log(names);

            // console.log(e.target.files[0].type, e.target.files[0].type.replace(/(.*)\//g, ''))
        }
    }

    const handleRemoveImage = (image) => {
        // if (image === fileName) {
        //     setUploadImage(null);
        //     setFileName("");
        // }
        // if (type !== "profile") {
        //     setImages(images.filter((img) => img !== image));
        // }
    }

    const handleCreate = async () => {
        let data = { threadId };

        if(type === "post") {
            console.log(formData)
            dispatch(createPost({ body: { ...formData, threadId: threadId }, token }));
        }
        else if (type === "thread") {
            // dispatch(createThread({ body: { ...formData, forumId: forumId }, token}));
            dispatch({ type: "THREAD_START" });
            try {
                const { data: res } = await createThread({ body: { ...formData, forumId: forumId }, token});
                console.log(res)
                dispatch({ type: "THREAD_CREATE_SUCCESS", data: res });
                data.threadId = res._id;
            } catch (err) {
                console.log(err);
                dispatch({ type: "THREAD_FAIL", data: err.response.data.message });
                if (err.response.status === 401) {
                    dispatch({ type: "JWT_FAIL", data: err.response.data.message })
                }
                return;
            }
        }
        if (uploadImages.length > 0) {

            console.log("images", uploadImages)
            const body = new FormData();

            body.append("index", 0);
            body.append("threadId", data.threadId);
            
            for (let i = 0 ; i < uploadImages.length ; i ++) {
                body.append("filenames", fileNames[i]);
                body.append("files", uploadImages[i]);
            }
            console.log(body.get("index"))
            console.log(body.get("threadId"))
            console.log(body.getAll("filenames"))
            console.log("upload images", body.getAll("files"))
            await uploadThreadImages({ body, token });

          }
        setModal(false);
    }

    useEffect(() => {
        setFormData({ title: "", comment: "", description: ""});
        setFilenames([]);
        setUploadImages([]);
    }, [modal])

    const title = type === "post" ? "Dodaj odpowiedz:" : "Dodaj watek:";

    return (
        <Modal
        isOpen={modal}
        contentLabel="Example Modal"
        className={css.modal}
        style={{ overlay: { background: "#00000095" } }}>
            <div className={css.container}>
                <h1>{title}</h1>
                <form className={css.form}>
                    { type === "thread" ? 
                    <>
                    <div>Tytul: <span>{formData.title.length}/45</span></div>
                    <input id="title" onChange={(e) => setFormData({ ...formData, [e.currentTarget.id]: e.currentTarget.value }) } maxLength={45} autoFocus />
                    </> : ''}
                    <div>Tresc: <span>{ type === "post" ? formData.comment.length : formData.description.length}/500</span></div>
                    <textarea id={type === "post" ? "comment" : "description"} onChange={(e) => { setFormData({ ...formData, [e.currentTarget.id]: e.currentTarget.value }) }} maxLength={500} rows={5} className={css.content}/>
                    <div className={css.btnWrapper} style={{ justifyContent: "space-between" }}>
                        <div className={css.btnWrapper} style={{ flexDirection: "column" }}>
                            <span>Dodaj obrazy: {uploadImages.length}/5</span>
                        </div>
                        
                        {/* { fileNames.length > 0 ?
                        fileNames.map((image, i) => (
                        <div className={css.btnWrapper} style={{ flexDirection: "column" }}>
                            <span>{uploadImages[0].name}</span>
                            <span>{fileNames[i]}</span>
                        </div>
                        )) : <></> } */}
 
                        <label htmlFor="file"><div className="btn"><UilPlusCircle/> Wybierz pliki</div></label>
                        <input id="file" accept="image/*" onChange={(e) => onImageChange(e)} type="file" style={{ display: "none" }} multiple="multiple" />
                    </div>
                    <div>
                        <span>Zawarte obrazy:</span>
                        <div className="fileWrapper" style={{ marginTop: "1rem" }}>
                            { fileNames.length > 0 ?
                            fileNames.map((image, i) => 
                            <div key={i}>
                                <span>{image}</span>
                            </div>) : <div>Brak obrazow do wyswietlenia.</div> }
                        </div>
                    </div>
                </form>
                <div className="exit" onClick={() => setModal((prev) => !prev)}><UilMultiply/></div>
                <div className={css.btn} onClick={() => { handleCreate() }}>Dodaj</div>
            </div>
        </Modal>
    )
}