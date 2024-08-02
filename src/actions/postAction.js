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
        if (err.response.status === 401) {
            dispatch({ type: "JWT_FAIL", data: err.response.data.message })
        }
    }
};

export const createPost = (reqData) => async (dispatch) => {
    dispatch({ type: "POST_CREATE_START"});
    try {
        const { data } = await PostApi.createPost(reqData);
        console.log(data)
        dispatch({ type: "POST_CREATE_SUCCESS", data: data });
    } catch (err) {
        console.log(err);
        dispatch({ type: "THREAD_FAIL", data: err.response.data.message });
        if (err.response.status === 401) {
            dispatch({ type: "JWT_FAIL", data: err.response.data.message })
        }
    }
};

export const updatePost = (reqData) => async (dispatch) => {
    dispatch({ type: "POST_CREATE_START"});
    try {
        const { data } = await PostApi.updatePost(reqData);
        console.log(data)
        dispatch({ type: "POST_UPDATE_SUCCESS", data: data });
    } catch (err) {
        console.log(err);
        dispatch({ type: "THREAD_FAIL", data: err.response.data.message });
        if (err.response.status === 401) {
            dispatch({ type: "JWT_FAIL", data: err.response.data.message })
        }
    }
};

export const deletePost = (reqData) => async (dispatch) => {
    dispatch({ type: "POST_CREATE_START"});
    try {
        const { data } = await PostApi.deletePost(reqData);
        console.log(data)
        dispatch({ type: "POST_DELETE_SUCCESS", data: data });
    } catch (err) {
        console.log(err);
        dispatch({ type: "THREAD_FAIL", data: err.response.data.message });
        if (err.response.status === 401) {
            dispatch({ type: "JWT_FAIL", data: err.response.data.message })
        }
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