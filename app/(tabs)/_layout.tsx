// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#999999',
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
        }}
      />

      <Tabs.Screen
        name="journal"
        options={{
          title: 'Journal',
        }}
      />

      <Tabs.Screen
        name="venues"
        options={{
          title: 'Venues',
        }}
      />

      <Tabs.Screen
        name="additional"
        options={{
          title: 'Additional',
        }}
      />
    </Tabs>
  );
}
