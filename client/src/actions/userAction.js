import * as UserApi from '../api/userRequest.js';

export const getUserById = (userId) => async (dispatch) => {
    dispatch({ type: "THREAD_START" });
    try {
        const { data } = await UserApi.getUserById(userId);
        dispatch({ type: "VISITED_USER_SUCCESS", data: data });
    } catch (err) {
        console.log(err);
        dispatch({ type: "THREAD_FAIL" });
    }
}