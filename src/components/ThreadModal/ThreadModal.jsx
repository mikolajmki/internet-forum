import React from "react";
import Modal from "react-modal";
import css from "./ThreadModal.module.css";

export const ThreadModal = ({ modal, setModal }) => {
    return (
        <Modal
        isOpen={modal}
        contentLabel="Example Modal"
        className={css.modal}
        style={{ overlay: { background: "#00000095" } }}>
            <div className={css.container}>
                <h1>Nowy watek</h1>
                <div>Tresc:</div>
                <form>
                    <input />
                </form>
                <div className={css.exit}  onClick={() => setModal((prev) => !prev)}></div>
                <div className={css.btn}>Dodaj</div>
            </div>
        </Modal>
    )
}