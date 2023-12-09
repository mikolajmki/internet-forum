import * as UserApi from '../api/userRequest.js';

export const getUserById = (userId) => async (dispatch) => {
    dispatch({ type: "THREAD_START" });
    try {
        const { data } = await UserApi.getUserById(userId);
        dispatch({ type: "VISITED_USER_SUCCESS", data: data });
    } catch (err) {
        console.log(err);
        dispatch({ type: "THREAD_FAIL", data: err.response.data.message });
    }
}

export const updateUser = (data) => async (dispatch) => {
    dispatch({ type: "USER_UPDATE_START" });
    try {
        const { data: res } = await UserApi.updateUser(data);
        dispatch({ type: "USER_UPDATE_SUCCESS", data: res });
    } catch (err) {
        console.log(err.message);
        dispatch({ type: "USER_UPDATE_FAIL", data: err.response.data.message });
    }
}