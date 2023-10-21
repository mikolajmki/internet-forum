const forumReducer = (state = { categoriesWithForums: [], threads: [], thread: null, loading: false, error: false,}, action) => {
    switch (action.type) {
        case "CATEGORIES_START":
            return { ...state, loading: true, error: false };
        case "CATEGORIES_SUCCESS":
            return { ...state, categoriesWithForums: action.data, loading: false, error: false };
        case "CATEGORIES_FAIL":
            localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
            return { ...state, loading: false, error: true };
        case "THREADS_START":
            return { ...state, loading: true, error: false };
        case "THREADS_SUCCESS":
            return { ...state, threads: action.data, loading: false, error: false };
        case "THREADS_FAIL":
            localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
            return { ...state, loading: false, error: true };
        case "THREAD_START":
            return { ...state, loading: true, error: false };
        case "THREAD_SUCCESS":
            return { ...state, thread: action.data, loading: false, error: false };
        case "THREAD_FAIL":
            localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
            return { ...state, loading: false, error: true };
        default:
            return state;
    }
};

export default forumReducer;