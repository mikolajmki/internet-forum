import * as PostApi from '../api/postRequest.js';

export const votePost = (postId, userId, type) => async (dispatch) => {
    try {
        const { data } = await PostApi.votePost(postId, userId, type);
        console.log(data)
        dispatch({ type: "POST_VOTE_SUCCESS", data: data });
    } catch (err) {
        console.log(err);
    }
};

export const createPost = (formData) => async (dispatch) => {
    try {
        const { data } = await PostApi.createPost(formData);
        console.log(data)
        dispatch({ type: "POST_CREATE_SUCCESS", data: data });
    } catch (err) {
        console.log(err);
    }
};

export const getPostsByLimit = (limit) => async (dispatch) => {
    dispatch({ type: "POST_START"});
    try {
        const { data } = await PostApi.getPostsByLimit(limit);
        console.log(data)
        dispatch({ type: "POST_SUCCESS", data: data });
    } catch (err) {
        console.log(err);
        dispatch({ type: "POST_FAIL"});
    }
}