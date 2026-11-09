import { axiosInstance } from "./config";
import axios from "axios";
export const getProductCategories = () => {
  return axiosInstance.get("/products/categories/");
};

export const getServicesCategories = () => {
  return axiosInstance.get("services/categories/");
};
 