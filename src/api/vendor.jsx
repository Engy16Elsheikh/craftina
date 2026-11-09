import { axiosInstance } from "./config";

export const deleteProduct = (productId, token) => {
  return axiosInstance.delete(`/products/${productId}`, { headers: { token } });
};
export const getProductById = (productId, token) => {
  return axiosInstance.get(`/products/${productId}`, { headers: { token } });
};
export const updateProduct = (productId, updatedData, token) => {
  return axiosInstance.patch(`/products/${productId}`, updatedData, {
    headers: { token },
  });
};
export const getVendorProducts = (userId) => {
  return axiosInstance.get(`/products/user/${userId}`);
};

export const getVendorServices = (userId) => {
  return axiosInstance.get(`/services/user/${userId}`);
};

export const deleteService = (servicetId, token) => {
  return axiosInstance.delete(`/services/${servicetId}`, {
    headers: { token },
  });
};
export const getServicesById = (servicesId, token) => {
  return axiosInstance.get(`/services/${servicesId}`, { headers: { token } });
};
export const updateServices = (servicesId, updatedData, token) => {
  return axiosInstance.patch(`/services/${servicesId}`, updatedData, {
    headers: { token },
  });
};
