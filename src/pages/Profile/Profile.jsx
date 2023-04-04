import React from "react";
import css from './Profile.module.css';
import { Header } from "../../components/Header/Header";
import { ProfileSection } from "../../components/ProfileSection/ProfileSection";

export const Profile = () => {
    return (
        <>
        <Header/>
        <div className={css.container}>
            <ProfileSection/>
        </div>
        </>
    )
}