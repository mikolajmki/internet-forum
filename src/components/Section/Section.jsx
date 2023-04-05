import React, { useEffect, useState } from "react";
import css from './Section.module.css';
import { subcategories } from "../../data/subcategories";
import { UilArrowDown } from '@iconscout/react-unicons';
import { Link } from "react-router-dom";
import { UilCommentAltMessage } from '@iconscout/react-unicons'

export const Section = ({ category }) => {
    const [opened, setOpened] = useState(true);
    useEffect(() => {
        console.log(opened);
    }, [opened]);
    
    return (
        <div className={css.container}>
            <div id={category.name} className={css.title}>
                <span>{category.name}</span>
                <span onClick={() => setOpened((prev) => !prev)} className={css.arrow} style={opened ? {} : { transform: "rotate(90deg)" } }><UilArrowDown/></span>
            </div>
                { opened ? 
                <div className={css.subs}>
                    { subcategories[category.id].map((sub, i) => {
                        return (
                        <div className={css.subcategory} key={i}>
                            <div>
                                <UilCommentAltMessage/>
                            </div>
                            <Link to={`/${category.name}/${sub.name}`} style={{ color: "white", textDecoration: "none" } }>
                                <div className={css.info}>
                                    <span className={css.name.replace('-', ' ')}>{sub.name.replace('-', ' ')}</span>
                                    <span className={css.description}>{sub.description}</span>
                                </div>
                            </Link>
                        </div>
                        )
                    })}
                </div> : "" }
        </div>
    )
}