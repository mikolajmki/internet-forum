import axios from 'axios';
import { useSelector } from 'react-redux';

const API = axios.create({ baseURL: "http://localhost:5000" });

export const getThreadsByForumId = (forumId) => API.get(`/thread/forumId/${forumId}`);
export const getThreadsByAuthorId = (userId) => API.get(`/thread/authorId/${userId}`);
export const getThreadWithPostsById = (threadId) => API.get(`/thread/${threadId}`);

export const getThreadsByLimit = (limit) => API.get(`/thread/limit/${limit}`);

export const createThread = (data) => API.post(`/thread`, data.body, { headers: { Authorization: `Bearer ${data.token}` } });
export const deleteThread = (data) => API.delete(`/thread/${data.threadId}`, { headers: { Authorization: `Bearer ${data.token}` } });