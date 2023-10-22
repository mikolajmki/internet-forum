import React, { useState } from "react";
import Modal from "react-modal";
import css from "./ThreadModal.module.css";
import { useDispatch } from "react-redux";
import { createPost } from "../../actions/postAction";

export const ThreadModal = ({ modal, setModal, type, userId, threadId }) => {

    const [ formData, setFormData ] = useState({ authorId: userId, threadId: threadId });

    const dispatch = useDispatch();

    console.log(formData);

    const handleCreate = (userId, threadId, formData) => {
        if(type === "post") dispatch(createPost(userId, threadId, formData.comment));
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
                    { title === 'Dodaj watek:' ? 
                    <>
                    <div>Tytul:</div>
                    <input autoFocus />
                    </> : ''}
                    <div>Tresc:</div>
                    <textarea id={type === "post" ? "comment" : "description"} onChange={(e) => { setFormData({ ...formData, [e.currentTarget.id]: e.currentTarget.value }) }} rows={5} className={css.content}/>
                </form>
                <div className={css.exit} onClick={() => setModal((prev) => !prev)}></div>
                <div className={css.btn} onClick={() => { handleCreate(userId, threadId, formData) }}>Dodaj</div>
            </div>
        </Modal>
    )
}