import { baseApi } from "../api/index";
export const postCommentApi = (data) => {
  return baseApi.post("/api/comments", data);
};

export const getCommentApi = (postId) => {
  return baseApi.get(`/api/comments/${postId}`);
};

export const editCommentApi = (id, data) => {
  return baseApi.put(`/api/comments/${id}`, {
    data,
  });
};

export const deleteCommentApi = (id) => {
  return baseApi.delete(`/api/comments/${id}`);
};
