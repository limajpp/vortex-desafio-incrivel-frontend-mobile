import { Calendar, TrendingDown } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { Text, TouchableOpacity, View } from "react-native";

export type Expense = {
  id: number;
  description: string;
  amount: number;
  date: string;
};

type Props = {
  data: Expense;
  onPress?: () => void;
};

export function ExpenseCard({ data, onPress }: Props) {
  const { colorScheme } = useColorScheme();

  const iconColor = colorScheme === "dark" ? "#EAB308" : "#ca8a04";
  const bgColor = colorScheme === "dark" ? "bg-zinc-900" : "bg-white";
  const borderColor =
    colorScheme === "dark" ? "border-zinc-800" : "border-zinc-200";
  const textColor = colorScheme === "dark" ? "text-white" : "text-zinc-900";
  const subTextColor =
    colorScheme === "dark" ? "text-zinc-400" : "text-zinc-500";

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-full flex-row items-center p-4 mb-3 rounded-2xl border ${bgColor} ${borderColor} shadow-sm`}
      activeOpacity={0.7}
    >
      <View className="h-12 w-12 rounded-xl bg-yellow-500/10 items-center justify-center mr-4 border border-yellow-500/20">
        <TrendingDown size={24} color={iconColor} />
      </View>

      <View className="flex-1 mr-4">
        <Text
          className={`font-bold text-base ${textColor} mb-1`}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {data.description}
        </Text>

        <View className="flex-row items-center">
          <Calendar
            size={12}
            color={colorScheme === "dark" ? "#a1a1aa" : "#71717a"}
            className="mr-1"
          />
          <Text className={`text-xs ${subTextColor}`}>
            {new Date(data.date).toLocaleDateString("pt-BR")}
          </Text>
        </View>
      </View>

      <Text className={`font-extrabold text-base ${textColor}`}>
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(data.amount)}
      </Text>
    </TouchableOpacity>
  );
}
