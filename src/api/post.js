import { baseApi } from ".";

export const getPosts = async () => {
  const res = await baseApi.get(`/api/posts`);

  return res;
};

export const editPost = async (postId, data) => {
  const res = await baseApi.put(`/api/posts/${postId}`, {
    desc: data,
  });
  return res;
};

export const savePost = async (data) => {
  const res = await baseApi.post(`/api/posts/save`, data);

  return res;
};

export const getSavePost = async (userId) => {
  const res = await baseApi.get(`/api/posts/save/${userId}`);

  return res;
};

export const deleteSavePost = async (postId) => {
  const res = await baseApi.delete(`/api/posts/unsave/${postId}`);

  return res;
};

export const sharePost = async (postId, idUser) => {
  const res = await baseApi.post(`/api/posts/${postId}/share`, {
    userId: idUser,
  });

  return res;
};

export const getSharePost = async (userId) => {
  const res = await baseApi.get(`/api/posts/share/${userId}`);

  return res;
};

export const searchPost = async (keyword) => {
  const res = await baseApi.get(`/api/posts/search/post?keyword=${keyword}`);

  return res;
};
