import React from "react";
import { Header } from "../../components/Header/Header";
import { Posts } from "../../components/Posts/Posts";
import css from './Thread.module.css';
import { useSelector } from "react-redux";
import { ThreadSection } from "../../components/ThreadSection/ThreadSection";

export const Thread = () => {

    const { thread, loading } = useSelector((state) => state.forumReducer);

    return (
        <>
            <Header/>
            { loading ? <span className="loader"></span> : <ThreadSection thread={thread}/> }
        </>
    )
}