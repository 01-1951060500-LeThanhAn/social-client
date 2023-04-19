import axios from "axios";

export const baseApi = axios.create({
  baseURL: "https://social-main-ann.onrender.com",
});

export const linkImages = "https://social-main-ann.onrender.com/images";
