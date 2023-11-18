import axios from 'axios';

const API = axios.create({ baseURL: "http://localhost:5000" });

export const getVotes = (postId) => API.get(`/post/votes/${postId}`);
export const votePost = (data) => API.put(`/post/${data.postId}/vote/${data.type}`, {}, { headers: { Authorization: `Bearer ${data.token}` } });
export const getPostsByLimit = (limit) => API.get(`/post/limit/${limit}`);

export const createPost = (data) => API.post(`/post`, data.body, { headers: { Authorization: `Bearer ${data.token}` } });
export const deletePost = (data) => API.delete(`/post/${data.postId}/threadId/${data.threadId}`, { headers: { Authorization: `Bearer ${data.token}` } } );