import { axiosInstance } from "./config";

export const getUserData = (userId, token) => {
  return axiosInstance.get(`/users/${userId}`, { headers: { token } });
};

export const updateUserData = (userId, userData, token) => {
  const { _id, __v, createdAt, email, ...updatedData } = userData;
  return axiosInstance.patch(`/users/${userId}`, updatedData, {
    headers: { token },
  });
};
