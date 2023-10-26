import React, { useState, useEffect } from "react";
import css from './ThreadSection.module.css';
import { UilPlusCircle } from '@iconscout/react-unicons';
import { useDispatch, useSelector } from "react-redux";

import { ThreadModal } from "../ThreadModal/ThreadModal";
import { Posts } from "../Posts/Posts";
import { useNavigate } from "react-router-dom";
import { toDate } from "../../helpers/toDate";

export const ThreadSection = ({ thread }) => {

    const [modal, setModal] = useState(false);
    const [likes, setLikes] = useState({});

    const dispatch = useDispatch();

    // const handleLike = (postId, like) => {
    //     setLikes({ ...likes, [postId]: like })
    // }

    const navigate = useNavigate();
    // <img className={css.profilePic} src={ user.profilePicture ? serverPublic + user.profilePicture : require('../../public/defaultProfile.png')} alt="" />

    const user = useSelector((state) => state.authReducer.authData.user);
    const threadId = useSelector((state) => state.forumReducer.thread._id);
    const loading = useSelector((state) => state.authReducer.authData.loading)

    console.log(likes)

    return (
        <div className={css.container}>
            { user ? <ThreadModal modal={modal} setModal={setModal} userId={user._id} threadId={threadId} type={"post"}/> : <></> }

            <div className={css.btnWrapper}>
                <div className={`btn ${css.btn}`} onClick={() => user? setModal((prev) => !prev) : navigate("/auth")}>
                    <div className={css.circle}><UilPlusCircle/></div>
                    Dodaj odpowiedz
                </div>
            </div>
            
            <div className={css.post}>
                <div className={css.profileInfo}>
                    <span className="textlink" onClick={() => navigate(`/profile/${thread.author._id}`)}>{thread.author.username}</span>
                    <div className={css.sampleImg}>
                        <span></span>
                    </div>
                    <span>{thread.author.rank}</span>
                    <div className={css.stats}>
                        <span>Reputacja: <div className={`numberBadge ${css.numberBadge}`}><div>{thread.author.reputation}</div></div></span>
                        <span>Odpowiedzi: <div className={`numberBadge ${css.numberBadge}`}><div>{thread.author.answers}</div></div></span>
                    </div>
                    <span>Dołączono {toDate(thread.author.createdAt)}</span>
                </div>
                <div className={css.content}>
                    <span>{thread.date}</span>
                    <span>{thread.description}</span>
                </div>
                {/* <div className={css.reaction}>
                        <span className={css.reactionCircle}></span>
                        <span className={css.reactionCircle}>0</span>
                        <span className={css.reactionCircle}></span>
                </div> */}
            </div>
            
            { loading ? <></> : <Posts posts={thread.posts} location={""}/> }
        </div>
    )
}