import React from "react";
import css from './ProfileSection.module.css';
import { useDispatch, useSelector } from "react-redux";
import { UilPlusCircle } from '@iconscout/react-unicons'
import { logOut } from "../../actions/authAction";
import { ThreadSection } from "../ThreadSection/ThreadSection";

export const ProfileSection = () => {

    const user = useSelector((state) => state.authReducer.authData.user);
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    const img = require('../../public/defaultCover.jpg');

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logOut());
    }

    return (
        <div className={css.container}>
            
            <div className={css.btnWrapper}>
                <div className={`btn ${css.btn}`} onClick={() => handleLogout()}>
                    <div className={css.circle}><UilPlusCircle/></div>
                    Wyloguj sie
                </div>
            </div>
                <div className={css.cover}>
                    <div className={css.bottomBar}></div>
                    <img className={css.profilePic} src={ user.profilePicture ? serverPublic + user.profilePicture : require('../../public/defaultProfile.png')} alt="" />
                    <img className={css.profileCover} src={ user.profileCover ? serverPublic + user.profileCover : ''} alt="" />
                    <div className={css.username}>
                        <span>{user.username}</span>
                        <span>{user.rank}</span>
                    </div>
                        
                </div>
            <div className={css.profile}>
                <span>Watki uzytkownika:</span>
                <ThreadSection location='profile' subId='Silnik'/>
            </div>
        </div>
    )
}