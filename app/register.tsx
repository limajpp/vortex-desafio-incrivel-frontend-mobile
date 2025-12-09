import { useAuth } from "@/contexts/authContext";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
    Check,
    ChevronLeft,
    Eye,
    EyeOff,
    UserPlus,
    X,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [hasMinLength, setHasMinLength] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSymbol, setHasSymbol] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  useEffect(() => {
    setHasMinLength(password.length >= 8);
    setHasUpperCase(/[A-Z]/.test(password));
    setHasLowerCase(/[a-z]/.test(password));
    setHasNumber(/[0-9]/.test(password));
    setHasSymbol(/[!@#$%^&*(),.?":{}|<>]/.test(password));
    setPasswordsMatch(password === confirmPassword && password !== "");
  }, [password, confirmPassword]);

  const isFormValid =
    name.length > 0 &&
    email.includes("@") &&
    hasMinLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumber &&
    hasSymbol &&
    passwordsMatch;

  async function handleRegister() {
    if (!isFormValid) {
      return Alert.alert(
        "Attention",
        "Please fix the errors before creating your account."
      );
    }

    setLoading(true);
    try {
      await register(name, email, password);

      Alert.alert(
        "Account Created",
        "Your account has been created successfully! Logging you in...",
        [{ text: "OK" }]
      );
    } catch (error: any) {
      Alert.alert("Registration Failed", error.message);
      setLoading(false);
    }
  }

  const ValidationItem = ({
    label,
    isValid,
  }: {
    label: string;
    isValid: boolean;
  }) => (
    <View className="flex-row items-center mt-1">
      {isValid ? (
        <Check size={14} color="#22c55e" strokeWidth={3} />
      ) : (
        <X size={14} color="#71717a" strokeWidth={3} />
      )}
      <Text
        className={`text-xs ml-2 ${
          isValid ? "text-green-500 font-medium" : "text-zinc-500"
        }`}
      >
        {label}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-zinc-50 dark:bg-zinc-950">
      <StatusBar style="auto" />

      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-4 left-6 z-10 p-2 bg-white dark:bg-zinc-900 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-sm mt-10"
      >
        <ChevronLeft size={24} color="#EAB308" />
      </TouchableOpacity>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            showsVerticalScrollIndicator={false}
          >
            <View className="p-6">
              <View className="items-center mb-8 mt-8">
                <View className="h-16 w-16 bg-yellow-500/10 rounded-2xl items-center justify-center mb-4 border border-yellow-500/20">
                  <UserPlus size={32} color="#EAB308" />
                </View>
                <Text className="text-3xl font-extrabold text-zinc-900 dark:text-white text-center">
                  Create Account
                </Text>
                <Text className="text-zinc-500 dark:text-zinc-400 text-center mt-2 font-medium">
                  Join Expenzeus today
                </Text>
              </View>

              <View className="gap-4">
                <View>
                  <Text className="text-zinc-700 dark:text-zinc-300 mb-2 font-bold text-xs uppercase tracking-wide">
                    Full Name
                  </Text>
                  <TextInput
                    className="w-full h-12 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-xl px-4 text-zinc-900 dark:text-white text-base focus:border-yellow-500"
                    placeholder="John Doe"
                    placeholderTextColor="#71717a"
                    autoCapitalize="words"
                    value={name}
                    onChangeText={setName}
                  />
                </View>

                <View>
                  <Text className="text-zinc-700 dark:text-zinc-300 mb-2 font-bold text-xs uppercase tracking-wide">
                    Email
                  </Text>
                  <TextInput
                    className="w-full h-12 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-xl px-4 text-zinc-900 dark:text-white text-base focus:border-yellow-500"
                    placeholder="john@example.com"
                    placeholderTextColor="#71717a"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>

                <View>
                  <Text className="text-zinc-700 dark:text-zinc-300 mb-2 font-bold text-xs uppercase tracking-wide">
                    Password
                  </Text>
                  <View className="relative w-full h-12 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-xl flex-row items-center px-4 focus:border-yellow-500">
                    <TextInput
                      className="flex-1 text-zinc-900 dark:text-white text-base h-full"
                      placeholder="Create a password"
                      placeholderTextColor="#71717a"
                      secureTextEntry={!showPassword}
                      value={password}
                      onChangeText={setPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff size={20} color="#71717a" />
                      ) : (
                        <Eye size={20} color="#71717a" />
                      )}
                    </TouchableOpacity>
                  </View>

                  <View className="mt-3 bg-zinc-100 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/50">
                    <ValidationItem
                      label="At least 8 characters"
                      isValid={hasMinLength}
                    />
                    <ValidationItem
                      label="One uppercase letter"
                      isValid={hasUpperCase}
                    />
                    <ValidationItem
                      label="One lowercase letter"
                      isValid={hasLowerCase}
                    />
                    <ValidationItem label="One number" isValid={hasNumber} />
                    <ValidationItem
                      label="One symbol (e.g. !@#$)"
                      isValid={hasSymbol}
                    />
                  </View>
                </View>

                <View>
                  <Text className="text-zinc-700 dark:text-zinc-300 mb-2 font-bold text-xs uppercase tracking-wide">
                    Confirm Password
                  </Text>
                  <TextInput
                    className={`w-full h-12 bg-white dark:bg-zinc-900 border rounded-xl px-4 text-zinc-900 dark:text-white text-base focus:border-yellow-500 ${
                      passwordsMatch && confirmPassword
                        ? "border-green-500"
                        : "border-zinc-300 dark:border-zinc-800"
                    }`}
                    placeholder="Repeat password"
                    placeholderTextColor="#71717a"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />
                  {confirmPassword.length > 0 && !passwordsMatch && (
                    <Text className="text-red-500 text-xs mt-1 font-medium">
                      Passwords do not match
                    </Text>
                  )}
                </View>

                <TouchableOpacity
                  className={`w-full h-14 rounded-xl items-center justify-center mt-6 shadow-lg shadow-yellow-500/20 ${
                    isFormValid && !loading
                      ? "bg-yellow-500"
                      : "bg-zinc-300 dark:bg-zinc-800 opacity-80"
                  }`}
                  onPress={handleRegister}
                  disabled={!isFormValid || loading}
                >
                  {loading ? (
                    <ActivityIndicator color={isFormValid ? "#000" : "#fff"} />
                  ) : (
                    <Text
                      className={`font-bold text-lg ${
                        isFormValid ? "text-zinc-950" : "text-zinc-500"
                      }`}
                    >
                      Create Account
                    </Text>
                  )}
                </TouchableOpacity>
              </View>

              <View className="mt-8 flex-row justify-center pb-8">
                <Text className="text-zinc-500 dark:text-zinc-400">
                  Already have an account?{" "}
                </Text>
                <TouchableOpacity onPress={() => router.back()}>
                  <Text className="text-yellow-500 font-bold">Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
