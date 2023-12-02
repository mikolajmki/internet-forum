import React, { useEffect, useState } from "react";
import css from './Forums.module.css';

import { Link, useNavigate } from "react-router-dom";
import { UilCommentAltMessage, UilTrashAlt } from '@iconscout/react-unicons'
import { useDispatch, useSelector } from "react-redux";
import { getThreadWithPostsById, getThreadsByForumId } from "../../actions/threadAction";
import { deleteForum } from "../../api/forumRequest";
import { getCategoriesWithForums } from "../../api/categoryRequest";

export const Forums = ({ category, opened, setContent }) => {

    const [ error, setError ] = useState(null);

    const navigate = useNavigate();

    const forums = category.forums;
    console.log(forums)

    const { user, token } = useSelector((state) => state.authReducer.authData);
    const dispatch = useDispatch();
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    
    const handleGetThreadWithPostsById = (threadId) => {
        dispatch(getThreadWithPostsById(threadId));
        navigate(`/thread/${threadId}`);
    }

    const handleDeleteForum = async (forumId) =>  {
        try {
            const { status } = await deleteForum({ categoryId: category._id, forumId, token });
            if (status === 200) {
                window.location.reload();
            }
        } catch (err) {
            console.log(err.response.data.message)
            
            setError(err.response.data.message);

            setTimeout( () => {
                setError(null)
            } , 5000)
        }
    }

    // useEffect(() => {
    //     console.log(opened);
    // }, [opened]);

    // <img className={css.profilePic} src={ user.profilePicture ? serverPublic + user.profilePicture : require('../../public/defaultProfile.png')} alt="" />
    
    return (
        <div style={{ marginBottom: "3rem" }}>
            { opened ? 
            <div className={css.subs}>
                { forums.length > 0 ? forums.map((forum, i) => {
                    return (
                    <div className={css.forum} key={i}>
                        <div className={css.details}>
                            <div>
                                <UilCommentAltMessage/>
                            </div>
                            <div className={css.info} onClick={() => {navigate(`/forum/${forum._id}`)}}>
                                <span className={css.name}>{forum.name}</span>
                                <span className={css.description}>{forum.description}</span>
                            </div>
                        </div>
                        <div className={css.stats}>
                            <div><div className="numberBadge"><div>{forum.answers}</div></div> Odpowiedzi</div>
                            { forum.latestThreadId ? <div className={css.brief}>
                                <img className={css.profilePic} src={ forum.latestThreadId.author.profilePicture ? serverPublic + forum.latestThreadId.author.profilePicture : require('../../public/defaultProfile.png')} alt="" />
                                <div>
                                    <span className="textlink" onClick={() => {navigate(`/profile/${forum.latestThreadId.author._id}`)}}>
                                        {forum.latestThreadId.author.username}
                                    </span>
                                    <span className="textlink" onClick={() => handleGetThreadWithPostsById(forum.latestThreadId._id)}>
                                        {forum.latestThreadId.title}
                                    </span>
                                </div>
                            </div> : <></>}
                            { user && user.isModerator ?
                            <div className={css.btn}><span className="btnRed" onClick={() => { handleDeleteForum(forum._id) }}><UilTrashAlt/></span></div> : <></> }
                        </div>
                    </div>
                    )
                }) : <h4 style={{ paddingLeft: "1rem" }}>Nie ma jeszcze forow w tej kategorii.</h4> }
            { error ? 
            <div className="error">
                <span>{error}</span>
            </div> : <></> }
            </div> : "" }
        </div>
    )
}