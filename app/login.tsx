import { useAuth } from "@/contexts/authContext";
import { StatusBar } from "expo-status-bar";
import {
  CircleDollarSign,
  Eye,
  EyeOff,
  Moon,
  Sun,
  Zap,
} from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const iconColor = "#EAB308";
  const placeholderColor = "#71717a";

  async function handleLogin() {
    if (!email || !password) {
      return Alert.alert("Error", "Please fill in all fields.");
    }

    setLoading(true);
    try {
      await signIn(email, password);
    } catch (error: any) {
      const message = error.response?.data?.message || "Invalid credentials.";
      Alert.alert("Login Failed", message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-zinc-50 dark:bg-zinc-950">
      <StatusBar style="auto" />

      <View className="absolute top-12 right-6 z-10">
        <TouchableOpacity
          onPress={toggleColorScheme}
          className="p-3 bg-white dark:bg-zinc-900 rounded-full shadow-sm border border-zinc-200 dark:border-zinc-800"
        >
          {colorScheme === "dark" ? (
            <Sun size={20} color={iconColor} />
          ) : (
            <Moon size={20} color={placeholderColor} />
          )}
        </TouchableOpacity>
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1 justify-center p-6"
        >
          <View className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <View className="items-center mb-10">
              <View className="flex-row gap-2 mb-6">
                <View className="h-16 w-16 bg-yellow-500/10 rounded-2xl items-center justify-center border border-yellow-500/20">
                  <Zap size={32} color={iconColor} fill={iconColor} />
                </View>
                <View className="h-16 w-16 bg-zinc-100 dark:bg-zinc-800 rounded-2xl items-center justify-center border border-zinc-200 dark:border-zinc-700">
                  <CircleDollarSign
                    size={32}
                    color={colorScheme === "dark" ? "#fff" : "#000"}
                  />
                </View>
              </View>

              <Text className="text-3xl font-extrabold text-zinc-900 dark:text-white text-center tracking-tight">
                Expenzeus
              </Text>
              <Text className="text-zinc-500 dark:text-zinc-400 text-center mt-2 font-medium">
                Financial Control
              </Text>
            </View>

            <View className="gap-5">
              <View>
                <Text className="text-zinc-700 dark:text-zinc-300 mb-2 font-bold ml-1 text-sm uppercase tracking-wide">
                  E-mail
                </Text>
                <TextInput
                  className="w-full h-14 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-2xl px-4 text-zinc-900 dark:text-white text-base focus:border-yellow-500"
                  placeholder="name@example.com"
                  placeholderTextColor={placeholderColor}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View>
                <Text className="text-zinc-700 dark:text-zinc-300 mb-2 font-bold ml-1 text-sm uppercase tracking-wide">
                  Password
                </Text>
                <View className="relative w-full h-14 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-2xl flex-row items-center px-4 focus:border-yellow-500">
                  <TextInput
                    className="flex-1 text-zinc-900 dark:text-white text-base h-full"
                    placeholder="type your password"
                    placeholderTextColor={placeholderColor}
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="p-2"
                  >
                    {showPassword ? (
                      <EyeOff size={20} color={placeholderColor} />
                    ) : (
                      <Eye size={20} color={placeholderColor} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                className={`w-full h-14 rounded-2xl items-center justify-center mt-4 shadow-lg shadow-yellow-500/20 ${
                  loading
                    ? "bg-yellow-600"
                    : "bg-yellow-500 active:scale-[0.98]"
                }`}
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#000" />
                ) : (
                  <Text className="text-zinc-950 font-bold text-lg">
                    Sign In
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
