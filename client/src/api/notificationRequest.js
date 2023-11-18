import axios from 'axios';

const API = axios.create({ baseURL: "http://localhost:5000" });

export const getNotificationsOfAuthUser = (token) => API.get("/notification", { headers: { Authorization: `Bearer ${token}` } });