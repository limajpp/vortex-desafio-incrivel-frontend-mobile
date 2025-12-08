import { Href, useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

type User = {
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

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await SecureStore.getItemAsync("access_token");
        if (token) {
          setUser({ name: "Usuário", email: "user@example.com" });
        }
      } catch (e) {
        console.error(e);
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
      setUser({ email, name: "User" });
    } catch (error: any) {
      console.error(error);
      throw new Error(error.response?.data?.message || "Falha no login");
    }
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync("access_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
