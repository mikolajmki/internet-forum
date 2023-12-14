import React, { useEffect, useState } from "react";
import { UilBell, UilCommentAltMessage, UilEnvelope, UilCommentLines, UilSearch } from '@iconscout/react-unicons';
import css from './NotificationIcon.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { convertUrlString } from "../../helpers/convertUrlString";
import { getThreadWithPostsById } from "../../actions/threadAction";
import { deleteNotificationsOfAuthUser } from "../../actions/notificationAction";
import useDebounce from "../../helpers/useDebounce";
import { getThreadsByTitleLike } from "../../api/threadRequest";
import { getUsersByUsernameLike } from "../../api/userRequest";
import { toDate } from "../../helpers/toDate";
import limitString from "../../helpers/limitString";

export const NotificationIcon = ({ modalOpened, setModalOpened, type }) => {

    const { notifications, loading } = useSelector((state) => state.authReducer);
    const { token } = useSelector((state) => state.authReducer.authData);

    const [ search, setSearch ] = useState("");
    const [ searchFilter, setSearchFilter ] = useState("title");
    const [ content, setContent ] = useState([]);

    const modalType = type == 0 ? "notifications" : "messages";
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const serverPublic = process.env.REACT_APP_SERVER_PUBLIC_FOLDER;

    const handlegetThreadWithPostsById = (thread, forum) => {
        setModalOpened(({ ...!modalOpened, [modalType]: !modalOpened[modalType]}))
        console.log(thread._id)
        dispatch(getThreadWithPostsById(thread._id));
        if (!loading) {
            navigate(`/thread/${convertUrlString(thread.title)}`)
        }
    }

    const handleClearNotifications = () => {
        dispatch(deleteNotificationsOfAuthUser(token))
    }

    const handleChangeFilter = (e) => {
        setSearchFilter(e.currentTarget.id)
        setContent([]);
        setSearch("")
    }

    useEffect(() => {
        setSearchFilter("title");
        setContent([]);
    }, [modalOpened])

    useDebounce(async () => {
        if (search !== "") {
            try {
                const { data } = searchFilter === "title" && search !== "" ? await getThreadsByTitleLike(search) : await getUsersByUsernameLike(search);
                setContent(data);
            } catch (err) {
                console.log(err.response.data.message);
            }
        } else {
            setContent([])
        }
    }, [search], 1000)

    useEffect(() => {
        console.log(searchFilter, search)
    }, [search])

    useEffect(() => {
        console.log(content)
    }, [content])


    const notiBarContent = (item) => {
        const profilePicture = item.profilePicture ? serverPublic + "/users/" + item.username + "/" + item.profilePicture : require('../../public/defaultProfile.png');
        return (
            <div className={css.notification}>
                <div className={css.modalImg}>
                    { searchFilter !== "username" ? 
                    <UilCommentAltMessage/> : 
                    content.length > 0 ? 
                    <img className={css.profilePic} src={ profilePicture } alt="" /> : 
                    <span></span> }
                </div>
                { type === 0 ? 
                
                item.type === "thread-author" ? <div className={css.content} onClick={() => handlegetThreadWithPostsById(item.thread, item.forum)}><div><span>{item.sender.username}</span> odpowiedzial w twoim watku {item.thread.title}</div></div> :
                item.type === "forum" ? <div className={css.content} onClick={() => handlegetThreadWithPostsById(item.thread, item.forum)}><div><span>{item.sender.username}</span> dodal watek na forum {item.forum.name}</div></div> : 
                item.type === "thread" ? <div className={css.content} onClick={() => handlegetThreadWithPostsById(item.thread, item.forum)}><div><span>{item.sender.username}</span> dodal odpowiedz w watku {item.thread.title}</div></div> : <></>

                // <div className={css.content}><div><span>{item.sender.username}</span> odpowiedzial na twoje pytanie w watku: "Najlepsze BMW do wyscigow" </div></div>
                // <div className={css.content}><div><span>{notification.sender.username}</span> odpowiedzial na twoje pytanie w watku: "Najlepsze BMW do wyscigow" </div></div>
                : searchFilter === "title" ? 
                <div className={css.item} onClick={() => navigate(`/thread/${item._id}`)}>
                    <div style={{ flex: "4" }}>
                        <span>{item.author.username} </span>
                        <span style={{ color: "white" }}>{ item.title.length > 48 ? limitString(item.title) + "..." : item.title}</span>
                    </div>
                    <div style={{ flex: "1" }} className={css.info}>
                        <div><div className="numberBadge" style={{ padding: "0 0.5rem" }}>{item.views}</div><span>Wyswietlen</span></div>
                        <div><div className="numberBadge"><div>{item.posts.length}</div></div><span>Odpowiedzi</span></div>
                    </div>
                </div> :
                <div className={css.item} onClick={() => navigate(`/profile/${item._id}`)}>
                    <div><span>{item.username}</span></div>
                    <div className={css.info} style={{ alignItems: "flex-start" }}>
                        <div><span>Dolaczyl:</span></div>
                        <div><span>{ toDate(item.createdAt) }</span></div>
                    </div>
                    <div className={css.info}>
                        <div><div className="numberBadge"><div>{item.reputation}</div></div><span>Reputacja</span></div>
                        <div><div className="numberBadge"><div>{item.answers}</div></div><span>Odpowiedzi</span></div>
                    </div>
                </div> }
            </div>
        )
    }

    return (
        <div className={css.icon}>
            <div onClick={() => {setModalOpened(({ ...!modalOpened, [modalType]: !modalOpened[modalType]}))}}>
                { type === 0 ? <UilBell/> : <UilSearch/> }
                { type === 0 ? <div className={css.numberBadge}><div>{notifications.reduce((a, { isRead }) => a + !isRead, 0)}</div></div> : <></> }
            </div>
            { modalOpened[modalType] ?
            <>
            <div className={css.arrowUp}></div>
            <div className={`${css.notificationModal} ${ type === 1 ? css.searchModal : ''}`} >
                { type === 0 ? 
                <div>
                    { !loading && notifications.length > 0 ?
                    <div>
                        <div className={css.options}>
                            <span className={css.clear} onClick={() => handleClearNotifications()}>Wyczysc powiadomienia</span> 
                        </div>
                        {notifications.map  (notification => notiBarContent(notification))}
                    </div>
                    : <div>Brak powiadomien do wyswietlenia.</div> }
                </div> : 
                <div>
                    <div>
                        <div className={css.options}>
                            <span className={css.clear} style={{ cursor: "default", textDecoration: "none" }}>Szukaj: </span>
                            <span id="title" className={css.clear} style={searchFilter === "title" ? { color: "var(--secondary)" } : {} } onClick={(e) => handleChangeFilter(e)}>Watek</span>
                            <span id="username" className={css.clear} style={searchFilter === "username" ? { color: "var(--secondary)" } : {} } onClick={(e) => handleChangeFilter(e)}>Uzytkownik</span>
                        </div>
                        <div className={css.searchBar}>
                            <input onChange={(e) => setSearch(e.currentTarget.value)} className={css.searchBar} type="text" value={search} placeholder="Szukaj" />
                        </div>
                        { content.length > 0 ? content.map(item => notiBarContent(item)) : <span>Brak wynikow</span>}
                    </div>
                </div> }
            </div>
            </> : '' }
        </div>
    )
}


{/* <span className={css.clear} onClick={() => handleClearNotifications()}>Wyczysc powiadomienia</span> */}
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