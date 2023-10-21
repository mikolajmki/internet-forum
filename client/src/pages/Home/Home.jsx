import React, { useEffect } from "react";
import { Header } from "../../components/Header/Header";
import { Section } from "../../components/Forums/Forums.jsx";
import css from './Home.module.css';
import { HomeSection } from "../../components/HomeSection/HomeSection";
import { SideSection } from "../../components/SideSection/SideSection";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesWithForums } from "../../actions/categoryAction";

export const Home = () => {
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategoriesWithForums());
    }, []);

    const { loading } = useSelector((state) => state.forumReducer);

    if (!loading) {
        return (
        <>
        <Header/>
        <div className={css.container}>
            <HomeSection/>
            <SideSection/>
        </div>
        </>
    )
    } else {
        return <span className="loader"></span>
    }
}