import axios from "axios";

export const baseApi = axios.create({
  baseURL: "https://server-social-61kc.onrender.com",
});

export const linkImages = "https://server-social-61kc.onrender.com/images";
