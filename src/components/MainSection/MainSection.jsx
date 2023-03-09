import React from "react";
import { Section } from "../Section/Section";
import css from './MainSection.module.css';
import { categories } from "../../data/categories";

export const MainSection = () => {
    return (
        <div className={css.container}>
            { categories.map((category, i) => {
                return (
                    <Section category={category} key={i}/>
                )
            }) }
        </div>
    )
}