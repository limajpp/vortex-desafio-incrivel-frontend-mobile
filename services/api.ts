import axios from "axios";
import * as SecureStore from "expo-secure-store";

// const LOCAL_HOME_IP = "192.168.15.8";
const LOCAL_PHONE_IP = "172.20.10.4";

const getBaseUrl = () => {
  if (process.env.EXPO_PUBLIC_API_URL) return process.env.EXPO_PUBLIC_API_URL;

  return `http://${LOCAL_PHONE_IP}:3000/v1/api`;
};

export const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  try {
    const token = await SecureStore.getItemAsync("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Failed to claim token.", error);
  }
  return config;
});
