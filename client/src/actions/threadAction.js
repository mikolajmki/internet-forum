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

export const createThread = (reqData) => async (dispatch) => {
    dispatch({ type: "THREAD_START" });
    try {
        const { data } = await ThreadApi.createThread(reqData);
        console.log(data)
        dispatch({ type: "THREAD_CREATE_SUCCESS", data: data });
    } catch (err) {
        console.log(err);
        dispatch({ type: "THREAD_FAIL", data: err.response.data.message });
        if (err.response.status === 401) {
            dispatch({ type: "JWT_FAIL", data: err.response.data.message })
        }
    }
};

export const updateThread = (data) => async (dispatch) => {
    dispatch({ type: "THREAD_START" });
    try {
        const { data: thread } = await ThreadApi.updateThread(data);
        console.log(thread)
        dispatch({ type: "THREAD_UPDATE_SUCCESS", data: thread });
    } catch (err) {
        console.log(err);
        dispatch({ type: "THREAD_FAIL", data: err.response.data.message });
        if (err.response.status === 401) {
            dispatch({ type: "JWT_FAIL", data: err.response.data.message })
        }
    }
};

export const deleteThread = (reqData) => async (dispatch) => {
    dispatch({ type: "THREAD_START" });
    try {
        const { data } = await ThreadApi.deleteThread(reqData);
        console.log(data)
        dispatch({ type: "THREAD_DELETE_SUCCESS", data: data });
    } catch (err) {
        console.log(err);
        dispatch({ type: "THREAD_FAIL", data: err.response.data.message });
        if (err.response.status === 401) {
            dispatch({ type: "JWT_FAIL", data: err.response.data.message })
        }
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

export const getThreadsByForumIdSortedByParam = (forumId, sort) => async (dispatch) => {
    dispatch({ type: "THREADS_UPDATE_START" });
    try {
        const { data } = await ThreadApi.getThreadsByForumIdSortedByParam(forumId, sort);
        console.log(data)
        dispatch({ type: "THREADS_SUCCESS", data: data });
    } catch (err) {
        console.log(err);
        dispatch({ type: "THREADS_FAIL" });
    }
};

