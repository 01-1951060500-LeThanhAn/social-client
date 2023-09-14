import { baseApi } from ".";

export const getAllVideos = async () => {
  const res = await baseApi.get(`/api/posts/video`);

  return res;
};

export const deleteVideo = async (videoId) => {
  const res = await baseApi.delete(`/api/posts/video/${videoId}`);

  return res;
};

export const getDetailVideo = async (videoId) => {
  const res = await baseApi.get(`/api/posts/video/${videoId}`);

  return res;
};

export const likeVideos = async (videoId, userId) => {
  const res = await baseApi.put(`/api/posts/${videoId}/like/video`, {
    userId: userId,
  });

  return res;
};

export const searchVideo = async (keyword) => {
  const res = await baseApi.get(`/api/posts/search/video?keyword=${keyword}`);

  return res;
};
