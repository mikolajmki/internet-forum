import axios from 'axios';

const API = axios.create({ baseURL: "http://localhost:5000" });

export const getUserById = (userId) => API.get(`/user/${userId}`);
export const getUsersByUsernameLike = (username) => API.get(`/user/username/${username}`);
export const toggleUserIsModerator = (data) => API.put("/user/toggle/moderator", { toggleUserId: data.toggleUserId }, { headers: { Authorization: "Bearer " + data.token } })

export const updateUser = (data) => API.put(`/user/${data.body._id}`, data.body, { headers: { Authorization: "Bearer " + data.token } });

export const getUsersModerators = () => API.get("/user/all/moderators");