import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen() {
  return (
    <SafeAreaView className="flex-1 bg-zinc-950 p-4">
      <View className="mb-6">
        <Text className="text-3xl font-bold text-white">Meus Gastos</Text>
        <Text className="text-zinc-400">Visão geral do mês</Text>
      </View>

      <View className="flex-1 justify-center items-center">
        <Text className="text-zinc-500">Lista de gastos virá aqui...</Text>
      </View>
    </SafeAreaView>
  );
}
