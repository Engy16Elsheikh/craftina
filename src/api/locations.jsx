import { axiosInstance } from "./config";

export const getGovernorates = () => {
  return axiosInstance.get("/locations/governorates");
};

export const getCities = (govId) => {
  return axiosInstance.get(`locations/cities/${govId}`);
};
