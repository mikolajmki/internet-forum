import React, { createRef, useEffect, useState } from "react";
import css from './Posts.module.css';
import { useDispatch } from "react-redux";
import { PostItem } from "../PostItem/PostItem";

export const Posts = ({ posts, location }) => {

    const [modal, setModal] = useState(false);
    // const [likes, setLikes] = useState({});


    // const handleLike = (postId, like) => {
    //     setLikes({ ...likes, [postId]: like })
    // }

    const dispatch = useDispatch();

    const handleVote = async (postId, type) => {
        try {
            // const result = await votePost(postId, user.id, type)
            // setVotes({ ...votes, [postId]: result.data.voteBalance });
            // dispatch(votePost(postId, user.id, type));
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {

    }, [posts])

    return (
            <div className={css.container} style={ location === "forums" ? { gap: "0.5rem", paddingTop: "1rem"} : null  }>
                { posts.map((post) => 
                    <PostItem post={post} location={location}/>
            ) }
            </div>
    )
}