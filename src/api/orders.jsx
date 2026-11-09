import { axiosInstance } from "./config";

export const getCustomerOrders = (token) => {
  return axiosInstance.get(`/orders`, { headers: { token } });
};

export const getProductById = (ProductId) => {
  return axiosInstance.get(`/products/${ProductId}`);
};

export const getServiceById = (ServiceId) => {
  return axiosInstance.get(`/services/${ServiceId}`);
};

export const deleteOrder = (orderId, token) => {
  return axiosInstance.delete(`/orders/${orderId}`, { headers: { token } });
};
