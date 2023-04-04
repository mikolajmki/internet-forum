const authReducer = (state = { authData: { user: null }, loading: false, updateLoading: false, error: false, allUsers: [] }, action) => {
    switch (action.type) {
        case "AUTH_START":
            return { ...state, loading: true, error: false };
        case "AUTH_SUCCESS":
            localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
            return { ...state, authData: action.data, loading: false, error: false };
        case "AUTH_FAIL":
            localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
            return { ...state, loading: false, error: true };
        case "UPDATING_START":
            return { ...state, loading: true, error: false };
        case "UPDATING_SUCCESS":
            localStorage.setItem("profile", JSON.stringify({ ...action.data }));
            return { ...state, updateLoading: false, error: false, authData: action.data };
        case "UPDATING_FAIL":
            return { ...state, updateLoading: false, error: true };
        case "GET_USERS_SUCCESS":
            console.log(action.data);
            return { ...state, allUsers: action.data };
        case "LOGOUT_START":
            localStorage.clear();
            return { ...state, authData: null, loading: false, error: false };
        default:
            return state;
    }
}

export default authReducer;