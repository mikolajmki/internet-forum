import { useSelector } from 'react-redux';
import * as PostApi from '../api/postRequest.js';

export const votePost = (reqData) => async (dispatch) => {
    try {
        console.log(reqData)
        const { data } = await PostApi.votePost(reqData);
        console.log(data)
        dispatch({ type: "POST_VOTE_SUCCESS", data: data });
    } catch (err) {
        console.log(err);
    }
};

export const createPost = (reqData) => async (dispatch) => {
    try {
        const { data } = await PostApi.createPost(reqData);
        console.log(data)
        dispatch({ type: "POST_CREATE_SUCCESS", data: data });
    } catch (err) {
        console.log(err);
    }
};

export const deletePost = (reqData) => async (dispatch) => {
    try {
        const { data } = await PostApi.deletePost(reqData);
        console.log(data)
        dispatch({ type: "POST_DELETE_SUCCESS", data: data });
    } catch (err) {
        console.log(err);
    }
};

// export const getPostsByLimit = (limit) => async (dispatch) => {
//     dispatch({ type: "POST_START"});
//     try {
//         const { data } = await PostApi.getPostsByLimit(limit);
//         console.log(data)
//         dispatch({ type: "POST_SUCCESS", data: data });
//     } catch (err) {
//         console.log(err);
//         dispatch({ type: "POST_FAIL"});
//     }
// }