import React, { createRef, useEffect, useState } from "react";
import css from './PostItem.module.css';
import { votePost } from "../../actions/postAction.js";
import { getThreadWithPostsById } from "../../actions/threadAction";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { convertUrlString } from "../../helpers/convertUrlString";
import { toDate, toDateAndTime } from "../../helpers/toDate";

export const PostItem = ({ post, location }) => {

    const { user } = useSelector((state) => state.authReducer.authData);
    const { thread, loading } = useSelector((state) => state.forumReducer) ;

    const [ votes, setVotes ] = useState({})
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    
    console.log(user)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const handleVote = async (postId, type) => {
        try {
            dispatch(votePost(postId, user._id, type));
        } catch (err) {
            console.log(err);
        }
    };

    const handlegetThreadWithPostsById = (threadId) => {
        console.log(threadId)
        dispatch(getThreadWithPostsById(threadId));
        if (!loading) {
            navigate(`/${convertUrlString(thread.forumId.name)}/${convertUrlString(thread.title)}`)
        }
    }

    useEffect(() => {
        if (location !== "forums") {
            setVotes({ userUpvoted: user ? post.upvotes.includes(user._id) : false,
            userDownvoted: user ? post.downvotes.includes(user._id) : false })
        }
    }, [post])

    if (location && location === "forums") {
        return (
            <div className={css.post} style={{ minHeight: "5rem" }}>
                <div className={css.profileInfo} style={{ alignItems: "center", flex: "8", flexDirection: "row" }}>
                    <img style={{ width: "3rem", height: "3rem" }} className={css.profilePic} src={ post.author.profilePicture ? serverPublic + post.author.profilePicture : require('../../public/defaultProfile.png')} alt="" />
                    <div className={css.brief}>
                        <span className="textlink" onClick={() => {navigate(`/profile/${post.author._id}`)}}>{post.author.username}</span>
                        <span className="textlink" onClick={() => handlegetThreadWithPostsById(post.threadId)}>{post.title}</span>
                    </div>
                    <span></span>
                </div>
                <div className={css.content} style={{ overflowY: "hidden", overflowX: "visible", paddingTop: "1rem" }}>
                    <span>{post.comment}</span>
                </div>
            </div>
        )
    }

    return (
        <div key={post.id} className={css.post}>
                <div className={css.profileInfo}>
                    <span className="textlink" onClick={() => navigate(`/profile/${thread.author._id}`)}>{thread.author.username}</span>
                    <div className={css.sampleImg}>
                        <span></span>
                    </div>
                    <span>{thread.author.rank}</span>
                    {/* <span>Reputacja: <div className={`numberBadge ${css.numberBadge}`}><div>{thread.author.reputation}</div></div></span>
                    <span>Odpowiedzi: <div className={`numberBadge ${css.numberBadge}`}><div>{thread.author.answers}</div></div></span> */}
                    <div className={css.stats}>
                        <span>Reputacja: <div className={`numberBadge ${css.numberBadge}`}><div>{thread.author.reputation}</div></div></span>
                        <span>Odpowiedzi: <div className={`numberBadge ${css.numberBadge}`}><div>{thread.author.answers}</div></div></span>
                    </div>
                    <span>Dołączono {toDate(thread.author.createdAt)}</span>
                </div>
            <div className={css.content}>
                <span>{toDateAndTime(post.createdAt)}</span>
                <span>{post.comment}</span>
            </div>
            <div className={css.reaction}>
                {/* <span className={css.reactionCircle} onClick={() => {handleLike(post.id, post.likes + 1)}}><div>+</div></span>
                <span className={css.reactionCircle}>{ post.upvotes.length - post.downvotes.length}</span>
                <span className={css.reactionCircle} onClick={() => {handleLike(post.id, post.likes - 1)}}><div>-</div></span> */}
                {console.log(post.upvotes.length - post.downvotes.length)}
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
        </div>)
}