import React, { useState, useEffect } from "react";
import css from './ThreadSection.module.css';
import { UilPlusCircle, UilTrashAlt, UilMultiply } from '@iconscout/react-unicons';
import { useDispatch, useSelector } from "react-redux";

import { ThreadModal } from "../ThreadModal/ThreadModal";
import { Posts } from "../Posts/Posts";
import { useNavigate } from "react-router-dom";
import { toDate, toDateAndTime } from "../../helpers/toDate";
import { MoreOptions } from "../MoreOptions/MoreOptions";
import { deleteThread } from "../../actions/threadAction";
import { followThread } from "../../api/threadRequest";
import { optimizeThread } from "../../helpers/optimize";

export const ThreadSection = ({ thread }) => {

    const [ modal, setModal ] = useState(false);
    const [ followers, setFollowers ] = useState(thread.followers);
    const [ closed, setClosed ] = useState(thread.isClosed);
    const [ error, setError ] = useState(null);
    const [ profilePicture, setProfilePicture ] = useState("");
    const [ image, setImage ] = useState("");

    const { user, token } = useSelector((state) => state.authReducer.authData);
    const threadId = useSelector((state) => state.forumReducer.thread._id);
    const loading = useSelector((state) => state.authReducer.authData.loading);
    
    
    const serverPublic = process.env.REACT_APP_SERVER_PUBLIC_FOLDER;
    const author = thread.author;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const handleLike = (postId, like) => {
    //     setLikes({ ...likes, [postId]: like })
    // }

    const handleDelete = (data) => {
        dispatch(deleteThread(data));
        navigate(`/forum/${thread.forumId._id}`)
    }

    const flashError = (message) => {
        setError(message);

        setTimeout( () => {
            setError(null)
        } , 3000)
    }

    const showImage = (image) => {
        setImage(image)
    }

    const handleFollow = async (type) => {
        try {
            const { data } = await followThread({ threadId: thread._id, type, token });
            setFollowers(data);
        } catch (err) {
            if (err.response.status === 401) {
                dispatch({ type: "JWT_FAIL", data: err.response.data.message })
            } else {
                flashError(err.response.data.message);
            }
        }
    }

    // <img className={css.profilePic} src={ user.profilePicture ? serverPublic + user.profilePicture : require('../../public/defaultProfile.png')} alt="" />

    useEffect(() => {
        author.profilePicture ? setProfilePicture(serverPublic + "users/" + author.username + "/" + author.profilePicture) : setProfilePicture(require('../../public/defaultProfile.png'));
    }, [author]);

    return (
        <div className={css.container}>
            { image ? 
            <div className={css.imageModal}>
                <div>
                    <div>
                        <div onClick={() => setImage(null)} className="numberBadge"><div><UilMultiply/></div></div>
                        <img src={ serverPublic + threadId + "/" + image} alt="" />
                    </div>
                </div>
            </div> : <></> }
            { user ? <ThreadModal modal={modal} setModal={setModal} token={token} threadId={threadId} type={"post"}/> : <></> }

            <div className={css.btnWrapper}>
                { thread.posts.length === 0 && user && user._id === thread.author._id ?
                <div className={`btnRed ${css.btn}`} onClick={() => handleDelete({ threadId: thread._id, token})}>
                    <div className={css.circle}><UilTrashAlt/></div>
                    Usun
                </div> : <></> }
                { error ? 
                <div className="errorWrapper">
                    <span className="error">{error}</span>
                </div> : <></> }
                { closed ? 
                <div className={css.closed}>
                    <span>Watek zostal zamkniety przez moderatora</span>
                </div> : 
                <>
                { user && followers.includes(user._id) ? 
                <div className="btn" onClick={() => user ? handleFollow(0) : navigate("/auth")}>
                    <div className="numberBadge" style={{ background: "var(--bg1)" }} ><div>{followers.length}</div></div>
                    Przestan obserwowac
                </div> :
                <div className="btn" onClick={() => { handleFollow(1) }}>
                    <div className="numberBadge" style={{ background: "var(--bg1)" }} ><div>{followers.length}</div></div>
                    Obserwuj watek
                </div> }
                <div className={`btn ${css.btn}`} onClick={() => user? setModal((prev) => !prev) : navigate("/auth")}>
                    <div className={css.circle}><UilPlusCircle/></div>
                    Dodaj odpowiedz
                </div>
                </> }
            </div>
            
            <div className={css.post}>
                <div className={css.profileInfo}>
                    <span className="textlink" onClick={() => navigate(`/profile/${thread.author._id}`)}>{thread.author.username}</span>
                    <img src={profilePicture} className={css.sampleImg} alt="" />
                    <span style={ thread.author.rank === "Moderator" ? { color: "yellow" } : thread.author.rank === "Administrator" ? { color: "orange" } : {} }>{thread.author.rank}</span>
                    <div className={css.stats}>
                        <span>Reputacja: <div className={`numberBadge ${css.numberBadge}`}><div>{thread.author.reputation}</div></div></span>
                        <span>Odpowiedzi: <div className={`numberBadge ${css.numberBadge}`}><div>{thread.author.answers}</div></div></span>
                    </div>
                    <span>Dołączono {toDate(thread.author.createdAt)}</span>
                </div>
                <div className={css.contentWrapper}>
                    <div className={css.top}>
                            <div className={css.timestamps}>
                                <span>{ toDateAndTime(thread.createdAt)}</span>
                                {thread.createdAt !== thread.updatedAt ? <span className={css.edited}>Edytowano: {toDateAndTime(thread.updatedAt)}</span> : <></> }
                            </div>
                            { user && (user._id === thread.author._id || user.isModerator) ? 
                            <MoreOptions value={closed} setValue={setClosed} isModerator={user.isModerator} location="thread" data={{ userId: user._id, content: optimizeThread(thread), token }}/> : <></> }
                    </div>
                    <div className={css.content}>
                        <span>{thread.description}</span>
                        { thread.images.length > 0 ?
                        <div className={css.fileWrapper}>
                            <span>Obrazy: </span>
                                { thread.images.map((image, i) => 
                                <div onClick={() => {showImage(image)}}>
                                    <span>{image}</span>
                                </div>)}
                        </div>
                        : <></> }
                    </div>
                </div>
                {/* <div className={css.reaction}>
                        <span className={css.reactionCircle}></span>
                        <span className={css.reactionCircle}>0</span>
                        <span className={css.reactionCircle}></span>
                </div> */}
            </div>
            
            <Posts setImage={setImage} posts={thread.posts} location={""}/>
        </div>
    )
}