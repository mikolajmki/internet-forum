import React, { useState, useEffect } from "react";
import css from './PostSection.module.css';
import { UilPlusCircle } from '@iconscout/react-unicons';
import { ThreadModal } from "../ThreadModal/ThreadModal";
import { threads } from "../../data/threads";
import { useParams } from "react-router-dom";

export const PostSection = () => {

    const [modal, setModal] = useState(false);
    const [likes, setLikes] = useState({});
    const params = useParams();

    const thread = threads[params.subId].filter((thread) => {
        return thread.id == params.threadId;
    })[0]

    useEffect(() => {
    }, [])

    const handleLike = (postId, like) => {
        setLikes({ ...likes, [postId]: like })
    }

    console.log(likes)

    return (
        <div className={css.container}>
            <ThreadModal modal={modal} setModal={setModal} title={"Dodaj odpowiedz:"}/>

            <div className={css.btnWrapper}>
                <div className={`btn ${css.btn}`} onClick={() => setModal((prev) => !prev)}>
                    <div className={css.circle}><UilPlusCircle/></div>
                    Dodaj odpowiedz
                </div>
            </div>
            
            <div className={css.post}>
                    <div className={css.profileInfo}>
                        <span>{thread.author}</span>
                    <div className={css.sampleImg}>
                        <span></span>
                    </div>
                    <span>Uzytkownik</span>
                    <span>4 odpowiedzi</span>
                    <span>Dolaczyl 22.03.2023r.</span>
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
            
            { thread.posts.map((post, i) => {
                return (
                <div key={i} className={css.post}>
                <div className={css.profileInfo}>
                        <span>{thread.author}</span>
                    <div className={css.sampleImg}>
                        <span></span>
                    </div>
                    <span>Uzytkownik</span>
                    <span>4 odpowiedzi</span>
                    <span>Dolaczyl 22.03.2023r.</span>
                </div>
                <div className={css.content}>
                    <span>{post.date}</span>
                    <span>{post.content}</span>
                </div>
                <div className={css.reaction}>
                        <span className={css.reactionCircle} onClick={() => {handleLike(post.id, post.likes + 1)}}><div>+</div></span>
                        <span className={css.reactionCircle}>{ likes[post.id] ? likes[post.id] : post.likes }</span>
                        <span className={css.reactionCircle} onClick={() => {handleLike(post.id, post.likes - 1)}}><div>-</div></span>
                </div>
                </div>)
            }) }
        </div>
    )
}