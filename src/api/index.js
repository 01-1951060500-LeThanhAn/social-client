import axios from "axios";

export const baseApi = axios.create({
  baseURL: "https://social-server-kappa.vercel.app",
});

export const linkImages = "https://social-server-kappa.vercel.app/images";
