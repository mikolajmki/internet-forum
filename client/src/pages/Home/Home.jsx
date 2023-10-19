import React from "react";
import { Header } from "../../components/Header/Header";
import { Section } from "../../components/CategorySection/CategorySection";
import css from './Home.module.css';
import { HomeSection } from "../../components/HomeSection/HomeSection";
import { SideSection } from "../../components/SideSection/SideSection";

export const Home = () => {
    return (
        <>
        <Header/>
        <div className={css.container}>
            <HomeSection/>
            <SideSection/>
        </div>
        </>
    )
}