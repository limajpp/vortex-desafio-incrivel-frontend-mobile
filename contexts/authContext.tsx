import { Href, useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

type User = {
  id: number;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  signIn: (email: string, pass: string) => Promise<void>;
  signOut: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  const fetchUserProfile = async () => {
    try {
      const response = await api.get("/auth/profile");
      const data = response.data;

      setUser({
        id: data.sub,
        name: data.name,
        email: data.username,
      });
    } catch (error) {
      console.log("Failed to load profile:", error);
      await signOut();
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await SecureStore.getItemAsync("access_token");

        if (token) {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          await fetchUserProfile();
        }
      } catch (e) {
        console.error("Auth verification error:", e);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const currentSegment = segments[0] as string;
    const inAuthGroup = currentSegment === "(tabs)";

    if (!user && inAuthGroup) {
      router.replace("/login" as Href);
    } else if (user && currentSegment === "login") {
      router.replace("/(tabs)" as Href);
    }
  }, [user, segments, isLoading]);

  const signIn = async (email: string, pass: string) => {
    try {
      const response = await api.post("/auth/signIn", {
        email,
        password: pass,
      });

      const { access_token } = response.data;

      await SecureStore.setItemAsync("access_token", access_token);

      api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

      await fetchUserProfile();
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to login");
    }
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync("access_token");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
