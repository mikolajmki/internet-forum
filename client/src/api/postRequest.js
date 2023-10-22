import axios from 'axios';

const API = axios.create({ baseURL: "http://localhost:5000" });

export const getVotes = (postId) => API.get(`/post/votes/${postId}`);
export const votePost = (postId, userId, type) => API.put(`/post/${postId}/vote/${type}`, { userId: userId });
export const createPost = (authorId, threadId, comment) => API.post(`/post`, { authorId: authorId, threadId: threadId, comment: comment });
export const deletePost = (postId, threadId) => API.post(`/post/${postId}`, { threadId: threadId });