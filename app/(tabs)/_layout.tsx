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
          // Orbit dusk: deep sea-green instead of pure black
          backgroundColor: '#071D1C',
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      {/* 1. Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />

      {/* 2. Venues */}
      <Tabs.Screen
        name="venues"
        options={{
          title: 'Venues',
        }}
      />

      {/* 3. Explore */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
        }}
      />

      {/* 4. Journal */}
      <Tabs.Screen
        name="journal"
        options={{
          title: 'Journal',
        }}
      />

      {/* 5. More (was Additional) */}
      <Tabs.Screen
        name="additional"
        options={{
          title: 'More',
        }}
      />
    </Tabs>
  );
}
