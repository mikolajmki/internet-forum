import React, { useEffect, useState } from "react";
import css from './Header.module.css';
import { UilBars } from '@iconscout/react-unicons';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logIn } from "../../actions/authAction";
import profPic from '../../public/defaultProfile.png';
import { UilBell } from '@iconscout/react-unicons';
import { UilEnvelope } from '@iconscout/react-unicons';
import { UilCommentAltMessage } from '@iconscout/react-unicons'
import { NotificationIcon } from "../NotificationIcon/NotificationIcon";
import { getNotificationsOfAuthUser } from "../../actions/notificationAction";
import { Error } from "../Error/Error";

export const Header = ({ location }) => {

    const { categories } = useSelector((state) => state.forumReducer);

    // const categories = ["Mechanika", "Wnetrze", "Mechanika", "Wnetrze", "Mechanika", "Wnetrze", "Mechanika", "Wnetrze", "Mechanika", "Wnetrze", "Mechanika", "Wnetrze", "Mechanika", "Wnetrze"]
    
    const { user, token } = useSelector((state) => state.authReducer.authData);
    // const { error: err, notifications, message: msg } = useSelector((state) => state.authReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const serverPublic = process.env.REACT_APP_SERVER_PUBLIC_FOLDER;

    var doit;

    const [ menuOpened, setMenuOpened ] = useState(false);
    const [ modalOpened, setModalOpened ] = useState({ notifications: false, messages: false });
    const [ profilePicture, setProfilePicture ] = useState("");


    useEffect(() => {
        if (user) {
            user.profilePicture ? setProfilePicture(serverPublic + "users/" + user.username + "/" + user.profilePicture) : setProfilePicture(require('../../public/defaultProfile.png'));
        }
    }, [user])

    useEffect(() => {
        if (user) {
            dispatch(getNotificationsOfAuthUser(token));
        }
    }, [params])

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

    const handleLogIn = () => {
        dispatch(logIn());
        console.log()
    }

    const menuHandler = (menuOpened) => {
        if (document.documentElement.clientWidth <= 830) {
            return menuOpened ? { display: "flex" } : {  }
        }
    }

    const loggedUserRender = () => {
        return (
            <>
                <li></li>
                <li></li>
                { user == null ? (
                <li className={css.link} style={{ cursor: 'pointer' }} onClick={() => navigate("/auth")}>
                    <span>Zaloguj sie</span>
                </li> 
        ) : (

            <>
                <li>
                    <div className={css.menuIcons}>
                        <NotificationIcon modalOpened={modalOpened} setModalOpened={setModalOpened} type={0}/>
                        <NotificationIcon modalOpened={modalOpened} setModalOpened={setModalOpened} type={1}/>
                        { menuOpened ? 
                        <>
                        <div className={css.icon} onClick={() => {navigate(`/profile/${user._id}`)}}>
                            <img className={css.profilePic} src={profilePicture} alt="" />
                        </div>
                        </> : ''}
                    </div>
                    { menuOpened ? 
                    <div className={css.loggedAs}>
                        <span>Zalogowano jako <span>{ user.username }</span></span>
                    </div> : ''}
                </li>

                { menuOpened ? '' : 
                <li className={css.profileButton}>
                    <Link className={css.link} to={`/profile/${user._id}`}>
                        <div className={css.profileButton}>
                            <img className={css.profilePic} src={profilePicture} alt="" />
                            <span>{user.username}</span>
                        </div>
                    </Link> 
                </li>}
            </>
        ) }
            </>
        ) 
    }

    return (
        <div className={css.container}>

            <Link to={"/"} className={css.name}>
                <span>Baw<span>aria.pl</span> </span>
            </Link>


            {/* { error || message ? 
            <div className={` ${css.error}`}>
                <div className="error">
                    <span style={ message ? { color: "green" } : {}}>{error ? error : message}</span>
                </div>
            </div> : <></> } */}

            <Error/>

            <div className={css.menuButton} onClick={() => setMenuOpened((prev) => !prev)}>
                <UilBars/>
            </div>
            <div className={css.menu} style={ menuHandler(menuOpened) }>
                <ul className={css.list}>

                    { menuOpened ? loggedUserRender() : '' }

                    { categories.map((title, i) => {
                            return location === "home" ?  (
                                <li key={i}><a href={title}>{title}</a></li>
                            ) : (
                                <li key={i}><Link className={css.link} to={`/#${title}`}><a>{title}</a></Link></li>
                                )
                    })}

                    <li className={css.spacer}></li>

                </ul>

            </div>
            <div>
                <ul className={css.list}>
                    { menuOpened ? '' : loggedUserRender() }
                </ul>
            </div>
        </div>
    )
}