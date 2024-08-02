import React from "react";
import css from "./ThreadItem.module.css";
import { useState, useEffect } from "react";
import limitString from "../../helpers/limitString";
import { toDate } from "../../helpers/toDate";
import { useNavigate } from "react-router-dom";

export const ThreadItem = ({ thread, location }) => {

    
    const user = thread.author;
    const navigate = useNavigate();

    const handleNavigate = (e) => {

    }

    const serverPublic = process.env.REACT_APP_SERVER_PUBLIC_FOLDER;

    const authorProfilePicture = user.profilePicture ? serverPublic + "users/" + user.username + "/" + user.profilePicture : require('../../public/defaultProfile.png');
    
    return (
        <div className={css.thread} id="thread">
            <div className={css.dot}></div>
                <div className={css.info}  onClick={() => navigate(`/thread/${thread._id}`)}>
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
                <img className={css.profilePic} src={authorProfilePicture} style={{ width: "3rem", height: "3rem" }} alt="" />
                <div>
                    <div style={{ alignItems: "start" }} className={css.stats}>
                        <span className="textlink" id="profile" onClick={() => navigate(`/profile/${thread.author._id}`) }>{thread.author.username}</span>
                        <span style={{ color: "var(--textLight)" }}>{toDate(thread.author.createdAt)}</span>
                    </div>
                </div>
                </> : <></> }
            </div>
        </div>
    )
}