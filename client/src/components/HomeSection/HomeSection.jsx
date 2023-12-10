import React, { useEffect, useState } from "react";
import { Forums } from "../Forums/Forums.jsx";
import css from './HomeSection.module.css';
// import { categories } from "../../data/categories";
import { AdminModal } from "../AdminModal/AdminModal.jsx";
import { UilArrowDown, UilPlusCircle, UilTrashAlt } from '@iconscout/react-unicons';
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory } from "../../api/categoryRequest.js";

export const HomeSection = ({ content, setContent }) => {

    const { user, token } = useSelector((state) => state.authReducer.authData);

    const [opened, setOpened] = useState(true);

    const [adminOpened, setAdminOpened] = useState(false);
    const [categoryId, setCategoryId] = useState(null);
    const [type, setType] = useState("forum");
    const [ error, setError ] = useState({});

    const dispatch = useDispatch();

    const handleDeleteCategory = async (categoryId, i) => {
        try {
            const { status } = await deleteCategory({ categoryId, token });
            console.log(status)
            if (status === 200) {
                window.location.reload();
            }
        } catch (err) {
            console.log(err.response.data.message);

            if (err.response.status === 401) {
                dispatch({ type: "JWT_FAIL", data: err.response.data.message });
            } else {
                setError({ [i]: err.response.data.message });
            }

            setTimeout( () => {
                setError({})
            } , 5000)
        }
    }

    useEffect(() => {
        console.log(error)
    }, [error])

    console.log(content)

    return (
        <div className={css.container}>
            <h1 className={css.title} style={{ marginBottom: "3rem", marginTop: "0", background: "var(--bg2)" }}>Fora dyskusyjne</h1>
            { content.map((category, i) => {
                return (
                    <div key={i} className={css.category}>
                        <div id={category.title} className={css.title}>
                                <span>{category.title}</span>
                                <div className={css.admin}>
                                    { user && user.isModerator ? <span className={`${css.btn} btnRed`} onClick={() => { handleDeleteCategory(category._id, i) }}><UilTrashAlt/></span> : <></> }
                                    { user && user.isModerator ? <span className={`${css.btn} btn`} onClick={() => { setCategoryId(category._id); setType("forum"); setAdminOpened(true); }}><UilPlusCircle/></span> : <></> }
                                    <span onClick={() => setOpened((prev) => !prev)} className={css.arrow} style={opened ? {} : { transform: "rotate(90deg)" } }><UilArrowDown/></span>
                                </div>
                        </div>
                        { error[i] ? 
                        <div style={{ borderRadius: "0", margin: "1rem 0", border: "var(--border) 0.1rem solid" }} className="error">
                            <span>{ error[i] }</span>
                        </div> : <></>}
                        <Forums categoryError={error} setCategoryError={setError} category={category} opened={opened} setContent={setContent}/>
                        <a href={"/#" + category.title}></a>
                    </div>
                )
            }) }
            { user && user.isModerator ? <div style={{ width: "90%" }}><div className="btn" onClick={() => { setType("category"); setAdminOpened(true); }}>
                <UilPlusCircle/>
                Dodaj kategorie
            </div></div> : <></> }
            { user && user.isModerator ? <AdminModal token={token} type={type} categoryId={categoryId} modal={adminOpened} setModal={setAdminOpened}/> : <></> }
        </div>
    )
}