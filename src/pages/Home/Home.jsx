import React from "react";
import { Header } from "../../components/Header/Header";
import { Section } from "../../components/Section/Section";
import css from './Home.module.css';
import { MainSection } from "../../components/MainSection/MainSection";
import { SideSection } from "../../components/SideSection/SideSection";

export const Home = () => {
    return (
        <>
        <Header/>
        <div className={css.container}>
            <MainSection/>
            <SideSection/>
        </div>
        </>
    )
}