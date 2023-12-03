const authReducer = (state = { authData: { user: null }, notifications: [], loading: false, updateLoading: false, error: false }, action) => {
    switch (action.type) {
        case "AUTH_START":
            return { ...state, loading: true, error: false };
        case "AUTH_SUCCESS":
            localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
            return { ...state, authData: action.data, loading: false, error: false };
        case "AUTH_FAIL":
            localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
            return { ...state, loading: false, error: action.data };
        case "ERROR_RESET":
            return { ...state, error: null };
        case "JWT_FAIL":
            // localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
            return { ...state, loading: false, authData: { user: null } , error: action.data };
        case "UPDATING_START":
            return { ...state, loading: true, error: false };
        case "UPDATING_SUCCESS":
            localStorage.setItem("profile", JSON.stringify({ ...action.data }));
            return { ...state, updateLoading: false, error: false, authData: action.data };
        case "UPDATING_FAIL":
            return { ...state, updateLoading: false, error: true };
        case "NOTIFICATIONS_START":
            return { ...state, loading: true, error: false };
        case "NOTIFICATIONS_SUCCESS":
            return { ...state, loading: false, error: false, notifications: action.data };
        case "NOTIFICATIONS_FAIL":
            return { ...state, loading: false, error: true };
        case "LOGOUT_START":
            localStorage.clear();
            return { ...state, authData: { user: null }, loading: false, error: false };
        default:
            return state;
    }
}

export default authReducer;