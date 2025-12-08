import { Expense, ExpenseCard } from "@/components/ui/expenseCard";
import { FloatingButton } from "@/components/ui/floatingButton";
import { useAuth } from "@/contexts/authContext";
import { api } from "@/services/api";
import { useFocusEffect, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AlertCircle, LogOut, Wallet } from "lucide-react-native";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen() {
  const { signOut, user } = useAuth();
  const router = useRouter();

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchExpenses = async () => {
    try {
      const response = await api.get("/expenses");
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchExpenses();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchExpenses();
  };

  const totalAmount = expenses.reduce(
    (acc, curr) => acc + Number(curr.amount),
    0
  );

  return (
    <SafeAreaView
      className="flex-1 bg-zinc-50 dark:bg-zinc-950"
      edges={["top"]}
    >
      <StatusBar style="auto" />

      {/* Header Fixo */}
      <View className="px-6 pt-2 pb-6 border-b border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 z-10">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-zinc-500 dark:text-zinc-400 font-medium text-sm">
              Welcome,
            </Text>
            <Text
              className="text-2xl font-extrabold text-zinc-900 dark:text-white"
              numberOfLines={1}
            >
              {user?.name || "User"}
            </Text>
          </View>

          <TouchableOpacity
            onPress={signOut}
            className="h-10 w-10 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full items-center justify-center active:bg-zinc-200 dark:active:bg-zinc-800"
          >
            <LogOut size={18} color="#ef4444" />
          </TouchableOpacity>
        </View>

        {/* Card de Resumo */}
        <View className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800 shadow-sm">
          <View className="flex-row items-center mb-3">
            <View className="bg-yellow-500/10 p-2 rounded-full mr-3">
              <Wallet size={20} color="#EAB308" />
            </View>
            <Text className="text-zinc-400 font-bold uppercase text-xs tracking-wider">
              Total Expenses
            </Text>
          </View>
          <Text className="text-4xl font-extrabold text-white">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(totalAmount)}
          </Text>
        </View>
      </View>

      {/* Lista de Gastos */}
      <View className="flex-1 px-6 bg-zinc-50 dark:bg-zinc-950">
        <View className="py-5">
          <Text className="text-zinc-900 dark:text-white font-bold text-lg">
            History
          </Text>
        </View>

        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#EAB308" />
          </View>
        ) : (
          <FlatList
            data={expenses}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <ExpenseCard data={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#EAB308"
              />
            }
            ListEmptyComponent={
              <View className="items-center justify-center py-20 opacity-50">
                <AlertCircle size={48} color="#71717a" />
                <Text className="text-zinc-500 mt-4 font-medium text-center">
                  No expenses found.{"\n"}Tap + to add one.
                </Text>
              </View>
            }
          />
        )}
      </View>

      {/* Botão Flutuante (FAB) -> Chama /modal */}
      <FloatingButton onPress={() => router.push("/modal")} />
    </SafeAreaView>
  );
}
