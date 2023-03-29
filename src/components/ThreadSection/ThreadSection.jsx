import React from "react";
import css from './ThreadSection.module.css';
import { threads } from "../../data/threads";
import { useParams, Link } from "react-router-dom";

export const ThreadSection = ({ subId }) => {

    const params = useParams();

    return (
        <div className={css.container}>
            <div className={css.threads}>
                { threads[subId].map((thread, i) => {
                        return (
                            <Link to={`/${params.catId}/${params.subId}/${thread.id}`} style={{ color: "white", textDecoration: "none" }}>
                                <div key={i} className={css.thread}>
                                    <div className={css.dot}></div>
                                    <div className={css.info}>
                                        <span>{thread.name}</span>
                                        <span>{thread.description}</span>
                                    </div>
                                </div>
                            </Link>
                        )
                }) }
            </div>
        </div>
    )
}