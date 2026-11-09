import { axiosInstance } from "./config";

export const getData = (data) => {
    return axiosInstance.get(`/${data}`);
  };

export const getDataDetails = (data,Id) => {
    return axiosInstance.get(`/${data}/${Id}`);
  };