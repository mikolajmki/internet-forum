import React, { useEffect } from "react";
import css from './Threads.module.css';
import { useParams, Link } from "react-router-dom";
import { getThreadWithPostsById } from "../../actions/threadAction";
import { useDispatch, useSelector } from "react-redux";


export const Threads = ({ threads, location }) => {

    const params = useParams();

    const dispatch = useDispatch();

    const handleGetThreadWithPostsById = (threadId) => {
        dispatch(getThreadWithPostsById(threadId));
    }


    return (
        <div className={css.container}>
            <div className={css.threads} style={ location === 'profile' ? { boxShadow: 'none', border: 'none' } : {} }>
            { threads.map((thread, i) => {
                        console.log(thread)
                        return (
                            <Link to={`/thread/${thread._id}`} style={{ color: "white", textDecoration: "none" }} 
                            onClick={() => handleGetThreadWithPostsById(thread._id)}
                            >
                                <div key={i} className={css.thread}>
                                    <div className={css.dot}></div>
                                    <div className={css.info}>
                                        <span>{thread.title}</span>
                                        <span>dodany przez {thread.author.username} dnia {thread.createdAt}</span>
                                    </div>
                                </div>
                            </Link>
                        )
                }) }
            </div>
        </div>
    )
}