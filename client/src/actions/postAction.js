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

export const createPost = (authorId, threadId, comment) => async (dispatch) => {
    try {
        const { data } = await PostApi.createPost(authorId, threadId, comment);
        console.log(data)
        dispatch({ type: "POST_CREATE_SUCCESS", data: data });
    } catch (err) {
        console.log(err);
    }
};