import * as ThreadApi from '../api/threadRequest.js';

export const getThreadsByForumId = (forumId) => async (dispatch) => {
    dispatch({ type: "THREADS_START" });
    try {
        const { data } = await ThreadApi.getThreadsByForumId(forumId);
        console.log(data)
        dispatch({ type: "THREADS_SUCCESS", data: data });
    } catch (err) {
        console.log(err);
        dispatch({ type: "THREADS_FAIL" });
    }
};

export const getThreadWithPostsById = (threadId) => async (dispatch) => {
    dispatch({ type: "THREAD_START" });
    try {
        const { data } = await ThreadApi.getThreadWithPostsById(threadId);
        console.log(data)
        dispatch({ type: "THREAD_SUCCESS", data: data });
    } catch (err) {
        console.log(err);
        dispatch({ type: "THREAD_FAIL" });
    }
};

export const getThreadsByAuthorId = (userId) => async (dispatch) => {
    dispatch({ type: "THREADS_START" });
    try {
        const { data } = await ThreadApi.getThreadsByAuthorId(userId);
        console.log(data)
        dispatch({ type: "THREADS_SUCCESS", data: data });
    } catch (err) {
        console.log(err);
        dispatch({ type: "THREADS_FAIL" });
    }
};

export const createThread = (formData) => async (dispatch) => {
    dispatch({ type: "THREAD_START" });
    try {
        const { data } = await ThreadApi.createThread(formData);
        console.log(data)
        dispatch({ type: "THREAD_CREATE_SUCCESS", data: data });
    } catch (err) {
        console.log(err);
        dispatch({ type: "THREAD_FAIL" });
    }
};

export const getThreadsByLimit = (limit) => async (dispatch) => {
    dispatch({ type: "THREADS_START" });
    try {
        const { data } = await ThreadApi.getThreadsByLimit(limit);
        console.log(data)
        dispatch({ type: "THREADS_SUCCESS", data: data });
    } catch (err) {
        console.log(err);
        dispatch({ type: "THREADS_FAIL" });
    }
};