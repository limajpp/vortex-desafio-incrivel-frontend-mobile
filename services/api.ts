import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const LOCAL_IP = "192.168.1.15";

const getBaseUrl = () => {
  if (process.env.EXPO_PUBLIC_API_URL) return process.env.EXPO_PUBLIC_API_URL;

  if (Platform.OS === "android") {
    return `http://${LOCAL_IP}:3000/v1/api`;
  }

  return `http://${LOCAL_IP}:3000/v1/api`;
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
    console.error("Erro ao pegar token", error);
  }
  return config;
});
