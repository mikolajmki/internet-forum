import React, { createRef, useEffect, useState } from "react";
import css from '../ThreadSection/ThreadSection.module.css';
import { PostItem } from "../PostItem/PostItem";
import { UilMultiply } from "@iconscout/react-unicons";
import { useSelector } from "react-redux";

export const Posts = ({ posts, location, setImage }) => {
    
    const serverPublic = process.env.REACT_APP_SERVER_PUBLIC_FOLDER;

    // const [likes, setLikes] = useState({});


    // const handleLike = (postId, like) => {
    //     setLikes({ ...likes, [postId]: like })
    // }

    return (
            <div className={css.container} style={ location === "forums" ? { gap: "0.5rem", paddingTop: "1rem"} : { padding: "0" } }>
                { posts.map((post, i) => 
                    <PostItem key={i} post={post} setImage={setImage} location={location}/>
            ) }
            </div>
    )
}