import React from "react";
import css from "./Auth.module.css";
import { useState } from "react";

export const Auth = () => {

    const [ formData, setFormData ] = useState({});
    const [ login, setLogin ] = useState(true);
    console.log(formData)

    const handleAuth = () => {

    }

    return (
        <div className={css.container}>
            <div className={css.credentials}>
                <div className={css.name} style={ !login ? { flex: 1 } : {}}>
                    <div>
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
                        <input id="email" onChange={(e) => setFormData({ ...formData, [e.currentTarget.id]: e.currentTarget.value })} type="text" />
                        <span>Sygnatura:</span>
                        <input id="signature" onChange={(e) => setFormData({ ...formData, [e.currentTarget.id]: e.currentTarget.value })} type="text" />
                    </>
                     : <></>}

                    <span>Hasło:</span>
                    <input id="password" onChange={(e) => setFormData({ ...formData, [e.currentTarget.id]: e.currentTarget.value })} type="text" />
                    <div className={css.buttons}>
                        <button className={`${css.button} btn`} onClick={() => {!login ? setLogin(true) : handleAuth()}}>Zaloguj sie</button>
                        <button className={`${css.button} btn`} onClick={() => {login ? setLogin(false) : handleAuth()}}>Zarejestruj sie</button>
                    </div>
                </form>
            </div>
            <div className={css.brief}>
                
            </div>
        </div>
    )
}