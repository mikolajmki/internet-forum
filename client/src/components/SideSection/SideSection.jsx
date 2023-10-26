import React, { useEffect } from "react";
import css from './SideSection.module.css';
import { ThreadSection } from "../ThreadSection/ThreadSection";
import { Threads } from "../Threads/Threads";
import { useSelector } from "react-redux";
import { Posts } from "../Posts/Posts";

export const SideSection = ({ location }) => {

    const { threads, loading, posts } = useSelector((state) => state.forumReducer);

    return (
        <div className={css.wrapper}>
            <div className={css.container}>
                <h1 className={css.title} >{ location === "home" ? "Najnowsze wątki" : "Najnowsze odpowiedzi" }</h1>
                { loading ? <></> : location === "home" ? <Threads threads={threads} location={"home"} /> : <Posts posts={posts} location={"forums"}/> }
            </div>
        </div>
    )
}