import React from "react";
import { UilBell, UilCommentAltMessage, UilEnvelope } from '@iconscout/react-unicons';
import css from './NotificationIcon.module.css';

export const NotificationIcon = ({ modalOpened, setModalOpened, type }) => {

    const modalType = type == 0 ? "notifications" : "messages";

    return (
        <div className={css.icon} onClick={() => {setModalOpened(({ ...!modalOpened, [modalType]: !modalOpened[modalType]}))}}>
            { type === 0 ? <UilBell/> : <UilEnvelope/> }
            { modalOpened[modalType] ?
            <div className={css.notificationModal}>
                <div>
                    <div className={css.arrowUp}></div>
                    <div className={css.notification}>
                        <div className={css.modalImg}><UilCommentAltMessage/></div>
                        <div className={css.content}><div><span>racer86</span> odpowiedzial na twoje pytanie w watku: "Najlepsze BMW do wyscigow" </div></div>
                    </div>
                    <div className={css.notification}>
                        <div className={css.modalImg}><UilCommentAltMessage/></div>
                        <div className={css.content}><div><span>racer86</span> odpowiedzial na twoje pytanie w watku: "Najlepsze BMW do wyscigow" </div></div>
                    </div>
                    <div className={css.notification}>
                        <div className={css.modalImg}><UilCommentAltMessage/></div>
                        <div className={css.content}><div><span>racer86</span> odpowiedzial na twoje pytanie w watku: "Najlepsze BMW do wyscigow" </div></div>
                    </div>
                </div>
            </div> : '' }
            <div className={css.numberBatch}><div>1</div></div>
        </div>
    )
}