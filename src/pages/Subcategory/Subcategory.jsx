import React from "react";
import { Header } from "../../components/Header/Header";
import css from './Subcategory.module.css';
import { SubcategorySection } from "../../components/SubcategorySection/SubcategorySection";
import { SideSection } from "../../components/SideSection/SideSection";
import { useParams } from "react-router-dom";

export const Subcategory = () => {
    return (
        <>
            <Header/>
            <div className={css.container}>
                <SubcategorySection/>
                <SideSection/>
            </div>
        </>
    )
}