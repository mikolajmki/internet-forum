import React, { useState } from "react";
import { Forums } from "../Forums/Forums.jsx";
import css from './HomeSection.module.css';
// import { categories } from "../../data/categories";
import { AdminModal } from "../AdminModal/AdminModal.jsx";
import { UilArrowDown, UilPlusCircle, UilTrashAlt } from '@iconscout/react-unicons';
import { useSelector } from "react-redux";
import { deleteCategory } from "../../api/categoryRequest.js";

export const HomeSection = ({ content, setContent }) => {

    const { user, token } = useSelector((state) => state.authReducer.authData);

    const [opened, setOpened] = useState(true);

    const [adminOpened, setAdminOpened] = useState(false);
    const [categoryId, setCategoryId] = useState(null);
    const [type, setType] = useState("forum");

    const adminId = process.env.REACT_APP_FORUM_ADMIN_ID;

    const handleDeleteCategory = async (categoryId) => {
        const { status } = await deleteCategory({ categoryId, token });
        if (status === 200) {
            window.location.reload();
        }
    }

    console.log(content)

    return (
        <div className={css.container}>
            <h1 className={css.title} style={{ width: "90%", marginBottom: "3rem", background: "var(--bg2)" }}>Fora dyskusyjne</h1>
            { content.map((category, i) => {
                return (
                    <div className={css.category}>
                        <div id={category.title} className={css.title}>
                                <span>{category.title}</span>
                                <div className={css.admin}>
                                    { user && user.isModerator ? <span className={`${css.btn} btnRed`} onClick={() => { handleDeleteCategory(category._id) }}><UilTrashAlt/></span> : <></> }
                                    { user && user.isModerator ? <span className={`${css.btn} btn`} onClick={() => { setCategoryId(category._id); setType("forum"); setAdminOpened(true); }}><UilPlusCircle/></span> : <></> }
                                    <span onClick={() => setOpened((prev) => !prev)} className={css.arrow} style={opened ? {} : { transform: "rotate(90deg)" } }><UilArrowDown/></span>
                                </div>
                        </div>
                        <Forums category={category} opened={opened} setContent={setContent}/>
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