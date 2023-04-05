import React from "react";
import css from './ThreadSection.module.css';
import { threads } from "../../data/threads";
import { useParams, Link } from "react-router-dom";

export const ThreadSection = ({ subId, location }) => {

    const params = useParams();

    return (
        <div className={css.container}>
            <div className={css.threads} style={ location === 'profile' ? { boxShadow: 'none', border: 'none' } : {} }>
                { threads[subId].map((thread, i) => {
                        return (
                            <Link to={`/${params.catId}/${params.subId}/${thread.id}`} style={{ color: "white", textDecoration: "none" }}>
                                <div key={i} className={css.thread}>
                                    <div className={css.dot}></div>
                                    <div className={css.info}>
                                        <span>{thread.title}</span>
                                        <span>dodany przez {thread.author} dnia {thread.date}</span>
                                    </div>
                                </div>
                            </Link>
                        )
                }) }
            </div>
        </div>
    )
}