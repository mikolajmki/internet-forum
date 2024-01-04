const authReducer = (state = { authData: { user: null }, notifications: [], loading: false, error: null, message: null }, action) => {
    switch (action.type) {
        case "AUTH_START":
            return { ...state, loading: true, error: null };
        case "AUTH_SUCCESS":
            localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
            return { ...state, authData: action.data.authData, message: action.data.message, loading: false, error: null };
        case "AUTH_FAIL":
            localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
            return { ...state, loading: false, error: action.data };
        case "ERROR_SET":
            return { ...state, error: action.data };
        case "MESSAGE_SET":
            return { ...state, message: action.data };
        case "ERROR_RESET":
            return { ...state, error: null, message: null };
        case "JWT_FAIL":
            // localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
            return { ...state, loading: false, authData: { user: null } , error: action.data };
        case "USER_UPDATE_START":
            return { ...state, loading: true, error: null };
        case "USER_UPDATE_SUCCESS":
            localStorage.setItem("profile", JSON.stringify({ ...action.data }));
            return { ...state, loading: false, error: null, message: "Updated successfully", authData: { ...state.authData, ...action.data } };
        case "USER_UPDATE_FAIL":
            return { ...state, loading: false, error: action.data };
        case "NOTIFICATIONS_START":
            return { ...state, loading: true, error: null };
        case "NOTIFICATIONS_SUCCESS":
            return { ...state, loading: false, error: null, notifications: action.data };
        case "NOTIFICATIONS_DELETE_SUCCESS":
            return { ...state, loading: false, error: null, notifications: [] };
        case "NOTIFICATIONS_FAIL":
            return { ...state, loading: false, error: action.data };
        case "LOGOUT":
            localStorage.clear();
            return { ...state, authData: { user: null }, message: action.data.message, loading: false, error: null, notifications: [] };
        default:
            return state;
    }
}

export default authReducer;