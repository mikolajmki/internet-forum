import React, { useEffect } from "react";
import css from './Threads.module.css';
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toDate } from "../../helpers/toDate";
import limitString from "../../helpers/limitString.js"
import { ThreadItem } from "../ThreadItem/ThreadItem.jsx";


export const Threads = ({ loading, threads, location }) => {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const serverPublic = process.env.REACT_APP_SERVER_PUBLIC_FOLDER;

    return (
        <div className={css.container}>
            <div className={css.threads} style={ location === 'profile' ? { boxShadow: 'none', border: 'none' } : {} }>
            { threads.length > 0 ? threads.map((thread, i) => <ThreadItem key={i} thread={thread} location={location}/>) : location === "profile" ? <h1 style={{ padding: "2rem 1rem" }}>Uzytkownik nie opublikowal jeszcze zadnych watkow.</h1> : <h2>Nie ma jeszcze watkow na tym forum.</h2> }
            </div>
        </div>
    )
}