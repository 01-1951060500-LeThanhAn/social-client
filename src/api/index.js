import axios from "axios";

export const baseApi = axios.create({
  baseURL: "https://server-social-7msn.onrender.com",
});

export const linkImages = "https://server-social-7msn.onrender.com/images";
