import { useAuth } from "@/contexts/authContext";
import { Tabs } from "expo-router";

export default function TabLayout() {
  const { signOut } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: "none",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
        }}
      />

      <Tabs.Screen
        name="logout"
        options={{
          title: "Sair",
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
