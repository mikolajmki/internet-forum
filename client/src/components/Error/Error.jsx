import React from "react";
import css from "./Error.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export const Error = () => {

    const { error: err, message: msg } = useSelector((state) => state.authReducer);
    const { error: forumError } = useSelector((state) => state.forumReducer);

    const dispatch = useDispatch();
    const params = useParams();

    const [ error, setError ] = useState(null);
    const [ message, setMessage ] = useState(null)

    const resetError = () => {
        setError(null);
        setMessage(null);
        dispatch({ type: "ERROR_RESET" });
    }

    useEffect(() => {
        err ? setError(err) : forumError ? setError(forumError) : setMessage(msg);

        setTimeout( () => {
            resetError();
        } , 5000)
    }, [err, msg, forumError]);



    if (error || message) {
        return (
            <div className={` ${css.error}`}>
                <div className="error">
                    <span style={ message ? { color: "green" } : {}}>{error ? error : message}</span>
                </div>
            </div> 
        )
    }

    // return (
    //     <>
    //         { error || message ? 
    //         <div className={` ${css.error}`}>
    //             <div className="error">
    //                 <span style={ message ? { color: "green" } : {}}>{error ? error : message}</span>
    //             </div>
    //         </div> : <></> }
    //     </>
    // )
}