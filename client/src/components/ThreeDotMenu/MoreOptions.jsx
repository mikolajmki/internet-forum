import { useState } from "react";
import css from "./MoreOptions.module.css";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/postAction";

export const MoreOptions = ({ data, location }) => {

    const [ menu, setMenu ] = useState(false)

    const dispatch = useDispatch();

    const handleDelete = (data) => {
        dispatch(deletePost(data));
    }

    return (
        <div className={css.options}>
            <div onClick={() => setMenu((prev) => !prev)}>...</div>
            { menu ? 
            <div className={css.menu}>
                <div className={css.arrowUp}></div>
                <span>Edytuj</span>
                { location === "post" ? <span onClick={() => handleDelete(data)}>Usun</span> : <></> }
            </div> : <></> }
        </div>
    )
}