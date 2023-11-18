import React, { useEffect } from "react";
import { UilBell, UilCommentAltMessage, UilEnvelope, UilCommentLines } from '@iconscout/react-unicons';
import css from './NotificationIcon.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { convertUrlString } from "../../helpers/convertUrlString";
import { getThreadWithPostsById } from "../../actions/threadAction";

export const NotificationIcon = ({ modalOpened, setModalOpened, type }) => {

    const { notifications, loading } = useSelector((state) => state.authReducer);

    const modalType = type == 0 ? "notifications" : "messages";
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handlegetThreadWithPostsById = (thread, forum) => {
        console.log(thread._id)
        dispatch(getThreadWithPostsById(thread._id));
        if (!loading) {
            navigate(`/thread/${convertUrlString(thread.title)}`)
        }
    }

    const notiBarContent = (notification) => {
        return (
            <div className={css.notification}>
                <div className={css.modalImg}>{ type === 0 ? <UilCommentAltMessage/> : <UilCommentLines/> }</div>
                { type === 0 ? 
                
                notification.type === "thread-author" ? <div className={css.content} onClick={() => handlegetThreadWithPostsById(notification.thread, notification.forum)}><div><span>{notification.sender.username}</span> odpowiedzial w twoim watku {notification.thread.title}</div></div> :
                notification.type === "forum" ? <div className={css.content} onClick={() => handlegetThreadWithPostsById(notification.thread, notification.forum)}><div><span>{notification.sender.username}</span> dodal watek na forum {notification.forum.name}</div></div> : 
                notification.type === "thread" ? <div className={css.content} onClick={() => handlegetThreadWithPostsById(notification.thread, notification.forum)}><div><span>{notification.sender.username}</span> dodal odpowiedz w watku {notification.thread.title}</div></div> : <></>

                // <div className={css.content}><div><span>{notification.sender.username}</span> odpowiedzial na twoje pytanie w watku: "Najlepsze BMW do wyscigow" </div></div>
                // <div className={css.content}><div><span>{notification.sender.username}</span> odpowiedzial na twoje pytanie w watku: "Najlepsze BMW do wyscigow" </div></div>
                :
                <div className={css.content}><div><span>speedyspeed</span> przesyla ci wiadomosc.</div></div> }
            </div>
        )
    }

    return (
        <div className={css.icon}>
            <div onClick={() => {setModalOpened(({ ...!modalOpened, [modalType]: !modalOpened[modalType]}))}}>
                { type === 0 ? <UilBell/> : <UilEnvelope/> }
                <div className={css.numberBadge}><div>{notifications.reduce((a, { isRead }) => a + !isRead, 0)}</div></div>
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
                    { !loading ? notifications.map(notification => notiBarContent(notification)) : <></> }
                </div>
            </div>
            </> : '' }
        </div>
    )
}