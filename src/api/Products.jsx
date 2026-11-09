import { axiosInstance } from "./config";

export const getProductList = (page) => {
  return axiosInstance.get("/products", {
    params: {
      page: page,
    },
  });
};
export const getPopularProduct = async (limit = 6) => {
  try {
    const response = await axiosInstance.get("/search/popular", {
      params: {
        limit: limit,
      },
    });

    if (response.data && response.data.products && response.data.services) {
      return response.data.products;
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Error fetching popular products:", error);
    return [];
  }
};

export const getProductListDetails = (productId) => {
  return axiosInstance.get(`/products/${productId}`);
};

export const addProduct = (body, headers) => {
  return axiosInstance.post(`/products`, { body, headers });
};
export const getProductsByUser = (productId) => {
  return axiosInstance.get(`products/user/${productId}`);
};
export const addProductComment = (body, headers, productId) => {
  return axiosInstance.post(`products/${productId}/feedback`, {
    body,
    headers,
  });
};
export const getProductComment = (headers, productId) => {
  return axiosInstance.get(`products/${productId}/feedback`, {
    headers,
  });
};

export const filterProductsByCategory = async (category) => {
  try {
    const response = await axiosInstance.get("/products", {
      params: { category },
    });
    console.log("Filtered products:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error filtering products by category:", error);
    throw error;
  }
};
