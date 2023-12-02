import axios from 'axios';

const API = axios.create({ baseURL: "http://localhost:5000" });

export const followForum = (data) => API.put(`/forum/${data.forumId}/follow`, { type: data.type }, { headers: { Authorization: "Bearer " + data.token } })

export const getForumById = (forumId) => API.get(`/forum/${forumId}`);

export const createForum = (data) => API.post("/forum", data.body, { headers: { Authorization: "Bearer " + data.token } })
export const deleteForum = (data) => API.delete(`/forum/${data.forumId}/categoryId/${data.categoryId}`, { headers: { Authorization: "Bearer " + data.token } })