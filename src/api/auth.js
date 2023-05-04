import { baseApi } from "./index";

export const loginUserApi = (data) => {
  return baseApi.post("/api/auth/login", data);
};

export const registerUserApi = (data) => {
  return baseApi.post("/api/auth/register", data);
};
