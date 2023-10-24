import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import css from "./ThreadModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../actions/postAction";
import { createThread } from "../../actions/threadAction";
import { useNavigate } from "react-router-dom";

export const ThreadModal = ({ modal, setModal, type, userId, threadId, forumId }) => {

    const [ formData, setFormData ] = useState({ authorId: userId });

    const dispatch = useDispatch();

    console.log(formData, forumId, userId);

    const handleCreate = () => {
        if(type === "post") {
            dispatch(createPost({ ...formData, threadId: threadId }));
        }
        else if (type === "thread") {
            dispatch(createThread({ ...formData, forumId: forumId }));
        }
        setModal(false);
    }

    const title = type === "post" ? "Dodaj odpowiedz:" : "Dodaj watek:";

    return (
        <Modal
        isOpen={modal}
        contentLabel="Example Modal"
        className={css.modal}
        style={{ overlay: { background: "#00000095" } }}>
            <div className={css.container}>
                <h1>{title}</h1>
                <form>
                    { type === "thread" ? 
                    <>
                    <div>Tytul:</div>
                    <input id="title" onChange={(e) => setFormData({ ...formData, [e.currentTarget.id]: e.currentTarget.value }) } autoFocus />
                    </> : ''}
                    <div>Tresc:</div>
                    <textarea id={type === "post" ? "comment" : "description"} onChange={(e) => { setFormData({ ...formData, [e.currentTarget.id]: e.currentTarget.value }) }} rows={5} className={css.content}/>
                </form>
                <div className={css.exit} onClick={() => setModal((prev) => !prev)}></div>
                <div className={css.btn} onClick={() => { handleCreate() }}>Dodaj</div>
            </div>
        </Modal>
    )
}