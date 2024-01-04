import { useEffect, useState } from "react";
import css from "./MoreOptions.module.css";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/postAction";
import { getThreadsByForumIdSortedByParam } from "../../actions/threadAction";
import { toggleThreadIsClosed } from "../../api/threadRequest";
import { UpdateModal } from "../UpdateModal/UpdateModal";
import { deleteThreadImages } from "../../api/uploadRequest";

export const MoreOptions = ({ data, location, forumId, isModerator, value, setValue }) => {

    const [ menu, setMenu ] = useState(false);
    const [ modal, setModal ] = useState(false);

    const dispatch = useDispatch();

    const handleToggleThreadIsClosed = async (data) => {
        await toggleThreadIsClosed(data);
    }

    const handleDelete = async () => {
        await deleteThreadImages({ body: { images: data.content.images, threadId: data.content.threadId }, token: data.token });
        dispatch(deletePost({ threadId: data.content.threadId, postId: data.content._id, token: data.token }));
        setMenu(false);
    }

    const forumForm = () => {
        return (
            <form className={css.sortForm} onChange={(e) => { handleSortThreads(e) }}>
                <label>Najnowsze<input type="radio" value="-createdAt" name="group" /></label>
                <label>Najstarsze<input type="radio" value="createdAt" name="group" /></label>
                <label>Najpopularniejsze <input type="radio" value="-views" name="group" /></label>
                <label>Alfabetycznie<input type="radio" value="title" name="group" /></label>
                <label>Najwiecej odpowiedzi<input type="radio" value="-posts" name="group" /></label>
            </form> 
        )
    }

    const handleSortThreads = (e) => {
        e.preventDefault();
        dispatch(getThreadsByForumIdSortedByParam(forumId, document.querySelector('input[name="group"]:checked').value))
        setMenu(false);
    }

    return (
        <div className={css.options}>
            <div onClick={() => setMenu((prev) => !prev)}>...</div>
            { menu ? 
            <div className={ css.menu } >
                <div className={css.arrowUp}></div>
                { location === "forum" ? forumForm() : data.userId === data.content.author ? <span onClick={() => { setMenu(false); setModal(true) }}>Edytuj</span> : <></>}
                { location === "thread" && isModerator ? <span onClick={() => { setValue(prev => !prev) }}>{ value ? "Otworz watek" : "Zamknij watek" }</span> : <></> }
                { location === "post" ? <span onClick={() => handleDelete()}>Usun</span> : <></> } 
            </div> : <></> }
            { modal && (location === "thread" || location === "post") ? <UpdateModal modal={modal} setModal={setModal} type={location} content={data.content} token={data.token}/> : <></> }
        </div>
    )
}