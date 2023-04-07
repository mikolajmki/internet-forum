import React from "react";
import { UilBell, UilCommentAltMessage, UilEnvelope, UilCommentLines } from '@iconscout/react-unicons';
import css from './NotificationIcon.module.css';

export const NotificationIcon = ({ modalOpened, setModalOpened, type }) => {

    const modalType = type == 0 ? "notifications" : "messages";

    const notiBarContent = () => {
        return (
            <div className={css.notification}>
                <div className={css.modalImg}>{ type === 0 ? <UilCommentAltMessage/> : <UilCommentLines/> }</div>
                { type === 0 ? 
                <div className={css.content}><div><span>racer86</span> odpowiedzial na twoje pytanie w watku: "Najlepsze BMW do wyscigow" </div></div>
                :
                <div className={css.content}><div><span>speedyspeed</span> przesyla ci wiadomosc.</div></div> }
            </div>
        )
    }

    return (
        <div className={css.icon}>
            <div onClick={() => {setModalOpened(({ ...!modalOpened, [modalType]: !modalOpened[modalType]}))}}>
                { type === 0 ? <UilBell/> : <UilEnvelope/> }
                <div className={css.numberBadge}><div>1</div></div>
            </div>
            { modalOpened[modalType] ?
            <>
            <div className={css.arrowUp}></div>
            <div className={`${css.notificationModal} ${ type === 1 ? css.messageModal : ''}`}>
                <div>
                    {/* <div className={css.notification}>
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
                    </div> */}
                    { notiBarContent() }
                    { notiBarContent() }
                    { notiBarContent() }
                </div>
            </div>
            </> : '' }
        </div>
    )
}