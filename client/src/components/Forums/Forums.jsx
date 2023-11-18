import React, { useEffect, useState } from "react";
import css from './Forums.module.css';

import { Link, useNavigate } from "react-router-dom";
import { UilCommentAltMessage } from '@iconscout/react-unicons'
import { useDispatch } from "react-redux";
import { getThreadWithPostsById, getThreadsByForumId } from "../../actions/threadAction";

export const Forums = ({ category, opened }) => {

    const navigate = useNavigate();

    const forums = category.forums;
    console.log(forums)

    const dispatch = useDispatch();
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    
    const handleGetThreadWithPostsById = (threadId) => {
        dispatch(getThreadWithPostsById(threadId));
        navigate(`/thread/${threadId}`);
    }

    // useEffect(() => {
    //     console.log(opened);
    // }, [opened]);

    // <img className={css.profilePic} src={ user.profilePicture ? serverPublic + user.profilePicture : require('../../public/defaultProfile.png')} alt="" />
    
    return (
        <div>
            { opened ? 
            <div className={css.subs}>
                { forums.map((forum, i) => {
                    return (
                    <div className={css.forum} key={i}>
                        <div>
                            <UilCommentAltMessage/>
                        </div>
                        <Link to={`/forum/${forum._id}`} style={{ color: "white", textDecoration: "none" } } 
                        // onClick={() => handleGetThreadsByForumId(forum._id)}
                        >
                            <div className={css.info}>
                                <span className={css.name}>{forum.name}</span>
                                <span className={css.description}>{forum.description}</span>
                            </div>
                        </Link>
                        { forum.latestThreadId ? 
                        <div className={css.latestThread}>
                            <div><div className="numberBadge"><div>{forum.answers}</div></div> Odpowiedzi</div>
                            <div className={css.brief}>
                                <img className={css.profilePic} src={ forum.latestThreadId.author.profilePicture ? serverPublic + forum.latestThreadId.author.profilePicture : require('../../public/defaultProfile.png')} alt="" />
                                <div>
                                    <span className="textlink" onClick={() => {navigate(`/profile/${forum.latestThreadId.author._id}`)}}>
                                        {forum.latestThreadId.author.username}
                                    </span>
                                    <span className="textlink" onClick={() => handleGetThreadWithPostsById(forum.latestThreadId._id)}>
                                        {forum.latestThreadId.title}
                                    </span>
                                </div>
                            </div>
                            <span></span>
                        </div> : <></> }
                    </div>
                    )
                })}
            </div> : "" }
        </div>
    )
}