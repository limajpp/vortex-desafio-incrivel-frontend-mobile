import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "../global.css";

import { AuthProvider } from "@/contexts/authContext";
import { useColorScheme } from "nativewind";

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />

          <Stack.Screen
            name="modal"
            options={{
              presentation: "modal",
              title: "New Expense",
              headerShown: false,
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}
