import React, { useState } from "react";
import { Header } from "../../components/Header/Header";
import css from './Forum.module.css';
import { ForumSection } from "../../components/ForumSection/ForumSection";
import { SideSection } from "../../components/SideSection/SideSection";
import { useDispatch, useSelector } from "react-redux";
import { getThreadsByForumId, getThreadsByForumIdSortedByParam } from "../../actions/threadAction";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getPostsByLimit } from "../../dummyservice/postService";
import { getForumById } from "../../dummyservice/forumService";

export const Forum = () => {

    const params = useParams();
    const dispatch = useDispatch();

    const [ forum, setForum ] = useState(null);
    const [ posts, setPosts ] = useState(null);

    // const handleGetContent = async () => {
    //     if (location === "home") {
    //         const { data } = await getThreadsByLimit(2);
    //         setContent(data)
    //     } else {
    //         const { data } = await getPostsByLimit(10);
    //         setContent(data)
    //     }
    // };

    const handleGetPosts = async () => {
        const { data } = getPostsByLimit(5);
        console.log(data)
        setPosts(data);
    };

    const handleGetForumById = async (forumId) => {
        console.log("forumId", forumId.$oid)
        const { data } = getForumById(forumId);
        setForum(data);
    }

    useEffect(() => {
        // dispatch(getThreadsByForumIdSortedByParam(params.forumId, "-createdAt"));
        handleGetForumById(params.forumId);
        handleGetPosts();
    }, [])

    return (
        <>
            <Header/>
            { forum && posts ? 

            <div className={css.container}>
                <ForumSection forum={forum}/>
                <SideSection content={posts}/>
            </div>
            
            : <span className="loader"></span> }
        </>
    )
}