import React from "react";
import css from './Header.module.css';

export const Header = () => {
    return (
        <div className={css.container}>

            <div className={css.name}>
                <span>Baw<span>aria.pl</span> </span>
            </div>
            <ul className={css.list}>
                <li>Mechanika</li>
                <li>Kategoria 2</li>
                <li>Kategoria 3</li>
                <li>Kategoria 4</li>
                <li>Kategoria 5</li>
            </ul>
        </div>
    )
}