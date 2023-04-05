import React, { useState } from "react";
import css from './Header.module.css';
import { UilBars } from '@iconscout/react-unicons';
import { categories } from "../../data/categories";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logIn } from "../../actions/authAction";
import profPic from '../../public/defaultProfile.png'

export const Header = ({ location }) => {

    window.onresize = () => {
        setMenuOpened(false);
    }

    const [menuOpened, setMenuOpened] = useState(false);
    const dispatch = useDispatch();

    const user = useSelector((state) => state.authReducer.authData.user)

    const serverPublic = '../../public/';

    const handleLogIn = () => {
        dispatch(logIn());
        console.log()
    }

    console.log(serverPublic)

    const menuHandler = (menuOpened) => {
        if (document.documentElement.clientWidth <= 768) {
            return menuOpened ? { display: "flex" } : {  }
        }
    }

    const loggedUserRender = () => {
        return user == null ? (
            <li style={{ cursor: 'pointer' }} onClick={handleLogIn}>
                <span>Zaloguj sie</span>
            </li> 
        ) : (
            <Link className={css.link} to={`/profile/${user.userId}`}>
                <li className={css.profileButton}>
                    <img className={css.profilePic} src={ user.profilePicture ? serverPublic + user.profilePicture : require('../../public/defaultProfile.png')} alt="" />
                    { menuOpened ? <span>Zalogowano jako <span>{ user.username }</span></span> : <span>{ user.username }</span>}
                </li>
            </Link> 
        )
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

                    { menuOpened ? loggedUserRender() : '' }

                    { categories.map((category, i) => {
                            return location === "home" ?  (
                                <li key={i}><a href={category.name}>{category.name}</a></li>
                            ) : (
                                <Link className={css.link} to={`/#${category.name}`}><li key={i}><a>{category.name}</a></li></Link>
                                )
                    })}

                    <div className={css.spacer}></div>

                    { loggedUserRender() }

                </ul>
            </div>
        </div>
    )
}