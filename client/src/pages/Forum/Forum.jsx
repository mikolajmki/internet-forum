import React from "react";
import { Header } from "../../components/Header/Header";
import css from './Forum.module.css';
import { ForumSection } from "../../components/ForumSection/ForumSection";
import { SideSection } from "../../components/SideSection/SideSection";
import { useDispatch, useSelector } from "react-redux";
import { getThreadsByForumId } from "../../actions/threadAction";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getPostsByLimit } from "../../actions/postAction";

export const Forum = () => {

    const params = useParams();
    const dispatch = useDispatch();

    const { threads, loading } = useSelector((state) => state.forumReducer);
    
    console.log(threads, params.forumId)

    useEffect(() => {
        dispatch(getPostsByLimit(10));
        dispatch(getThreadsByForumId(params.forumId))
    }, [])

    return (
        <>
            <Header/>
            <div className={css.container}>
                <ForumSection threads={threads} loading={loading}/>
                <SideSection/>
            </div>
        </>
    )
}