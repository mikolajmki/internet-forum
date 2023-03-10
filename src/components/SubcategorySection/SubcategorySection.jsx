import React from "react";
import css from './SubcategorySection.module.css';
import { ThreadSection } from "../ThreadSection/ThreadSection";
import { useParams } from "react-router-dom";

export const SubcategorySection = () => {

    const params = useParams();
    return (
        <div className={css.wrapper}>
            <div className={css.title}>
                <h2>{params.subId}</h2>
            </div>
            <div className={css.container}>
                <ThreadSection subId={params.subId}/>
            </div>
        </div>
    )
}