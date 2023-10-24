import React, { useEffect } from "react";
import { Header } from "../../components/Header/Header";
import { Section } from "../../components/Forums/Forums.jsx";
import css from './Home.module.css';
import { HomeSection } from "../../components/HomeSection/HomeSection";
import { SideSection } from "../../components/SideSection/SideSection";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesWithForums } from "../../actions/categoryAction";
import { getThreadsByLimit } from "../../actions/threadAction";

export const Home = () => {
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategoriesWithForums());
        dispatch(getThreadsByLimit(2));
    }, []);

    const { loading } = useSelector((state) => state.forumReducer);

        return (
        <>
        <Header/>
        { loading ?
            <span className="loader"></span> :
        <>
        <div className={css.container}>
            <HomeSection/>
            <SideSection location="home"/>
        </div>
        </>
        }
        </>
    )
}