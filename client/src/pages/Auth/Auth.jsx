import React, { useEffect, createRef } from "react";
import css from "./Auth.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../actions/authAction";
import { signUp } from "../../api/authRequest";
import { Link, useNavigate, useParams } from "react-router-dom";

export const Auth = () => {

    const [ formData, setFormData ] = useState({});
    const [ login, setLogin ] = useState(true);
    const [ pass, setPass ] = useState(false);

    const { user, error } = useSelector((state) => state.authReducer.authData);

    const navigate = useNavigate();
    
    const dispatch = useDispatch();
    console.log(formData)

    const handleAuth = () => {
        if (formData.username) {
            if (login) {
                dispatch(logIn(formData));
            } else {
                dispatch(signUp(formData));
            }
        }
    }

    useEffect(() => {
        console.log(user, error)
        if (user && !error) {
            navigate(-1);
        }
    }, [user, error])

    return (
        <div className={css.container}>
            <div className={css.credentials}>
                <div className={css.name} style={ !login ? { flex: 1 } : {}}>
                    <div style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
                        <span>Baw<span>aria.pl</span> </span>
                    </div>
                </div>
                <form onSubmit={(e) => e.preventDefault()} style={ !login ? { flex: 3 } : {}}>
                    <span>Nazwa użytkownika:</span>
                    <input id="username" onChange={(e) => setFormData({ ...formData, [e.currentTarget.id]: e.currentTarget.value })} type="text" />

                    { !login ? 
                    <>
                        <span>Imię:</span>
                        <input id="firstname" onChange={(e) => setFormData({ ...formData, [e.currentTarget.id]: e.currentTarget.value })} type="text" />
                        <span>Naziwsko:</span>
                        <input id="lastname" onChange={(e) => setFormData({ ...formData, [e.currentTarget.id]: e.currentTarget.value })} type="text" />
                        <span>E-mail:</span>
                        <input id="email" onChange={(e) => setFormData({ ...formData, [e.currentTarget.id]: e.currentTarget.value })} type="email" />
                        <span>Sygnatura:</span>
                        <textarea id="signature" rows={4} onChange={(e) => setFormData({ ...formData, [e.currentTarget.id]: e.currentTarget.value })} type="textarea" />
                    </>
                     : <></>}

                    <span>Hasło:</span>
                    <input id="password" onChange={(e) => setFormData({ ...formData, [e.currentTarget.id]: e.currentTarget.value })} type="password" />
                    <div className={css.buttons}>
                        <button className={`${css.button} btn`} onClick={(e) => {!login ? setLogin(true) : handleAuth(e)}}>Zaloguj sie</button>
                        <button className={`${css.button} btn`} onClick={(e) => {login ? setLogin(false) : handleAuth(e)}}>Zarejestruj sie</button>
                    </div>
                </form>
            </div>
            <div className={css.brief}>
                
            </div>
        </div>
    )
}