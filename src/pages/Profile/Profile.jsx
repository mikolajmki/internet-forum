import React from "react";
import css from './Profile.module.css';
import { Header } from "../../components/Header/Header";

export const Profile = () => {
    return (
        <>
        <Header/>
        <div className={css.container}>Profile</div>
        </>
    )
}