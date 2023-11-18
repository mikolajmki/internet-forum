import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { Section } from "../../components/Forums/Forums.jsx";
import css from './Home.module.css';
import { HomeSection } from "../../components/HomeSection/HomeSection";
import { SideSection } from "../../components/SideSection/SideSection";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesWithForums } from "../../api/categoryRequest.js";
import { getThreadsByLimit } from "../../api/threadRequest.js";
import { setCategories } from "../../actions/categoryAction.js";

export const Home = () => {
    
    const dispatch = useDispatch();

    const [ categoriesWithForums, setCategoriesWithForums ] = useState(null);
    const [ threads, setThreads ] = useState(null);

    const handleGetCategoriesWithForums = async () => {
        const { data } = await getCategoriesWithForums();
        setCategoriesWithForums(data);
    }

    const handleGetThreads = async () => {
        const { data } = await getThreadsByLimit(2);
        setThreads(data)
    };

    useEffect(() => {
        handleGetCategoriesWithForums();
        handleGetThreads();
    }, []);

    useEffect(() => {
        if (categoriesWithForums) {
            dispatch(setCategories(categoriesWithForums));
        }
    }, [categoriesWithForums])

    // const handleGetContent = async () => {
    //     if (location === "home") {
    //         const { data } = await getThreadsByLimit(2);
    //         setContent(data)
    //     } else {
    //         const { data } = await getPostsByLimit(10);
    //         setContent(data)
    //     }
    // };

    return (
        <>
        <Header/>
        { categoriesWithForums && threads ?

        <div className={css.container}>
            <HomeSection content={categoriesWithForums}/>
            <SideSection location="home" content={threads}/>
        </div>
          
        : <span className="loader"></span>}
        </>
    )
}