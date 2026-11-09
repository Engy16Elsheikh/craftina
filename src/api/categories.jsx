import { axiosInstance } from "./config"

export const getMainCatogry = () => {
    return axiosInstance.get('/services/categories');
}
export const getSubService = (categoryId) => {
    return axiosInstance.get(`/services/categories/${categoryId}`);
}

export const getMainCatogryProducts = () => {
    return axiosInstance.get('/products/categories');
}
export const getSubProducts = (categoryId) => {
    return axiosInstance.get(`/products/categories/${categoryId}`);
}
