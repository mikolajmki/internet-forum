import React, { useState } from "react";
import css from './Header.module.css';
import { UilBars } from '@iconscout/react-unicons';
import { categories } from "../../data/categories";
import { Link } from "react-router-dom";

export const Header = () => {

    const [menuOpened, setMenuOpened] = useState(false);


    const menuHandler = (menuOpened) => {
        if (document.documentElement.clientWidth <= 768) {
            return menuOpened ? { opacity: "100", display: "block" } : {};
        }
    }

    return (
        <div className={css.container}>

            <div className={css.name}>
                <span>Baw<span>aria.pl</span> </span>
            </div>
            <div className={css.menuButton} onClick={() => setMenuOpened((prev) => !prev)}>
                <UilBars/>
            </div>
            <div className={css.menu} style={ menuHandler(menuOpened) }>
                <ul className={css.list}>
                { categories.map((category, i) => {
                    return (
                        <li><a href={"#" + category.name}>{category.name}</a></li>
                    )
                }) }
                </ul>
            </div>
        </div>
    )
}