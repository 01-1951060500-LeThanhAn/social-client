import { baseApi } from ".";

export const getMessage = async (messId) => {
  const res = await baseApi.get(`/api/message/${messId}`);

  return res;
};
