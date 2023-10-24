import React, { useState } from "react";
import css from './Header.module.css';
import { UilBars } from '@iconscout/react-unicons';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logIn } from "../../actions/authAction";
import profPic from '../../public/defaultProfile.png';
import { UilBell } from '@iconscout/react-unicons';
import { UilEnvelope } from '@iconscout/react-unicons';
import { UilCommentAltMessage } from '@iconscout/react-unicons'
import { NotificationIcon } from "../NotificationIcon/NotificationIcon";

export const Header = ({ location }) => {

    const { categoriesWithForums } = useSelector((state) => state.forumReducer);

    const navigate = useNavigate();

    var doit;

    const [menuOpened, setMenuOpened] = useState(false);
    const [modalOpened, setModalOpened] = useState({ notifications: false, messages: false });

        window.onresize = () => {
        clearTimeout(doit);
        doit = setTimeout(() => {
            if (menuOpened) {
                setMenuOpened(false);
            }
            if (modalOpened != {}) {
                setModalOpened({});
            }
        }, 200)
    }


    const dispatch = useDispatch();

    const user = useSelector((state) => state.authReducer.authData.user)

    const serverPublic = '../../public/';

    const handleLogIn = () => {
        dispatch(logIn());
        console.log()
    }

    console.log(serverPublic)

    const menuHandler = (menuOpened) => {
        if (document.documentElement.clientWidth <= 830) {
            return menuOpened ? { display: "flex" } : {  }
        }
    }

    const loggedUserRender = () => {
        return user == null ? (
                <li className={css.link} style={{ cursor: 'pointer' }} onClick={() => navigate("/auth")}>
                    <span>Zaloguj sie</span>
                </li> 
        ) : (

            <>
            { user != null ? 
            <li>
                <div className={css.menuIcons}>
                    <NotificationIcon modalOpened={modalOpened} setModalOpened={setModalOpened} type={0}/>
                    <NotificationIcon modalOpened={modalOpened} setModalOpened={setModalOpened} type={1}/>
                    { menuOpened ? 
                    <>
                    <div className={css.icon}>
                        <img className={css.profilePic} src={ user.profilePicture ? serverPublic + user.profilePicture : require('../../public/defaultProfile.png')} alt="" />
                    </div>
                    </> : ''}
                </div>
                { menuOpened ? 
                <div className={css.loggedAs}>
                    <span>Zalogowano jako <span>{ user.username }</span></span>
                </div> : ''}
            </li> : ''}

            { menuOpened ? '' : 
            <li className={css.profileButton}>
                <Link className={css.link} to={`/profile/${user._id}`}>
                    <div className={css.profileButton}>
                        <img className={css.profilePic} src={ user.profilePicture ? serverPublic + user.profilePicture : require('../../public/defaultProfile.png')} alt="" />
                        <span>{user.username}</span>
                    </div>
                </Link> 
            </li>}
            </>
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

                    { categoriesWithForums.map((category, i) => {
                        console.log(category)
                            return location === "home" ?  (
                                <li key={i}><a href={category.title}>{category.title}</a></li>
                            ) : (
                                <li key={i}><Link className={css.link} to={`/#${category.title}`}><a>{category.title}</a></Link></li>
                                )
                    })}

                    <li className={css.spacer}></li>

                    { menuOpened ? '' : loggedUserRender() }

                </ul>
            </div>
        </div>
    )
}