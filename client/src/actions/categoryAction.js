import * as CategoryApi from '../api/categoryRequest.js';

export const getCategoriesWithForums = () => async (dispatch) => {
    dispatch({ type: "CATEGORIES_START" });
    try {
        const { data } = await CategoryApi.getCategoriesWithForums();
        console.log(data)
        dispatch({ type: "CATEGORIES_SUCCESS", data: data });
    } catch (err) {
        console.log(err);
        dispatch({ type: "CATEGORIES_FAIL" });
    }
}