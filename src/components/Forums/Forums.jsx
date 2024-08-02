import React, { useEffect, useState } from "react";
import css from './Forums.module.css';

import { Link, useNavigate } from "react-router-dom";
import { UilCommentAltMessage, UilTrashAlt } from '@iconscout/react-unicons'
import { useDispatch, useSelector } from "react-redux";
import { getThreadWithPostsById, getThreadsByForumId } from "../../actions/threadAction";
import { deleteForum } from "../../api/forumRequest";
import { getCategoriesWithForums } from "../../api/categoryRequest";
import { ForumItem } from "../ForumItem/ForumItem";

export const Forums = ({ category, opened, setContent }) => {

    const [ error, setError ] = useState(null);

    const forums = category.forums;

    // useEffect(() => {
    //     console.log(opened);
    // }, [opened]);

    // <img className={css.profilePic} src={ user.profilePicture ? serverPublic + user.profilePicture : require('../../public/defaultProfile.png')} alt="" />
    
    return (
        <div style={{ marginBottom: "3rem" }}>
            { opened ? 
            <div className={css.forums}>
                { forums.length > 0 ? forums.map((forum, i) => <ForumItem key={i} forum={forum} category={category} error={error} setError={setError}/>) : <h4 style={{ paddingLeft: "1rem" }}>Nie ma jeszcze forow w tej kategorii.</h4> }
            { error ? 
            <div className="error">
                <span>{error}</span>
            </div> : <></> }
            </div> : "" }
        </div>
    )
}