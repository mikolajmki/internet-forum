import React, { useEffect, useState } from "react";
import css from './ForumSection.module.css';
import { Threads } from "../Threads/Threads.jsx";
import { UilPlusCircle } from '@iconscout/react-unicons';
import { ThreadModal } from "../ThreadModal/ThreadModal";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const ForumSection = ({ threads, loading }) => {

    const [modal, setModal] = useState(false);
    const params = useParams();

    return (
        <div className={css.wrapper}>
            { loading ? <span className="loader"></span> : (                    
                <div className={css.container}>
                    <div className={css.title}>
                        {params.forumId}
                    </div>
                    <div className={css.section}>
                        <Threads threads={threads}/>
                    </div>
                    <div className={css.btnWrapper}>
                        <div className="btn" onClick={() => setModal((prev) => !prev)}>
                            <div className={css.circle}><UilPlusCircle/></div>
                            Dodaj watek
                        </div>
                    </div>
                    <ThreadModal modal={modal} setModal={setModal} title={"Dodaj watek:"}/>
                </div>
            ) }
        </div>
    )
}