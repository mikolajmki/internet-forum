import React, { useEffect, createRef } from "react";
import css from "./Auth.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../../actions/authAction";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Error } from "../../components/Error/Error";

export const Auth = () => {

    const [ formData, setFormData ] = useState({ username: "", password: "" });
    const [ login, setLogin ] = useState(true);
    const [ pass, setPass ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ message, setMessage ] = useState(null);

    const { user } = useSelector((state) => state.authReducer.authData);
    const { error: err, message: msg, loading } = useSelector((state) => state.authReducer);

    const navigate = useNavigate();
    
    const dispatch = useDispatch();
    console.log(formData, login)

    const handleAuth = () => {

        if (!login && formData.password !== formData.confirmPassword) {
            setError("Passwords doesn't match")
            console.log(err)
        } else if (login) {
            dispatch(logIn(formData));
        } else {
            dispatch(signUp(formData));
        }
    }

    useEffect(() => {
        setError(err);
    }, [loading])

    useEffect(() => {
        setFormData({ username: "", password: "" })
        setError(null)  
    }, [login]);

    useEffect(() => {
        console.log(user, err)
        if (user && !err) {
            navigate(-1);
        }
    }, [user, error])

    return (
        <div className={css.container}>
            <Error/>
            <div className={css.credentials}>
                <div className={css.name} style={ !login ? { flex: 1 } : {}}>
                    <div style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
                        <span>Baw</span><span>aria.pl</span>
                    </div>
                </div>
                <form className={css.form} onSubmit={(e) => { e.preventDefault() }} style={ !login ? { flex: 3 } : {}}>
                    <span>Nazwa użytkownika:</span>
                    <input value={formData.username} id="username" onChange={(e) => setFormData({ ...formData, [e.currentTarget.id]: e.currentTarget.value })} type="text" />

                    { !login ? 
                    <>
                        <span>Imię:</span>
                        <input id="firstname" onChange={(e) => setFormData({ ...formData, [e.currentTarget.id]: e.currentTarget.value })} type="text"  required />
                        <span>Naziwsko:</span>
                        <input id="lastname" onChange={(e) => setFormData({ ...formData, [e.currentTarget.id]: e.currentTarget.value })} type="text"  required />
                        <span>E-mail:</span>
                        <input id="email" onChange={(e) => setFormData({ ...formData, [e.currentTarget.id]: e.currentTarget.value })} type="email" required />
                    </>
                     : <></>}

                    <span>Hasło:</span>
                    <input value={formData.password} id="password" onChange={(e) => setFormData({ ...formData, [e.currentTarget.id]: e.currentTarget.value })} type="password" required/>
                    { !login ? 
                    <>
                        <span>Potwierdź hasło:</span>
                        <input id="confirmPassword" onChange={(e) => setFormData({ ...formData, confirmPassword: e.currentTarget.value })} type="password" required/>
                    </> : <></> }
                    { error && !loading ?
                    <div className="error">
                        <span>{error}</span>
                    </div> : <></> }
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