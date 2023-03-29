import React from "react";
import Modal from "react-modal";
import css from "./ThreadModal.module.css";

export const ThreadModal = ({ modal, setModal, title }) => {
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
                    <input />
                    </> : ''}
                    <div>Tresc:</div>
                    <textarea rows={5} className={css.content}/>
                </form>
                <div className={css.exit}  onClick={() => setModal((prev) => !prev)}></div>
                <div className={css.btn}>Dodaj</div>
            </div>
        </Modal>
    )
}