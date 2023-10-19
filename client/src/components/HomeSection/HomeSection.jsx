import React from "react";
import { CategorySection } from "../CategorySection/CategorySection";
import css from './HomeSection.module.css';
import { categories } from "../../data/categories";

export const HomeSection = () => {
    return (
        <div className={css.container}>
            { categories.map((category, i) => {
                return (
                    <CategorySection category={category} key={i}/>
                )
            }) }
        </div>
    )
}