import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getThreadWithPostsById } from '../../actions/threadAction';
import { deleteForum } from '../../api/forumRequest';
import { UilCommentAltMessage, UilTrashAlt } from '@iconscout/react-unicons'
import css from "./ForumItem.module.css";


export const ForumItem = ({ forum, category, error, setError }) => {

    
    const serverPublic = process.env.REACT_APP_SERVER_PUBLIC_FOLDER;
    const user = forum.latestThreadId ? forum.latestThreadId.author : {};
    const latestThreadProfilePicture = user.profilePicture ? serverPublic + "users/" + user.username + "/" + user.profilePicture : require('../../public/defaultProfile.png');
    
    const { user: loggedInUser, token } = useSelector((state) => state.authReducer.authData);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
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

            if (err.response.status === 401) {
                dispatch({ type: "JWT_FAIL", data: err.response.data.message });
            } else {            
                setError(err.response.data.message);
            }

            setTimeout( () => {
                setError(null)
            } , 5000)
        }
    }

    return (
        <div className={css.forum}>
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
                    <img className={css.profilePic} src={latestThreadProfilePicture} alt="" />
                    <div>
                        <span className="textlink" onClick={() => navigate(`/profile/${forum.latestThreadId.author._id}`)}>
                            {forum.latestThreadId.author.username}
                        </span>
                        <span className="textlink" onClick={() => handleGetThreadWithPostsById(forum.latestThreadId._id)}>
                            {forum.latestThreadId.title}
                        </span>
                    </div>
                </div> : <></>}
                { loggedInUser && loggedInUser.isModerator ?
                <div className={css.btn}><span className="btnRed" onClick={() => { handleDeleteForum(forum._id) }}><UilTrashAlt/></span></div> : <></> }
            </div>
        </div>
        )
}