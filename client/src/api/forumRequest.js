import axios from 'axios';

const API = axios.create({ baseURL: "http://localhost:5000" });

export const getForumById = (forumId) => API.get(`/forum/${forumId}`);