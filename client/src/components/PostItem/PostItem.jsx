import React, { createRef, useEffect, useRef, useState } from "react";
import { UilMultiply } from "@iconscout/react-unicons"
// import css from './PostItem.module.css';
import css from "../ThreadSection/ThreadSection.module.css";
import { deletePost, votePost } from "../../actions/postAction.js";
import { getThreadWithPostsById } from "../../actions/threadAction";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { convertUrlString } from "../../helpers/convertUrlString";
import { toDate, toDateAndTime } from "../../helpers/toDate";
import { MoreOptions } from "../MoreOptions/MoreOptions.jsx";
import { optimizePost } from "../../helpers/optimize.js";

export const PostItem = ({ post, location, setImage }) => {

    const { user, token } = useSelector((state) => state.authReducer.authData);
    const { loading } = useSelector((state) => state.forumReducer);
    const { thread } = useSelector((state) => state.forumReducer);

    const [ votes, setVotes ] = useState({});
    const [ threadId, setThreadId ] = useState("")

    useEffect(() => {
        if (location === "forum") {
            setThreadId(post.threadId);
        } else if (location === "thread") {
            setThreadId(thread._id);
        }
    }, [])

    const author = post.author;
    const serverPublic = process.env.REACT_APP_SERVER_PUBLIC_FOLDER;

    const authorProfilePicture = author.profilePicture ? serverPublic + "users/" + author.username + "/" + author.profilePicture : require('../../public/defaultProfile.png');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const ref = useRef(null);

    const showImage = (image) => {
        setImage(image)
    }

    const handleVote = async (postId, type) => {
        try {
            dispatch(votePost({ postId, type, token }));
        } catch (err) {
            console.log(err);
        }
    };

    const handlegetThreadWithPostsById = (threadId) => {
        console.log(threadId)
        dispatch(getThreadWithPostsById(threadId));
        if (!loading) {
            navigate(`/thread/${threadId}`)
        }
    }

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            // setMenu(false);
        }
    };

    useEffect(() => {
        // document.addEventListener('click', handleClickOutside, true);
        // return () => {
        //     document.removeEventListener('click', handleClickOutside, true);
        // };
    }, []);

    useEffect(() => {
        if (location !== "forums") {
            setVotes({ userUpvoted: user ? post.upvotes.includes(user._id) : false,
            userDownvoted: user ? post.downvotes.includes(user._id) : false })
        }
    }, [post])

    if (location && location === "forums") {
        return (
            <div className={css.post} style={{ minHeight: "5rem", padding: "1rem", width: "100%" }}>
                <div className={css.profileInfo} style={{ alignItems: "center", flex: "2", flexDirection: "row", padding: "0" }}>
                    <img style={{ width: "3rem", height: "3rem" }} className={css.profilePic} src={authorProfilePicture} alt="" />
                    <div className={css.brief}>
                        <span className="textlink" style={{ fontSize: "1rem" }} onClick={() => {navigate(`/profile/${post.author._id}`)}}>{post.author.username}</span>
                        <span className="textlink" onClick={() => handlegetThreadWithPostsById(post.threadId)}>{post.title}</span>
                    </div>
                    <span></span>
                </div>
                <div className={css.content} style={{ overflowY: "hidden", overflowX: "visible", padding: "1rem 0 0 0", flex: "2" }}>
                    <span className={css.comment}>{post.comment}</span>
                </div>
            </div>
        )
    }

    return (
        <div key={post.id} className={css.post}>

                <div className={css.profileInfo}>
                    <span className="textlink" onClick={() => navigate(`/profile/${post.author._id}`)}>{post.author.username}</span>
                    <img src={authorProfilePicture} alt="" className={css.sampleImg} />
                    <span style={ post.author.rank === "Moderator" ? { color: "yellow" } : post.author.rank === "Administrator" ? { color: "orange" } : {} }>{post.author.rank}</span>
                    {/* <span>Reputacja: <div className={`numberBadge ${css.numberBadge}`}><div>{thread.author.reputation}</div></div></span>
                    <span>Odpowiedzi: <div className={`numberBadge ${css.numberBadge}`}><div>{thread.author.answers}</div></div></span> */}
                    <div className={css.stats}>
                        <span>Reputacja: <div className={`numberBadge ${css.numberBadge}`}><div>{post.author.reputation}</div></div></span>
                        <span>Odpowiedzi: <div className={`numberBadge ${css.numberBadge}`}><div>{post.author.answers}</div></div></span>
                    </div>
                    <span>Dołączono {toDate(post.author.createdAt)}</span>
                </div>
            <div className={css.contentWrapper}>
                <div className={css.top}>
                        <div className={css.timestamps} >
                                <span>{ toDateAndTime(post.createdAt)}</span>
                                {post.createdAt !== post.updatedAt ? <span className={css.edited} >Edytowano: {toDateAndTime(post.updatedAt)}</span> : <></> }
                        </div>
                        { user && user._id === post.author._id ?

                        <MoreOptions data={{ userId: user._id, threadId, content: optimizePost(post, threadId), token }} location={"post"}/> : <></> }
                </div>
                <div className={css.content}>
                    <div className={css.comment}>
                        <span>{post.comment}</span>
                    </div>
                    <div className={css.reaction}>
                        {/* <span className={css.reactionCircle} onClick={() => {handleLike(post.id, post.likes + 1)}}><div>+</div></span>
                        <span className={css.reactionCircle}>{ post.upvotes.length - post.downvotes.length}</span>
                        <span className={css.reactionCircle} onClick={() => {handleLike(post.id, post.likes - 1)}}><div>-</div></span> */}
                        {/* {console.log(post.upvotes.length - post.downvotes.length)} */}
                        { user && user._id !== post.author._id ? 
                        <button className={css.vote}
                            disabled={votes.userUpvoted || !user}
                            onClick={() => { handleVote(post._id, 1)}}>
                            <div>+</div>
                        </button> : <></> }
                        <span className={css.voteCount}>
                            <span>{ post.upvotes.length - post.downvotes.length }</span>
                            { votes.userUpvoted || votes.userDownvoted ? 
                            <span className={css.cancel} onClick={() => { handleVote(post._id, 2) }}>
                                X
                            </span> : <></> }
                        </span>
                        { user && user._id !== post.author._id ? 
                        <button className={css.vote}
                            disabled={votes.userDownvoted || !user}
                            onClick={() => { handleVote(post._id, 0) }}>
                                <div>-</div>
                        </button> : <></> }
                    </div>
                </div>
                { post.images.length > 0 ?
                <div className={css.fileWrapper}>
                    <span>Zdjęcia: </span>
                    { post.images.map((image, i) => 
                    <div onClick={() => {showImage(image)}}>
                        <span>{image}</span>
                    </div>) }
                </div>
                : <></> }
            </div>
        </div>)
}