import React, { useState } from "react";
import css from './ForumSection.module.css';
import { Threads } from "../Threads/Threads.jsx";
import { UilPlusCircle } from '@iconscout/react-unicons';
import { ThreadModal } from "../ThreadModal/ThreadModal";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

export const ForumSection = ({ threads, loading }) => {

    const [modal, setModal] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    const forum = useSelector((state) => state.forumReducer.threads[0].forumId);
    console.log(forum.name)
    const user = useSelector((state) => state.authReducer.authData.user);

    return (
        <div className={css.wrapper}>
            { loading ? <span className="loader"></span> : (                    
                <div className={css.container}>
                    <h1 className={css.title}>
                        {forum.name}
                    </h1>
                    <div className={css.section}>
                        <Threads threads={threads}/>
                    </div>
                    <div className={css.btnWrapper}>
                        <div className="btn" onClick={() => user ? setModal((prev) => !prev) : navigate("/auth")}>
                            <div className={css.circle}><UilPlusCircle/></div>
                            Dodaj watek
                        </div>
                    </div>
                    { user ? <ThreadModal modal={modal} setModal={setModal} userId={user._id} forumId={forum._id} type={"thread"}/> : <></> }
                </div>
            ) }
        </div>
    )
}