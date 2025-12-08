import { api } from '@/services/api';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AlignLeft, Calendar, Check, X } from 'lucide-react-native';
import { useState } from 'react';
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
    View
} from 'react-native';

export default function ModalScreen() {
  const router = useRouter();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  // Data padrão: Hoje
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!description || !amount) {
      return Alert.alert('Attention', 'Please fill in description and amount.');
    }

    // Tratamento para vírgula
    const numericAmount = parseFloat(amount.replace(',', '.'));
    
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return Alert.alert('Invalid Amount', 'Please enter a valid value.');
    }

    setLoading(true);
    try {
      await api.post('/expenses', {
        description,
        amount: numericAmount,
        date: date, 
      });
      
      router.back(); 
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Failed to save.';
      Alert.alert('Error', Array.isArray(msg) ? msg[0] : msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      className="flex-1 bg-zinc-950"
    >
      <StatusBar style="light" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1">
          
          {/* Header */}
          <View className="flex-row justify-between items-center p-6 border-b border-zinc-900">
            <Text className="text-xl font-bold text-white">New Expense</Text>
            <TouchableOpacity 
              onPress={() => router.back()} 
              className="h-10 w-10 bg-zinc-900 rounded-full items-center justify-center border border-zinc-800 active:bg-zinc-800"
            >
              <X size={20} color="#a1a1aa" />
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-1 p-6" showsVerticalScrollIndicator={false}>
            
            {/* Input Gigante de Valor */}
            <View className="mb-8">
              <Text className="text-zinc-500 font-medium mb-2 uppercase text-xs tracking-widest">Amount</Text>
              <View className="flex-row items-center border-b border-zinc-800 pb-2">
                <Text className="text-4xl text-yellow-500 font-bold mr-2">R$</Text>
                <TextInput
                  className="flex-1 text-5xl text-white font-extrabold h-20"
                  placeholder="0.00"
                  placeholderTextColor="#27272a"
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={setAmount}
                  autoFocus={true}
                  selectionColor="#EAB308"
                />
              </View>
            </View>

            {/* Inputs Secundários */}
            <View className="gap-6">
              <View>
                <View className="flex-row items-center mb-2 gap-2">
                  <AlignLeft size={16} color="#71717a" />
                  <Text className="text-zinc-400 font-medium">Description</Text>
                </View>
                <TextInput
                  className="w-full h-14 bg-zinc-900 border border-zinc-800 rounded-2xl px-4 text-white text-base focus:border-yellow-500 focus:bg-zinc-800/50"
                  placeholder="Ex: Uber, Lunch..."
                  placeholderTextColor="#52525b"
                  value={description}
                  onChangeText={setDescription}
                />
              </View>

              <View>
                <View className="flex-row items-center mb-2 gap-2">
                  <Calendar size={16} color="#71717a" />
                  <Text className="text-zinc-400 font-medium">Date (YYYY-MM-DD)</Text>
                </View>
                <TextInput
                  className="w-full h-14 bg-zinc-900 border border-zinc-800 rounded-2xl px-4 text-white text-base focus:border-yellow-500 focus:bg-zinc-800/50"
                  placeholder="2024-01-01"
                  placeholderTextColor="#52525b"
                  value={date}
                  onChangeText={setDate}
                />
              </View>
            </View>

          </ScrollView>

          {/* Botão de Salvar */}
          <View className="p-6 border-t border-zinc-900 bg-zinc-950 pb-10">
            <TouchableOpacity
              className={`w-full h-14 rounded-2xl flex-row items-center justify-center shadow-lg shadow-yellow-500/10 ${
                loading ? "bg-yellow-600" : "bg-yellow-500 active:bg-yellow-400"
              }`}
              onPress={handleCreate}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#000" />
              ) : (
                <>
                  <Check size={20} color="#000" strokeWidth={3} className="mr-2" />
                  <Text className="text-zinc-950 font-extrabold text-lg uppercase tracking-wide">
                    Save Expense
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}