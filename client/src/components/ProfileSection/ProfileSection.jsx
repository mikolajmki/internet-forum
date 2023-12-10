import React, { useEffect, useState } from "react";
import css from './ProfileSection.module.css';
import { useDispatch, useSelector } from "react-redux";
import { UilPlusCircle, UilPen } from '@iconscout/react-unicons'
import { logOut } from "../../actions/authAction";
import { Threads } from "../Threads/Threads.jsx";
import { AdminModal } from '../AdminModal/AdminModal.jsx';
import { getThreadsByAuthorId } from "../../actions/threadAction";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../../actions/userAction";
import { UpdateModal } from "../UpdateModal/UpdateModal.jsx";
import { optimizeUser } from "../../helpers/optimize.js";

export const ProfileSection = () => {

    const { user: loggedInUser, token } = useSelector((state) => state.authReducer.authData);
    const img = require('../../public/defaultCover.jpg');
    const serverPublic = process.env.REACT_APP_SERVER_PUBLIC_FOLDER;
    
    const { threads, loading } = useSelector((state) => state.forumReducer);
    const { visitedUser } = useSelector((state) => state.forumReducer);
    
    const [ user, setUser ] = useState(null);
    const [ modal, setModal ] = useState(false);
    const [ updateModal, setUpdateModal ] = useState(false);
    const [ profilePicture, setProfilePicture ] = useState("");


    useEffect(() => {
        if (user) {
            user.profilePicture ? setProfilePicture(serverPublic + "users/" + user.username + "/" + user.profilePicture) : setProfilePicture(require('../../public/defaultProfile.png'));
        }
    }, [user])

    const adminId = process.env.REACT_APP_FORUM_ADMIN_ID;

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
            { user && threads && user._id === params.userId ?
            <>
                <div className={css.btnWrapper}>
                    { loggedInUser && loggedInUser._id === adminId ? 
                    <div className="btn" onClick={() => setModal(true)}>
                        <div className={css.circle}><UilPlusCircle/></div>
                        Zarzadzaj moderatorami
                    </div> : <></>  }
                    { loggedInUser && params.userId === loggedInUser._id ? 
                    <>
                    <div className="btn" onClick={() => setUpdateModal(true)}>
                        <div className={css.circle}><UilPen/></div>
                        Edytuj profil
                    </div>
                    <div className={`btn ${css.btn}`} onClick={() => handleLogout()}>
                        <div className={css.circle}><UilPlusCircle/></div>
                        Wyloguj sie
                    </div>
                    </> : <></> }
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
                        <img className={css.profilePic} src={profilePicture} alt="" />
                        <img className={css.profileCover} src={ user.profileCover ? serverPublic + user.profileCover : ''} alt="" />
                        <div className={css.username}>
                            <span>{user.username}</span>
                            <span>{user.rank}</span>
                        </div>
                            
                    </div>
                <div className={css.profile}>
                    <span>Watki uzytkownika:</span>
                    <Threads location="profile" threads={threads}/>
                </div>
            </> : <span className="loader"></span> }
            
            { loggedInUser ? <UpdateModal token={token} user={optimizeUser(loggedInUser)} type="profile" modal={updateModal} setModal={setUpdateModal} files={["image1", "image2", "image1", "image2"]}/> : <></> }
            <AdminModal token={token} adminId={adminId} modal={modal} setModal={setModal} type="moderator" />
        </div>
    )
}