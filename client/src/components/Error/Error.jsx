import React from "react";
import css from "./Error.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export const Error = () => {

    const { error: err, message: msg } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();

    const [ error, setError ] = useState(null);
    const [ message, setMessage ] = useState(null)

    useEffect(() => {
        err ? setError(err) : setMessage(msg);

        setTimeout( () => {
            err ? setError(null) : setMessage(null);
            dispatch({ type: "ERROR_RESET" });
        } , 5000)
    }, [err, msg]);

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