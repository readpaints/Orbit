// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import React from 'react';
import { getCurrentOrbitTheme } from '../../constants/theme';
import { OrbitProvider } from '../../context/OrbitContext';

export default function TabsLayout() {
  const theme = getCurrentOrbitTheme();
  const { colors } = theme;

  return (
    <OrbitProvider>
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.surface,
          },
          headerTitleStyle: {
            color: colors.text,
          },
          headerShadowVisible: false,
          tabBarStyle: {
            backgroundColor: colors.tabBarBackground,
            borderTopColor: colors.tabBarBorder,
          },
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.textMuted,
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
          name="venues"
          options={{
            title: 'Venues',
          }}
        />
      </Tabs>
    </OrbitProvider>
  );
}
