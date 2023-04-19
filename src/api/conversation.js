import { baseApi } from ".";

export const getConversation = async (id) => {
  const res = await baseApi.get(`/api/conversation/${id}`);

  return res;
};

export const postConversation = async (senderId, receiverId) => {
  const res = await baseApi.post(`/api/conversation`, {
    senderId: senderId,
    receiverId: receiverId,
  });

  return res;
};
