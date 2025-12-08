import { useAuth } from "@/contexts/authContext";
import { Tabs } from "expo-router";
import { House, LogOut } from "lucide-react-native";
import { Platform } from "react-native";

export default function TabLayout() {
  const { signOut } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          ...Platform.select({
            ios: { position: "absolute" },
            default: {},
          }),
          backgroundColor: "#18181b",
          borderTopColor: "#27272a",
        },
        tabBarActiveTintColor: "#EAB308",
        tabBarInactiveTintColor: "#71717a",
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
