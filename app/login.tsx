import { Zap } from "lucide-react-native";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useAuth } from "../authContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  async function handleLogin() {
    if (!email || !password) {
      return Alert.alert("Erro", "Preencha todos os campos");
    }
    setLoading(true);
    try {
      await signIn(email, password);
    } catch (error: any) {
      Alert.alert("Erro no Login", error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="flex-1 bg-zinc-950 justify-center items-center p-6">
      <View className="items-center mb-12">
        <View className="h-24 w-24 items-center justify-center rounded-3xl bg-zinc-800 border border-white/10 shadow-2xl mb-4">
          <Zap size={48} color="#EAB308" fill="#EAB308" />
        </View>
        <Text className="text-3xl font-bold text-white">Expenzeus</Text>
        <Text className="text-zinc-400 text-lg">Controle Financeiro</Text>
      </View>

      <View className="w-full gap-4">
        <View>
          <Text className="text-zinc-300 mb-2 font-semibold">Email</Text>
          <TextInput
            className="w-full h-12 bg-zinc-900 border border-zinc-800 rounded-xl px-4 text-white focus:border-yellow-500"
            placeholder="seu@email.com"
            placeholderTextColor="#71717a"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View>
          <Text className="text-zinc-300 mb-2 font-semibold">Senha</Text>
          <TextInput
            className="w-full h-12 bg-zinc-900 border border-zinc-800 rounded-xl px-4 text-white focus:border-yellow-500"
            placeholder="******"
            placeholderTextColor="#71717a"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          className="w-full h-14 bg-yellow-500 rounded-xl items-center justify-center mt-4 active:bg-yellow-600"
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text className="text-black font-bold text-lg">Entrar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
