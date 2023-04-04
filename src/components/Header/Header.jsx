import React, { useState } from "react";
import css from './Header.module.css';
import { UilBars } from '@iconscout/react-unicons';
import { categories } from "../../data/categories";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logIn } from "../../actions/authAction";
import profPic from '../../public/defaultProfile.png'

export const Header = ({ location }) => {

    const [menuOpened, setMenuOpened] = useState(false);

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authReducer.authData);
    const serverPublic = '../../public/'

    const handleLogIn = () => {
        dispatch(logIn());
    }

    console.log(serverPublic)

    const menuHandler = (menuOpened) => {
        if (document.documentElement.clientWidth <= 768) {
            return menuOpened ? { display: "flex" } : {  }
        }
    }

    return (
        <div className={css.container}>

            <Link to={"/"} className={css.name}>
                <span>Baw<span>aria.pl</span> </span>
            </Link>

            <div className={css.menuButton} onClick={() => setMenuOpened((prev) => !prev)}>
                <UilBars/>
            </div>
            <div className={css.menu} style={ menuHandler(menuOpened) }>
                <ul className={css.list}>

                    { menuOpened ?
                            <Link to={`/profile/${user.userId}`}>
                                <div className={css.profileButton}>
                                    <img className={css.profilePic} src={ user.profilePicture ? serverPublic + user.profilePicture : require('../../public/defaultProfile.png')} alt="" />
                                    <li>Zalogowano jako <span>{ user.username }</span></li>
                                </div>
                            </Link> : '' }

                    { categories.map((category, i) => {
                            return location === "home" ?  (
                                <li key={i}><a href={"#" + category.name}>{category.name}</a></li>
                            ) : (
                                <Link className={css.link} to={`/#${category.name}`}><li key={i}><a>{category.name}</a></li></Link>
                            )
                    }) }

                    <div className={css.spacer}></div>

                    { localStorage.getItem("profile") == null ? 
                            <div style={{ cursor: 'pointer' }} onClick={handleLogIn}>
                                <li>Zaloguj sie</li>
                            </div> 
                            :
                            <Link className={css.link} to={`/profile/${user.userId}`}>
                                <div className={css.profileButton}>
                                    <img className={css.profilePic} src={ user.profilePicture ? serverPublic + user.profilePicture : require('../../public/defaultProfile.png')} alt="" />
                                    <li>{ user.username }</li>
                                </div>
                            </Link> }

                </ul>
            </div>
        </div>
    )
}