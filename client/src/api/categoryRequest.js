import axios from 'axios';
import apiHeaders from '../helpers/apiHeaders';

const API = axios.create({ baseURL: "http://localhost:5000" });

export const getCategoriesWithForums = () => API.get('/category');
export const createCategory = (data) => API.post("/category", data.body, apiHeaders(data.token));
export const deleteCategory = (data) => API.delete(`/category/${data.categoryId}`, apiHeaders(data.token));