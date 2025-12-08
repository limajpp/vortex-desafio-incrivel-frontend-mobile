import { Calendar, DollarSign } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export interface Expense {
  id: number;
  description: string;
  amount: number;
  date: string;
  userId: number;
}

interface ExpenseCardProps {
  data: Expense;
  onPress?: () => void;
}

export function ExpenseCard({ data, onPress }: ExpenseCardProps) {
  const amountValue = Number(data.amount);

  const formattedAmount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amountValue);

  const dateObj = new Date(
    data.date.includes("T") ? data.date : `${data.date}T12:00:00`
  );
  const formattedDate = dateObj.toLocaleDateString("pt-BR");

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 mb-3 flex-row justify-between items-center"
    >
      <View className="flex-1 mr-4">
        <Text className="text-white font-bold text-lg mb-1" numberOfLines={1}>
          {data.description}
        </Text>
        <View className="flex-row items-center">
          <Calendar size={14} color="#71717a" />
          <Text className="text-zinc-500 text-sm ml-1.5 font-medium">
            {formattedDate}
          </Text>
        </View>
      </View>

      <View className="items-end">
        <Text className="text-red-500 font-extrabold text-lg">
          - {formattedAmount}
        </Text>
        <View className="flex-row items-center mt-1">
          <DollarSign size={12} color="#71717a" />
          <Text className="text-zinc-500 text-xs ml-1">BRL</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
