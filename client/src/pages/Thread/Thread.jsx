import React, { useEffect } from "react";
import { Header } from "../../components/Header/Header";
import { Posts } from "../../components/Posts/Posts";
import css from './Thread.module.css';
import { useDispatch, useSelector } from "react-redux";
import { ThreadSection } from "../../components/ThreadSection/ThreadSection";
import { getThreadWithPostsById } from "../../actions/threadAction";
import { useParams } from "react-router-dom";

export const Thread = () => {

    const { thread, loading } = useSelector((state) => state.forumReducer);

    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(getThreadWithPostsById(params.threadId))
    }, [])

    return (
        <>
            <Header/>
            { loading ? <span className="loader"></span> : <ThreadSection thread={thread}/> }
        </>
    )
}