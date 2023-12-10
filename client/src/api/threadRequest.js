import axios from 'axios';
import { useSelector } from 'react-redux';
import apiHeaders from '../helpers/apiHeaders';

const API = axios.create({ baseURL: "http://localhost:5000" });

export const followThread = (data) => API.put(`/thread/${data.threadId}/follow`, { type: data.type }, apiHeaders(data.token))

export const getThreadsByForumId = (forumId) => API.get(`/thread/forumId/${forumId}`);
export const getThreadsByForumIdSortedByParam = (forumId, sort) => API.get(`/thread/forumId/${forumId}/sort/${sort}`);

export const getThreadWithPostsById = (threadId) => API.get(`/thread/${threadId}`);
export const getThreadsByAuthorId = (userId) => API.get(`/thread/authorId/${userId}`);
export const getThreadsByLimit = (limit) => API.get(`/thread/limit/${limit}`);

export const toggleThreadIsClosed = (data) => API.put("/thread/toggle/closed", { threadId: data.threadId }, apiHeaders(data.token));

export const createThread = (data) => API.post(`/thread`, data.body, apiHeaders(data.token));
export const updateThread = (data) => API.put(`/thread/${data.body._id}`, data.body, apiHeaders(data.token));
export const deleteThread = (data) => API.delete(`/thread/${data.threadId}`, apiHeaders(data.token));