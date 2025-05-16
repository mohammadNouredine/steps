import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "@/utils/auth-storage";
import axios from "axios";
//
const axiosClient = axios.create();

axiosClient.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

let isRefreshing: boolean = false;
let refreshTokenPromise: Promise<any> | null = null;

const refreshToken = async () => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      console.log("THERE IS NO REFRESH TOKEN");
      return;
    }
    console.log("THERE EXIST A REFRESH TOKEN");
    console.log("TRYING TO CHECK IF IT'S VALID");
    const response = await axiosClient.post<{
      data: {
        accessToken: string;
        refreshToken: string;
      };
    }>("/auth/refresh-token", {
      refreshToken,
    });

    // save the new tokens after refreshing
    setAccessToken(response.data.data.accessToken);
    setRefreshToken(response.data.data.refreshToken);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Adding Authorization header for all requests
axiosClient.interceptors.request.use(
  (config) => {
    // Get the access token if available
    const token = getAccessToken();
    // console.log("ACCESS TOKEN ON AXIOS CLIENT", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Determine Content-Type based on the data
    if (config.data) {
      if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
      } else if (typeof config.data === "object") {
        config.headers["Content-Type"] = "application/json";
      } else if (typeof config.data === "string") {
        // Assuming text/plain for string data, adjust as needed
        config.headers["Content-Type"] = "text/plain";
      }
    }

    return config;
  },
  (error) => {
    console.log({ error });
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log("THERE IS AN ERROR WITH 401");
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshTokenPromise = refreshToken().finally(() => {
          isRefreshing = false;
          refreshTokenPromise = null;
        });
      }

      try {
        await refreshTokenPromise;
        originalRequest._retry = true;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
