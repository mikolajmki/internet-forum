import axios from 'axios';
import apiHeaders from '../helpers/apiHeaders';

const API = axios.create({ baseURL: "http://localhost:5000" });

export const getVotes = (postId) => API.get(`/post/votes/${postId}`);
export const votePost = (data) => API.put(`/post/${data.postId}/vote/${data.type}`, {}, apiHeaders(data.token));
export const getPostsByLimit = (limit) => API.get(`/post/limit/${limit}`);

export const createPost = (data) => API.post(`/post`, data.body, apiHeaders(data.token));
export const updatePost = (data) => API.put(`/post/${data.body._id}`, data.body, apiHeaders(data.token));
export const deletePost = (data) => API.delete(`/post/${data.postId}/threadId/${data.threadId}`, apiHeaders(data.token) );