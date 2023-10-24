import React, { useEffect, useState } from "react";
import css from './Forums.module.css';

import { Link } from "react-router-dom";
import { UilCommentAltMessage } from '@iconscout/react-unicons'
import { useDispatch } from "react-redux";
import { getThreadsByForumId } from "../../actions/threadAction";

export const Forums = ({ category, opened }) => {



    const forums = category.forums;
    console.log(forums)

    const dispatch = useDispatch();

    const handleGetThreadsByForumId = (forumId) => {
        dispatch(getThreadsByForumId(forumId));
    }

    // useEffect(() => {
    //     console.log(opened);
    // }, [opened]);
    
    return (
        <div>
            { opened ? 
            <div className={css.subs}>
                { forums.map((forum, i) => {
                    return (
                    <div className={css.subcategory} key={i}>
                        <div>
                            <UilCommentAltMessage/>
                        </div>
                        <Link to={`/${forum.name}`} style={{ color: "white", textDecoration: "none" } } 
                        onClick={() => handleGetThreadsByForumId(forum._id)}
                        >
                            <div className={css.info}>
                                <span className={css.name}>{forum.name}</span>
                                <span className={css.description}>{forum.description}</span>
                            </div>
                        </Link>
                    </div>
                    )
                })}
            </div> : "" }
        </div>
    )
}