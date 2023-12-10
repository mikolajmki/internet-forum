import React, { useEffect, useState } from "react";
import css from './ForumSection.module.css';
import { Threads } from "../Threads/Threads.jsx";
import { UilPlusCircle } from '@iconscout/react-unicons';
import { ThreadModal } from "../ThreadModal/ThreadModal";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { followForum } from "../../api/forumRequest.js";
import { MoreOptions } from "../MoreOptions/MoreOptions.jsx";

export const ForumSection = ({ forum }) => {

    const [ modal, setModal ] = useState(false);
    const [ followers, setFollowers ] = useState([]);

    const params = useParams();
    const navigate = useNavigate();
    const adminId = process.env.REACT_APP_FORUM_ADMIN_ID;

    const { threads, loading } = useSelector((state) => state.forumReducer);

    const { user, token } = useSelector((state) => state.authReducer.authData);

    const handleFollow = async (type) => {
        console.log("follow")
        const { data } = await followForum({ forumId: forum._id, type, token });
        console.log(data)
        setFollowers(data);
    }

    useEffect(() => {
        console.log(followers)
    }, [followers])

    useEffect(() => {
        setFollowers(forum.followers);
        console.log(followers)
    }, [forum])

    return (
        <div className={css.wrapper}>                
            { !threads && loading ? <span className="loader"></span> :
            <div className={css.container}>
                <div className={css.title}>
                    <span>{forum.name}</span>
                    <span> <MoreOptions forumId={forum._id} location="forum"/> </span>
                </div>
                <div className={css.section}>
                    <Threads threads={threads}/>
                </div>
                <div className={css.btnWrapper}>
                    <div>
                        <div className="btn" onClick={() => user ? setModal((prev) => !prev) : navigate("/auth")}>
                            <div className={css.circle}><UilPlusCircle/></div>
                            Dodaj watek
                        </div>
                    </div>
                    <div className={css.admin}>
                    { user && followers.includes(user._id) ? 
                        <div className="btn" onClick={() => { handleFollow(0) }}>
                            <div className="numberBadge" style={{ background: "var(--bg1)" }} ><div>{followers.length}</div></div>
                            Przestan obserwowac
                        </div> : 
                        <div className="btn" onClick={ () => { user ? handleFollow(1) : navigate("/auth") } }>
                            <div className="numberBadge" style={{ background: "var(--bg1)" }} ><div>{followers.length}</div></div>
                            Obserwuj forum
                        </div> }
                    </div>
                </div>
                { user ? <ThreadModal modal={modal} setModal={setModal} token={token} forumId={forum._id} type={"thread"}/> : <></> }
            </div>
            }
        </div>
    )
}