import { baseApi } from "../api/index";
import { editPost } from "../api/post";

export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginFailure = () => ({
  type: "LOGIN_FAILURE",
});

export const Follow = (userId) => ({
  type: "FOLLOW",
  payload: userId,
});

export const Unfollow = (userId) => ({
  type: "UNFOLLOW",
  payload: userId,
});

export const deletePost = async (postId) => {
  const res = await baseApi.delete(`/api/posts/${postId}`);

  return {
    type: "DELETE_POST",
    payload: postId,
  };
};

export const addPost = async (data) => {
  const res = await baseApi.post("/api/posts", data);

  return {
    type: "ADD_POST",
    payload: res.data,
  };
};

export const editPosts = async (postId, desc) => {
  const res = await editPost(postId, desc);

  return {
    type: "ADD_POST",
    payload: res.data,
  };
};
