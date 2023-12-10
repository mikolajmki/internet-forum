import axios from "axios";
import apiHeaders from "../helpers/apiHeaders";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const uploadProfilePicture = (data) => API.post("/upload/profile", data.body, apiHeaders(data.token))
export const uploadThreadImage = (data) => API.post("/upload/thread", data.body, apiHeaders(data.token));
export const deleteThreadImages = (data) => API.put("/upload/thread/delete", data.body, apiHeaders(data.token));