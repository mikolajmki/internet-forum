import React from "react";
import { Header } from "../../components/Header/Header";
import css from './Forum.module.css';
import { ForumSection } from "../../components/ForumSection/ForumSection";
import { SideSection } from "../../components/SideSection/SideSection";
import { useParams } from "react-router-dom";

export const Forum = () => {
    return (
        <>
            <Header/>
            <div className={css.container}>
                <ForumSection/>
                <SideSection/>
            </div>
        </>
    )
}