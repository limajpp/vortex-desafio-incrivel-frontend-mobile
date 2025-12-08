import { Plus } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

interface FloatingButtonProps {
  onPress: () => void;
}

export function FloatingButton({ onPress }: FloatingButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="absolute bottom-6 right-6 h-14 w-14 bg-yellow-500 rounded-full items-center justify-center shadow-lg shadow-black/50 z-50 active:scale-95"
    >
      <Plus size={28} color="#000" strokeWidth={3} />
    </TouchableOpacity>
  );
}
