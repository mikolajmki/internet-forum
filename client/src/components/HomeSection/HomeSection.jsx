import React, { useState } from "react";
import { Forums } from "../Forums/Forums.jsx";
import css from './HomeSection.module.css';
// import { categories } from "../../data/categories";
import { useDispatch, useSelector } from "react-redux";
import { UilArrowDown } from '@iconscout/react-unicons';

export const HomeSection = () => {

    const [opened, setOpened] = useState(true);

    const { categoriesWithForums, loading } = useSelector((state) => state.forumReducer);
    console.log(categoriesWithForums)

    return (
        <div className={css.container}>
            <h1 className={css.title} style={{ width: "90%", marginBottom: "3rem", background: "var(--bg2)" }}>Fora dyskusyjne</h1>
            { loading ? <div className="loader"></div> : categoriesWithForums.map((category, i) => {
                return (
                    <div className={css.forum}>
                        <div id={category.title} className={css.title}>
                                <span>{category.title}</span>
                                <span onClick={() => setOpened((prev) => !prev)} className={css.arrow} style={opened ? {} : { transform: "rotate(90deg)" } }><UilArrowDown/></span>
                        </div>
                        <Forums category={category} opened={opened} key={i}/>
                    </div>
                )
            }) }
        </div>
    )
}