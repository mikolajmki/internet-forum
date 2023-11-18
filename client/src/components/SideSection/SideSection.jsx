import React, { useEffect, useState } from "react";
import css from './SideSection.module.css';
import { ThreadSection } from "../ThreadSection/ThreadSection";
import { Threads } from "../Threads/Threads";
import { useSelector } from "react-redux";
import { Posts } from "../Posts/Posts";
import { getThreadsByLimit } from "../../api/threadRequest";
import { getPostsByLimit } from "../../api/postRequest";

export const SideSection = ({ location, content }) => {

    return (
        <div className={css.wrapper}>
            <div className={css.container}>
                <h1 className={css.title} >{ location === "home" ? "Najnowsze wątki" : "Najnowsze odpowiedzi" }</h1>
                { location === "home" ? <Threads threads={content} location={"home"} /> : <Posts posts={content} location={"forums"}/>}
            </div>
        </div>
    )
}