import React, { useEffect, useState } from "react";
import css from './ForumSection.module.css';
import { ThreadSection } from "../ThreadSection/ThreadSection";
import { useParams, useSearchParams } from "react-router-dom";
import { UilPlusCircle } from '@iconscout/react-unicons';
import { ThreadModal } from "../ThreadModal/ThreadModal";

export const ForumSection = () => {

    const [modal, setModal] = useState(false);

    useEffect(() => {
        console.log(modal)
    }, [modal])

    const params = useParams();
    return (
        <div className={css.wrapper}>
            <div className={css.container}>
                <div className={css.title}>
                    {params.subId.replace('-', ' ')}
                </div>
                <div className={css.section}>
                    <ThreadSection subId={params.subId}/>
                </div>
                <div className={css.btnWrapper}>
                    <div className="btn" onClick={() => setModal((prev) => !prev)}>
                        <div className={css.circle}><UilPlusCircle/></div>
                        Dodaj watek
                    </div>
                </div>
                <ThreadModal modal={modal} setModal={setModal} title={"Dodaj watek:"}/>
            </div>
        </div>
    )
}