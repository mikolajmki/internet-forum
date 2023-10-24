const forumReducer = (state = { categoriesWithForums: [], threads: [], thread: null, posts: [], loading: false, error: false,}, action) => {
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
        case "THREAD_CREATE_SUCCESS":
            return { ...state, threads: [ ...state.threads, action.data ], loading: false, error: false }
        case "THREAD_FAIL":
            localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
            return { ...state, loading: false, error: true };
        case "POST_START":
            return { ...state, loading: true, error: false };
        case "POST_SUCCESS":
            return { ...state, posts: [ ...action.data ], loading: false, error: false };
        case "POST_FAIL":
            localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
            return { ...state, loading: false, error: true };
        case "POST_VOTE_SUCCESS":
            const updatedPosts = state.thread.posts.map((post) => {
                if (action.data.postId === post._id) {
                    return { ...post, upvotes: action.data.upvotes, downvotes: action.data.downvotes };
                } else {
                    return { ...post }
                }
            })
            return { ...state, thread: { ...state.thread, posts: updatedPosts }, loading: false}
        case "POST_CREATE_SUCCESS":
            return { ...state, thread: { ...state.thread, posts: [ ...state.thread.posts, action.data ] } }
        default:
            return state;
    }
};

export default forumReducer;