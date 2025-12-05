import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const getBaseUrl = () => {
  if (process.env.EXPO_PUBLIC_API_URL) return process.env.EXPO_PUBLIC_API_URL;

  if (Platform.OS === "android") {
    return "http://10.0.2.2:3000/v1/api";
  }
  return "http://localhost:3000/v1/api";
};

export const api = axios.create({
  baseURL: getBaseUrl(),
});

api.interceptors.request.use(async (config) => {
  try {
    const token = await SecureStore.getItemAsync("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Failed to fetch token", error);
  }
  return config;
});
