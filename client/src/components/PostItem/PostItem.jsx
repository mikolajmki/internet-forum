import React, { createRef, useEffect, useState } from "react";
import css from './PostItem.module.css';
import { votePost } from "../../actions/postAction.js";
import { useSelector, useDispatch } from "react-redux";

export const PostItem = ({ post }) => {

    const { user } = useSelector((state) => state.authReducer.authData);

    const [ votes, setVotes ] = useState({})
    
    console.log(user)

    const dispatch = useDispatch();

    const handleVote = async (postId, type) => {
        try {
            dispatch(votePost(postId, user.id, type));
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        setVotes({ userUpvoted: user ? post.upvotes.includes(user.id) : false,
            userDownvoted: user ? post.downvotes.includes(user.id) : false })
    }, [post])

    return (
        <div key={post.id} className={css.post}>
        <div className={css.profileInfo}>
                <span>{post.author.username}</span>
            <div className={css.sampleImg}>
                <span></span>
            </div>
            <span>{post.author.rank}</span>
            <span>{post.author.reputation}</span>
            <span>{post.author.answers}</span>
            <span>{post.author.createdAt}</span>
        </div>
        <div className={css.content}>
            <span>{post.createdAt}</span>
            <span>{post.comment}</span>
        </div>
        { user.id === post.author._id ? <></> :
            <div className={css.reaction}>
            {/* <span className={css.reactionCircle} onClick={() => {handleLike(post.id, post.likes + 1)}}><div>+</div></span>
            <span className={css.reactionCircle}>{ post.upvotes.length - post.downvotes.length}</span>
            <span className={css.reactionCircle} onClick={() => {handleLike(post.id, post.likes - 1)}}><div>-</div></span> */}
            {console.log(post.upvotes.length - post.downvotes.length)}
            { user ? <button className={css.reactionCircle}
                disabled={votes.userUpvoted || !user}
                onClick={() => { handleVote(post._id, 1)}}>
                <div>+</div>
            </button> : <div></div> }
                <span className={css.voteCount}>
                    <span>{ post.upvotes.length - post.downvotes.length }</span>
                    { votes.userUpvoted || votes.userDownvoted ? 
                    <span onClick={() => { handleVote(post._id, 2) }}>
                        X
                    </span> : <></> }
                </span>
            { user ? <button className={css.reactionCircle}
                disabled={votes.userDownvoted || !user}
                onClick={() => { handleVote(post._id, 0) }}>
                    <div>-</div>
            </button> : <div></div> }
            </div> 
        }
        </div>)
}