import { axiosInstance } from "./config";

export const getServiceList = (page) => {
  return axiosInstance.get("/services", {
    params: {
      page: page,
    },
  });
};
export const getServiceDetails = (serviceId) => {
  return axiosInstance.get(`/services/${serviceId}`);
};
export const postOrder = (serviceId, body, headers) => {
  return axiosInstance.post(`/services/${serviceId}/order`, { body, headers });
};

export const addService = (body, headers) => {
  return axiosInstance.post(`/services`, { body, headers });
};
export const  getPopularServices =async  (limit = 6) => {
  try {
    const response = await axiosInstance.get("/search/popular", {
      params: {
        limit: limit,
      },
    });

    if (response.data && response.data.products && response.data.services) {
      return response.data.services;
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Error fetching popular products:", error);
    return [];
  }
};

export const getServicesByUser = (productId) => {
  return axiosInstance.get(`services/user/${productId}`);
};
export const filterServicesByCategory = async (category) => { 
  try { 
    const response = await axiosInstance.get('/services', { params: { category } }); 
    console.log('Filtered products:', response.data.data); 
    return response.data.data;  
  } catch (error) { 
    console.error('Error filtering products by category:', error); 
    throw error;
  } 
};