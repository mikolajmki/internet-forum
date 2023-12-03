const forumReducer = (state = { categories: [], threads: [], thread: null, visitedUser: null, loading: false, error: null,}, action) => {
    switch (action.type) {
        case "SET_CATEGORIES_SUCCESS":
            return { ...state, categories: action.data }
        case "THREADS_START":
            return { ...state, loading: true, error: null };
        case "THREADS_UPDATE_START":
            return { ...state, loading: false, error: null };
        case "THREADS_SUCCESS":
            return { ...state, threads: action.data, loading: false, error: null };
        case "THREADS_FAIL":
            localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
            return { ...state, loading: false, error: true };
        case "THREAD_START":
            return { ...state, loading: true, error: null };
        case "THREAD_SUCCESS":
            return { ...state, thread: action.data, loading: false, error: null };
        case "THREAD_CREATE_SUCCESS":
            return { ...state, threads: [ ...state.threads, action.data ], loading: false, error: null }
        case "THREAD_DELETE_SUCCESS":
            return { ...state, thread: [], loading: false, error: null }
        case "THREAD_FAIL":
            // localStorage.setItem("profile", JSON.stringify({ ...a1ction?.data }));
            return { ...state, loading: false, error: action.data };
        case "POST_CREATE_START":
            return { ...state, error: null };
        case "POST_CREATE_SUCCESS":
            console.log(state.error)
            return { ...state, thread: { ...state.thread, posts: [ ...state.thread.posts, action.data ] },  error: null }
        case "POST_DELETE_SUCCESS":
            return { ...state, thread: { ...state.thread, posts: state.thread.posts.filter(post => post._id !== action.data.postId) } }
        case "POST_VOTE_SUCCESS":
            const updatedPosts = state.thread.posts.map((post) => {
                if (action.data.postId === post._id) {
                    return { ...post, upvotes: action.data.upvotes, downvotes: action.data.downvotes };
                } else {
                    return { ...post }
                }
            })
            return { ...state, thread: { ...state.thread, posts: updatedPosts }, loading: false}
        case "VISITED_USER_SUCCESS":
            return { ...state, visitedUser: action.data, loading: false, error: null }
        default:
            return state;
    }
};

export default forumReducer;