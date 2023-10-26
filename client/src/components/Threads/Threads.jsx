import React, { useEffect } from "react";
import css from './Threads.module.css';
import { useParams, Link, useNavigate } from "react-router-dom";
import { getThreadWithPostsById } from "../../actions/threadAction";
import { useDispatch, useSelector } from "react-redux";
import { convertUrlString } from "../../helpers/convertUrlString";
import { toDate } from "../../helpers/toDate";


export const Threads = ({ threads, location }) => {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    const handleGetThreadWithPostsById = (threadId) => {
        dispatch(getThreadWithPostsById(threadId));
    }


    return (
        <div className={css.container}>
            <div className={css.threads} style={ location === 'profile' ? { boxShadow: 'none', border: 'none' } : {} }>
            { threads.map((thread, i) => {
                        console.log(thread)
                        return (

                                <div key={i} className={css.thread}>
                                    <div className={css.dot}></div>
                                    <Link to={`/${convertUrlString(thread.forumId.name)}/${convertUrlString(thread.title)}`} style={{ color: "white", textDecoration: "none" }} 
                                    onClick={() => handleGetThreadWithPostsById(thread._id)}
                                    >
                                        <div className={css.info}>
                                            <span>{thread.title}</span>
                                            <span>dodany przez {thread.author.username} dnia {toDate(thread.createdAt)}</span>
                                        </div>
                                    </Link>
                                    <div className={css.brief}>
                                        <div className={css.stats}>
                                            <div><div className="numberBadge"><div>{thread.posts.length}</div></div> odpowiedzi</div>
                                            <span style={{ color: "var(--textLight)" }}>{thread.views} wyświetleń</span>
                                            {/* <span>odpowiedzi</span> */}
                                        </div>
                                        { location !== "home" && location !== "profile" ? 
                                        <>
                                        <img src={ thread.author.profilePicture ? serverPublic + thread.author.profilePicture : require('../../public/defaultProfile.png')} style={{ width: "3rem", height: "3rem" }} alt="" />
                                        <div>
                                            <div style={{ alignItems: "start" }} className={css.stats}>
                                                <span className="textlink" onClick={() => { navigate(`/profile/${thread.author._id}`) }}>{thread.author.username}</span>
                                                <span style={{ color: "var(--textLight)" }}>{toDate(thread.author.createdAt)}</span>
                                            </div>
                                        </div>
                                        </> : <></> }
                                    </div>
                                </div>
                        )
                }) }
            </div>
        </div>
    )
}