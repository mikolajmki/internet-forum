import axios from 'axios';
import apiHeaders from '../helpers/apiHeaders';

const API = axios.create({ baseURL: "http://localhost:5000" });

export const followForum = (data) => API.put(`/forum/${data.forumId}/follow`, { type: data.type }, apiHeaders(data.token));

export const getForumById = (forumId) => API.get(`/forum/${forumId}`);

export const createForum = (data) => API.post("/forum", data.body, apiHeaders(data.token));
export const deleteForum = (data) => API.delete(`/forum/${data.forumId}/categoryId/${data.categoryId}`, apiHeaders(data.token));