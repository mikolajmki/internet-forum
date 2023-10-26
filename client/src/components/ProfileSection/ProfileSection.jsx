import React, { useEffect, useState } from "react";
import css from './ProfileSection.module.css';
import { useDispatch, useSelector } from "react-redux";
import { UilPlusCircle } from '@iconscout/react-unicons'
import { logOut } from "../../actions/authAction";
import { Threads } from "../Threads/Threads.jsx";
import { getThreadsByAuthorId } from "../../actions/threadAction";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../../actions/userAction";

export const ProfileSection = () => {

    const loggedInUser = useSelector((state) => state.authReducer.authData.user);
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    const img = require('../../public/defaultCover.jpg');

    const { threads, loading } = useSelector((state) => state.forumReducer);
    const { visitedUser } = useSelector((state) => state.forumReducer);

    const [ user, setUser ] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const handleLogout = () => {
        dispatch(logOut());
        navigate("/")
    }

    useEffect(() => {
        if (user != null) {
            console.log(user._id)
            dispatch(getThreadsByAuthorId(user._id))
        }
        console.log(threads)
    }, [user]);

    useEffect(() => {
        setUser(null)
        if (loggedInUser !== null) {
            if (params.userId !== loggedInUser._id) {
                dispatch(getUserById(params.userId));
            }
        } else {
            dispatch(getUserById(params.userId));
        } 
    }, [])

    useEffect(() => {
        if (!loggedInUser) {
            setUser(visitedUser);
        } else if (loggedInUser._id === params.userId) {
            setUser(loggedInUser);
        } else if (loggedInUser._id !== params.userId) {
            setUser(visitedUser);
        }
    }, [visitedUser, loggedInUser]);

    return (
        <div className={css.container}>
            { user && threads[0].author === user._id && user._id === params.userId ?
            <>
                <div className={css.btnWrapper}>
                    { loggedInUser && params.userId === loggedInUser._id ? 
                    <div className={`btn ${css.btn}`} onClick={() => handleLogout()}>
                        <div className={css.circle}><UilPlusCircle/></div>
                        Wyloguj sie
                    </div> : <></> }
                </div>
                    <div className={css.cover}>
                        <div className={css.bottomBar}>
                            <div className={css.details}>
                                <span>{user.signature}</span>
                                <span>Reputacja: <div className="numberBadge"><div>{user.reputation}</div></div></span>
                                <span>Odpowiedzi: <div className="numberBadge"><div>{user.answers}</div></div></span>
                                <span>Adres e-mail: <a href={`mailto:${user.email}`} className={`numberBadge ${css.email}`}>{user.email}</a></span>
                            </div>
                        </div>
                        <img className={css.profilePic} src={ user.profilePicture ? serverPublic + user.profilePicture : require('../../public/defaultProfile.png')} alt="" />
                        <img className={css.profileCover} src={ user.profileCover ? serverPublic + user.profileCover : ''} alt="" />
                        <div className={css.username}>
                            <span>{user.username}</span>
                            <span>{user.rank}</span>
                        </div>
                            
                    </div>
                <div className={css.profile}>
                    <span>Watki uzytkownika:</span>
                    <Threads threads={threads} location='profile'/>
                </div>
            </> : <span className="loader"></span> }
        </div>
    )
}