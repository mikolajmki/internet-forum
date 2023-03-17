import React from "react";
import css from './ThreadSection.module.css';
import { threads } from "../../data/threads";

export const ThreadSection = ({ subId }) => {
    return (
        <div className={css.container}>
            <div className={css.threads}>
                { threads[subId].map((thread, i) => {
                        return (
                            <div key={i} className={css.thread}>
                                <div className={css.dot}></div>
                                <div className={css.info}>
                                    <span>{thread.name}</span>
                                    <span>{thread.description}</span>
                                </div>

                            </div>
                        )
                }) }
            </div>
        </div>
    )
}