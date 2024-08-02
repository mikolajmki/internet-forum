import axios from 'axios';
import apiHeaders from '../helpers/apiHeaders';

const API = axios.create({ baseURL: "http://localhost:5000" });

export const getNotificationsOfAuthUser = (token) => API.get("/notification", apiHeaders(token));
export const deleteNotificationsOfAuthUser = (token) => API.delete("/notification", apiHeaders(token));