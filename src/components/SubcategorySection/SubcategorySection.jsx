import React, { useEffect, useState } from "react";
import css from './SubcategorySection.module.css';
import { ThreadSection } from "../ThreadSection/ThreadSection";
import { useParams, useSearchParams } from "react-router-dom";
import { UilPlusCircle } from '@iconscout/react-unicons';
import { ThreadModal } from "../ThreadModal/ThreadModal";

export const SubcategorySection = () => {

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
                    <div className={css.btn} onClick={() => setModal((prev) => !prev)}>
                        <div className={css.circle}><UilPlusCircle/></div>
                        Utworz nowy
                    </div>
                </div>
                <ThreadModal modal={modal} setModal={setModal}/>
            </div>
        </div>
    )
}