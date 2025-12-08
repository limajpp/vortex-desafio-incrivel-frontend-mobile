import { useAuth } from "@/contexts/authContext"; // Confirme se o caminho está correto (pode ser ../authContext ou @/authContext)
import { Tabs } from "expo-router";
import { House, LogOut } from "lucide-react-native";
import { Platform } from "react-native";

export default function TabLayout() {
  const { signOut } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // Unifiquei tudo aqui:
        tabBarStyle: {
          ...Platform.select({
            ios: { position: "absolute" },
            default: {},
          }),
          backgroundColor: "#18181b", // Zinc-900
          borderTopColor: "#27272a", // Zinc-800
        },
        tabBarActiveTintColor: "#EAB308", // Amarelo Primary
        tabBarInactiveTintColor: "#71717a", // Zinc-500
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => <House size={28} color={color} />,
        }}
      />

      <Tabs.Screen
        name="logout"
        options={{
          title: "Sair",
          tabBarIcon: ({ color }) => <LogOut size={28} color={color} />,
        }}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            signOut();
          },
        })}
      />
    </Tabs>
  );
}
