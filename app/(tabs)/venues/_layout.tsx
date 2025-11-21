// app/(tabs)/venues/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';

export default function VenuesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
