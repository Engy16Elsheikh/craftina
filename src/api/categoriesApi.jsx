import { axiosInstance } from "./config";

export const getProductCategories = () => {
  return axiosInstance.get("/products/categories/");
};

export const getServicesCategories = () => {
  return axiosInstance.get("/services/categories/");
};