import { api } from "@/services/api";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AlignLeft, Calendar, Check, Trash2, X } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { useState } from "react";
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

export default function ModalScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { colorScheme } = useColorScheme();

  const isEditing = !!params.id;

  const [description, setDescription] = useState(
    (params.description as string) || ""
  );

  const [amount, setAmount] = useState(() => {
    if (params.amount) {
      return (params.amount as string).replace(".", ",");
    }
    return "";
  });

  const [date, setDate] = useState(() => {
    if (params.date) {
      const paramDate = params.date as string;
      return new Date(
        paramDate.includes("T") ? paramDate : `${paramDate}T12:00:00`
      );
    }
    return new Date();
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangeAmount = (text: string) => {
    let formattedText = text.replace(".", ",");

    const regex = /^\d+(,\d{0,2})?$/;

    if (formattedText === "" || regex.test(formattedText)) {
      setAmount(formattedText);
    }
  };

  const handleSave = async () => {
    if (!description || !amount) {
      return Alert.alert("Attention", "Please fill in description and amount.");
    }

    const numericAmount = parseFloat(amount.replace(",", "."));

    if (isNaN(numericAmount) || numericAmount <= 0) {
      return Alert.alert("Invalid Amount", "Please enter a valid value.");
    }

    setLoading(true);
    try {
      const formattedDate = date.toISOString().split("T")[0];
      const payload = {
        description,
        amount: numericAmount,
        date: formattedDate,
      };

      if (isEditing) {
        await api.patch(`/expenses/${params.id}`, payload);
      } else {
        await api.post("/expenses", payload);
      }

      router.back();
    } catch (error: any) {
      if (!isEditing) {
        const msg = error.response?.data?.message || "Failed to save.";
        Alert.alert("Error", Array.isArray(msg) ? msg[0] : msg);
      } else {
        console.log("Failed to update...", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Expense",
      "Are you sure you want to delete this expense?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setLoading(true);
            try {
              await api.delete(`/expenses/${params.id}`);
              router.back();
            } catch (error: any) {
              Alert.alert("Error", "Failed to delete expense.");
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const iconColor = colorScheme === "dark" ? "#a1a1aa" : "#71717a";
  const placeholderColor = colorScheme === "dark" ? "#52525b" : "#a1a1aa";
  const inputBgColor = colorScheme === "dark" ? "bg-zinc-900" : "bg-zinc-100";
  const borderColor =
    colorScheme === "dark" ? "border-zinc-800" : "border-zinc-200";
  const textColor = colorScheme === "dark" ? "text-white" : "text-zinc-900";

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="flex-1 bg-white dark:bg-zinc-950">
          <View
            className={`flex-row justify-between items-center px-6 py-4 border-b ${borderColor}`}
          >
            <Text className={`text-xl font-bold ${textColor}`}>
              {isEditing ? "Edit Expense" : "New Expense"}
            </Text>
            <TouchableOpacity
              onPress={() => router.back()}
              className={`h-10 w-10 rounded-full items-center justify-center border ${inputBgColor} ${borderColor}`}
            >
              <X size={20} color={iconColor} />
            </TouchableOpacity>
          </View>

          <ScrollView
            className="flex-1 p-6"
            showsVerticalScrollIndicator={false}
          >
            <View className={`mb-8 border-b ${borderColor} pb-2`}>
              <Text className="text-zinc-500 font-medium mb-2 uppercase text-xs tracking-widest">
                Amount
              </Text>
              <View className="flex-row items-center">
                <Text className="text-4xl text-yellow-500 font-bold mr-2">
                  R$
                </Text>
                <TextInput
                  className={`flex-1 text-5xl font-extrabold h-20 ${textColor}`}
                  placeholder="0,00"
                  placeholderTextColor={placeholderColor}
                  keyboardType="decimal-pad"
                  value={amount}
                  onChangeText={handleChangeAmount}
                  selectionColor="#EAB308"
                />
              </View>
            </View>

            <View className="gap-6">
              <View>
                <View className="flex-row items-center mb-2 gap-2">
                  <AlignLeft size={16} color={iconColor} />
                  <Text className="text-zinc-500 font-medium">Description</Text>
                </View>
                <TextInput
                  className={`w-full h-14 ${inputBgColor} border ${borderColor} rounded-2xl px-4 ${textColor} text-base focus:border-yellow-500`}
                  placeholder="Ex: Uber, Lunch..."
                  placeholderTextColor={placeholderColor}
                  value={description}
                  onChangeText={setDescription}
                />
              </View>

              <View>
                <View className="flex-row items-center mb-2 gap-2">
                  <Calendar size={16} color={iconColor} />
                  <Text className="text-zinc-500 font-medium">Date</Text>
                </View>

                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  className={`w-full h-14 ${inputBgColor} border ${borderColor} rounded-2xl px-4 justify-center`}
                >
                  <Text className={`${textColor} text-base`}>
                    {date.toLocaleDateString("pt-BR")}
                  </Text>
                </TouchableOpacity>

                {showDatePicker &&
                  (Platform.OS === "ios" ? (
                    <DateTimePicker
                      value={date}
                      mode="date"
                      display="spinner"
                      onChange={onChangeDate}
                      textColor={colorScheme === "dark" ? "white" : "black"}
                      themeVariant={colorScheme === "dark" ? "dark" : "light"}
                      style={{ marginTop: 10 }}
                    />
                  ) : (
                    <DateTimePicker
                      value={date}
                      mode="date"
                      display="default"
                      onChange={onChangeDate}
                    />
                  ))}

                {showDatePicker && Platform.OS === "ios" && (
                  <TouchableOpacity
                    onPress={() => setShowDatePicker(false)}
                    className="mt-2 bg-zinc-200 dark:bg-zinc-800 p-2 rounded-lg items-center"
                  >
                    <Text className="text-zinc-900 dark:text-white font-bold">
                      Confirm Date
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </ScrollView>

          <View
            className={`p-6 border-t ${borderColor} bg-white dark:bg-zinc-950 pb-4 flex-row gap-3`}
          >
            {isEditing && (
              <TouchableOpacity
                className={`h-14 w-14 rounded-2xl flex-row items-center justify-center bg-red-500/10 border border-red-500/20`}
                onPress={handleDelete}
                disabled={loading}
              >
                <Trash2 size={24} color="#ef4444" />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              className={`flex-1 h-14 rounded-2xl flex-row items-center justify-center shadow-lg shadow-yellow-500/10 ${
                loading ? "bg-yellow-600" : "bg-yellow-500 active:bg-yellow-400"
              }`}
              onPress={handleSave}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#000" />
              ) : (
                <>
                  <Check
                    size={20}
                    color="#000"
                    strokeWidth={3}
                    className="mr-2"
                  />
                  <Text className="text-zinc-950 font-extrabold text-lg uppercase tracking-wide">
                    {isEditing ? "Update" : "Save"}
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
