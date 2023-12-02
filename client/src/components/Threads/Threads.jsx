import React, { useEffect } from "react";
import css from './Threads.module.css';
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toDate } from "../../helpers/toDate";
import limitString from "../../helpers/limitString.js"


export const Threads = ({ loading, threads, location }) => {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className={css.container}>
            <div className={css.threads} style={ location === 'profile' ? { boxShadow: 'none', border: 'none' } : {} }>
            { threads.length > 0 ? threads.map((thread, i) => {
                return (
                    <div key={i} className={css.thread} onClick={() => navigate(`/thread/${thread._id}`)}>
                        <div className={css.dot}></div>
                            <div className={css.info}>
                                <span>{limitString(thread.title) === thread.title ? thread.title : limitString(thread.title) + "..."}</span>
                                <span>dodany przez {thread.author.username} dnia {toDate(thread.createdAt)}</span>
                            </div>
                        <div className={css.brief}>
                            <div className={css.stats}>
                                <div><div className="numberBadge"><div>{thread.posts.length}</div></div> odpowiedzi</div>
                                <span style={{ color: "var(--textLight)" }}>{ thread.views > 1000 ? Math.round(thread.views / 100) / 10 + " tys." : thread.views } wyświetleń</span>
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
            }) : location === "profile" ? <h1 style={{ padding: "2rem 1rem" }}>Uzytkownik nie opublikowal jeszcze zadnych watkow.</h1> : <h2>Nie ma jeszcze watkow na tym forum.</h2> }
            </div>
        </div>
    )
}