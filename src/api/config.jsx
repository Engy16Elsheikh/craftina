import axios from "axios";

console.log(process.env.REACT_APP_BASE_URL)
export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: false,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
})

// Add a request interceptor
// axiosInstance.interceptors.request.use(function (config) {
//   console.log(config)
//   config.headers['token'] =useSelector((state) => state.user.token);
//     console.log(config.headers)
//     return config;


// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error);
// });
