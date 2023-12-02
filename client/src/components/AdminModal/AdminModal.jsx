import React, { useCallback, useEffect, useState } from "react";
import Modal from "react-modal";
import css from "./AdminModal.module.css";
import { createForum } from "../../api/forumRequest";
import { createCategory } from "../../api/categoryRequest";
import { getUsersByUsernameLike, getUsersModerators, toggleUserIsModerator } from "../../api/userRequest";
import { toDate } from "../../helpers/toDate";
import useDebounce from "../../helpers/useDebounce";
import { useSelector } from "react-redux";

export const AdminModal = ({ adminId, token, type, categoryId, modal, setModal }) => {

    const [ formData, setFormData ] = useState({});
    const [ charCount, setCharCount ] = useState({ first: 0, second: 0 });
    
    const [ toggleUserId, setToggleUserId ] = useState(null);
    const [ moderators, setModerators ] = useState([]);
    const [ users, setUsers ] = useState([]);

    const { token: adminToken } = useSelector((state) => state.authReducer.authData);


    useEffect(() => {
        console.log(toggleUserId)
    }, [toggleUserId])

    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    const handleCreate = async (e) => {
        e.preventDefault()
        if (type === "forum") {
            const { status } = await createForum({ body: { ...formData, categoryId }, token });
            if (status === 200) {
                setModal((prev) => !prev);
                window.location.reload();
            }
        }
        const { status } = await createCategory({ body: formData, token });
        if (status === 200) {
            window.location.reload();
        }
    }

    // user.profilePicture ? serverPublic + user.profilePicture : require('../../public/defaultProfile.png')

    const handleGetUsersModerators = async () => {
        const { data } = await getUsersModerators();
        setModerators(data);
    } 

    const handleToggleUserIsModerator = async (toggleUserId) => {

        if (!toggleUserId) {
            return;
        }

        await toggleUserIsModerator({ toggleUserId, token: adminToken })

        handleGetUsersModerators();

        setUsers( users.map((user) => {
            if (user._id === toggleUserId) {
                return { ...user, isModerator: !user.isModerator };
            } else {
                return user;
            }
        }) )

        setUsers([])

        console.log(users)
    }

    useDebounce(async () => {
        const { data } = await getUsersByUsernameLike(formData.username);
        setUsers(data);
    }, [formData], 1000)

    useEffect(() => {
        setCharCount({ first: 0, second: 0 });
    }, [modal])

    useEffect(() => {
        if (type === "moderator") {
            handleGetUsersModerators();
            setUsers([])
            setToggleUserId(null)
        }
    }, [modal])

    const mapUsers = (users, type) => {
        return (
            <div className={css.moderators}>
                { users.map((user, i) => (
                <label key={i} htmlFor={user._id} className={css.moderator}>
                    <div className={css.profilePic}>
                        <img width={50} height={50} src={user.profilePicture ? serverPublic + user.profilePicture : require('../../public/defaultProfile.png')} alt="" />
                    </div>
                    <div className={css.info}>
                        <span>{user.username}</span>
                        <span>{ toDate(user.createdAt) }</span>
                    </div>
                    <div className={css.info}>
                        <div><div className="numberBadge"><div>{user.reputation}</div></div><span>Reputacja</span></div>
                        <div><div className="numberBadge"><div>{user.answers}</div></div><span>Odpowiedzi</span></div>
                    </div>
                    <div className={css.info}>
                        <span>{ user.isModerator || type === 0 ? "Moderator" : "Uzytkownik" }</span>
                    </div>
                    <div>
                        { type && user._id !== adminId ? <input type="radio" id={user._id} name="group" value={user._id} onChange={(e) => { setToggleUserId(e.currentTarget.value) }}/> : <></> }
                    </div>
                </label>
                )) } 
                { type ? <button className="btn" onClick={() => { handleToggleUserIsModerator(toggleUserId) }} >Zmien uprawnienia</button> : <></> }
            </div>
        )
    }

    if (type === "moderator") {
        return (
            <Modal
            isOpen={modal}
            contentLabel="Example Modal"
            className={css.modal}
            style={{ overlay: { background: "#00000095" } }}>
                <div className={css.scrollContainer}>
                    <div>
                    <h1>Obecni moderatorzy:</h1>
                    { mapUsers(moderators, 0) }
                    <form className={css.form} onSubmit={(e) => handleCreate(e)}>
                        <h1>Dodaj nowego moderatora</h1>
                        <div>Nazwa użytkownika: <span>{charCount.first}/32</span></div>
                        <input type="text" maxLength={32} id="username" onChange={(e) => { setFormData({ ...formData, [e.currentTarget.id]: e.currentTarget.value }); setCharCount({ ...charCount, first: e.currentTarget.value.length }) } } autoFocus />
                        {/* <button style={{ width: "8rem" }} type="submit" className="btn">Dodaj</button> */}
                    </form>
                    { mapUsers(users, 1) }
                    <div className={css.exit} onClick={() => setModal((prev) => !prev)}></div>
                    </div>
                </div>
            </Modal>
        )
    }

    return (
        <Modal
        isOpen={modal}
        contentLabel="Example Modal"
        className={css.modal}
        style={{ overlay: { background: "#00000095" } }}>
            <div className={css.container}>
                { type === "forum" ? <h1>Dodaj forum</h1> : <h1>Dodaj nowa kategorie</h1> }
                <form className={css.form} onSubmit={(e) => handleCreate(e)}>
                    <div>Tytul: <span>{charCount.first}/32</span></div>
                    <input type="text" maxLength={32} id={type === "forum" ? "name" : "title"} onChange={(e) => { setFormData({ ...formData, [e.currentTarget.id]: e.currentTarget.value }); setCharCount({ ...charCount, first: e.currentTarget.value.length }) } } autoFocus />
                    { type === "forum" ? <>
                    <div>Tresc: <span>{charCount.second}/32</span></div>
                    <input type="text" maxLength={32} id="description" onChange={(e) => { setFormData({ ...formData, [e.currentTarget.id]: e.currentTarget.value }); setCharCount({ ...charCount, second: e.currentTarget.value.length }) }} rows={5} className={css.content}/>
                    </> : <></> }
                    <button style={{ width: "8rem" }} type="submit" className="btn">Dodaj</button>
                </form>
                <div className={css.exit} onClick={() => setModal((prev) => !prev)}></div>
            </div>
        </Modal>
    )
};