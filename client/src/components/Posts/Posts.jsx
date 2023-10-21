import React, { createRef, useEffect, useState } from "react";
import css from './Posts.module.css';
import { votePost } from "../../api/postRequest";
import { useRef } from "react";

export const Posts = ({ thread }) => {

    const [modal, setModal] = useState(false);
    // const [likes, setLikes] = useState({});

    const upRef = createRef()
    const downRef = createRef()

    const [votes, setVotes] = useState({});

    // const handleLike = (postId, like) => {
    //     setLikes({ ...likes, [postId]: like })
    // }

    const handleVote = async (postId, type) => {
        try {
            const result = await votePost(postId, "6531b00064798c0e0fa67881", type)
            setVotes({ ...votes, [postId]: result.data.voteBalance });
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const mappedVotes = {};
        thread.posts.map((post) => {
            mappedVotes[ post._id ] = post.upvotes.length - post.downvotes.length;
        });
        setVotes(mappedVotes);
    }, [])

    return (
            <div className={css.container}>
                { thread.posts.map((post, i) => {
                return (
                <div key={i} className={css.post}>
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
                <div className={css.reaction}>
                        {/* <span className={css.reactionCircle} onClick={() => {handleLike(post.id, post.likes + 1)}}><div>+</div></span>
                        <span className={css.reactionCircle}>{ post.upvotes.length - post.downvotes.length}</span>
                        <span className={css.reactionCircle} onClick={() => {handleLike(post.id, post.likes - 1)}}><div>-</div></span> */}
                        {console.log(post.upvotes.length - post.downvotes.length)}
                        <button className={css.reactionCircle} 
                            onClick={() => { handleVote(post._id, 1)}}>
                            <div>+</div>
                        </button>
                        <span className={css.reactionCircle}>{ votes[post._id] }</span>
                        <button className={css.reactionCircle}  
                            onClick={() => {handleVote(post._id, 0)}}>
                                <div>-</div>
                        </button>
                </div>
                </div>)
            }) }
            </div>
    )
}