import axios from 'axios';

const API = axios.create({ baseURL: "http://localhost:5000" });

export const getCategoriesWithForums = () => API.get('/category');
export const createCategory = (data) => API.post("/category", data.body, { headers: { Authorization: "Bearer " + data.token } });
export const deleteCategory = (data) => API.delete(`/category/${data.categoryId}`, { headers: { Authorization: "Bearer " + data.token } })