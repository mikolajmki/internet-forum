import * as CategoryApi from '../api/categoryRequest.js';

export const setCategories = (catgoriesWithForums) => (dispatch) => {
    const data = catgoriesWithForums.map((category) => category.title);
    console.log(data);
    dispatch({ type: "SET_CATEGORIES_SUCCESS", data: data });
}