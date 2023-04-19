import { baseApi } from ".";

export const getAllUsers = async () => {
  const res = await baseApi.get(`/api/users/listuser`);

  return res;
};

export const searchUser = async (data) => {
  const res = await baseApi.get(`/api/users/search/user?keyword=${data}`);

  return res;
};

export const getFollowingsUsers = async (userId) => {
  const res = await baseApi.get(`/api/users/friends/${userId}`);

  return res;
};

export const getFollowersUsers = async (userId) => {
  const res = await baseApi.get(`/api/users/followers/${userId}`);

  return res;
};

export const updatedProfile = async (userId, data) => {
  const res = await baseApi.put(`/api/users/profile/${userId}`, data);
  return res;
};

export const getUser = async (userId) => {
  const res = await baseApi.get(`/api/users?userId=${userId}`);
  return res;
};

export const cloudinaryUrlImage = `https://api.cloudinary.com/v1_1/dkw090gsn/image/upload`;
