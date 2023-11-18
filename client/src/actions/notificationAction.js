import * as NotificationApi from '../api/notificationRequest.js';

export const getNotificationsOfAuthUser = (token) => async (dispatch) => {
    dispatch({ type: "NOTIFICATIONS_START" });
    try {
        const { data } = await NotificationApi.getNotificationsOfAuthUser(token);
        dispatch({ type: "NOTIFICATIONS_SUCCESS", data: data });
    } catch (err) {
        console.log(err);
    }
};