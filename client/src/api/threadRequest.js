import axios from 'axios';

const API = axios.create({ baseURL: "http://localhost:5000" });

export const getThreadsByForumId = (forumId) => API.get(`/thread/forumId/${forumId}`);
export const getThreadWithPostsById = (threadId) => API.get(`/thread/${threadId}`);

export const createThread = (forumId) => API.post(`/thread`, { forumId: forumId });